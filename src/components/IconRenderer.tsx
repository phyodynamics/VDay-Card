"use client";

import {
  Heart,
  HeartHandshake,
  HeartPulse,
  HeartCrack,
  Sparkle,
  Sparkles,
  Star,
  Crown,
  Gem,
  Flower,
  Flower2,
  Clover,
  Leaf,
  TreePine,
  Trees,
  Cherry,
  Sun,
  Moon,
  Gift,
  Ribbon,
  Candy,
  Cake,
  Wine,
  Music,
  Bird,
  Cloud,
  Rainbow,
} from "lucide-react";
import { ComponentType } from "react";

interface LucideIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

const ICON_MAP: Record<string, ComponentType<LucideIconProps>> = {
  heart: Heart,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  "heart-crack": HeartCrack,
  sparkle: Sparkle,
  sparkles: Sparkles,
  star: Star,
  crown: Crown,
  gem: Gem,
  flower: Flower,
  "flower-2": Flower2,
  clover: Clover,
  leaf: Leaf,
  "tree-pine": TreePine,
  trees: Trees,
  cherry: Cherry,
  sun: Sun,
  moon: Moon,
  gift: Gift,
  ribbon: Ribbon,
  candy: Candy,
  cake: Cake,
  wine: Wine,
  music: Music,
  butterfly: Bird,
  cloud: Cloud,
  rainbow: Rainbow,
};

interface IconRendererProps {
  iconId: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

export default function IconRenderer({
  iconId,
  size = 24,
  color,
  strokeWidth = 2,
  fill = "none",
  className = "",
}: IconRendererProps) {
  const IconComponent = ICON_MAP[iconId];

  if (!IconComponent) {
    return (
      <Heart
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        fill={fill}
        className={className}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      fill={fill}
      className={className}
    />
  );
}

export { ICON_MAP };
