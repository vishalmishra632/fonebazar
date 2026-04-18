"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  smoothing?: number;
  disabled?: boolean;
}

export function MouseParallax({
  children,
  strength = 0.25,
  smoothing = 0.08,
  disabled = false,
}: MouseParallaxProps) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const size = useThree((state) => state.size);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    function onPointerMove(event: PointerEvent) {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -((event.clientY / size.height) * 2 - 1);
      target.current.set(x, y);
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [disabled, size]);

  useFrame(() => {
    if (disabled || !group.current) return;
    group.current.position.x += (target.current.x * strength - group.current.position.x) * smoothing;
    group.current.position.y += (target.current.y * strength - group.current.position.y) * smoothing;
  });

  return <group ref={group}>{children}</group>;
}
