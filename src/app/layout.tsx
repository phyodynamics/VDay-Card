import type { Metadata, Viewport } from "next";
import {
  DM_Serif_Display,
  Poppins,
  Great_Vibes,
  Noto_Sans_Myanmar,
} from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-my",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Valentine's Day Card Creator | ချစ်သူများအတွက် ကတ်ဖန်တီးပါ",
  description:
    "Create beautiful Valentine's Day cards with custom designs, hearts, flowers, and messages. Share with your loved one via a special link. | Valentine's Day အတွက် လှပတဲ့ ကတ်တွေ ဖန်တီးပြီး သင့်ချစ်သူကို မျှဝေလိုက်ပါ။",
  keywords: ["valentine", "card", "love", "myanmar", "ချစ်သူများ", "ကတ်"],
  openGraph: {
    title: "Valentine's Day Card Creator",
    description: "Design and share beautiful Valentine's Day cards",
    type: "website",
  },
  icons: {
    icon: "https://i.imghippo.com/files/YVCs3671XZo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fff5f8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="my"
      className={`${dmSerif.variable} ${poppins.variable} ${greatVibes.variable} ${notoSansMyanmar.variable}`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
