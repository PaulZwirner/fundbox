"use client";

import { Palette } from "lucide-react";
import { useAccentColor, AccentColor } from "@/contexts/AccentColorContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import GlassSurface from "@/components/GlassSurface";

const colorOptions: { value: AccentColor; label: string; hex: string }[] = [
  { value: "B74F6F", label: "B74F6F", hex: "#b74f6f" },
  { value: "8F95D3", label: "8F95D3", hex: "#8f95d3" },
  { value: "232E21", label: "232E21", hex: "#232e21" },
  { value: "6200B3", label: "6200B3", hex: "#6200b3" },
  { value: "3B0086", label: "3B0086", hex: "#3b0086" },
  { value: "E8871E", label: "E8871E", hex: "#e8871e" },
  { value: "50723C", label: "50723C", hex: "#50723c" },
];

const AccentColorDropdown = () => {
  const { accentColor, setAccentColor } = useAccentColor();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const selectedColor = colorOptions.find((opt) => opt.value === accentColor);

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
        aria-label="Change accent color"
      >
        <Palette className="h-4 w-4" />
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full border border-foreground/30"
            style={{ backgroundColor: selectedColor?.hex }}
          />
          <span className="hidden sm:inline">{selectedColor?.label}</span>
        </div>
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
              {colorOptions.map((option) => {
                const isSelected = accentColor === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setAccentColor(option.value);
                      setIsOpen(false);
                      setIsHovered(false);
                    }}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-3 text-left w-full hover:scale-[1.02] hover:-translate-y-0.5",
                      isSelected
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <div
                      className="h-4 w-4 rounded-full border border-foreground/30 flex-shrink-0"
                      style={{ backgroundColor: option.hex }}
                    />
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

export default AccentColorDropdown;

