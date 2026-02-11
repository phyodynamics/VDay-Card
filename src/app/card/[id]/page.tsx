"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { CardData, THEMES, FONT_OPTIONS } from "@/lib/types";
import StickerRenderer from "@/components/ValentineStickers";
import { Heart, HeartCrack } from "lucide-react";

export default function CardViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useLanguage();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getFontCss = (fontId?: string) =>
    FONT_OPTIONS.find((f) => f.id === fontId)?.css || "var(--font-script)";

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`/api/get-card/${id}`);
        const result = await response.json();
        if (result.success && result.cardData) {
          setCardData(result.cardData);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    };
    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="card-viewer">
        <div className="loading-container">
          <div className="loading-heart">
            <Heart size={48} fill="currentColor" />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>{t("card.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="card-viewer">
        <div className="loading-container">
          <HeartCrack size={48} color="var(--primary)" />
          <h2 style={{ fontFamily: "var(--font-display)" }}>
            {t("card.notFound")}
          </h2>
          <Link href="/" className="hero-cta" style={{ marginTop: 20 }}>
            {t("nav.home")}
          </Link>
        </div>
      </div>
    );
  }

  const themeClass =
    THEMES.find((th) => th.id === cardData.theme)?.className ||
    "card-theme-romantic";
  const patternClass =
    cardData.bgPattern && cardData.bgPattern !== "none"
      ? `bg-pattern-${cardData.bgPattern}`
      : "";

  // Scale logic for mobile matching
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // 500px is the "base" standard size (approx editor size)
      // If screen is smaller (e.g. 350px), we scale down: 350/500 = 0.7
      const wrapperWidth = Math.min(window.innerWidth - 32, 500); // 32px padding
      setScale(wrapperWidth / 500);
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="card-viewer">
      {/* 
        Scaling Wrapper: 
        We use a container that is technically 500x500 (or whatever the base design size is),
        and then scale it down using CSS transform to fit the screen. 
        This ensures 1:1 visual fidelity with the editor.
      */}
      <div 
        className="card-scaler-container"
        style={{
          width: 500 * scale,
          height: 500 * scale, // Preserving aspect ratio
          position: 'relative',
          margin: '0 auto',
        }}
      >
      <motion.div
        className={`card-viewer-container ${themeClass} ${patternClass}`}
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
        style={{
          width: 500, // Fixed base size
          height: 500, // Fixed base size
          position: 'absolute',
          top: 0,
          left: 0,
          transformOrigin: 'top left',
          transform: `scale(${scale})`, 
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {cardData.elements.map((el, idx) => (
          <motion.div
            key={el.id || idx}
            style={{
              position: "absolute",
              left: `${el.x}%`,
              top: `${el.y}%`,
              zIndex: el.zIndex || 2,
              transform: `rotate(${el.rotation || 0}deg)`,
              opacity: el.opacity ?? 1,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: el.opacity ?? 1, scale: 1 }}
            transition={{
              delay: 0.2 + idx * 0.08,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {el.type === "sticker" && (
              <div className="card-svg-element">
                <StickerRenderer
                  stickerId={el.content}
                  size={el.fontSize || 48}
                  color={el.stickerColor || "#e8477e"}
                />
              </div>
            )}
            {el.type === "text" && (
              <div
                style={{
                  fontSize: `${el.fontSize || 22}px`,
                  color: el.fontColor || "#e8477e",
                  fontWeight: el.fontWeight || 600,
                  fontStyle: el.fontStyle || "normal",
                  fontFamily: getFontCss(el.fontFamily),
                  textAlign:
                    (el.textAlign as "left" | "center" | "right") || "center",
                  whiteSpace: "nowrap",
                  background: "rgba(255,255,255,0.45)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                {el.content}
              </div>
            )}
            {el.type === "image" && (
              <img
                src={el.content}
                alt="Custom"
                style={{
                  maxWidth: 120,
                  borderRadius:
                    el.shape === "circle"
                      ? "50%"
                      : el.shape === "pill"
                        ? "999px"
                        : "8px",
                  aspectRatio: el.shape === "circle" ? "1/1" : "auto",
                  objectFit: "cover",
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main message - Below card */}
      {cardData.mainMessage && (
        <motion.div
          style={{
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "90%",
            width: "100%",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p
            style={{
              fontFamily: getFontCss(cardData.mainMessageFont),
              fontSize: "1.4rem",
              fontWeight: 600,
              color: cardData.mainMessageColor || "#e8477e",
              lineHeight: 1.6,
              wordBreak: "break-word",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              padding: "16px 24px",
              borderRadius: "16px",
              border: `1px solid ${cardData.mainMessageColor || "#e8477e"}33`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {cardData.mainMessage}
          </p>
        </motion.div>
      )}

      <motion.div
        className="card-viewer-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>
          {t("card.madeWith")}{" "}
          <Heart size={14} fill="var(--primary)" color="var(--primary)" /> VDay
          Card
        </p>
        <Link
          href="/create"
          className="hero-cta"
          style={{ display: "inline-flex", marginTop: 16 }}
        >
          {t("card.createOwn")}
        </Link>
      </motion.div>
    </div>
  );
}
