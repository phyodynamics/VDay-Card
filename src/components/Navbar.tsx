"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, X, Menu, Globe, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/creator", label: t("nav.creator") },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-heart">
            <Heart size={18} fill="currentColor" />
          </span>
          <span className="logo-text">VDay Card</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  className="nav-link-indicator"
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="navbar-right">
          <button
            className="nav-lang-btn"
            onClick={toggleLang}
            title="Switch language"
          >
            <Globe size={16} />
            <span>{lang === "my" ? "EN" : "MY"}</span>
          </button>
          <Link href="/create" className="nav-cta-btn">
            <Plus size={16} />
            <span>{t("nav.create")}</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <button
                className="mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              {/* Mobile Logo */}
              <div className="mobile-header">
                <Heart size={24} fill="var(--primary)" color="var(--primary)" />
                <span className="mobile-brand">VDay Card</span>
              </div>

              {/* Mobile Links */}
              <div className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={`mobile-link ${pathname === link.href ? "mobile-link-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mobile-actions">
                <motion.button
                  className="mobile-lang-btn"
                  onClick={() => {
                    toggleLang();
                    setMobileOpen(false);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Globe size={18} />
                  {lang === "my" ? "Switch to English" : "မြန်မာဘာသာ"}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="/create"
                    className="mobile-cta"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Plus size={18} />
                    {t("nav.create")}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
