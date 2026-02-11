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
              onClick={() => {
                const link = document.createElement("a");
                link.href = qrDataUrl;
                link.download = "vday-card-qr.png";
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
