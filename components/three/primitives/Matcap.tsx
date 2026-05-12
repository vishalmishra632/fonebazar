"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type MatcapVariant = "yellow" | "amber" | "bone" | "ink";

interface MatcapRecipe {
  highlight: string;
  mid: string;
  shadow: string;
}

const RECIPES: Record<MatcapVariant, MatcapRecipe> = {
  // Golden leaf — warm, luxurious. Sits in the 0.88 0.17 97 OKLCH neighbourhood.
  yellow: { highlight: "#FFF1B0", mid: "#EDD25A", shadow: "#3A2F08" },
  // Warm bronze/amber — used as light-mode primary so 3D volumes read
  // against white as a rich metallic, not a black silhouette.
  amber: { highlight: "#FFE69A", mid: "#B6721E", shadow: "#2A1804" },
  bone: { highlight: "#FFFFFF", mid: "#E8E0D0", shadow: "#4A3E2A" },
  ink: { highlight: "#453B1F", mid: "#1A140A", shadow: "#020201" },
};

function createMatcapTexture({ highlight, mid, shadow }: MatcapRecipe): THREE.Texture {
  if (typeof document === "undefined") {
    return new THREE.Texture();
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 256, 256);

  const gradient = ctx.createRadialGradient(96, 80, 6, 128, 128, 128);
  gradient.addColorStop(0, highlight);
  gradient.addColorStop(0.35, mid);
  gradient.addColorStop(1, shadow);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(128, 128, 126, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function useMatcap(variant: MatcapVariant): THREE.Texture {
  return useMemo(() => createMatcapTexture(RECIPES[variant]), [variant]);
}
