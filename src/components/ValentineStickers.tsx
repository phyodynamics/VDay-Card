"use client";

import React from "react";

const stickers: Record<string, React.FC<{ size?: number; color?: string }>> = {
  // ========== HEARTS ==========
  "love-letter": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="8"
        y="16"
        width="48"
        height="36"
        rx="4"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M8 20L32 38L56 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 30C32 30 26 24 22 24C18 24 16 27 18 29C20 31 32 38 32 38C32 38 44 31 46 29C48 27 46 24 42 24C38 24 32 30 32 30Z"
        fill={color}
        opacity="0.3"
      />
    </svg>
  ),

  "heart-lock": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 56C32 56 8 40 8 24C8 16 14 10 22 10C26.5 10 30 12 32 16C34 12 37.5 10 42 10C50 10 56 16 56 24C56 40 32 56 32 56Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="24"
        y="30"
        width="16"
        height="14"
        rx="3"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="32" cy="36" r="2" fill={color} />
      <path
        d="M28 30V26C28 23.8 29.8 22 32 22C34.2 22 36 23.8 36 26V30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  "double-heart": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M24 50C24 50 4 36 4 22C4 15 9 10 16 10C19.5 10 22 12 24 16C26 12 28.5 10 32 10C39 10 44 15 44 22C44 36 24 50 24 50Z"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M42 46C42 46 60 34 60 22C60 16 56 12 50 12C47 12 44 14 42 17C40 14 37 12 34 12C28 12 24 16 24 22C24 34 42 46 42 46Z"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  ),

  "heart-simple": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 56C32 56 6 40 6 22C6 14 12 8 20 8C25 8 29 10.5 32 15C35 10.5 39 8 44 8C52 8 58 14 58 22C58 40 32 56 32 56Z"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "heart-arrow": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 54C32 54 8 40 8 24C8 16 14 10 22 10C26.5 10 30 12 32 16C34 12 37.5 10 42 10C50 10 56 16 56 24C56 40 32 54 32 54Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1="10"
        y1="42"
        x2="54"
        y2="14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 12L55 14L52 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  "heart-wings": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 50C32 50 16 40 16 28C16 22 20 18 26 18C29 18 31 19.5 32 22C33 19.5 35 18 38 18C44 18 48 22 48 28C48 40 32 50 32 50Z"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M16 28C12 24 4 22 2 28C0 34 8 36 16 32"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill={color}
        opacity="0.1"
      />
      <path
        d="M48 28C52 24 60 22 62 28C64 34 56 36 48 32"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill={color}
        opacity="0.1"
      />
    </svg>
  ),

  "heart-sparkle": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 52C32 52 10 38 10 24C10 17 15 12 22 12C26 12 29 14 32 18C35 14 38 12 42 12C49 12 54 17 54 24C54 38 32 52 32 52Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M20 8L21 12L25 13L21 14L20 18L19 14L15 13L19 12Z"
        fill={color}
        opacity="0.5"
      />
      <path
        d="M48 6L49 9L52 10L49 11L48 14L47 11L44 10L47 9Z"
        fill={color}
        opacity="0.4"
      />
      <path
        d="M52 36L53 38L55 39L53 40L52 42L51 40L49 39L51 38Z"
        fill={color}
        opacity="0.3"
      />
    </svg>
  ),

  "candy-heart": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 52C32 52 10 38 10 24C10 17 15 12 22 12C26 12 29 14 32 18C35 14 38 12 42 12C49 12 54 17 54 24C54 38 32 52 32 52Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <text
        x="32"
        y="34"
        textAnchor="middle"
        fill={color}
        fontSize="10"
        fontWeight="bold"
        fontFamily="Inter"
      >
        LOVE
      </text>
    </svg>
  ),

  "heart-band": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 54C32 54 8 40 8 24C8 16 14 10 22 10C26.5 10 30 12 32 16C34 12 37.5 10 42 10C50 10 56 16 56 24C56 40 32 54 32 54Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M12 28H52"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M14 32H50"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  ),

  // ========== FLOWERS ==========
  rose: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 60V30"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 45C28 45 22 42 22 42"
        stroke="#5b8a72"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="32"
        cy="22"
        rx="12"
        ry="14"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M26 22C26 18 29 14 32 14C35 14 38 18 38 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 20C26 16 32 12 32 12C32 12 38 16 40 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  bouquet: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M26 60L32 35L38 60"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 58H40"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="20"
        r="8"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="22"
        cy="24"
        r="6"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="42"
        cy="24"
        r="6"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="26"
        cy="14"
        r="5"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="38"
        cy="14"
        r="5"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  ),

  tulip: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 60V28"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 42C36 38 40 36 40 36"
        stroke="#5b8a72"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 28C20 18 26 8 32 8C38 8 44 18 44 28C44 28 38 24 32 24C26 24 20 28 20 28Z"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),

  sunflower: ({ size = 48, color = "#f0c987" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 60V38"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 48C28 46 24 42 24 42"
        stroke="#5b8a72"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="32"
          cy="16"
          rx="4"
          ry="10"
          fill={color}
          opacity="0.3"
          stroke={color}
          strokeWidth="1"
          transform={`rotate(${angle} 32 26)`}
        />
      ))}
      <circle
        cx="32"
        cy="26"
        r="6"
        fill="#8B6914"
        opacity="0.4"
        stroke="#8B6914"
        strokeWidth="1.5"
      />
    </svg>
  ),

  daisy: ({ size = 48, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 60V38"
        stroke="#5b8a72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="32"
          cy="18"
          rx="4"
          ry="9"
          fill={color}
          opacity="0.5"
          stroke="#ddd"
          strokeWidth="1"
          transform={`rotate(${angle} 32 26)`}
        />
      ))}
      <circle
        cx="32"
        cy="26"
        r="5"
        fill="#f0c987"
        opacity="0.6"
        stroke="#e0b970"
        strokeWidth="1.5"
      />
    </svg>
  ),

  leaf: ({ size = 48, color = "#5b8a72" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 56V32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12C12 12 20 8 32 16C44 24 48 8 48 8C48 8 52 28 32 40C12 28 12 12 12 12Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 40C32 28 28 20 22 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  ),

  "sparkle-star": ({ size = 48, color = "#f0c987" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 4L36 24L56 20L40 32L52 52L32 40L12 52L24 32L8 20L28 24L32 4Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),

  // ========== DECORATIONS ==========
  "gift-box": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="10"
        y="28"
        width="44"
        height="30"
        rx="3"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="8"
        y="22"
        width="48"
        height="10"
        rx="3"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      <line x1="32" y1="22" x2="32" y2="58" stroke={color} strokeWidth="2" />
      <path
        d="M32 22C32 22 24 14 20 14C16 14 16 18 18 20C20 22 32 22 32 22Z"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M32 22C32 22 40 14 44 14C48 14 48 18 46 20C44 22 32 22 32 22Z"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  ),

  "ribbon-bow": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 32C32 32 16 20 12 16C8 12 10 8 16 10C22 12 32 24 32 24"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M32 32C32 32 48 20 52 16C56 12 54 8 48 10C42 12 32 24 32 24"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M26 40C26 40 28 32 32 32C36 32 38 40 38 40"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 56L32 40L42 56"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="32"
        r="4"
        fill={color}
        opacity="0.4"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  ),

  chocolate: ({ size = 48, color = "#8B4513" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="12"
        y="16"
        width="40"
        height="36"
        rx="4"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1="12"
        y1="28"
        x2="52"
        y2="28"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="12"
        y1="40"
        x2="52"
        y2="40"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="25"
        y1="16"
        x2="25"
        y2="52"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="39"
        y1="16"
        x2="39"
        y2="52"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path d="M26 8L32 4L38 8" fill={color} opacity="0.3" />
    </svg>
  ),

  champagne: ({ size = 48, color = "#f0c987" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M22 8L20 32C20 36 24 38 28 38H28L28 54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 8L44 32C44 36 40 38 36 38H36L36 54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="54"
        x2="34"
        y2="54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="54"
        x2="42"
        y2="54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="6" r="2" fill={color} opacity="0.5" />
      <circle cx="46" cy="4" r="1.5" fill={color} opacity="0.4" />
      <circle cx="33" cy="2" r="1" fill={color} opacity="0.3" />
    </svg>
  ),

  ring: ({ size = 48, color = "#f0c987" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse
        cx="32"
        cy="38"
        rx="16"
        ry="18"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M26 22L32 8L38 22"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="10"
        r="3"
        fill={color}
        opacity="0.5"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  ),

  dove: ({ size = 48, color = "#999" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M16 32C16 32 8 24 12 16C16 8 24 12 28 16L36 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 24C40 20 48 16 56 20C52 24 48 28 44 28L36 32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="36"
        cy="34"
        rx="12"
        ry="8"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M24 34C24 34 20 44 22 52"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="32" r="1.5" fill={color} />
    </svg>
  ),

  candle: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="24"
        y="24"
        width="16"
        height="34"
        rx="3"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1="32"
        y1="24"
        x2="32"
        y2="16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="32"
        cy="12"
        rx="4"
        ry="6"
        fill="#f0c987"
        opacity="0.5"
        stroke="#f0c987"
        strokeWidth="1"
      />
      <ellipse cx="32" cy="14" rx="2" ry="3" fill="#ff6b35" opacity="0.6" />
    </svg>
  ),

  "envelope-heart": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="18"
        width="52"
        height="36"
        rx="4"
        fill="white"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M6 22L32 40L58 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 10C32 10 28 4 24 4C20 4 18 7 20 9C22 11 32 16 32 16C32 16 42 11 44 9C46 7 44 4 40 4C36 4 32 10 32 10Z"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  ),

  kiss: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M20 32C20 32 16 24 20 20C24 16 28 20 28 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill={color}
        opacity="0.2"
      />
      <path
        d="M36 32C36 32 32 24 36 20C40 16 44 20 44 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill={color}
        opacity="0.2"
      />
      <path
        d="M28 24C28 28 32 36 32 36C32 36 36 28 36 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M24 44L28 40L32 44L36 40L40 44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  ),

  "music-note": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M24 44V16L48 10V38"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="18"
        cy="46"
        rx="6"
        ry="5"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      <ellipse
        cx="42"
        cy="40"
        rx="6"
        ry="5"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  ),

  butterfly: ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 20V56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 28C24 16 8 12 8 24C8 36 24 36 32 28"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M32 28C40 16 56 12 56 24C56 36 40 36 32 28"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M32 36C26 32 16 34 16 40C16 46 26 44 32 36"
        fill={color}
        opacity="0.1"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M32 36C38 32 48 34 48 40C48 46 38 44 32 36"
        fill={color}
        opacity="0.1"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="30" cy="16" r="2" fill={color} opacity="0.3" />
      <circle cx="34" cy="16" r="2" fill={color} opacity="0.3" />
    </svg>
  ),

  "cupid-bow": ({ size = 48, color = "#e8477e" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M12 48C12 48 12 16 32 8C52 16 52 48 52 48"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="32"
        y1="44"
        x2="32"
        y2="8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 8L32 2L36 8"
        fill={color}
        opacity="0.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export const STICKER_CATEGORIES = {
  hearts: [
    { id: "heart-simple", label: "Heart" },
    { id: "double-heart", label: "Double Heart" },
    { id: "heart-lock", label: "Heart Lock" },
    { id: "heart-arrow", label: "Heart Arrow" },
    { id: "heart-wings", label: "Winged Heart" },
    { id: "heart-sparkle", label: "Sparkle Heart" },
    { id: "candy-heart", label: "Candy Heart" },
    { id: "heart-band", label: "Heart Band" },
    { id: "love-letter", label: "Love Letter" },
    { id: "envelope-heart", label: "Envelope" },
    { id: "kiss", label: "Kiss" },
    { id: "cupid-bow", label: "Cupid Bow" },
  ],
  flowers: [
    { id: "rose", label: "Rose" },
    { id: "bouquet", label: "Bouquet" },
    { id: "tulip", label: "Tulip" },
    { id: "sunflower", label: "Sunflower" },
    { id: "daisy", label: "Daisy" },
    { id: "leaf", label: "Leaf" },
    { id: "sparkle-star", label: "Sparkle" },
    { id: "butterfly", label: "Butterfly" },
  ],
  decorations: [
    { id: "gift-box", label: "Gift" },
    { id: "ribbon-bow", label: "Ribbon" },
    { id: "chocolate", label: "Chocolate" },
    { id: "champagne", label: "Champagne" },
    { id: "ring", label: "Ring" },
    { id: "dove", label: "Dove" },
    { id: "candle", label: "Candle" },
    { id: "music-note", label: "Music" },
  ],
};

interface StickerRendererProps {
  stickerId: string;
  size?: number;
  color?: string;
}

export default function StickerRenderer({
  stickerId,
  size = 48,
  color,
}: StickerRendererProps) {
  const StickerComponent = stickers[stickerId];
  if (!StickerComponent) {
    return stickers["heart-simple"]({ size, color });
  }
  return <StickerComponent size={size} color={color} />;
}

export { stickers };
