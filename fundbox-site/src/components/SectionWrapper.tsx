"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type SectionWrapperProps<T extends ElementType> = {
  as?: T;
  id?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const SectionWrapper = <T extends ElementType = "section">({
  as,
  id,
  className,
  children,
  ...props
}: SectionWrapperProps<T>) => {
  const Component = (as || "section") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Component
      id={id}
      ref={ref as Ref<HTMLElement>}
      className={cn("relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full flex-col gap-8"
      >
        {children}
      </motion.div>
    </Component>
  );
};

export default SectionWrapper;
