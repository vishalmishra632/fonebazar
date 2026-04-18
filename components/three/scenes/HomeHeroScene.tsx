"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { MouseParallax } from "@/components/three/primitives/MouseCamera";
import { useMatcap } from "@/components/three/primitives/Matcap";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function HeroSpecimen({ reduced }: { reduced: boolean }) {
  return (
    <Float
      speed={reduced ? 0 : 1}
      floatIntensity={reduced ? 0 : 0.9}
      rotationIntensity={reduced ? 0 : 0.6}
    >
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#F4E400"
          distort={reduced ? 0.25 : 0.38}
          speed={reduced ? 0 : 1.4}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>
    </Float>
  );
}

function YellowTorus({ reduced }: { reduced: boolean }) {
  const matcap = useMatcap("yellow");
  return (
    <Float
      speed={reduced ? 0 : 0.8}
      floatIntensity={reduced ? 0 : 0.4}
      rotationIntensity={reduced ? 0 : 0.3}
      position={[1.3, -0.5, 0.6]}
    >
      <mesh rotation={[0.4, 0.2, 0.1]}>
        <torusGeometry args={[1.4, 0.08, 16, 90]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </Float>
  );
}

function AmbientCluster({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const yellow = useMatcap("yellow");
  const bone = useMatcap("bone");
  const ink = useMatcap("ink");

  const shapes = mobile
    ? [{ type: "sphere" as const, pos: [-1.8, 1, -0.8] as const, scale: 0.22, matcap: bone }]
    : [
        { type: "sphere" as const, pos: [-1.8, 1, -0.8] as const, scale: 0.22, matcap: bone },
        { type: "box" as const, pos: [-1.9, -1.4, 1.2] as const, scale: 0.2, matcap: yellow },
        { type: "sphere" as const, pos: [2.2, 1.3, -1.1] as const, scale: 0.16, matcap: ink },
        { type: "box" as const, pos: [-0.6, -1.8, 0.4] as const, scale: 0.18, matcap: yellow },
        { type: "sphere" as const, pos: [1.9, -1.2, 1.6] as const, scale: 0.15, matcap: bone },
      ];

  return (
    <>
      {shapes.map((shape, index) => (
        <Float
          key={index}
          speed={reduced ? 0 : 0.8 + (index % 3) * 0.3}
          floatIntensity={reduced ? 0 : 0.6}
          rotationIntensity={reduced ? 0 : 0.5}
          position={shape.pos}
        >
          <mesh scale={shape.scale}>
            {shape.type === "sphere" ? (
              <sphereGeometry args={[1, 24, 24]} />
            ) : (
              <boxGeometry args={[1, 1, 1]} />
            )}
            <meshMatcapMaterial matcap={shape.matcap} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function SceneContent() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <MouseParallax strength={isMobile ? 0 : 0.25} disabled={isMobile || reduced}>
      <HeroSpecimen reduced={reduced} />
      <YellowTorus reduced={reduced} />
      <AmbientCluster reduced={reduced} mobile={isMobile} />
    </MouseParallax>
  );
}

export default function HomeHeroScene() {
  return (
    <SceneCanvas cameraPosition={[0, 0, 6]}>
      <SceneContent />
    </SceneCanvas>
  );
}
