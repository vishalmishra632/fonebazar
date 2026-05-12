"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TransitionSceneProps {
  active: boolean;
}

function Curtain({ active }: { active: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<{ distort?: number }>(null);
  const progress = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    if (active) {
      progress.current = 0;
      running.current = true;
    }
  }, [active]);

  useFrame((_, delta) => {
    if (!running.current || !mesh.current) return;
    progress.current = Math.min(progress.current + delta / 0.9, 1);
    const t = progress.current;
    const envelope = Math.sin(t * Math.PI);
    const scale = envelope * 1.4 + 0.01;
    mesh.current.scale.set(scale, scale, 1);
    if (mat.current) {
      mat.current.distort = envelope * 1.1;
    }
    if (t >= 1) {
      running.current = false;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[20, 20, 48, 48]} />
      <MeshDistortMaterial
        ref={mat as never}
        color="#EDD25A"
        distort={0}
        speed={3}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  );
}

export default function TransitionScene({ active }: TransitionSceneProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-150 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.9} />
        <Curtain active={active} />
      </Canvas>
    </div>
  );
}
