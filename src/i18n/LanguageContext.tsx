"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { translations, Lang } from "./translations";

type NestedValue = { my: string; en: string } | { [key: string]: NestedValue };

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("my");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "my" ? "en" : "my"));
  }, []);

  const t = useCallback(
    (path: string): string => {
      const keys = path.split(".");
      let current: NestedValue = translations as unknown as NestedValue;
      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = (current as Record<string, NestedValue>)[key];
        } else {
          return path;
        }
      }
      if (current && typeof current === "object" && lang in current) {
        return (current as { my: string; en: string })[lang];
      }
      return path;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
