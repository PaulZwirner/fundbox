"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AccentColor = "B74F6F" | "8F95D3" | "232E21" | "6200B3" | "3B0086" | "E8871E" | "50723C";

interface AccentColorContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  colorConfig: ColorConfig;
}

interface ColorConfig {
  primary: string;
  primaryForeground: string;
  accent: string;
  ring: string;
  surfaceGlow: string;
}

const colorConfigs: Record<AccentColor, ColorConfig> = {
  B74F6F: {
    primary: "#b74f6f",
    primaryForeground: "#fdf6f9",
    accent: "rgba(183, 79, 111, 0.14)",
    ring: "rgba(183, 79, 111, 0.38)",
    surfaceGlow: "rgba(183, 79, 111, 0.2)",
  },
  "8F95D3": {
    primary: "#8f95d3",
    primaryForeground: "#f5f5fa",
    accent: "rgba(143, 149, 211, 0.14)",
    ring: "rgba(143, 149, 211, 0.38)",
    surfaceGlow: "rgba(143, 149, 211, 0.2)",
  },
  "232E21": {
    primary: "#232e21",
    primaryForeground: "#f0f2ef",
    accent: "rgba(35, 46, 33, 0.14)",
    ring: "rgba(35, 46, 33, 0.38)",
    surfaceGlow: "rgba(35, 46, 33, 0.2)",
  },
  "6200B3": {
    primary: "#6200b3",
    primaryForeground: "#f5f0ff",
    accent: "rgba(98, 0, 179, 0.14)",
    ring: "rgba(98, 0, 179, 0.38)",
    surfaceGlow: "rgba(98, 0, 179, 0.2)",
  },
  "3B0086": {
    primary: "#3b0086",
    primaryForeground: "#f0e8ff",
    accent: "rgba(59, 0, 134, 0.14)",
    ring: "rgba(59, 0, 134, 0.38)",
    surfaceGlow: "rgba(59, 0, 134, 0.2)",
  },
  "E8871E": {
    primary: "#e8871e",
    primaryForeground: "#fff8f0",
    accent: "rgba(232, 135, 30, 0.14)",
    ring: "rgba(232, 135, 30, 0.38)",
    surfaceGlow: "rgba(232, 135, 30, 0.2)",
  },
  "50723C": {
    primary: "#50723c",
    primaryForeground: "#f0f5ed",
    accent: "rgba(80, 114, 60, 0.14)",
    ring: "rgba(80, 114, 60, 0.38)",
    surfaceGlow: "rgba(80, 114, 60, 0.2)",
  },
};

const AccentColorContext = createContext<AccentColorContextType | undefined>(undefined);

export function AccentColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColorState] = useState<AccentColor>("B74F6F");

  useEffect(() => {
    // Load accent color from localStorage on mount
    const savedColor = localStorage.getItem("accentColor") as AccentColor;
    const validColors: AccentColor[] = ["B74F6F", "8F95D3", "232E21", "6200B3", "3B0086", "E8871E", "50723C"];
    if (savedColor && validColors.includes(savedColor)) {
      setAccentColorState(savedColor);
    }
  }, []);

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem("accentColor", color);
  };

  const colorConfig = colorConfigs[accentColor];

  // Update CSS variables when accent color changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", colorConfig.primary);
    root.style.setProperty("--primary-foreground", colorConfig.primaryForeground);
    root.style.setProperty("--accent", colorConfig.accent);
    root.style.setProperty("--ring", colorConfig.ring);
    root.style.setProperty("--surface-glow", colorConfig.surfaceGlow);
  }, [colorConfig]);

  // Update ::selection pseudo-element
  useEffect(() => {
    let styleElement = document.getElementById("accent-color-selection-style") as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "accent-color-selection-style";
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      ::selection {
        background: ${colorConfig.primary}99;
        color: var(--background);
      }
    `;
  }, [colorConfig]);

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor, colorConfig }}>
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const context = useContext(AccentColorContext);
  if (context === undefined) {
    throw new Error("useAccentColor must be used within an AccentColorProvider");
  }
  return context;
}

