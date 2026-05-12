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

const HERO_FIT_SIZE = 2.0;

function ClothShirt({ palette }: { palette: ShirtPalette }) {
  const { scene } = useGLTF(MODEL_URL);

  // Box3 auto-fit — same pattern as CraftSpecimen. Computes the bounding
  // box, scales the source mesh so its longest dimension matches HERO_FIT_SIZE,
  // and re-centres the wrapped group at origin. The camera setup below gives
  // ~30% margin so nothing crops mid-rotation.
  const fitted = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = HERO_FIT_SIZE / maxDim;
    const group = new THREE.Group();
    cloned.position.copy(center.multiplyScalar(-1));
    group.add(cloned);
    group.scale.setScalar(scale);
    return group;
  }, [scene]);

  useEffect(() => {
    fitted.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = child.material as THREE.MeshStandardMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshPhysicalMaterial({
        color: palette.body,
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
  }, [fitted, palette]);

  return <primitive object={fitted} />;
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

// Camera sized so HERO_FIT_SIZE (2.0) occupies ~70% of the visible extent.
// Visible vertical extent ≈ 2 * cameraZ * tan(fov/2). At z=4.4, fov=36° that's
// ~2.86 units — fitSize 2.0 fills the frame with comfortable margin so the
// model never crops, even when the OrbitControls swing the wider profile
// (sleeves, hem) into view.
export default function TshirtsHeroScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 4.4]} cameraFov={36}>
      <SceneContent />
    </SceneCanvas>
  );
}
