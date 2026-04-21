"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { HERO } from "@/lib/constants";

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
    <section className="min-h-screen bg-[#f5f0e8] relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="container mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32"
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
              className="rounded-2xl object-cover w-full h-auto"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              priority
            />
          </motion.div>

          {/* Right column — Text */}
          <div ref={textRef} className="lg:w-1/2 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            >
              {HERO.greeting}
            </motion.h1>

            <div className="text-xl lg:text-2xl font-medium text-gray-700 mb-4">
              <AnimatedText text={HERO.tagline} delay={0.1} />
            </div>

            <div className="text-lg text-gray-500 leading-relaxed">
              <AnimatedText text={HERO.description} delay={0.3} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
