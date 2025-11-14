"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type FontFamily = "Inter" | "Poppins" | "Space Grotesk";

interface FontContextType {
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
  fontVariable: string;
}

const fontVariables: Record<FontFamily, string> = {
  Inter: "var(--font-inter)",
  "Poppins": "var(--font-poppins)",
  "Space Grotesk": "var(--font-space-grotesk)",
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  // Always initialize to "Inter" to match server-side rendering
  // This prevents hydration mismatches
  const [fontFamily, setFontFamilyState] = useState<FontFamily>("Inter");

  // Load font from localStorage after mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFont = localStorage.getItem("fontFamily") as FontFamily;
      const validFonts: FontFamily[] = ["Inter", "Poppins", "Space Grotesk"];
      if (savedFont && validFonts.includes(savedFont)) {
        setFontFamilyState(savedFont);
      }
    }
  }, []);

  const setFontFamily = (font: FontFamily) => {
    setFontFamilyState(font);
    if (typeof window !== "undefined") {
      localStorage.setItem("fontFamily", font);
    }
  };

  const fontVariable = fontVariables[fontFamily];

  // Update CSS variable and apply font globally when font changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    
    // Update the CSS variable
    root.style.setProperty("--font-sans", fontVariable);
    
    // Create or update a style element to apply font globally
    let styleElement = document.getElementById("font-family-style") as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "font-family-style";
      document.head.appendChild(styleElement);
    }
    
    // Apply font to body and all elements except those with font-orbitron class
    // Use a more specific selector to avoid conflicts
    styleElement.textContent = `
      body,
      body *:not(.font-orbitron):not([class*="font-orbitron"]) {
        font-family: ${fontVariable} !important;
      }
    `;
  }, [fontVariable]);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily, fontVariable }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}

