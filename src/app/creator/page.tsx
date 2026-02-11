"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import StickerRenderer from "@/components/ValentineStickers";

export default function CreatorPage() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/phyodynamic",
      className: "telegram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/phyodynamic",
      className: "facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Website",
      url: "https://phyodynamic.com",
      className: "website",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero creator-hero" style={{ position: "relative" }}>
        {/* Blobs */}
        <div
          className="gradient-blob blob-pink"
          style={{ width: 400, height: 400, top: "10%", left: "-5%" }}
        />
        <div
          className="gradient-blob blob-lavender"
          style={{ width: 350, height: 350, bottom: "10%", right: "-5%" }}
        />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: 8,
              fontSize: "1rem",
            }}
          >
            {t("creator.heroSubtitle")}
          </p>
          <h1>
            Meet <span className="italic-accent">the Creator</span>
          </h1>
        </motion.div>

        {/* Floating stickers */}
        <motion.div
          className="hero-sticker"
          style={{ top: "20%", left: "8%" }}
          animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="heart-sparkle" size={50} />
        </motion.div>
        <motion.div
          className="hero-sticker"
          style={{ bottom: "20%", right: "8%" }}
          animate={{ y: [0, 12, 0], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="sparkle-star" size={44} />
        </motion.div>
      </section>

      {/* Creator Profile Card */}
      <section className="section" style={{ paddingTop: 0 }}>
        <motion.div
          className="creator-profile-card"
          initial={{ opacity: 0, y: 40, rotateX: -5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80 }}
          style={{ perspective: 1000 }}
        >
          <div className="creator-photo-wrapper">
            <motion.img
              src="https://i.imghippo.com/files/owpj7146YU.jpeg"
              alt="Phyo Zin Ko"
              className="creator-photo"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </div>

          <h2 className="creator-name">Phyo Zin Ko</h2>
          <p className="creator-role">{t("creator.role")}</p>
          <p className="creator-bio">{t("creator.heroSubtitle")}</p>

          <div className="social-links">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${link.className}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.3 }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
