"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef } from "react";
import StickerRenderer from "@/components/ValentineStickers";

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div
          className="gradient-blob blob-pink"
          style={{ width: 500, height: 500, top: "5%", left: "-5%" }}
        />
        <div
          className="gradient-blob blob-lavender"
          style={{ width: 400, height: 400, bottom: "10%", right: "-8%" }}
        />
        <div
          className="gradient-blob blob-gold"
          style={{
            width: 300,
            height: 300,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <motion.div
          className="hero-content"
          initial="initial"
          animate="animate"
          variants={stagger}
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div
            className="hero-badge"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            💌 Valentine&apos;s Day 2026
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("home.heroTitle1")}{" "}
            <span className="script-text">{t("home.heroTitle2")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("home.heroSubtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/create" className="hero-cta">
              CREATE NOW
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stickers */}
        <motion.div
          className="hero-sticker"
          style={{ top: "15%", left: "6%" }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="rose" size={72} />
        </motion.div>

        <motion.div
          className="hero-sticker"
          style={{ bottom: "22%", right: "5%" }}
          animate={{ y: [0, 14, 0], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="love-letter" size={64} />
        </motion.div>

        <motion.div
          className="hero-sticker"
          style={{ top: "22%", right: "10%" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="heart-sparkle" size={56} />
        </motion.div>

        <motion.div
          className="hero-sticker"
          style={{ bottom: "30%", left: "10%" }}
          animate={{ y: [0, 12, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="butterfly" size={52} />
        </motion.div>

        <motion.div
          className="hero-sticker"
          style={{ top: "55%", right: "18%" }}
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickerRenderer stickerId="sparkle-star" size={40} />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">{t("home.aboutTitle")}</h2>
          <div className="about-card">
            <p>{t("home.aboutDesc")}</p>
          </div>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="section" style={{ position: "relative" }}>
        <div
          className="gradient-blob blob-pink"
          style={{ width: 400, height: 400, top: "-10%", right: "-10%" }}
        />
        <div
          className="gradient-blob blob-rose"
          style={{ width: 300, height: 300, bottom: "-5%", left: "-5%" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{t("home.stepsTitle")}</h2>
        </motion.div>

        <div className="steps-grid">
          {[
            {
              num: 1,
              sticker: "gift-box",
              title: t("home.step1Title"),
              desc: t("home.step1Desc"),
            },
            {
              num: 2,
              sticker: "love-letter",
              title: t("home.step2Title"),
              desc: t("home.step2Desc"),
            },
            {
              num: 3,
              sticker: "champagne",
              title: t("home.step3Title"),
              desc: t("home.step3Desc"),
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              className="step-card"
              initial={{ opacity: 0, y: 50, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -10, rotateX: 2 }}
            >
              <div className="step-number">{step.num}</div>
              <div className="step-icon">
                <StickerRenderer stickerId={step.sticker} size={56} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
