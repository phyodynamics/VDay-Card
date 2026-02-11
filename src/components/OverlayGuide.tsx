"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronRight, X } from "lucide-react";

interface GuideStep {
  targetSelector: string;
  messageKey: string;
  icon: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    targetSelector: ".sidebar-section-themes",
    messageKey: "guide.step1",
    icon: "🎨",
  },
  {
    targetSelector: ".sidebar-section-elements",
    messageKey: "guide.step2",
    icon: "✨",
  },
  {
    targetSelector: ".sidebar-section-text",
    messageKey: "guide.step3",
    icon: "✍️",
  },
  {
    targetSelector: ".sidebar-section-upload",
    messageKey: "guide.step4",
    icon: "📷",
  },
  {
    targetSelector: ".generate-section",
    messageKey: "guide.step5",
    icon: "🔗",
  },
];

export default function OverlayGuide() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("vday-guide-seen");
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateHighlight = useCallback(() => {
    if (!show) return;
    const step = GUIDE_STEPS[currentStep];
    if (!step) return;
    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setHighlightRect(rect);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep, show]);

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [updateHighlight]);

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
          {/* Dark overlay with cutout */}
          <motion.div
            className="guide-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFinish}
          />

          {/* Highlight ring around target */}
          {highlightRect && (
            <motion.div
              className="guide-highlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                top: highlightRect.top - 6,
                left: highlightRect.left - 6,
                width: highlightRect.width + 12,
                height: highlightRect.height + 12,
              }}
              layoutId="guide-highlight"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Bottom tooltip card */}
          <motion.div
            className="guide-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            key={currentStep}
          >
            {/* Close button */}
            <button className="guide-close" onClick={handleFinish}>
              <X size={16} />
            </button>

            {/* Progress dots */}
            <div className="guide-progress">
              {GUIDE_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`guide-dot ${i === currentStep ? "guide-dot-active" : ""} ${i < currentStep ? "guide-dot-done" : ""}`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="guide-content">
              <span className="guide-icon">{step.icon}</span>
              <p className="guide-message">{t(step.messageKey)}</p>
            </div>

            {/* Actions */}
            <div className="guide-actions">
              <button className="guide-skip-btn" onClick={handleFinish}>
                {t("guide.skip")}
              </button>
              <button className="guide-next-btn" onClick={handleNext}>
                {isLast ? t("guide.finish") : t("guide.next")}
                {!isLast && <ChevronRight size={16} />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
