"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform, useInView } from "motion/react";

import Image from "next/image";

import { HERO } from "@/lib/constants";

import LetterGlitch from "./ui/letter-glitch";

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

  // "Fullstack developer" = first 2 words
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
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

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
    <section className="relative min-h-screen overflow-hidden bg-[#f5f0e8]">
      {/* LetterGlitch as full-section background */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={["#e9e4dd", "#d5d1ca"]}
          glitchSpeed={50}
          outerVignette={false}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
          smooth
        />
      </div>

      {/* Content sits above the glitch */}
      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left column — Image (desktop only) */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 60 }}
            animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block lg:w-1/2"
          >
            <Image
              src={HERO.image}
              alt="Daniel Oweibo"
              width={480}
              height={560}
              className="h-auto w-full rounded-2xl object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              priority
            />
          </motion.div>

          {/* Right column — Text */}
          <div ref={textRef} className="flex flex-col justify-center lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl"
            >
              {HERO.greeting}
            </motion.h1>

            <div className="mb-4 text-xl font-medium text-gray-700 lg:text-2xl">
              <AnimatedTagline text={HERO.tagline} delay={0.1} />
            </div>

            <div className="text-lg leading-relaxed text-gray-500">
              <AnimatedText text={HERO.description} delay={0.3} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
