"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface GuideStep {
  targetSelector: string;
  position: "top" | "bottom" | "left" | "right";
  messageKey: string;
  arrowDir: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    targetSelector: ".sidebar-section-themes",
    position: "right",
    messageKey: "guide.step1",
    arrowDir: "←",
  },
  {
    targetSelector: ".sidebar-section-elements",
    position: "right",
    messageKey: "guide.step2",
    arrowDir: "←",
  },
  {
    targetSelector: ".sidebar-section-text",
    position: "right",
    messageKey: "guide.step3",
    arrowDir: "←",
  },
  {
    targetSelector: ".sidebar-section-upload",
    position: "right",
    messageKey: "guide.step4",
    arrowDir: "←",
  },
  {
    targetSelector: ".generate-section",
    position: "top",
    messageKey: "guide.step5",
    arrowDir: "↓",
  },
];

export default function OverlayGuide() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("vday-guide-seen");
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const step = GUIDE_STEPS[currentStep];
    if (!step) return;

    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      const style: React.CSSProperties = {};

      switch (step.position) {
        case "right":
          style.top = rect.top + rect.height / 2 - 50;
          style.left = rect.right + 20;
          break;
        case "top":
          style.top = rect.top - 120;
          style.left = rect.left + rect.width / 2 - 150;
          break;
        case "bottom":
          style.top = rect.bottom + 20;
          style.left = rect.left + rect.width / 2 - 150;
          break;
        case "left":
          style.top = rect.top + rect.height / 2 - 50;
          style.right = window.innerWidth - rect.left + 20;
          break;
      }
      setTooltipStyle(style);
    }
  }, [currentStep, show]);

  const handleNext = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setShow(false);
    localStorage.setItem("vday-guide-seen", "true");
  };

  if (!show) return null;

  const step = GUIDE_STEPS[currentStep];
  const isLast = currentStep === GUIDE_STEPS.length - 1;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFinish}
          />
          <motion.div
            className="guide-tooltip"
            style={tooltipStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            key={currentStep}
          >
            <div className="guide-arrow">{step.arrowDir}</div>
            <p>{t(step.messageKey)}</p>
            <div className="guide-buttons">
              <button
                className="guide-btn guide-btn-skip"
                onClick={handleFinish}
              >
                {t("guide.skip")}
              </button>
              <button className="guide-btn guide-btn-next" onClick={handleNext}>
                {isLast ? t("guide.finish") : t("guide.next")}
              </button>
            </div>
            <div style={{ fontSize: "0.75rem", marginTop: 8, opacity: 0.7 }}>
              {currentStep + 1} / {GUIDE_STEPS.length}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
