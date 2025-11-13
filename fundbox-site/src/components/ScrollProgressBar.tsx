"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(0));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[10px] pointer-events-none">
      <div className="relative h-full overflow-hidden">
        <motion.div
          className="liquid-progress h-full origin-left"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ScrollProgressBar;
