"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import QRCode from "qrcode";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  Heart,
  Download,
} from "lucide-react";

export default function SharePage() {
  const { t } = useLanguage();
  const params = useParams();
  const cardId = params.id as string;
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [cardUrl, setCardUrl] = useState("");

  useEffect(() => {
    setCardUrl(`${window.location.origin}/card/${cardId}`);
  }, [cardId]);

  useEffect(() => {
    if (!cardUrl) return;
    QRCode.toDataURL(cardUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#e8477e", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl);
  }, [cardUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="share-page">
      {/* Decorative blobs */}
      <div
        className="gradient-blob blob-pink"
        style={{ width: 500, height: 500, top: "-10%", left: "-10%" }}
      />
      <div
        className="gradient-blob blob-lavender"
        style={{ width: 400, height: 400, bottom: "-5%", right: "-10%" }}
      />
      <div
        className="gradient-blob blob-gold"
        style={{ width: 300, height: 300, top: "40%", right: "20%" }}
      />

      <motion.div
        className="share-page-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Success header */}
        <motion.div
          className="share-success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <Heart size={32} fill="white" />
        </motion.div>

        <motion.h1
          className="share-page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("share.title")}
        </motion.h1>

        <motion.p
          className="share-page-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("share.subtitle")}
        </motion.p>

        {/* QR Code Card */}
        <motion.div
          className="share-qr-card"
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "24px",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(232, 71, 126, 0.15)",
          }}
        >
          <div
            className="share-qr-wrapper"
            style={{
              padding: "16px",
              background: "white",
              borderRadius: "16px",
              marginBottom: "16px",
            }}
          >
            {qrDataUrl && (
              <img src={qrDataUrl} alt="QR Code" className="share-qr-img" />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <p className="share-qr-hint" style={{ marginBottom: 0 }}>
              {t("share.scanHint")}
            </p>
            <button
              onClick={async () => {
                if (!qrDataUrl) return;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                // Set dimensions
                const width = 600;
                const height = 800;
                canvas.width = width;
                canvas.height = height;

                // 1. Background
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, "#fff5f8");
                gradient.addColorStop(1, "#fff0f5");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);

                // 2. Decorative elements
                // Large circle
                ctx.fillStyle = "rgba(232, 71, 126, 0.08)";
                ctx.beginPath();
                ctx.arc(0, 0, 300, 0, Math.PI * 2);
                ctx.fill();

                // Small circle
                ctx.fillStyle = "rgba(120, 120, 255, 0.05)";
                ctx.beginPath();
                ctx.arc(width, height, 250, 0, Math.PI * 2);
                ctx.fill();

                // 3. Header Text
                ctx.textAlign = "center";

                // Main Title
                ctx.fillStyle = "#e8477e"; // var(--primary)
                // Use system font stack as backup
                ctx.font = "bold 48px 'DM Serif Display', serif";
                // Fallback if font not loaded on canvas context appropriately, though browser should handle it if loaded
                ctx.fillText("Valentine's Day Card", width / 2, 130);

                // Subtitle
                ctx.fillStyle = "#666";
                ctx.font = "24px 'Poppins', sans-serif";
                ctx.fillText(t("share.scanHint"), width / 2, 180);

                // 4. QR Code Container (White box with shadow)
                const qrSize = 340;
                const padding = 20;
                const qrX = (width - (qrSize + padding * 2)) / 2;
                const qrY = (height - (qrSize + padding * 2)) / 2 + 20;

                ctx.save();
                ctx.shadowColor = "rgba(232, 71, 126, 0.2)";
                ctx.shadowBlur = 40;
                ctx.shadowOffsetY = 20;

                ctx.fillStyle = "white";
                // Helper for round rect
                const roundRect = (
                  x: number,
                  y: number,
                  w: number,
                  h: number,
                  r: number,
                ) => {
                  ctx.beginPath();
                  ctx.moveTo(x + r, y);
                  ctx.lineTo(x + w - r, y);
                  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                  ctx.lineTo(x + w, y + h - r);
                  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                  ctx.lineTo(x + r, y + h);
                  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                  ctx.lineTo(x, y + r);
                  ctx.quadraticCurveTo(x, y, x + r, y);
                  ctx.closePath();
                  ctx.fill();
                };

                roundRect(
                  qrX,
                  qrY,
                  qrSize + padding * 2,
                  qrSize + padding * 2,
                  32,
                );
                ctx.restore();

                // 5. Draw QR Code Image
                const qrImg = new Image();
                qrImg.src = qrDataUrl;
                // crossOrigin might be needed if base64? base64 is fine.
                await new Promise<void>((resolve) => {
                  qrImg.onload = () => resolve();
                });

                // Draw QR centered in white box
                ctx.drawImage(
                  qrImg,
                  qrX + padding,
                  qrY + padding,
                  qrSize,
                  qrSize,
                );

                // 6. Branding / Footer
                ctx.fillStyle = "#333";
                ctx.font = "bold 32px 'DM Serif Display', serif";
                ctx.fillText("VDay Card", width / 2, height - 100);

                ctx.fillStyle = "#888";
                ctx.font = "16px 'Poppins', sans-serif";
                ctx.fillText(
                  "Create your own at " + window.location.host,
                  width / 2,
                  height - 60,
                );

                // 7. Trigger Download
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "vday-card-share.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="share-action-btn"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: "8px",
                background: "var(--primary)",
                color: "white",
                border: "none",
              }}
            >
              <Download size={16} />
              <span>Download QR</span>
            </button>
          </div>
        </motion.div>

        {/* Link section */}
        <motion.div
          className="share-link-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <div className="share-link-box">
            <span className="share-link-text">{cardUrl}</span>
          </div>

          <div className="share-btn-group">
            <button
              className="share-action-btn share-copy-btn"
              onClick={handleCopy}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? t("share.copied") : t("share.copy")}</span>
            </button>

            <a
              href={cardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="share-action-btn share-open-btn"
            >
              <ExternalLink size={18} />
              <span>{t("share.openLink")}</span>
            </a>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.div
          className="share-info-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>{t("editor.longText")}</p>
        </motion.div>

        {/* Back link */}
        <motion.div
          className="share-back-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/create" className="share-back-link">
            <ArrowLeft size={16} />
            {t("share.createAnother")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
