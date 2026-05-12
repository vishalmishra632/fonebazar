"use client";

import { useTheme } from "next-themes";
import type { Texture } from "three";
import { useMatcap } from "@/components/three/primitives/Matcap";

interface ThemedMatcaps {
  primary: Texture;
  accentA: Texture;
  accentB: Texture;
  yellow: Texture;
  amber: Texture;
  bone: Texture;
  ink: Texture;
  isLight: boolean;
  primaryColor: string;
}

export function useThemedMatcaps(): ThemedMatcaps {
  const { resolvedTheme } = useTheme();
  const yellow = useMatcap("yellow");
  const amber = useMatcap("amber");
  const bone = useMatcap("bone");
  const ink = useMatcap("ink");

  const isLight = resolvedTheme === "light";

  return {
    // Light mode gets a warm metallic amber so the icosahedron looks like a
    // gilded object against white — not a black cutout.
    primary: isLight ? amber : yellow,
    accentA: isLight ? ink : bone,
    accentB: isLight ? bone : amber,
    yellow,
    amber,
    bone,
    ink,
    isLight,
    // Solid RGB fallback for materials that take `color` instead of `matcap`
    // (MeshDistortMaterial on the hero specimen + the resin blob).
    primaryColor: isLight ? "#B6721E" : "#EDD25A",
  };
}
