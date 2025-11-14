"use client";

import { motion } from 'motion/react';
import './StarBorder.css';

type StarBorderProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  enableHover?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  enableHover = false,
  ...rest
}: StarBorderProps) => {
  const containerProps = {
    className: `star-border-container ${className}`,
    style: {
      padding: `${thickness}px 0`,
      ...style,
      ...rest.style,
    } as React.CSSProperties,
    ...rest,
  };

  const content = (
    <>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </>
  );

  if (enableHover) {
    return (
      <motion.div
        {...containerProps}
        style={{ ...containerProps.style, zIndex: 1 }}
        whileHover={{ 
          scale: 1.05, 
          y: -8,
          zIndex: 20,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        initial={false}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <Component {...containerProps}>
      {content}
    </Component>
  );
};

export default StarBorder;

