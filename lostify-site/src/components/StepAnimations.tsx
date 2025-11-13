"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar, Camera, Image, CheckCircle2 } from "lucide-react";

// Step 1: Upload Animation - Card with photo uploading behind it
export function Step1UploadAnimation() {
  const [phase, setPhase] = React.useState<"initial" | "splitting" | "uploading" | "completed">("initial");
  const [showUploadContent, setShowUploadContent] = React.useState(true);
  const [uploadProgress, setUploadProgress] = React.useState<number[]>([0, 0, 0, 0]);
  const [completedCards, setCompletedCards] = React.useState<boolean[]>([false, false, false, false]);
  const numCards = 4;
  const intervalsRef = React.useRef<NodeJS.Timeout[]>([]);

  React.useEffect(() => {
    // Reset on mount
    setPhase("initial");
    setShowUploadContent(true);
    setUploadProgress([0, 0, 0, 0]);
    setCompletedCards([false, false, false, false]);
    intervalsRef.current = [];

    // Phase 1: Show "Upload" card - hit effect at 1.5s
    // Phase 1.5: Fade out "Upload" content - 2300ms (after hit effect completes)
    const fadeOutTimer = setTimeout(() => {
      setShowUploadContent(false);
    }, 2300);
    
    // Phase 2: Start splitting - 2800ms (after "Upload" content has faded out)
    const hitTimer = setTimeout(() => {
      setPhase("splitting");
    }, 2800);

    // Phase 3: After splitting animation completes - 4800ms (allows full split animation)
    const uploadingTimer = setTimeout(() => {
      setPhase("uploading");
      
      // Start progress for each card with staggered delays
      for (let index = 0; index < numCards; index++) {
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            const newProgress = [...prev];
            if (newProgress[index] < 100) {
              newProgress[index] = Math.min(newProgress[index] + 2, 100);
            } else {
              clearInterval(interval);
              // Mark as completed when progress reaches 100
              setCompletedCards((prev) => {
                const newCompleted = [...prev];
                newCompleted[index] = true;
                return newCompleted;
              });
            }
            return newProgress;
          });
        }, 30 + index * 10); // Staggered speed
        intervalsRef.current.push(interval);
      }
    }, 4800);

    // Phase 4: All cards completed
    const completedTimer = setTimeout(() => {
      setPhase("completed");
    }, 8000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hitTimer);
      clearTimeout(uploadingTimer);
      clearTimeout(completedTimer);
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
    };
  }, []);


  return (
    <div className="relative mt-6 flex h-64 items-center justify-center overflow-visible rounded-2xl">
      {/* Floating sparks around the box */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const radius = 160;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary/60"
            initial={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI / 4) * radius,
                Math.cos(angle) * radius,
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI / 4) * radius,
                Math.sin(angle) * radius,
              ],
              opacity: [0, 1, 0.7, 1, 0],
              scale: [0, 1, 1.2, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Single card that expands and shows upload icons inside */}
      <motion.div
        initial={{ 
          scale: 0.9, 
          opacity: 0,
          height: "12rem", // h-48
          width: "16rem", // w-64
        }}
        animate={{
          scale: 1,
          opacity: 1,
          height: phase === "initial" ? "12rem" : "14rem", // h-48 to h-56
          width: phase === "initial" ? "16rem" : "20rem", // w-64 to w-80
        }}
        transition={{ 
          height: {
            duration: phase === "initial" ? 0.8 : 1,
            delay: phase === "splitting" ? 0.5 : 0, // Expand after hit effect completes
            ease: [0.16, 1, 0.3, 1]
          },
          width: {
            duration: phase === "initial" ? 0.8 : 1,
            delay: phase === "splitting" ? 0.5 : 0,
            ease: [0.16, 1, 0.3, 1]
          },
          scale: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          },
          opacity: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        className="relative z-10 flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg overflow-hidden"
        style={{
          padding: phase === "initial" ? "1.5rem" : "1.5rem",
        }}
      >
        {/* Initial "Upload" content - fades out smoothly before splitting */}
        <AnimatePresence mode="wait">
          {phase === "initial" && showUploadContent && (
            <motion.div
              key="upload-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                y: -15
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="mb-4"
              >
                <div className="h-16 w-16 rounded-xl border-2 border-primary/60 bg-primary/10 flex items-center justify-center">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="text-base font-semibold text-foreground"
              >
                Upload
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hit/Impact effect - only during initial phase, before transition */}
        {phase === "initial" && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ 
                scale: [1, 1.3, 1.5],
                opacity: [0, 0.6, 0],
              }}
              transition={{ 
                duration: 0.8,
                delay: 1.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 rounded-xl border-4 border-primary/50 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 0.6,
                delay: 1.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 rounded-xl bg-primary/20 pointer-events-none"
            />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.8 + i * 0.3],
                  opacity: [0, 0.4 - i * 0.1, 0],
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 1.5 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute inset-0 rounded-xl border-2 border-primary/30 pointer-events-none"
              />
            ))}
          </>
        )}

        {/* Container title - only show during uploading and completed */}
        <AnimatePresence mode="wait">
          {(phase === "uploading" || phase === "completed") && (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`mb-4 text-xs font-medium ${
                phase === "completed" 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80"
              }`}
            >
              {phase === "uploading" ? "Uploading items..." : "All items uploaded!"}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Multiple cards container - appears inside the expanded card */}
        <AnimatePresence>
          {(phase === "splitting" || phase === "uploading" || phase === "completed") && (
            <motion.div
              key="upload-icons-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative flex items-center justify-center gap-3 w-full"
            >
              {Array.from({ length: numCards }).map((_, index) => {
                const isCompleted = completedCards[index];
                const progress = uploadProgress[index];

                return (
                  <motion.div
                    key={index}
                    initial={{
                      scale: 0,
                      opacity: 0,
                      rotate: -180,
                      y: 0,
                    }}
                    animate={{
                      scale: phase === "splitting" ? [0, 1.3, 0.95, 1] : 1,
                      opacity: phase === "splitting" ? [0, 0.8, 0.9, 1] : 1,
                      rotate: phase === "splitting" ? [-180, 20, -10, 0] : 0,
                      y: phase === "splitting" ? [0, -15, 5, 0] : 0,
                    }}
                    transition={{
                      duration: phase === "splitting" ? 1.2 : 0.3,
                      delay: phase === "splitting" ? 0.3 + index * 0.15 : 0, // Start after "Upload" content is gone
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm shadow-md"
                  >
                  {/* Loading state - show loading icon */}
                  {!isCompleted && (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mb-1"
                      >
                        <div className="h-8 w-8 rounded-lg border-2 border-dashed border-primary/60 bg-primary/10 flex items-center justify-center">
                          <svg className="h-5 w-5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                      </motion.div>
                      {phase === "uploading" && (
                        <>
                          {/* Progress bar */}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-0.5 rounded-full bg-primary/30 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                          </div>
                          <p className="text-[8px] text-foreground/60 mt-0.5">{progress}%</p>
                        </>
                      )}
                    </>
                  )}

                  {/* Completed state */}
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center justify-center w-full h-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: 0.1, repeat: 1, repeatType: "reverse" }}
                        className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-primary/30 shadow-lg"
                      >
                        <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="absolute inset-0 rounded-lg border-2 border-primary/50"
                      />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="text-[9px] text-primary font-semibold"
                      >
                        Done
                      </motion.p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split animation particles/glow effect */}
        {phase === "splitting" && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary/60"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.cos(angle) * 80,
                    y: Math.sin(angle) * 80,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + (i * 0.05),
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </>
        )}
      </motion.div>
    </div>
  );
}

// Step 2: AI Match Animation - Multiple photo cards on left, text message on right, magnetically attracts one and collides
export function Step2MatchAnimation() {
  const [phase, setPhase] = React.useState<"initial" | "typing" | "attracting" | "colliding" | "checkmark">("initial");
  const [typedText, setTypedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = React.useState<number | null>(null);
  const message = "I lost my black leather jacket, Do you have it?";
  const containerRef = React.useRef<HTMLDivElement>(null);
  const numCards = 4;

  React.useEffect(() => {
    // Reset on mount
    setPhase("initial");
    setTypedText("");
    setShowCursor(true);
    setSelectedCardIndex(null);

    // Phase 1: Start typing animation immediately
    setPhase("typing");
    
    // Cards will fly in and stack during typing
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setTypedText(message.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Brief pause after typing completes, then start magnetic attraction
        setTimeout(() => {
          setShowCursor(false);
          // Select a random card to attract (middle card)
          const selectedIndex = Math.floor(numCards / 2);
          setSelectedCardIndex(selectedIndex);
          setPhase("attracting");
          // After attraction, start collision
          setTimeout(() => {
            setPhase("colliding");
            // Show checkmark after collision animation completes with delay
            setTimeout(() => {
              setPhase("checkmark");
            }, 2200);
          }, 1200);
        }, 1000);
      }
    }, 70); // Faster typing speed

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative mt-6 flex h-80 items-center justify-center overflow-visible rounded-2xl"
    >

      {/* Multiple Photo Cards - Stacked on Left Side */}
      {Array.from({ length: numCards }).map((_, index) => {
        const isSelected = selectedCardIndex === index;
        // Stack cards on top of each other with slight offset for depth
        const stackOffset = index * 3; // Small offset for stacked effect
        const stackRotation = index * 2; // Slight rotation variation
        
        return (
          <motion.div
            key={index}
            className="absolute left-[10%]"
            style={{
              zIndex: phase === "attracting" && isSelected 
                ? 30 
                : phase === "colliding" && isSelected
                  ? 30
                : phase === "checkmark"
                  ? 0 // Hide stack in checkmark phase
                : 20 - index, // Lower cards have lower z-index when stacked
            }}
            initial={{ 
              x: -150 - index * 20, // Staggered starting positions
              opacity: 0, 
              scale: 0.6,
              rotate: -15 + index * 5,
            }}
            animate={{
              x: phase === "attracting" && isSelected 
                ? 180 
                : phase === "colliding" && isSelected 
                  ? 240 
                : phase === "checkmark"
                  ? -200 // Move stack off screen
                : phase === "colliding" && !isSelected
                  ? stackOffset - 50 // Stack moves left and disappears
                : phase === "typing"
                  ? stackOffset // Fly in and stack during typing
                : stackOffset, // Stacked position
              y: phase === "attracting" && isSelected
                ? -10 // Lift up when pulling out
                : phase === "colliding" && isSelected
                  ? 0
                : phase === "checkmark"
                  ? -200 // Move stack off screen
                : phase === "typing"
                  ? stackOffset * 0.5 // Fly in and stack during typing
                : stackOffset * 0.5, // Slight vertical offset for depth
              opacity: phase === "checkmark"
                ? 0 // Stack completely hidden in checkmark phase
              : phase === "colliding" && isSelected 
                ? [1, 1, 0] 
              : phase === "colliding" && !isSelected
                ? [1, 0.5, 0] // Remaining stack disappears during collision
              : phase === "attracting" && isSelected
                ? 1
              : phase === "attracting" && !isSelected
                ? 1 // Keep stack visible and stable during attraction
              : phase === "typing"
                ? 1 // Cards appear during typing
              : 1,
              scale: phase === "colliding" && isSelected 
                ? [1, 1.5, 0] 
              : phase === "checkmark"
                ? 0 // Stack hidden
              : phase === "attracting" && isSelected
                ? [1, 1.3, 1.2] // Pull out effect - scale up
              : phase === "attracting" && !isSelected
                ? 1 // Keep stack at normal size
              : phase === "colliding" && !isSelected
                ? [1, 0.8, 0] // Stack shrinks and disappears
              : phase === "typing"
                ? 1 // Cards scale to normal during typing
              : 1,
              rotate: phase === "colliding" && isSelected 
                ? [0, 25, -25, 15, -15, 0] 
              : phase === "attracting" && isSelected
                ? [stackRotation, 5, -5, 0] // Slight rotation when pulling out
              : phase === "attracting" && !isSelected
                ? stackRotation // Keep stack rotation stable
              : phase === "typing"
                ? stackRotation // Cards rotate to stacked position during typing
              : stackRotation,
            }}
            transition={{
              x: {
                duration: phase === "attracting" && isSelected 
                  ? 1.0 
                  : phase === "colliding" && isSelected 
                    ? 0.8 
                  : phase === "checkmark"
                    ? 0.5
                  : phase === "colliding" && !isSelected
                    ? 0.6 // Stack disappears faster
                  : phase === "typing"
                    ? 1.2 + index * 0.15 // Staggered fly-in during typing
                  : 1.0,
                delay: phase === "typing" ? index * 0.1 : 0, // Staggered delay for fly-in
                ease: phase === "attracting" && isSelected
                  ? [0.16, 1, 0.3, 1]
                  : phase === "colliding" && isSelected
                    ? [0.2, 0, 0.1, 1]
                  : phase === "checkmark"
                    ? [0.4, 0, 0.2, 1]
                  : phase === "colliding" && !isSelected
                    ? [0.4, 0, 0.2, 1]
                  : phase === "typing"
                    ? [0.16, 1, 0.3, 1]
                  : [0.16, 1, 0.3, 1],
              },
              y: {
                duration: phase === "attracting" && isSelected 
                  ? 1.0 
                  : phase === "colliding" && isSelected 
                    ? 0.8 
                  : phase === "checkmark"
                    ? 0.5
                  : phase === "colliding" && !isSelected
                    ? 0.6
                  : phase === "typing"
                    ? 1.2 + index * 0.15 // Staggered fly-in during typing
                  : 1.0,
                delay: phase === "typing" ? index * 0.1 : 0, // Staggered delay for fly-in
                ease: phase === "attracting" && isSelected
                  ? [0.16, 1, 0.3, 1]
                  : phase === "colliding" && isSelected
                    ? [0.2, 0, 0.1, 1]
                  : phase === "checkmark"
                    ? [0.4, 0, 0.2, 1]
                  : phase === "colliding" && !isSelected
                    ? [0.4, 0, 0.2, 1]
                  : phase === "typing"
                    ? [0.16, 1, 0.3, 1]
                  : [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: phase === "checkmark"
                  ? 0.3
                : phase === "colliding" && isSelected 
                  ? 0.5 
                : phase === "colliding" && !isSelected
                  ? 0.4 // Stack fades out quickly
                : phase === "attracting" 
                  ? 0.4
                : phase === "typing"
                  ? 0.8 + index * 0.1 // Staggered appearance during typing
                : 0.8,
                delay: phase === "typing" ? index * 0.1 : 0, // Staggered delay for appearance
              },
              scale: {
                duration: phase === "checkmark"
                  ? 0.3
                : phase === "colliding" && isSelected 
                  ? 0.8 
                : phase === "attracting" && isSelected
                  ? 1.0
                : phase === "colliding" && !isSelected
                  ? 0.5
                : phase === "typing"
                  ? 1.0 + index * 0.1 // Staggered scale during typing
                : 1.0,
                delay: phase === "typing" ? index * 0.1 : 0, // Staggered delay for scale
                ease: phase === "checkmark"
                  ? [0.4, 0, 0.2, 1]
                : phase === "colliding" && isSelected
                  ? [0.2, 0, 0.1, 1]
                : phase === "attracting" && isSelected
                  ? [0.16, 1, 0.3, 1]
                : phase === "colliding" && !isSelected
                  ? [0.4, 0, 0.2, 1]
                : phase === "typing"
                  ? [0.16, 1, 0.3, 1]
                : [0.16, 1, 0.3, 1],
              },
              rotate: {
                duration: phase === "checkmark"
                  ? 0.3
                : phase === "colliding" && isSelected 
                  ? 0.8 
                : phase === "attracting" && isSelected
                  ? 1.0
                : phase === "colliding" && !isSelected
                  ? 0.5
                : phase === "typing"
                  ? 1.0 + index * 0.1 // Staggered rotation during typing
                : 0,
                delay: phase === "typing" ? index * 0.1 : 0, // Staggered delay for rotation
                ease: phase === "checkmark"
                  ? [0.4, 0, 0.2, 1]
                : phase === "colliding" && isSelected
                  ? [0.2, 0, 0.1, 1]
                : phase === "attracting" && isSelected
                  ? [0.16, 1, 0.3, 1]
                : [0.16, 1, 0.3, 1],
              },
            }}
          >
            <motion.div
              className="relative rounded-xl border border-white/30 shadow-2xl overflow-hidden"
              style={{
                width: '110px',
                height: '150px',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Photo placeholder with gradient */}
              <div 
                className="w-full h-full relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(183, 79, 111, 0.6) 0%, rgba(183, 79, 111, 0.5) 50%, rgba(183, 79, 111, 0.7) 100%)',
                }}
              >
                {/* Image pattern overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                
                {/* Camera icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-white/80" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Text Message Bubble - Right Side */}
      <motion.div
        className="absolute right-[15%] z-20"
        initial={{ 
          x: 100, 
          opacity: 0, 
          scale: 0.8,
          rotate: 5,
        }}
        animate={{
          x: phase === "attracting" 
            ? -100 
            : phase === "colliding" 
              ? -180 
              : phase === "checkmark" 
                ? -180 
                : 0,
          y: phase === "attracting" || phase === "colliding" || phase === "checkmark"
            ? 0
            : 0,
          opacity: phase === "checkmark" 
            ? 0 
            : phase === "colliding" 
              ? [1, 1, 0] 
              : 1,
          scale: phase === "colliding" 
            ? [1, 1.5, 0] 
            : phase === "checkmark" 
              ? 0 
              : phase === "attracting"
                ? [1, 1.1, 1]
                : 1,
          rotate: phase === "colliding" 
            ? [0, -25, 25, -15, 15, 0] 
            : phase === "attracting"
              ? [0, -5, 5, 0]
              : 0,
        }}
        transition={{
          x: {
            duration: phase === "attracting" 
              ? 1.0 
              : phase === "colliding" 
                ? 0.8 
                : 1.0,
            ease: phase === "attracting"
              ? [0.16, 1, 0.3, 1]
              : phase === "colliding"
                ? [0.2, 0, 0.1, 1]
                : [0.16, 1, 0.3, 1],
          },
          y: {
            duration: phase === "attracting" 
              ? 1.0 
              : phase === "colliding" 
                ? 0.8 
                : 1.0,
            ease: phase === "attracting"
              ? [0.16, 1, 0.3, 1]
              : phase === "colliding"
                ? [0.2, 0, 0.1, 1]
                : [0.16, 1, 0.3, 1],
          },
          opacity: {
            duration: phase === "colliding" 
              ? 0.5 
              : 0.8,
          },
          scale: {
            duration: phase === "colliding" 
              ? 0.8 
              : phase === "attracting"
                ? 1.2
                : 1.0,
            ease: phase === "colliding"
              ? [0.2, 0, 0.1, 1]
              : phase === "attracting"
                ? [0.16, 1, 0.3, 1]
                : [0.16, 1, 0.3, 1],
          },
          rotate: {
            duration: phase === "colliding" 
              ? 0.8 
              : phase === "attracting"
                ? 1.2
                : 0,
            ease: phase === "colliding"
              ? [0.2, 0, 0.1, 1]
              : [0.16, 1, 0.3, 1],
          },
        }}
      >
        <motion.div
          className="relative rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl px-5 py-4 min-w-[240px] max-w-[280px]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
          }}
        >
          {/* Message text with typing effect */}
          <div className="flex items-center gap-1.5">
            <motion.span
              className="text-sm font-medium text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {typedText}
            </motion.span>
            {showCursor && phase === "typing" && (
              <motion.span
                className="inline-block w-0.5 h-4 bg-primary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Message tail */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white/20 border-b-8 border-b-transparent" />
        </motion.div>
      </motion.div>

      {/* Magnetic attraction effect */}
      <AnimatePresence>
        {phase === "attracting" && selectedCardIndex !== null && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-primary/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              opacity: [0, 0.3, 0.2, 0.3, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Collision Particles Effect */}
      <AnimatePresence>
        {phase === "colliding" && (
          <>
            {[...Array(16)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 16;
              const distance = 100;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-primary/90"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 0.8, 0],
                    scale: [1, 1.8, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.2, 0, 0.1, 1],
                  }}
                />
              );
            })}
            {/* Intense collision flash */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/60"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 2.5, 3], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/40"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.8, 2.2], opacity: [1, 0.6, 0] }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating dots around checkmark (like Upload animation) */}
      <AnimatePresence>
        {phase === "checkmark" && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              const radius = 160;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary/60"
                  initial={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: 0,
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI / 4) * radius,
                      Math.cos(angle) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI / 4) * radius,
                      Math.sin(angle) * radius,
                    ],
                    opacity: [0, 1, 0.7, 1, 0],
                    scale: [0, 1, 1.2, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Checkmark - Center */}
      <AnimatePresence>
        {phase === "checkmark" && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.3, 1],
              opacity: [0, 1, 1],
              rotate: [0, 10, -5, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: {
                duration: 1.0,
                ease: [0.34, 1.56, 0.64, 1],
              },
              opacity: {
                duration: 0.6,
              },
              rotate: {
                duration: 1.0,
                ease: [0.34, 1.56, 0.64, 1],
              },
            }}
          >
            <motion.div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#b74f6f',
                boxShadow: '0 2px 8px rgba(183, 79, 111, 0.3)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                scale: { duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { duration: 0.5, delay: 0.2 },
              }}
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.3, delay: 0.4, ease: 'easeOut' },
                  opacity: { duration: 0.2, delay: 0.4 },
                }}
                className="w-9 h-9 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
                style={{ color: 'white' }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  style={{ stroke: 'white' }}
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl blur-2xl -z-10"
        animate={{
          opacity: phase === "checkmark" 
            ? 0.2 
            : phase === "colliding" 
              ? 0.15 
              : phase === "attracting"
                ? 0.12
                : 0.1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Step 3: Calendar Animation - Appointment scheduling
export function Step3CalendarAnimation() {
  const [phase, setPhase] = React.useState<"waiting" | "appearing" | "moving" | "landed">("waiting");
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const targetDayRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [positions, setPositions] = React.useState({
    calendarCenter: { x: 0, y: 0 },
    target: { x: 0, y: 0, width: 0, height: 0 },
  });
  const targetDay = 15;

  React.useEffect(() => {
    setPhase("waiting");
    
    const calculatePositions = () => {
      if (!calendarRef.current || !targetDayRef.current || !containerRef.current) return;
      
      const calendarRect = calendarRef.current.getBoundingClientRect();
      const targetRect = targetDayRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const calendarCenterX = calendarRect.left - containerRect.left + calendarRect.width / 2;
      const calendarCenterY = calendarRect.top - containerRect.top + calendarRect.height / 2;
      
      setPositions({
        calendarCenter: {
          x: calendarCenterX,
          y: calendarCenterY,
        },
        target: {
          x: targetRect.left - containerRect.left + targetRect.width / 2,
          y: targetRect.top - containerRect.top + targetRect.height / 2,
          width: targetRect.width,
          height: targetRect.height,
        },
      });
    };
    
    // Phase 1: Calculate positions and show card
    const timer1 = setTimeout(() => {
      calculatePositions();
      setPhase("appearing");
    }, 500);
    
    // Phase 2: Start moving to target (after card appears)
    const timer2 = setTimeout(() => {
      setPhase("moving");
    }, 1000);
    
    // Phase 3: Land and fade out
    const timer3 = setTimeout(() => {
      setPhase("landed");
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const popSize = 120;
  const cellSize = positions.target.width || 40;

  return (
    <div ref={containerRef} className="relative mt-6 flex h-80 items-center justify-center overflow-visible rounded-2xl">
      {/* Calendar */}
      <motion.div
        ref={calendarRef}
        initial={{ scale: 0.96, opacity: 0, y: 10 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative z-10 rounded-xl border border-white/20 p-5 shadow-xl"
        style={{
          width: '420px',
          height: '320px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Calendar header */}
        <div className="mb-3 flex items-center">
          <Calendar className="h-5 w-5 text-primary" />
        </div>

        {/* Calendar grid headers */}
        <div className="mb-1.5 grid grid-cols-7 gap-1.5 text-xs text-foreground/50">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            const day = i + 1;
            const isTarget = day === targetDay;
            // Highlight target day after landing
            const isHighlighted = isTarget && phase === "landed";
            
            return (
              <motion.div
                key={i}
                ref={isTarget ? targetDayRef : null}
                className={`aspect-square rounded-lg border text-xs relative flex items-center justify-center transition-colors duration-300 ${
                  isHighlighted
                    ? 'border-primary bg-primary/20 text-primary font-semibold'
                    : 'border-white/10 bg-white/5 text-foreground/40'
                }`}
                animate={
                  isTarget && phase === "landed"
                    ? {
                        scale: [1, 1.15, 1],
                      }
                    : {}
                }
                transition={
                  isTarget && phase === "landed"
                    ? {
                        duration: 0.5,
                        ease: "easeOut",
                      }
                    : {}
                }
              >
                <span>{day}</span>
              </motion.div>
            );
          })}
        </div>
        
      </motion.div>

      {/* Schedule Pickup Card */}
      <AnimatePresence>
        {phase !== "waiting" && positions.target.width > 0 && positions.calendarCenter.x > 0 && (
          <motion.div
            key="schedule-card"
            className="absolute z-20"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              x: positions.calendarCenter.x,
              y: positions.calendarCenter.y,
            }}
            animate={{
              x: phase === "moving" || phase === "landed" ? positions.target.x : positions.calendarCenter.x,
              y: phase === "moving" || phase === "landed" ? positions.target.y : positions.calendarCenter.y,
            }}
            transition={{
              x: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              },
              y: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -5,
              }}
              animate={{
                opacity: phase === "landed" ? 0 : 1,
                scale: phase === "landed" ? 0 : phase === "appearing" ? 1 : 0.9,
                rotate: phase === "landed" ? 0 : phase === "moving" ? 2 : 0,
              }}
              transition={{
                opacity: {
                  duration: phase === "appearing" ? 0.4 : phase === "landed" ? 0.3 : 0,
                  ease: "easeOut",
                },
                scale: {
                  duration: phase === "appearing" ? 0.5 : phase === "moving" ? 0.2 : phase === "landed" ? 0.3 : 0,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                rotate: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              className="relative"
            >
              {/* New cleaner card design */}
              <div className="relative rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl border border-primary/50 backdrop-blur-xl overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                
                {/* Card content */}
                <div className="relative px-5 py-3.5 flex items-center gap-3 whitespace-nowrap">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <Calendar className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-bold text-white leading-tight">Schedule Pickup</div>
                    <div className="text-xs text-white/80 font-medium">Jan 15</div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10 opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

