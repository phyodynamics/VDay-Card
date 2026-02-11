"use client";

import { ReactNode, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";

function LayoutInner({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.setAttribute("data-lang", lang);
  }, [lang]);

  return (
    <div>
      <FloatingHearts />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutInner>{children}</LayoutInner>
    </LanguageProvider>
  );
}
