"use client";

import { useMotionValue, useSpring, motion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "./TiltedCard.css";

type TiltedCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  accent?: "primary" | "secondary";
  className?: string;
};

const TiltedCard = ({
  title,
  description,
  icon,
  imageSrc,
  imageAlt,
  accent = "primary",
  className,
}: TiltedCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const middleX = bounds.width / 2;
    const middleY = bounds.height / 2;

    const rotateAmountY = ((relativeX - middleX) / middleX) * 9;
    const rotateAmountX = (-(relativeY - middleY) / middleY) * 9;

    x.set(rotateAmountY);
    y.set(rotateAmountX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn("tilted-card", `tilted-card--${accent}`, className)}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="tilted-card__overlay" />
      <div className="tilted-card__content">
        <div className="flex items-start gap-3">
          {icon ? <span className="tilted-card__icon" aria-hidden>{icon}</span> : null}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{description}</p>
          </div>
        </div>
        {imageSrc ? (
          <div className="tilted-card__image">
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default TiltedCard;
