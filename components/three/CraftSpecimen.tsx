"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RecolorSpec {
  body: string;
  sheen?: string;
  roughness?: number;
}

interface CraftSpecimenProps {
  modelUrl: string;
  scale?: number;
  yOffset?: number;
  cameraZ?: number;
  cameraFov?: number;
  cameraY?: number;
  recolor?: RecolorSpec;
  autoRotateSpeed?: number;
}

// Reusable wrapper that loads a GLB, sets up consistent lighting, and exposes
// the model to OrbitControls so the user can drag-to-rotate. Pass `recolor`
// when you want to overwrite the model's baked material with the brand palette
// (necessary for any model authored against Maya's default `lambert1`).
// Leave `recolor` unset to render the model with its source materials —
// preferable when the original assets carry meaningful multi-mesh colours
// (e.g. a desktop 3D printer with distinct gantry / build-plate parts).
export function CraftSpecimen({
  modelUrl,
  scale = 1,
  yOffset = 0,
  cameraZ = 4,
  cameraFov = 38,
  cameraY = 0.3,
  recolor,
  autoRotateSpeed = 0.55,
}: CraftSpecimenProps) {
  return (
    <SceneCanvas cameraPosition={[0, cameraY, cameraZ]} cameraFov={cameraFov}>
      <SpecimenContent
        modelUrl={modelUrl}
        scale={scale}
        yOffset={yOffset}
        recolor={recolor}
        autoRotateSpeed={autoRotateSpeed}
      />
    </SceneCanvas>
  );
}

interface ContentProps {
  modelUrl: string;
  scale: number;
  yOffset: number;
  recolor?: RecolorSpec;
  autoRotateSpeed: number;
}

function SpecimenContent({
  modelUrl,
  scale,
  yOffset,
  recolor,
  autoRotateSpeed,
}: ContentProps) {
  const reduced = useReducedMotion();
  const { scene } = useGLTF(modelUrl);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!recolor) return;
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = child.material as THREE.MeshStandardMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshPhysicalMaterial({
        color: recolor.body,
        normalMap: original?.normalMap ?? null,
        aoMap: original?.aoMap ?? null,
        roughness: recolor.roughness ?? 0.78,
        metalness: 0,
        sheen: recolor.sheen ? 0.7 : 0,
        sheenColor: recolor.sheen
          ? new THREE.Color(recolor.sheen)
          : new THREE.Color(0),
        sheenRoughness: 0.85,
      });
    });
  }, [cloned, recolor]);

  return (
    <>
      <directionalLight position={[2.5, 3.5, 3]} intensity={0.85} />
      <directionalLight
        position={[-3, 4, -2.5]}
        intensity={0.45}
        color="#FFE9A8"
      />
      <directionalLight position={[0, -2, 2]} intensity={0.25} color="#FFF2A0" />

      <primitive object={cloned} scale={scale} position={[0, yOffset, 0]} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.85}
        autoRotate={!reduced}
        autoRotateSpeed={autoRotateSpeed}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.6}
      />
    </>
  );
}
