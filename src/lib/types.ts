export interface CardElement {
  id: string;
  type: "sticker" | "text" | "image";
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: string;
  textAlign?: string;
  stickerColor?: string;
  shape?: string;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  scale?: number;
  zIndex?: number;
}

export interface CardData {
  id?: string;
  theme: string;
  elements: CardElement[];
  mainMessage: string;
  mainMessageFont?: string;
  mainMessageColor?: string;
  bgPattern?: string;
  createdAt: string;
}

export const THEMES = [
  { id: "romantic", name: "Romantic", className: "card-theme-romantic" },
  { id: "pink", name: "Pink Dream", className: "card-theme-pink" },
  { id: "elegant", name: "Elegant", className: "card-theme-elegant" },
  { id: "sunset", name: "Sunset", className: "card-theme-sunset" },
  { id: "garden", name: "Garden", className: "card-theme-garden" },
  { id: "royal", name: "Royal", className: "card-theme-royal" },
  { id: "blush", name: "Blush", className: "card-theme-blush" },
  { id: "lavender", name: "Lavender", className: "card-theme-lavender" },
];

export const FONT_OPTIONS = [
  { id: "dancing", name: "Dancing Script", css: "var(--font-script)" },
  {
    id: "playfair",
    name: "Playfair Display",
    css: "var(--font-display)",
  },
  { id: "nunito", name: "Nunito", css: "var(--font-body)" },
  {
    id: "noto-myanmar",
    name: "Noto Serif Myanmar",
    css: "var(--font-my)",
  },
];

export const TEXT_TEMPLATES = [
  {
    label: "💕 Love",
    texts: [
      "Happy Valentine's Day!",
      "I Love You",
      "You are my everything",
      "Forever & Always",
      "Be Mine",
      "XOXO",
      "You + Me = ❤️",
    ],
  },
  {
    label: "🇲🇲 Burmese",
    texts: [
      "ချစ်တယ်",
      "မင်းကိုချစ်တယ်",
      "ပျော်ရွှင်သော Valentine's Day",
      "အမြဲတမ်း ချစ်တယ်",
      "မင်းပဲ အကောင်းဆုံး",
      "နှလုံးသားထဲက ချစ်တယ်",
    ],
  },
  {
    label: "✨ Sweet",
    texts: [
      "You make my heart smile",
      "My favorite hello",
      "Love you to the moon",
      "Dream come true",
      "Better together",
      "Soulmate",
    ],
  },
];

export const BG_PATTERNS = [
  { id: "none", name: "None" },
  { id: "dots", name: "Dots" },
  { id: "hearts", name: "Hearts" },
  { id: "stars", name: "Stars" },
  { id: "lines", name: "Lines" },
];
