"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all hover:border-primary/40 hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg",
        language === "de" && "bg-primary/10 border-primary/40 text-primary"
      )}
      aria-label={`Switch to ${language === "en" ? "German" : "English"}`}
    >
      <Languages className="h-4 w-4" />
      <span>{language === "en" ? "EN" : "DE"}</span>
    </button>
  );
};

export default LanguageToggle;

