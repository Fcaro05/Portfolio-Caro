"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

/**
 * Full 3-phase scroll-driven Smart Med Box animation, ported from
 * salus-ai-claude-website (medbox-3d.js + the scroll orchestration in
 * index.html) into React Three Fiber:
 *   1. Pre-tilt   — camera glides from a top-down view to frontal.
 *   2. Explode    — the box opens layer by layer.
 *   3. Focus tour — camera dollies into each of the 7 components in turn.
 */

type LayerKey = "covers" | "topPanel" | "display" | "shell" | "slots" | "pcb" | "base";

type Layers = {
  topPanel: THREE.Mesh[];
  slotTrayMeshes: THREE.Mesh[];
  slotGroups: Record<number, THREE.Mesh[]>;
  covers: THREE.Mesh[];
  display: THREE.Mesh[];
  pcb: THREE.Mesh | null;
  basePanel: THREE.Mesh | null;
  components: THREE.Mesh[];
  shell: THREE.Mesh[];
};

type FocusTarget = { key: LayerKey; lookY: number; lookX: number; distance: number; azim: number };

// Ordered top-to-bottom through the exploded stack — identical to index.html.
const FOCUS_TARGETS: FocusTarget[] = [
  { key: "covers", lookY: 1.05, lookX: 0.4, distance: 2.7, azim: 0.4 },
  { key: "topPanel", lookY: 0.88, lookX: 0.4, distance: 2.65, azim: 0.36 },
  { key: "display", lookY: 0.72, lookX: 0.4, distance: 2.6, azim: 0.32 },
  { key: "shell", lookY: 0.5, lookX: 0.4, distance: 2.58, azim: 0.28 },
  { key: "slots", lookY: 0.28, lookX: 0.4, distance: 2.55, azim: 0.24 },
  { key: "pcb", lookY: 0.08, lookX: 0.4, distance: 2.48, azim: 0.2 },
  { key: "base", lookY: -0.2, lookX: 0.4, distance: 2.35, azim: 0.22 },
];

const INTRO_END = 0.04;
const TILT_END = 0.13;
const MODEL_START = 0.13;
const EXPLODE_END = 0.5;
const FOCUS_RAMP_END = 0.55;

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const ph = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpTarget = (a: FocusTarget, b: FocusTarget, t: number) => ({
  lookY: lerp(a.lookY, b.lookY, t),
  lookX: lerp(a.lookX, b.lookX, t),
  distance: lerp(a.distance, b.distance, t),
  azim: lerp(a.azim, b.azim, t),
});

type MutableProgress = { current: number };

function MedBoxModel({ progress }: { progress: MutableProgress }) {
  const { scene } = useGLTF("/models/medbox.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const { camera, size } = useThree();
  const layersRef = useRef<Layers | null>(null);
  const modelSizeRef = useRef(1);

  useEffect(() => {
    const layers: Layers = {
      topPanel: [],
      slotTrayMeshes: [],
      slotGroups: {},
      covers: [],
      display: [],
      pcb: null,
      basePanel: null,
      components: [],
      shell: [],
    };

    const bbox = new THREE.Box3().setFromObject(cloned);
    const center = bbox.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const box = bbox.getSize(new THREE.Vector3());
    modelSizeRef.current = Math.max(box.x, box.y, box.z);
    const S = modelSizeRef.current;
    const tol = S * 0.06;

    const slotDirs: Record<number, THREE.Vector3> = {};

    cloned.traverse((o) => {
      if (!(o as THREE.Mesh).isMesh) return;
      const mesh = o as THREE.Mesh;
      mesh.userData.initialPosition = mesh.position.clone();
      mesh.userData.initialRotation = mesh.rotation.clone();
      const n = mesh.name || "";

      const slotMatch = n.match(/^Slot(\d+)_(.+)/i);
      if (slotMatch) {
        const idx = parseInt(slotMatch[1], 10);
        const part = slotMatch[2];
        mesh.userData.slotIdx = idx;
        if (/^Cover$/i.test(part)) layers.covers.push(mesh);
        else layers.slotTrayMeshes.push(mesh);
        return;
      }
      if (n === "Unified_Top" || n === "Wall_Top_Ring") {
        layers.topPanel.push(mesh);
      } else if (/Pill/i.test(n) || /capsule/i.test(n) || /tablet/i.test(n)) {
        mesh.visible = false;
      } else if (n === "PCB" || /^PCB\b/i.test(n)) {
        layers.pcb = mesh;
      } else if (n === "Base_Panel" || /Base_Panel/i.test(n)) {
        layers.basePanel = mesh;
      } else if (n === "MedBox_Shell" || n === "Logo_Plane" || /Shell$/i.test(n)) {
        layers.shell.push(mesh);
      } else if (
        /^(IC_|Cap_|Res_|Conn_|Via_|LED_|Crystal_|Xtal_|Diode_|Inductor_|Pad_|Solder_|SMD_|Comp_|Chip_|Transistor_)/i.test(n)
      ) {
        layers.components.push(mesh);
      } else if (/^Display_/i.test(n)) {
        layers.display.push(mesh);
      }
    });

    [...layers.slotTrayMeshes, ...layers.covers].forEach((m) => {
      const idx = m.userData.slotIdx as number;
      if (slotDirs[idx]) {
        m.userData.slotDir = slotDirs[idx];
        return;
      }
      const wpos = new THREE.Vector3();
      m.getWorldPosition(wpos);
      const gx = Math.abs(wpos.x) < tol ? 0 : Math.sign(wpos.x);
      const gz = Math.abs(wpos.z) < tol ? 0 : Math.sign(wpos.z);
      const dir = new THREE.Vector3(gx, 0, gz);
      slotDirs[idx] = dir;
      m.userData.slotDir = dir;
    });

    layers.slotTrayMeshes.forEach((m) => {
      const idx = m.userData.slotIdx as number;
      if (!layers.slotGroups[idx]) layers.slotGroups[idx] = [];
      layers.slotGroups[idx].push(m);
    });

    layersRef.current = layers;
    camera.position.set(0, 0, S * 2.5);
    camera.lookAt(0, 0, 0);
  }, [cloned, camera]);

  useFrame(() => {
    const layers = layersRef.current;
    if (!layers) return;
    const S = modelSizeRef.current;
    const raw = clamp(progress.current);

    // ---- explode progress (double-eased, matching the source's two easing passes) ----
    const modelRaw = ph(raw, MODEL_START, EXPLODE_END);
    const p = easeInOut(modelRaw);
    const explodeForFocus = raw >= EXPLODE_END ? 1 : p;

    // ---- pre-tilt (top-down → frontal) ----
    const tiltRaw = ph(raw, 0, TILT_END);
    const preTilt = 1 - easeInOut(tiltRaw);

    // ---- focus tour (7 component stops) ----
    let focus: { transition: number; weights: Record<LayerKey, number>; lookY: number; lookX: number; distance: number; azim: number } | null = null;
    if (raw >= EXPLODE_END) {
      const transition = easeInOut(ph(raw, EXPLODE_END, FOCUS_RAMP_END));
      const focusSpan = 1 - FOCUS_RAMP_END;
      const focusFrac = clamp((raw - FOCUS_RAMP_END) / focusSpan);
      const floatIdx = focusFrac * FOCUS_TARGETS.length;
      const i = Math.min(FOCUS_TARGETS.length - 1, Math.floor(floatIdx));
      const sub = floatIdx - i;
      const blend = sub < 0.7 ? 0 : easeInOut((sub - 0.7) / 0.3);
      const j = Math.min(FOCUS_TARGETS.length - 1, i + 1);
      const target = lerpTarget(FOCUS_TARGETS[i], FOCUS_TARGETS[j], blend);
      if (size.width < 768) target.lookX = 0;

      const weights = { covers: 0, topPanel: 0, display: 0, shell: 0, slots: 0, pcb: 0, base: 0 } as Record<LayerKey, number>;
      if (i === j) weights[FOCUS_TARGETS[i].key] = 1;
      else {
        weights[FOCUS_TARGETS[i].key] = 1 - blend;
        weights[FOCUS_TARGETS[j].key] = blend;
      }
      focus = { transition, weights, ...target };
    }

    // ── CAMERA ──
    const ar = size.width / size.height || 1;
    const isPortrait = ar < 1;
    const arBoost = isPortrait ? 1 / Math.max(0.45, ar) : 1;
    const defAzim = explodeForFocus * Math.PI * 0.4;
    const defTilt = Math.pow(explodeForFocus, 0.7) * 1.05;
    const defRadius = isPortrait ? S * 4.0 * arBoost : S * (2.4 + explodeForFocus * 1.6);
    let defCamX = Math.sin(defAzim) * defRadius;
    let defCamY = defTilt * S * 1.4;
    let defCamZ = Math.cos(defAzim) * defRadius;
    let defLookX = 0;
    let defLookY = S * 0.55 * explodeForFocus;
    const defLookZ = 0;
    const defFov = 28 + explodeForFocus * 6;

    if (preTilt > 0) {
      const pt = clamp(preTilt);
      const mix = (a: number, b: number) => a + (b - a) * pt;
      defCamX = mix(defCamX, 0);
      defCamY = mix(defCamY, S * 1.15);
      defCamZ = mix(defCamZ, S * 2.05);
      defLookX = mix(defLookX, 0);
      defLookY = mix(defLookY, -S * 0.1);
    }

    const fLookY = (focus ? focus.lookY : 0) * S;
    const fLookX = (focus ? focus.lookX : 0) * S;
    const fAz = focus ? focus.azim : 0;
    const fDistance = (focus ? focus.distance : 2) * S * arBoost;
    const fCamX = fLookX + Math.sin(fAz) * fDistance;
    const fCamY = fLookY + S * 0.05;
    const fCamZ = Math.cos(fAz) * fDistance;
    const fFov = 22;

    const t = focus ? clamp(focus.transition) : 0;
    const mix = (a: number, b: number) => a + (b - a) * t;
    camera.position.set(mix(defCamX, fCamX), mix(defCamY, fCamY), mix(defCamZ, fCamZ));
    camera.lookAt(mix(defLookX, fLookX), mix(defLookY, fLookY), mix(defLookZ, 0));
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = mix(defFov, fFov);
      camera.updateProjectionMatrix();
    }

    // ── EXPLODE (layer offsets) ──
    const pp = explodeForFocus;
    const slotP = easeOut(ph(pp, 0.2, 0.9));
    layers.slotTrayMeshes.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      const dir = (m.userData.slotDir as THREE.Vector3) || { x: 0, z: 0 };
      m.position.y = init.y + slotP * S * 0.28;
      m.position.x = init.x + dir.x * S * 0.17 * slotP;
      m.position.z = init.z + dir.z * S * 0.17 * slotP;
      m.rotation.x = (m.userData.initialRotation as THREE.Euler).x;
    });

    const shellP = easeOut(ph(pp, 0.15, 0.6));
    layers.shell.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      m.position.y = init.y + shellP * S * 0.48;
      m.position.z = init.z;
      m.rotation.x = (m.userData.initialRotation as THREE.Euler).x;
    });

    const dispP = easeOut(ph(pp, 0.1, 0.55));
    layers.display.forEach((m) => {
      m.position.y = (m.userData.initialPosition as THREE.Vector3).y + dispP * S * 0.68;
      m.rotation.x = (m.userData.initialRotation as THREE.Euler).x;
    });

    const topP = easeOut(ph(pp, 0.05, 0.55));
    layers.topPanel.forEach((m) => {
      m.position.y = (m.userData.initialPosition as THREE.Vector3).y + topP * S * 0.88;
      m.rotation.x = (m.userData.initialRotation as THREE.Euler).x;
    });

    const covP = easeOut(ph(pp, 0, 0.35));
    layers.covers.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      const initRot = m.userData.initialRotation as THREE.Euler;
      const dir = (m.userData.slotDir as THREE.Vector3) || { x: 0, z: 0 };
      m.position.y = init.y + covP * S * 1.1;
      m.position.x = init.x + dir.x * S * 0.17 * covP;
      m.position.z = init.z + dir.z * S * 0.17 * covP;
      m.rotation.x = initRot.x;
      m.rotation.z = initRot.z;
    });

    const pcbP = easeOut(ph(pp, 0.1, 0.85));
    const pcbDelta = pcbP * S * 0.18;
    if (layers.pcb) {
      const init = layers.pcb.userData.initialPosition as THREE.Vector3;
      layers.pcb.position.set(init.x, init.y + pcbDelta, init.z);
      layers.pcb.rotation.x = (layers.pcb.userData.initialRotation as THREE.Euler).x;
    }
    layers.components.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      m.position.set(init.x, init.y + pcbDelta, init.z);
      m.rotation.x = (m.userData.initialRotation as THREE.Euler).x;
    });

    if (layers.basePanel) {
      const bp = layers.basePanel;
      bp.position.y = (bp.userData.initialPosition as THREE.Vector3).y;
      bp.rotation.x = (bp.userData.initialRotation as THREE.Euler).x;
    }

    // ── FOCUS PASS: parted-sea spread + forward tilt on the focused layer ──
    if (focus && focus.transition > 0) {
      const ft = focus.transition;
      const fYAbs = focus.lookY * S;
      const w = focus.weights;
      const SPREAD = 0.55;
      const FOCUS_EXTRA = 0.5;
      const MAX_TILT = 0.28;

      const apply = (m: THREE.Mesh | null, key: LayerKey) => {
        if (!m) return;
        const weight = w[key] || 0;
        const spread = SPREAD + FOCUS_EXTRA * (1 - weight);
        m.position.y += (m.position.y - fYAbs) * spread * ft;
        const tiltX = weight * ft * MAX_TILT;
        const base = (m.userData.initialRotation as THREE.Euler).x;
        m.rotation.x = base + tiltX;
      };

      const applyGroup = (meshes: THREE.Mesh[], key: LayerKey) => {
        if (!meshes.length) return;
        const weight = w[key] || 0;
        const spread = SPREAD + FOCUS_EXTRA * (1 - weight);
        let cy = 0;
        let cz = 0;
        for (const m of meshes) {
          cy += m.position.y;
          cz += m.position.z;
        }
        cy /= meshes.length;
        cz /= meshes.length;
        const yDelta = (cy - fYAbs) * spread * ft;
        const tiltX = weight * ft * MAX_TILT;
        const sinT = Math.sin(tiltX);
        const cosT = Math.cos(tiltX);
        for (const m of meshes) {
          const dy = m.position.y - cy;
          const dz = m.position.z - cz;
          m.position.y = cy + dy * cosT - dz * sinT + yDelta;
          m.position.z = cz + dy * sinT + dz * cosT;
          const base = (m.userData.initialRotation as THREE.Euler).x;
          m.rotation.x = base + tiltX;
        }
      };

      layers.covers.forEach((m) => {
        apply(m, "covers");
        m.rotation.z = (m.userData.initialRotation as THREE.Euler).z;
      });
      layers.topPanel.forEach((m) => apply(m, "topPanel"));
      layers.display.forEach((m) => apply(m, "display"));
      applyGroup(layers.shell, "shell");
      Object.values(layers.slotGroups).forEach((g) => applyGroup(g, "slots"));
      const pcbGroup = layers.pcb ? [layers.pcb, ...layers.components] : layers.components;
      applyGroup(pcbGroup, "pcb");
      if (layers.basePanel) apply(layers.basePanel, "base");
    }
  });

  return <primitive object={cloned} />;
}

export default function MedBoxCanvas({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: boolean;
}) {
  const progressRef = useRef<MutableProgress>({ current: 0 });

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      progressRef.current.current = v;
    });
    return unsub;
  }, [progress]);

  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 28, near: 0.01, far: 100, position: [0, 0, 2.5] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#c8d8e0" />
      <directionalLight position={[0, 1, -6]} intensity={0.35} color="#6bb6b6" />
      <MedBoxModel progress={progressRef.current} />
    </Canvas>
  );
}

useGLTF.preload("/models/medbox.glb");
