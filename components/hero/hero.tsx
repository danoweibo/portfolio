"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { Hero } from "@/components/hero/constants";
import LetterGlitch from "@/components/ui/letter-glitch";

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <p ref={ref}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.04,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          className="tracking-tight"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function AnimatedTagline({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const boldCount = 2;

  return (
    <p ref={ref}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.04,
            ease: "easeOut",
          }}
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            fontWeight: i < boldCount ? 700 : 400,
          }}
          className="font-tiktok"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function HeroImageSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gray-200">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  const textRef = useRef(null);
  const textInView = useInView(textRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <section className="relative h-screen overflow-hidden bg-[#f5f0e8]">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={["#e9e4dd", "#d5d1ca"]}
          glitchSpeed={50}
          outerVignette={false}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
          smooth
        />
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto h-full px-6"
      >
        <div className="flex h-full flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left column — Image (desktop only) */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 60 }}
            animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block lg:h-full lg:w-1/2"
          >
            <div className="relative flex h-full w-full items-end pt-16">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {!desktopLoaded && <HeroImageSkeleton />}
                <Image
                  src={Hero.image}
                  alt="Daniel Oweibo"
                  fill
                  className={`object-cover object-[50%_0%] transition-opacity duration-500 ${
                    desktopLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  onLoad={() => setDesktopLoaded(true)}
                />
              </div>
            </div>
          </motion.div>

          {/* Right column — Text + mobile image */}
          <div
            ref={textRef}
            className="flex h-full flex-col pt-32 pb-0 lg:w-1/2 lg:justify-center lg:pt-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl"
            >
              {Hero.greeting}
            </motion.h1>

            <div className="mb-2 text-xl font-medium text-stone-900 lg:text-2xl">
              <AnimatedTagline text={Hero.tagline} delay={0.1} />
            </div>

            <div className="text-md leading-relaxed font-medium text-stone-700">
              <AnimatedText text={Hero.description} delay={0.3} />
            </div>

            {/* Mobile image — grows to fill remaining height */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.4,
              }}
              className="mt-8 min-h-0 flex-1 lg:hidden"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {!mobileLoaded && <HeroImageSkeleton />}
                <Image
                  src={Hero.image}
                  alt="Daniel Oweibo"
                  fill
                  className={`object-cover object-[50%_0%] transition-opacity duration-500 ${
                    mobileLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  onLoad={() => setMobileLoaded(true)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
