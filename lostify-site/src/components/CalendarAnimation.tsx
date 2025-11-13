"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { CalendarCheck, Camera, MessageSquare } from "lucide-react";

export default function CalendarAnimation() {
  const [stage, setStage] = useState<"initial" | "moving" | "completed">("initial");
  const [highlightDay, setHighlightDay] = useState(false);

  useEffect(() => {
    // Start moving animation after delay
    const moveTimer = setTimeout(() => {
      setStage("moving");
    }, 800);

    // Complete animation and highlight day
    const completeTimer = setTimeout(() => {
      setStage("completed");
      setHighlightDay(true);
    }, 2500);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const calendarDays = Array.from({ length: 7 }, (_, i) => i + 1);
  const selectedDay = 15;

  return (
    <div className="relative flex items-center justify-center min-h-[240px] w-full py-6">
      {/* Calendar container */}
      <motion.div
        className="relative w-full max-w-[340px] h-72 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg p-5 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              January 2024
            </h3>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={i}
              className="text-xs text-foreground/50 text-center font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => (
            <motion.div
              key={day}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
                highlightDay && day === selectedDay
                  ? "bg-primary text-white shadow-lg border-2 border-primary"
                  : day === selectedDay
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/40 text-foreground/60"
              }`}
              animate={
                highlightDay && day === selectedDay
                  ? {
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(183,79,111,0)",
                        "0 0 0 8px rgba(183,79,111,0.3)",
                        "0 0 0 0 rgba(183,79,111,0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo element with message */}
      <AnimatePresence>
        {stage !== "completed" && (
          <motion.div
            className="absolute z-30 flex items-center gap-3"
            initial={{
              x: -120,
              y: 0,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: stage === "moving" ? 140 : -120,
              y: stage === "moving" ? 60 : 0,
              opacity: 1,
              scale: stage === "moving" ? 0.9 : 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              x: {
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              y: {
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              opacity: {
                duration: 0.5,
                ease: "easeOut",
              },
              scale: {
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            {/* Photo */}
            <motion.div
              className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/60 to-primary/40 border-2 border-white/40 shadow-xl z-20"
              animate={{
                rotate: stage === "moving" ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            {/* Text message */}
            <motion.div
              className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg flex items-center gap-2 whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Schedule Pickup</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl -z-10"
        animate={{
          opacity: highlightDay ? [0.3, 0.5, 0.3] : 0.2,
          scale: highlightDay ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: highlightDay ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
