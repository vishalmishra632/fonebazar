"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useThemedMatcaps } from "@/hooks/use-themed-matcaps";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ValueNumeralProps {
  number: string;
}

function Numeral({ number }: { number: string }) {
  const reduced = useReducedMotion();
  const { primary: numeralMatcap, isLight } = useThemedMatcaps();
  const group = useRef<THREE.Group>(null);
  const orbitGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      if (reduced) {
        group.current.rotation.y = 0.35;
      } else {
        const target = 0.25 + Math.sin(t * 0.3) * 0.12;
        group.current.rotation.y += (target - group.current.rotation.y) * 0.05;
        group.current.rotation.x = Math.sin(t * 0.2) * 0.06;
      }
    }

    // Laser-head sphere orbits the numeral at a steady cadence — reads as
    // a cutting head circling the workpiece, not random decoration.
    if (orbitGroup.current && !reduced) {
      const angle = t * 0.9;
      orbitGroup.current.position.x = Math.cos(angle) * 1.6;
      orbitGroup.current.position.y = Math.sin(angle) * 1.1;
      orbitGroup.current.position.z = Math.sin(angle * 0.5) * 0.3;
    }
  });

  return (
    <>
      <group ref={group}>
        <Text
          font="/fonts/Satoshi-Variable.woff2"
          fontSize={2.4}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.04}
          fontWeight={800}
        >
          {number}
          <meshMatcapMaterial matcap={numeralMatcap} />
        </Text>
      </group>

      {/* Laser-head dot — tiny emissive sphere with a bloom-adjacent halo */}
      <group ref={orbitGroup}>
        <mesh>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={isLight ? "#B6721E" : "#EDD25A"} />
        </mesh>
        <mesh scale={2.6}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial
            color={isLight ? "#B6721E" : "#EDD25A"}
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

export default function AboutValuesScene({ number }: ValueNumeralProps) {
  return (
    <SceneCanvas cameraPosition={[0, 0, 4]} cameraFov={40}>
      <Numeral number={number} />
    </SceneCanvas>
  );
}
