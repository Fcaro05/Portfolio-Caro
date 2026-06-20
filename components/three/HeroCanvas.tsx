"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { heroVert, heroFrag } from "./shaders";

const pointer = { x: 0.5, y: 0.5 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = 1 - e.clientY / window.innerHeight;
    },
    { passive: true }
  );
}

function Plasma() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const current = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uColorA: { value: new THREE.Color("#d4ff36") },
      uColorB: { value: new THREE.Color("#ff2d8e") },
      uColorC: { value: new THREE.Color("#34e7e4") },
    }),
    []
  );

  useFrame((state) => {
    current.current.x += (pointer.x - current.current.x) * 0.04;
    current.current.y += (pointer.y - current.current.y) * 0.04;
    const m = matRef.current;
    if (m) {
      m.uniforms.uTime.value = state.clock.elapsedTime;
      m.uniforms.uMouse.value.copy(current.current);
      m.uniforms.uRes.value.set(size.width, size.height);
    }
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={heroVert}
        fragmentShader={heroFrag}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.03;
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (pointer.y - 0.5) * 0.4,
        0.03
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (pointer.x - 0.5) * 0.4,
        0.03
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#ffffff"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroCanvas({
  reduced = false,
  active = true,
}: {
  reduced?: boolean;
  active?: boolean;
}) {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={active ? "always" : "never"}
      dpr={[1, reduced ? 1.2 : 1.6]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <color attach="background" args={["#08080a"]} />
      <Plasma />
      {!reduced && <Particles count={650} />}
      {!reduced && (
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
