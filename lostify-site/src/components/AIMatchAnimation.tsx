"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Camera } from "lucide-react";

export default function PhotoMessageAnimation() {
  const [typingFinished, setTypingFinished] = useState(false);
  const [merge, setMerge] = useState(false);

  useEffect(() => {
    const typingTimer = setTimeout(() => setTypingFinished(true), 2000); // Simulate typing duration
    const mergeTimer = setTimeout(() => setMerge(true), 3000); // Merge after typing finishes

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(mergeTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[200px] w-full">
      <motion.div
        className="relative w-full max-w-[320px] h-40 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg p-6 flex items-center justify-between overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Photo Icon */}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl"
          initial={{ x: -50, opacity: 0, scale: 0.8 }}
          animate={
            merge
              ? { x: 0, scale: 0.5, opacity: 0 } // Move to center and shrink
              : { x: 0, scale: 1, opacity: 1 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: merge ? 0.8 : 0.6,
          }}
        >
          {!merge && <Camera className="w-7 h-7 text-white" />}
        </motion.div>

        {/* Text Bubble */}
        <motion.div
          className="flex-1 ml-4 max-w-[60%] rounded-xl bg-white/40 backdrop-blur-md px-4 py-2 shadow-md relative"
          initial={{ x: 50, opacity: 0, scale: 0.8 }}
          animate={
            merge
              ? { x: 0, scale: 0.5, opacity: 0 }
              : { x: 0, scale: 1, opacity: 1 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: merge ? 0.8 : 0.6,
          }}
        >
          {!merge && (
            <motion.div
              className="h-4 w-24 bg-white/60 rounded-full animate-pulse"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Checkmark */}
        <AnimatePresence>
          {merge && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl -z-10"
        animate={{
          opacity: merge ? [0.3, 0.6, 0.3] : 0.2,
          scale: merge ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 3, repeat: merge ? Infinity : 0, ease: "easeInOut" }}
      />
    </div>
  );
}