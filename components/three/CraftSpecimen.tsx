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
  /** Target on-screen size in world units. Defaults to 2.6 — fits most card aspects. */
  fitSize?: number;
  cameraZ?: number;
  cameraFov?: number;
  cameraY?: number;
  recolor?: RecolorSpec;
  autoRotateSpeed?: number;
}

// Reusable specimen viewer. Auto-fits every model to a uniform on-screen size
// via Box3 — different source GLBs have wildly different raw units (the
// Ultimaker is ~30 units tall, the resin bottle is ~3, the t-shirt is ~1.5),
// so computing scale from the bounding box is far more reliable than tuning
// hand-picked scale numbers per model.
export function CraftSpecimen({
  modelUrl,
  fitSize = 2.6,
  cameraZ = 4.2,
  cameraFov = 36,
  cameraY = 0.3,
  recolor,
  autoRotateSpeed = 0.55,
}: CraftSpecimenProps) {
  return (
    <SceneCanvas cameraPosition={[0, cameraY, cameraZ]} cameraFov={cameraFov}>
      <SpecimenContent
        modelUrl={modelUrl}
        fitSize={fitSize}
        recolor={recolor}
        autoRotateSpeed={autoRotateSpeed}
      />
    </SceneCanvas>
  );
}

interface ContentProps {
  modelUrl: string;
  fitSize: number;
  recolor?: RecolorSpec;
  autoRotateSpeed: number;
}

function SpecimenContent({
  modelUrl,
  fitSize,
  recolor,
  autoRotateSpeed,
}: ContentProps) {
  const reduced = useReducedMotion();
  const { scene } = useGLTF(modelUrl);

  // Clone, then auto-fit + auto-center. Re-runs only when the source scene
  // or the desired fit size change.
  const fitted = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = fitSize / maxDim;

    // Wrap in a parent group so we can scale and translate without fighting
    // the source object's own transforms.
    const group = new THREE.Group();
    cloned.position.copy(center.multiplyScalar(-1));
    group.add(cloned);
    group.scale.setScalar(scale);

    return group;
  }, [scene, fitSize]);

  useEffect(() => {
    if (!recolor) return;
    fitted.traverse((child) => {
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
  }, [fitted, recolor]);

  return (
    <>
      <directionalLight position={[2.5, 3.5, 3]} intensity={0.85} />
      <directionalLight
        position={[-3, 4, -2.5]}
        intensity={0.45}
        color="#FFE9A8"
      />
      <directionalLight position={[0, -2, 2]} intensity={0.25} color="#FFF2A0" />

      <primitive object={fitted} />

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
