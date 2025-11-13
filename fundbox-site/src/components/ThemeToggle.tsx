"use client";

import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

const storageKey = "fundbox-theme";

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
        className={cn("h-9 w-16 rounded-full border border-border/40 bg-foreground/10", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "group relative flex h-9 w-16 items-center justify-between rounded-full border border-border/60 bg-black/30 px-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 shadow-[0_12px_34px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all hover:border-primary/60 hover:text-foreground hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] md:h-10 md:w-20",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className={cn("h-4 w-4 transition-opacity", isDark ? "opacity-40" : "opacity-100")} />
      <MoonStar className={cn("h-4 w-4 transition-opacity", isDark ? "opacity-100" : "opacity-40")} />
      <motion.span
        layout
        className="absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-primary/70"
        style={{
          boxShadow: '0 10px 24px -18px var(--ring)',
        }}
        animate={{ x: isDark ? 36 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {isDark ? <MoonStar className="h-4 w-4 text-white" /> : <Sun className="h-4 w-4 text-white" />}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;

