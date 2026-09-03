"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { patternVert, patternFrag } from "./patternShaders";

function Field({
  progress,
  scan,
}: {
  progress: MotionValue<number>;
  scan: MotionValue<number>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const smoothed = useRef(0);
  const smoothedScan = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uScanX: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uA: { value: new THREE.Color("#8b5cff") },
      uB: { value: new THREE.Color("#34e7e4") },
      uC: { value: new THREE.Color("#d4ff36") },
    }),
    []
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    smoothed.current += (progress.get() - smoothed.current) * 0.12;
    smoothedScan.current += (scan.get() - smoothedScan.current) * 0.2;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uProgress.value = smoothed.current;
    m.uniforms.uScanX.value = smoothedScan.current;
    m.uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={patternVert}
        fragmentShader={patternFrag}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

export default function PatternFieldCanvas({
  progress,
  scan,
}: {
  progress: MotionValue<number>;
  scan: MotionValue<number>;
}) {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop="always"
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <color attach="background" args={["#08080a"]} />
      <Field progress={progress} scan={scan} />
      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.32}
          luminanceSmoothing={0.25}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
