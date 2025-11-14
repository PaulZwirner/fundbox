"use client";

import { Type } from "lucide-react";
import { useFont, FontFamily } from "@/contexts/FontContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import GlassSurface from "@/components/GlassSurface";

const fontOptions: { value: FontFamily; label: string }[] = [
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Space Grotesk", label: "Space Grotesk" },
];

const FontDropdown = () => {
  const { fontFamily, setFontFamily } = useFont();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const selectedFont = fontOptions.find((opt) => opt.value === fontFamily);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all hover:border-primary/40 hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg",
          isOpen && "bg-primary/10 border-primary/40 text-primary"
        )}
        aria-label="Change font"
        style={{ 
          fontFamily: fontFamily === "Inter" ? "var(--font-inter)" : fontFamily === "Poppins" ? "var(--font-poppins)" : "var(--font-space-grotesk)" 
        }}
      >
        <Type className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedFont?.label}</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {(isOpen || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 min-w-[180px] z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsOpen(false);
            }}
          >
            <GlassSurface
              variant="card"
              className="w-full rounded-2xl px-2 py-2"
              innerClassName="flex flex-col gap-1"
            >
              {fontOptions.map((option) => {
                const isSelected = fontFamily === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFontFamily(option.value);
                      setIsOpen(false);
                      setIsHovered(false);
                    }}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-3 text-left w-full hover:scale-[1.02] hover:-translate-y-0.5",
                      isSelected
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                    style={{ fontFamily: option.value === "Inter" ? "var(--font-inter)" : option.value === "Poppins" ? "var(--font-poppins)" : "var(--font-space-grotesk)" }}
                  >
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FontDropdown;

