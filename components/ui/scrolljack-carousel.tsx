"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

interface Props {
  images: string[];
  height?: string;
}

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0">
      {/* Shimmer skeleton */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        className={`rounded-2xl object-contain transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function ScrolljackCarousel({ images, height = "500px" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1],
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${images.length * 80}vh` }}
      className="relative"
    >
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="relative w-full" style={{ height }}>
          {images.map((src, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              rawIndex,
              [i - 1, i, i + 1],
              [0, 1, 0],
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              rawIndex,
              [i - 1, i, i + 1],
              [0.94, 1, 0.94],
            );

            return (
              <motion.div
                key={src}
                style={{ opacity, scale, position: "absolute", inset: 0 }}
              >
                <ImageWithSkeleton src={src} alt={`Screenshot ${i + 1}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
