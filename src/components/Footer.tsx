"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <p>{t("footer.text")}</p>
      <p style={{ marginTop: "8px", fontSize: "0.8rem" }}>
        {t("footer.copyright")}
      </p>
    </footer>
  );
}
