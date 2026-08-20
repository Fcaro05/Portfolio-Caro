"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

/**
 * Layer buckets + explode offsets ported from the original scroll-driven
 * Smart Med Box animation on salus-ai-claude-website (medbox-3d.js).
 * Same mesh-name conventions baked into the shared medbox.glb.
 */
type Layers = {
  topPanel: THREE.Mesh[];
  slotTrayMeshes: THREE.Mesh[];
  covers: THREE.Mesh[];
  display: THREE.Mesh[];
  pcb: THREE.Mesh | null;
  basePanel: THREE.Mesh | null;
  components: THREE.Mesh[];
  shell: THREE.Mesh[];
};

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const ph = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function MedBoxModel({ progress }: { progress: MutableProgress }) {
  const { scene } = useGLTF("/models/medbox.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const { camera, size } = useThree();
  const layersRef = useRef<Layers | null>(null);
  const modelSizeRef = useRef(1);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const layers: Layers = {
      topPanel: [],
      slotTrayMeshes: [],
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

    layersRef.current = layers;
    camera.position.set(0, 0, S * 2.5);
    camera.lookAt(0, 0, 0);
  }, [cloned, camera]);

  useFrame(() => {
    const layers = layersRef.current;
    if (!layers) return;
    const S = modelSizeRef.current;
    const p = progress.current;

    const ar = size.width / size.height || 1;
    const isPortrait = ar < 1;
    const arBoost = isPortrait ? 1 / Math.max(0.45, ar) : 1;
    const azim = p * Math.PI * 0.4;
    const tilt = Math.pow(p, 0.7) * 1.05;
    const radius = isPortrait ? S * 4.0 * arBoost : S * (2.4 + p * 1.6);
    camera.position.set(Math.sin(azim) * radius, tilt * S * 1.4, Math.cos(azim) * radius);
    camera.lookAt(0, S * 0.55 * p, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 28 + p * 6;
      camera.updateProjectionMatrix();
    }

    const slotP = easeOut(ph(p, 0.2, 0.9));
    layers.slotTrayMeshes.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      const dir = (m.userData.slotDir as THREE.Vector3) || { x: 0, z: 0 };
      m.position.y = init.y + slotP * S * 0.28;
      m.position.x = init.x + dir.x * S * 0.17 * slotP;
      m.position.z = init.z + dir.z * S * 0.17 * slotP;
    });

    const shellP = easeOut(ph(p, 0.15, 0.6));
    layers.shell.forEach((m) => {
      m.position.y = (m.userData.initialPosition as THREE.Vector3).y + shellP * S * 0.48;
    });

    const dispP = easeOut(ph(p, 0.1, 0.55));
    layers.display.forEach((m) => {
      m.position.y = (m.userData.initialPosition as THREE.Vector3).y + dispP * S * 0.68;
    });

    const topP = easeOut(ph(p, 0.05, 0.55));
    layers.topPanel.forEach((m) => {
      m.position.y = (m.userData.initialPosition as THREE.Vector3).y + topP * S * 0.88;
    });

    const covP = easeOut(ph(p, 0, 0.35));
    layers.covers.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      const dir = (m.userData.slotDir as THREE.Vector3) || { x: 0, z: 0 };
      m.position.y = init.y + covP * S * 1.1;
      m.position.x = init.x + dir.x * S * 0.17 * covP;
      m.position.z = init.z + dir.z * S * 0.17 * covP;
    });

    const pcbP = easeOut(ph(p, 0.1, 0.85));
    const pcbDelta = pcbP * S * 0.18;
    if (layers.pcb) {
      const init = layers.pcb.userData.initialPosition as THREE.Vector3;
      layers.pcb.position.set(init.x, init.y + pcbDelta, init.z);
    }
    layers.components.forEach((m) => {
      const init = m.userData.initialPosition as THREE.Vector3;
      m.position.set(init.x, init.y + pcbDelta, init.z);
    });

    if (layers.basePanel) {
      layers.basePanel.position.y = (layers.basePanel.userData.initialPosition as THREE.Vector3).y;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

type MutableProgress = { current: number };

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
      progressRef.current.current = easeOut(clamp(v));
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
