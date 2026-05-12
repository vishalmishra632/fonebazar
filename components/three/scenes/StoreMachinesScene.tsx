"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Texture } from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { MouseParallax } from "@/components/three/primitives/MouseCamera";
import { useThemedMatcaps } from "@/hooks/use-themed-matcaps";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function FdmStack({ reduced, matcap }: { reduced: boolean; matcap: Texture }) {
  return (
    <Float speed={reduced ? 0 : 0.6} floatIntensity={reduced ? 0 : 0.3} position={[-3.6, 0.4, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.1 - 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6 - i * 0.08, 0.02, 12, 60]} />
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      ))}
    </Float>
  );
}

function SlaPillar({ reduced, matcap }: { reduced: boolean; matcap: Texture }) {
  return (
    <Float speed={reduced ? 0 : 0.55} floatIntensity={reduced ? 0 : 0.25} position={[-2, -0.3, 0.2]}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 1.4, 16]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 16]} />
        <meshMatcapMaterial matcap={matcap} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

function LaserBeam({ reduced, matcap }: { reduced: boolean; matcap: Texture }) {
  return (
    <Float speed={reduced ? 0 : 0.7} floatIntensity={reduced ? 0 : 0.3} position={[-0.4, 0.3, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </Float>
  );
}

function ResinBlob({
  reduced,
  mobile,
  color,
}: {
  reduced: boolean;
  mobile: boolean;
  color: string;
}) {
  if (mobile) return null;
  return (
    <Float speed={reduced ? 0 : 0.9} floatIntensity={reduced ? 0 : 0.5} position={[1.4, -0.5, 0.5]}>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={reduced ? 0.25 : 0.55}
          speed={reduced ? 0 : 1.6}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function HeatPress({ reduced, matcap }: { reduced: boolean; matcap: Texture }) {
  return (
    <Float speed={reduced ? 0 : 0.5} floatIntensity={reduced ? 0 : 0.25} position={[2.6, 0.6, 0]}>
      <mesh rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.1, 0.08, 0.7]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </Float>
  );
}

function VinylRoller({ reduced, matcap, mobile }: { reduced: boolean; matcap: Texture; mobile: boolean }) {
  if (mobile) return null;
  return (
    <Float speed={reduced ? 0 : 0.65} floatIntensity={reduced ? 0 : 0.3} position={[3.6, -0.4, 0.4]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 1.2, 24]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { primary, accentA, primaryColor } = useThemedMatcaps();

  return (
    <MouseParallax strength={isMobile ? 0 : 0.4} disabled={isMobile || reduced}>
      <FdmStack reduced={reduced} matcap={primary} />
      <SlaPillar reduced={reduced} matcap={accentA} />
      <LaserBeam reduced={reduced} matcap={primary} />
      <ResinBlob reduced={reduced} mobile={isMobile} color={primaryColor} />
      <HeatPress reduced={reduced} matcap={accentA} />
      <VinylRoller reduced={reduced} matcap={primary} mobile={isMobile} />
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
