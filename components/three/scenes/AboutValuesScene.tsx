"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useMatcap } from "@/components/three/primitives/Matcap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ValueNumeralProps {
  number: string;
}

function Numeral({ number }: { number: string }) {
  const reduced = useReducedMotion();
  const matcap = useMatcap("yellow");
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    if (reduced) {
      group.current.rotation.y = 0.35;
      return;
    }
    const t = state.clock.getElapsedTime();
    const target = 0.25 + Math.sin(t * 0.3) * 0.12;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.05;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.06;
  });

  return (
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
        <meshMatcapMaterial matcap={matcap} />
      </Text>
    </group>
  );
}

export default function AboutValuesScene({ number }: ValueNumeralProps) {
  return (
    <SceneCanvas cameraPosition={[0, 0, 4]} cameraFov={40}>
      <Numeral number={number} />
    </SceneCanvas>
  );
}
