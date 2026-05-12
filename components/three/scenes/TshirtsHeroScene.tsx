"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Realistic t-shirt mockup — loads a Marvelous-Designer-sculpted glTF with
// baked normal + ambient occlusion textures (the source of the visible cloth
// folds at shoulders / hem). We then override the body colour through
// `meshPhysicalMaterial` so it picks up the brand palette while keeping the
// baked maps that produce the cloth realism.
//
// Asset: Starklord17/threejs-t-shirt (MIT). See THIRD_PARTY_NOTICES.md.

const MODEL_URL = "/models/tshirt.glb";

interface ShirtPalette {
  body: string;
  sheen: string;
}

function ClothShirt({ palette }: { palette: ShirtPalette }) {
  const { scene } = useGLTF(MODEL_URL);

  // Clone so different palettes (light/dark mode) don't fight over the same
  // shared scene graph. Material override re-runs whenever palette changes.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = child.material as THREE.MeshStandardMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshPhysicalMaterial({
        color: palette.body,
        // Pull the cloth wrinkles + sleeve / hem AO out of the baked maps.
        normalMap: original?.normalMap ?? null,
        aoMap: original?.aoMap ?? null,
        aoMapIntensity: 1.1,
        roughness: 0.85,
        metalness: 0,
        sheen: 0.7,
        sheenRoughness: 0.85,
        sheenColor: new THREE.Color(palette.sheen),
        clearcoat: 0.06,
        clearcoatRoughness: 0.9,
      });
    });
  }, [cloned, palette]);

  return <primitive object={cloned} scale={2.4} position={[0, -1.3, 0]} />;
}

useGLTF.preload(MODEL_URL);

function SceneContent() {
  const reduced = useReducedMotion();

  // Unified mustard/caramel — looks rich on both light and dark backgrounds,
  // ties to the brand gold without competing with the CTA fill, and reads
  // unmistakably as a printed cotton tee rather than a silhouette.
  const palette: ShirtPalette = {
    body: "#C89938",
    sheen: "#F0D690",
  };

  return (
    <>
      {/* Rim light from behind separates the silhouette from the background. */}
      <directionalLight position={[-3, 4, -3]} intensity={0.7} color="#FFF2B0" />
      {/* Fill from below lifts the under-sleeve and hem shadows. */}
      <directionalLight position={[0, -2, 2]} intensity={0.3} color="#FFE9A8" />

      <ClothShirt palette={palette} />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.85}
        autoRotate={!reduced}
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.7}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function TshirtsHeroScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0.2, 3.8]} cameraFov={36}>
      <SceneContent />
    </SceneCanvas>
  );
}
