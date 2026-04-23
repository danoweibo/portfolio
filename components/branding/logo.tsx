"use client";

import { useMemo } from "react";

import Image from "next/image";

import { Site } from "@/components/navbar/constants";
import MetallicPaint from "@/components/ui/metallic-paint";

export default function PortfolioLogo({
  className,
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  const isAndroid = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /android/i.test(navigator.userAgent);
  }, []);

  if (isAndroid) {
    return (
      <Image
        src={Site.logo}
        alt={Site.name}
        width={size}
        height={size}
        className={className}
      />
    );
  }

  return (
    <div className="h-12 w-12">
      <MetallicPaint
        imageSrc="/images/cutout.svg"
        seed={42}
        scale={2}
        patternSharpness={1}
        noiseScale={0.5}
        speed={0.2}
        liquid={0.75}
        mouseAnimation={false}
        brightness={2}
        contrast={0.5}
        refraction={0.01}
        blur={0.015}
        chromaticSpread={2}
        fresnel={1}
        angle={0}
        waveAmplitude={1}
        distortion={1}
        contour={0.2}
        lightColor="#5c5d5e"
        darkColor="#000000"
        tintColor="#feb3ff"
      />
    </div>
  );
}
