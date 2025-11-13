"use client";

import { useEffect, useRef, useId, useCallback, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./GlassSurface.css";

type GlassSurfaceVariant = "default" | "card" | "tile" | "nav";

type GlassSurfaceProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: GlassSurfaceVariant;
  style?: CSSProperties;
  // Advanced glass effect props
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
  mixBlendMode?: string;
};

const GlassSurface = ({
  children,
  className,
  innerClassName,
  variant = "default",
  style,
  width,
  height,
  borderRadius,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
}: GlassSurfaceProps) => {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  // Get variant-specific defaults
  const getVariantDefaults = () => {
    switch (variant) {
      case "nav":
        return {
          borderRadius: borderRadius ?? 9999,
          brightness: 50,
          opacity: 0.93,
          blur: 11,
          displace: 15,
          distortionScale: -150,
        };
      case "card":
        return {
          borderRadius: borderRadius ?? 24,
          brightness: 50,
          opacity: 0.93,
          blur: 11,
          displace: 15,
          distortionScale: -150,
        };
      case "tile":
        return {
          borderRadius: borderRadius ?? 20,
          brightness: 50,
          opacity: 0.93,
          blur: 11,
          displace: 15,
          distortionScale: -150,
        };
      default:
        return {
          borderRadius: borderRadius ?? 28,
          brightness: 50,
          opacity: 0.93,
          blur: 11,
          displace: 15,
          distortionScale: -150,
        };
    }
  };

  const variantDefaults = getVariantDefaults();
  const finalBorderRadius = borderRadius ?? variantDefaults.borderRadius;
  const finalBrightness = brightness ?? variantDefaults.brightness;
  const finalOpacity = opacity ?? variantDefaults.opacity;
  const finalBlur = blur ?? variantDefaults.blur;
  const finalDisplace = displace ?? variantDefaults.displace;
  const finalDistortionScale = distortionScale ?? variantDefaults.distortionScale;

  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${finalBorderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${finalBorderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${finalBorderRadius}" fill="hsl(0 0% ${finalBrightness}% / ${finalOpacity})" style="filter:blur(${finalBlur}px)" />
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [finalBorderRadius, borderWidth, finalBrightness, finalOpacity, finalBlur, redGradId, blueGradId, mixBlendMode]);

  const updateDisplacementMap = useCallback(() => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  }, [generateDisplacementMap]);

  useEffect(() => {
    updateDisplacementMap();

    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute("scale", (finalDistortionScale + offset).toString());
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute("stdDeviation", finalDisplace.toString());
  }, [
    updateDisplacementMap,
    finalDisplace,
    finalDistortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDisplacementMap]);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height, updateDisplacementMap]);

  const [supportsSVG, setSupportsSVG] = useState(false);

  useEffect(() => {
    const supportsSVGFilters = () => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return false;
      }

      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);

      if (isWebkit || isFirefox) {
        return false;
      }

      const div = document.createElement("div");
      div.style.backdropFilter = `url(#${filterId})`;
      return div.style.backdropFilter !== "";
    };

    setSupportsSVG(supportsSVGFilters());
  }, [filterId]);

  const containerStyle: CSSProperties = {
    ...style,
    width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    borderRadius: `${finalBorderRadius}px`,
    "--glass-frost": backgroundOpacity,
    "--glass-saturation": saturation,
    "--filter-id": `url(#${filterId})`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn(
        "glass-surface",
        supportsSVG ? "glass-surface--svg" : "glass-surface--fallback",
        `glass-surface--${variant}`,
        className
      )}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" id="greenchannel" result="dispGreen" />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
      <div className={cn("glass-surface__content", innerClassName)}>{children}</div>
    </div>
  );
};

export default GlassSurface;
