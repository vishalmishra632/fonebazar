"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export function SceneCanvas({
  children,
  className,
  cameraPosition = [0, 0, 6],
  cameraFov = 45,
}: SceneCanvasProps) {
  const isMobile = useIsMobile();
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: cameraPosition, fov: cameraFov }}
      className={className}
      aria-hidden
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <directionalLight position={[-4, -2, 3]} intensity={0.25} color="#FFF6C0" />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
