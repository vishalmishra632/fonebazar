"use client";

import { Float } from "@react-three/drei";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useThemedMatcaps } from "@/hooks/use-themed-matcaps";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TORI_DESKTOP = [
  { radius: 1.1, pos: [-2.6, 0.4, -4] as const, rot: [0.8, 0.3, 0.1] as const },
  { radius: 1.6, pos: [-0.5, -0.6, -5] as const, rot: [0.3, 0.9, 0.4] as const },
  { radius: 2.1, pos: [1.8, 0.5, -6] as const, rot: [1.1, 0.2, 0.6] as const },
  { radius: 1.3, pos: [3.2, -0.8, -4.5] as const, rot: [0.5, 1.2, 0.2] as const },
  { radius: 2.4, pos: [0.8, 1.1, -5.5] as const, rot: [1.4, 0.1, 0.8] as const },
];

const TORI_MOBILE = TORI_DESKTOP.slice(0, 3);

function SceneContent() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { primaryColor, isLight } = useThemedMatcaps();
  const tori = isMobile ? TORI_MOBILE : TORI_DESKTOP;

  return (
    <>
      {/* Single unshadowed point light makes the resin tori glow translucently */}
      <pointLight position={[0, 0, 2]} intensity={isLight ? 1.1 : 1.8} color="#FFE9A8" />

      {tori.map((torus, index) => (
        <Float
          key={index}
          speed={reduced ? 0 : 0.55}
          floatIntensity={reduced ? 0 : 0.45}
          rotationIntensity={reduced ? 0 : 0.35}
          position={torus.pos}
        >
          <mesh rotation={torus.rot}>
            <torusGeometry args={[torus.radius, 0.06, 20, 96]} />
            <meshPhysicalMaterial
              color={primaryColor}
              transmission={0.55}
              thickness={0.6}
              ior={1.35}
              roughness={0.18}
              metalness={0}
              attenuationColor={isLight ? "#B6721E" : "#EDD25A"}
              attenuationDistance={2.5}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function ServicesAmbientScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 4]}>
      <SceneContent />
    </SceneCanvas>
  );
}
