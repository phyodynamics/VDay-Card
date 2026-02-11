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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      updateHighlight();
    };
    
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
            style={{
               position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998
            }}
          />

          {/* Highlight ring around target */}
          {highlightRect && (
            <motion.div
              className="guide-highlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'fixed',
                top: highlightRect.top - 6,
                left: highlightRect.left - 6,
                width: highlightRect.width + 12,
                height: highlightRect.height + 12,
                border: '2px solid white',
                borderRadius: '8px',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)', // visual cutout effect approach if overlay didn't exist
                zIndex: 9999,
                pointerEvents: "none",
              }}
              layoutId="guide-highlight"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Text Pointer */}
          <motion.div
            className="guide-pointer"
            initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            key={currentStep}
            style={{
              position: "fixed",
              top: isMobile 
                ? (highlightRect ? highlightRect.bottom + 20 : "50%")
                : (highlightRect ? highlightRect.top + highlightRect.height / 2 - 20 : "50%"),
              left: isMobile
                ? "50%"
                : (highlightRect ? highlightRect.right + 20 : "50%"),
              transform: isMobile ? "translateX(-50%)" : "none",
              zIndex: 10000,
              pointerEvents: "none",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: "12px",
            }}
          >
              <div style={{ 
                transform: isMobile ? "rotate(90deg)" : "none",
                color: "white", 
                fontSize: "2rem", 
                fontWeight: "bold", 
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                fontFamily: "monospace",
                lineHeight: 1,
              }}>
                {isMobile ? "➜" : "➜"} {/* Using a standard arrow for clearer direction */}
              </div>
              <div 
                style={{ 
                  background: "white", 
                  padding: "16px 20px", 
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  maxWidth: "280px",
                  pointerEvents: "auto",
                  textAlign: isMobile ? "center" : "left"
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
