"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Check, Camera } from "lucide-react";

export default function PhotoMessageAnimation() {
  const [showText, setShowText] = useState(false);
  const [cardPulled, setCardPulled] = useState(false);
  const [merging, setMerging] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const textTimer = setTimeout(() => setShowText(true), 800);
    const pullTimer = setTimeout(() => setCardPulled(true), 2500);
    const mergeTimer = setTimeout(() => setMerging(true), 3500);
    const checkTimer = setTimeout(() => setShowCheckmark(true), 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(pullTimer);
      clearTimeout(mergeTimer);
      clearTimeout(checkTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[200px] w-full">
      <motion.div
        className="relative w-full max-w-[320px] h-40 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg p-6 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Stack on the Left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          {[0, 1, 2].map((index) => (
            <div
              key={`stack-${index}`}
              className="absolute w-12 h-16 rounded-lg bg-gradient-to-br from-primary/40 to-secondary/40 border border-white/30 shadow-lg"
              style={{
                left: index * 3,
                top: index * 2,
                zIndex: 3 - index,
              }}
            />
          ))}
          
          {/* Main card */}
          <AnimatePresence>
            {!showCheckmark && (
              <motion.div
                className="relative w-12 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary border border-white/30 shadow-xl flex items-center justify-center z-10"
                initial={{ x: 0, opacity: 1 }}
                animate={
                  merging
                    ? { 
                        x: 80, 
                        y: 0,
                        scale: [1, 1.2, 0.9],
                        borderRadius: ["0.5rem", "50%", "50%"],
                        opacity: [1, 0.9, 0]
                      }
                    : cardPulled
                    ? { x: 80, opacity: 1 }
                    : { x: 0, opacity: 1 }
                }
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: merging ? 0.8 : 0.8, 
                  ease: merging ? [0.34, 1.56, 0.64, 1] : "easeInOut" 
                }}
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Message Bubble */}
        <AnimatePresence>
          {showText && !showCheckmark && (
            <motion.div
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-xl bg-white/40 backdrop-blur-md px-4 py-2 shadow-md z-10"
              initial={{ x: 0, opacity: 1 }}
              animate={
                merging
                  ? { 
                      x: -80, 
                      y: 0,
                      scale: [1, 1.2, 0.9],
                      borderRadius: ["0.75rem", "50%", "50%"],
                      opacity: [1, 0.9, 0]
                    }
                  : cardPulled
                  ? { x: -80, opacity: 1 }
                  : { x: 0, opacity: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{ 
                duration: merging ? 0.8 : 0.8, 
                ease: merging ? [0.34, 1.56, 0.64, 1] : "easeInOut" 
              }}
            >
              <div className="h-4 w-20 bg-white/60 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Merged Card - forms from the liquid merge, then becomes checkmark */}
        <AnimatePresence>
          {merging && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary border border-white/30 shadow-xl flex items-center justify-center z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 0.8, 1, 1],
                opacity: [0, 0.6, 1, 1]
              }}
              transition={{ 
                duration: 1,
                times: [0, 0.4, 0.7, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <AnimatePresence mode="wait">
                {showCheckmark ? (
                  <motion.div
                    key="checkmark"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
