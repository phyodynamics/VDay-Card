import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

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

          {/* Text Pointer */}
          <motion.div
            className="guide-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            key={currentStep}
            style={{
              position: "fixed",
              // Responsive positioning logic would be better moved to a calculated state,
              // but for now let's place it intelligently based on available space if possible.
              // Mobile check:
              top:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? highlightRect
                    ? highlightRect.bottom + 20
                    : "50%"
                  : highlightRect
                    ? highlightRect.top + highlightRect.height / 2 - 20
                    : "50%",
              left:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "50%"
                  : highlightRect
                    ? highlightRect.right + 20
                    : "50%",
              transform:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "translateX(-50%)"
                  : "none",
              zIndex: 10000,
              pointerEvents: "none", // Allow clicking through if needed, but we have overlay
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexDirection:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "column"
                    : "row",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  fontFamily: "monospace",
                  transform:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "rotate(90deg)"
                      : "none",
                  display: "inline-block",
                }}
              >
                --- &gt;
              </span>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  maxWidth: "280px",
                  pointerEvents: "auto",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  {t(step.messageKey)}
                </p>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={handleFinish}
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "0.8rem",
                      color: "#999",
                      cursor: "pointer",
                      pointerEvents: "auto",
                    }}
                  >
                    {t("guide.skip")}
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      border: "none",
                      background: "var(--primary)",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      pointerEvents: "auto",
                    }}
                  >
                    {isLast ? t("guide.finish") : t("guide.next")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
