"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css';

type TrueFocusProps = {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  alwaysVisibleIndices?: number[]; // Indices of words that should never be blurred
  lineBreakIndices?: number[]; // Indices that should have a line break before them
  customClassIndices?: Record<number, string>; // Map of indices to custom CSS classes
};

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  alwaysVisibleIndices = [],
  lineBreakIndices = [],
  customClassIndices = {}
}: TrueFocusProps) => {
  const words = useMemo(() => sentence.split(separator), [sentence, separator]);
  
  // Get list of animatable indices (exclude always-visible ones)
  const animatableIndices = useMemo(() => {
    return words
      .map((_, index) => index)
      .filter(index => !alwaysVisibleIndices.includes(index));
  }, [words, alwaysVisibleIndices]);
  
  // Initialize currentIndex to first animatable index
  const [currentIndex, setCurrentIndex] = useState(() => animatableIndices.length > 0 ? animatableIndices[0] : 0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode && animatableIndices.length > 0) {
      // Reset to first animatable index if current index is in always-visible list
      setCurrentIndex(prev => {
        if (alwaysVisibleIndices.includes(prev)) {
          return animatableIndices[0];
        }
        return prev;
      });

      const interval = setInterval(
        () => {
          setCurrentIndex(prev => {
            const currentPos = animatableIndices.indexOf(prev);
            if (currentPos === -1) return animatableIndices[0];
            const nextPos = (currentPos + 1) % animatableIndices.length;
            return animatableIndices[nextPos];
          });
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, alwaysVisibleIndices, animatableIndices]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode && !alwaysVisibleIndices.includes(index)) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  // Group words that should stay together (e.g., "But Fast!")
  // If a word has a line break and there's a next word, group them together
  const groupedWords = useMemo(() => {
    const groups: Array<{ start: number; end: number; needsLineBreak: boolean }> = [];
    let i = 0;

    while (i < words.length) {
      const needsLineBreak = lineBreakIndices.includes(i);
      const shouldGroup = needsLineBreak && i + 1 < words.length;

      if (shouldGroup) {
        // Group this word with the next one
        groups.push({ start: i, end: i + 1, needsLineBreak: true });
        i += 2;
      } else {
        // Individual word
        groups.push({ start: i, end: i, needsLineBreak });
        i += 1;
      }
    }

    return groups;
  }, [words, lineBreakIndices]);

  return (
    <div className="focus-container" ref={containerRef}>
      {groupedWords.map((group, groupIndex) => {
        const isGroup = group.start !== group.end;
        
        if (isGroup) {
          // Render grouped words (e.g., "But Fast!")
          return (
            <span key={`group-${groupIndex}`} style={{ whiteSpace: 'nowrap', display: 'inline' }}>
              {group.needsLineBreak && <br />}
              {words.slice(group.start, group.end + 1).map((word, wordIndex) => {
                const index = group.start + wordIndex;
                const isActive = index === currentIndex;
                const isAlwaysVisible = alwaysVisibleIndices.includes(index);
                const shouldBlur = !isAlwaysVisible && !isActive && !manualMode;
                const shouldBlurManual = !isAlwaysVisible && !isActive && manualMode;
                const customClass = customClassIndices[index] || '';

                return (
                  <span key={index}>
                    {wordIndex > 0 && ' '}
                    <span
                      ref={el => {
                        wordRefs.current[index] = el;
                      }}
                      className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''} ${customClass}`}
                      style={{
                        filter: shouldBlur || shouldBlurManual
                          ? `blur(${blurAmount}px)`
                          : `blur(0px)`,
                        ['--border-color' as string]: borderColor,
                        ['--glow-color' as string]: glowColor,
                        transition: `filter ${animationDuration}s ease`
                      } as React.CSSProperties}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        } else {
          // Render individual word
          const index = group.start;
          const isActive = index === currentIndex;
          const isAlwaysVisible = alwaysVisibleIndices.includes(index);
          const shouldBlur = !isAlwaysVisible && !isActive && !manualMode;
          const shouldBlurManual = !isAlwaysVisible && !isActive && manualMode;
          const customClass = customClassIndices[index] || '';

          return (
            <span key={index}>
              {group.needsLineBreak && <br />}
              <span
                ref={el => {
                  wordRefs.current[index] = el;
                }}
                className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''} ${customClass}`}
                style={{
                  filter: shouldBlur || shouldBlurManual
                    ? `blur(${blurAmount}px)`
                    : `blur(0px)`,
                  ['--border-color' as string]: borderColor,
                  ['--glow-color' as string]: glowColor,
                  transition: `filter ${animationDuration}s ease`
                } as React.CSSProperties}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {words[index]}
              </span>
            </span>
          );
        }
      })}
      {/* Only show focus frame if current word is not always visible */}
      {!alwaysVisibleIndices.includes(currentIndex) && (
        <motion.div
          className="focus-frame"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
            opacity: currentIndex >= 0 ? 1 : 0
          }}
          transition={{
            duration: animationDuration
          }}
          style={{
            ['--border-color' as string]: borderColor,
            ['--glow-color' as string]: glowColor
          } as React.CSSProperties}
        >
          <span className="corner top-left"></span>
          <span className="corner top-right"></span>
          <span className="corner bottom-left"></span>
          <span className="corner bottom-right"></span>
        </motion.div>
      )}
    </div>
  );
};

export default TrueFocus;

