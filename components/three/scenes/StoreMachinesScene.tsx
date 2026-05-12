"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { MouseParallax } from "@/components/three/primitives/MouseCamera";
import { useThemedMatcaps } from "@/hooks/use-themed-matcaps";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Ambient studio scene behind the Our Store hero. Uses the real GLB models
// shipped in /public/models/ — a literal FDM printer, a t-shirt, and a
// resin bottle — floating in space as if mid-air specimens from the studio.
// Replaces the previous abstract primitives that read as random shapes.

const PRINTER_URL = "/models/printer.glb";
const TSHIRT_URL = "/models/tshirt.glb";
const RESIN_URL = "/models/resin-bottle.glb";

useGLTF.preload(PRINTER_URL);
useGLTF.preload(TSHIRT_URL);
useGLTF.preload(RESIN_URL);

interface FloatingSpecimenProps {
  url: string;
  position: [number, number, number];
  fitSize: number;
  rotationY?: number;
  reduced: boolean;
  speed?: number;
  recolor?: { body: string; sheen?: string };
}

function FloatingSpecimen({
  url,
  position,
  fitSize,
  rotationY = 0,
  reduced,
  speed = 0.6,
  recolor,
}: FloatingSpecimenProps) {
  const { scene } = useGLTF(url);

  // Same auto-fit pattern as CraftSpecimen — wrap source in a parent group
  // sized to a uniform fitSize so wildly different raw model dimensions
  // (printer ~30u tall, t-shirt ~1.5u, bottle ~3u) all render predictably.
  const fitted = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = fitSize / maxDim;
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
      child.material = new THREE.MeshPhysicalMaterial({
        color: recolor.body,
        normalMap: original?.normalMap ?? null,
        aoMap: original?.aoMap ?? null,
        roughness: 0.82,
        metalness: 0,
        sheen: recolor.sheen ? 0.6 : 0,
        sheenColor: recolor.sheen
          ? new THREE.Color(recolor.sheen)
          : new THREE.Color(0),
        sheenRoughness: 0.85,
      });
    });
  }, [fitted, recolor]);

  return (
    <Float
      speed={reduced ? 0 : speed}
      floatIntensity={reduced ? 0 : 0.45}
      rotationIntensity={reduced ? 0 : 0.25}
      position={position}
      rotation={[0, rotationY, 0]}
    >
      <primitive object={fitted} />
    </Float>
  );
}

function SceneContent() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { isLight } = useThemedMatcaps();

  const shirtRecolor = isLight
    ? { body: "#1c1714", sheen: "#3a2f23" }
    : { body: "#F5EBD0", sheen: "#FFF6D6" };

  return (
    <MouseParallax strength={isMobile ? 0 : 0.32} disabled={isMobile || reduced}>
      <FloatingSpecimen
        url={PRINTER_URL}
        position={[-3.2, 0.2, -0.4]}
        fitSize={2.6}
        rotationY={0.6}
        reduced={reduced}
        speed={0.5}
      />

      <FloatingSpecimen
        url={TSHIRT_URL}
        position={[0.4, -0.2, -1]}
        fitSize={2.2}
        rotationY={-0.25}
        reduced={reduced}
        speed={0.55}
        recolor={shirtRecolor}
      />

      {!isMobile ? (
        <FloatingSpecimen
          url={RESIN_URL}
          position={[3.3, 0.1, 0]}
          fitSize={2.0}
          rotationY={-0.4}
          reduced={reduced}
          speed={0.7}
        />
      ) : null}
    </MouseParallax>
  );
}

export default function StoreMachinesScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 5.5]} cameraFov={48}>
      <SceneContent />
    </SceneCanvas>
  );
}
