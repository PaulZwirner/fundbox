"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

const storageKey = "fundbox-theme";

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    const root = document.documentElement;
    const isBrowser = typeof window !== "undefined";
    const stored = isBrowser ? window.localStorage.getItem(storageKey) : null;
    const prefersDark = isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialIsDark =
      stored === "dark" || (!stored && (root.classList.contains("dark") || prefersDark));

    root.classList.toggle("dark", initialIsDark);
    document.body.classList.toggle("dark", initialIsDark);

    const frame = requestAnimationFrame(() => {
      setIsDark(initialIsDark);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;

      root.classList.toggle("dark", next);
      document.body.classList.toggle("dark", next);

      window.localStorage.setItem(storageKey, next ? "dark" : "light");

      return next;
    });
  };

  if (!mounted) {
    return (
      <div
        className={cn("h-9 w-9 rounded-full border border-foreground/20", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center h-9 w-9 rounded-full border border-foreground/20 transition-all hover:border-primary/40 hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon className="h-4 w-4 fill-current" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;

