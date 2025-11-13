"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

export default function UploadAnimation() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsUploading(true);
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);

      return () => clearInterval(progressInterval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[200px] w-full py-4">
      {/* Card Container */}
      <motion.div
        className="relative w-full max-w-[280px] h-48 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Photo that uploads behind the card */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/30"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={
            isUploading
              ? {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }
              : {
                  scale: 0.8,
                  opacity: 0,
                  y: 20,
                }
          }
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // Custom easing for smooth feel
          }}
        >
          {/* Simulated photo content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary/40 to-secondary/40 border-2 border-white/40 shadow-inner" />
          </div>
        </motion.div>

        {/* Card overlay content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Camera className="h-8 w-8 text-primary mb-3" />
          </motion.div>

          {/* Upload progress indicator */}
          {isUploading && (
            <motion.div
              className="w-full mt-4 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-foreground/60 text-center">
                {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Uploaded!"}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl -z-10"
        animate={{
          opacity: isUploading ? [0.3, 0.6, 0.3] : 0.2,
          scale: isUploading ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

