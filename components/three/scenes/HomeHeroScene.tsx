"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Texture } from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { MouseParallax } from "@/components/three/primitives/MouseCamera";
import { useThemedMatcaps } from "@/hooks/use-themed-matcaps";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LAYER_COUNT = 22;
const LAYER_HEIGHT = 0.075;
const MAX_RADIUS = 0.95;

// A vase printed layer-by-layer. Each slab is a hexagonal prism so you can
// see the faceted edges; a small helical twist makes the layer boundaries
// obvious. Reads immediately as "3D print" rather than an abstract volume.
function PrintTower({ reduced, matcap }: { reduced: boolean; matcap: Texture }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={group} position={[-0.2, -0.85, 0]}>
      {Array.from({ length: LAYER_COUNT }).map((_, i) => {
        const progress = i / (LAYER_COUNT - 1);
        // Vase silhouette: wide base, pinched waist around 55%, flared lip
        const shape =
          0.55 +
          Math.sin(progress * Math.PI * 1.05) * 0.35 +
          Math.pow(progress, 3) * 0.22;
        const radius = MAX_RADIUS * shape;
        const rotation = i * 0.09;
        const y = i * LAYER_HEIGHT;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[0, rotation, 0]}>
            <cylinderGeometry args={[radius, radius, LAYER_HEIGHT * 0.72, 7]} />
            <meshMatcapMaterial matcap={matcap} />
          </mesh>
        );
      })}
    </group>
  );
}

// Filament spool — flat horizontal torus with a centre hub. The only other
// shape on screen, positioned top-right so it reads as the "raw material"
// above the printed object below it.
function FilamentSpool({
  reduced,
  matcap,
}: {
  reduced: boolean;
  matcap: Texture;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.z += delta * 0.35;
  });

  return (
    <Float
      speed={reduced ? 0 : 0.5}
      floatIntensity={reduced ? 0 : 0.25}
      rotationIntensity={reduced ? 0 : 0.08}
      position={[1.75, 1.05, -0.4]}
    >
      <group ref={group} rotation={[Math.PI / 2.3, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.52, 0.18, 18, 80]} />
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.38, 24]} />
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      </group>
    </Float>
  );
}

// Extruder nozzle — a tiny inverted cone + filament strand above the tower,
// suggesting the print is still in progress. Subtle; only renders on desktop.
function ExtruderHint({
  reduced,
  matcap,
  mobile,
}: {
  reduced: boolean;
  matcap: Texture;
  mobile: boolean;
}) {
  const strand = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!strand.current || reduced || mobile) return;
    strand.current.position.x = -0.2 + Math.sin(clock.elapsedTime * 0.4) * 0.22;
  });

  if (mobile) return null;

  return (
    <group ref={strand} position={[-0.2, 1.35, 0]}>
      <mesh>
        <coneGeometry args={[0.12, 0.22, 16]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.35, 8]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { primary, accentA } = useThemedMatcaps();

  return (
    <MouseParallax strength={isMobile ? 0 : 0.18} disabled={isMobile || reduced}>
      <PrintTower reduced={reduced} matcap={primary} />
      <FilamentSpool reduced={reduced} matcap={accentA} />
      <ExtruderHint reduced={reduced} matcap={accentA} mobile={isMobile} />
    </MouseParallax>
  );
}

export default function HomeHeroScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0.4, 5]}>
      <SceneContent />
    </SceneCanvas>
  );
}
