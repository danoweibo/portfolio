"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import Image from "next/image";
import { SKILLS } from "@/lib/constants";
import { AnimatedHeading } from "./ui/animated-heading";

export function SkillsSection() {
  const items = [...SKILLS, ...SKILLS];
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScroll = () => {
    controls.start({
      x: [0, "-50%"],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    startScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePause = () => {
    if (!isPaused) {
      controls.stop();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (isPaused) {
      setIsPaused(false);
      startScroll();
    }
  };

  return (
    <section id="skills" className="overflow-hidden bg-[#fafafa] py-24">
      <div className="mx-auto mb-12 max-w-5xl px-6">
        <AnimatedHeading text="Skills" />
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <motion.div animate={controls} className="flex w-max gap-12">
          {items.map((skill, i) => (
            <div
              key={`${skill.label}-${i}`}
              className="flex min-w-[72px] flex-col items-center gap-2"
            >
              <div className="relative h-12 w-12">
                <Image
                  src={skill.icon}
                  alt={skill.label}
                  fill
                  className="object-contain"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <span className="text-center text-xs whitespace-nowrap text-gray-500">
                {skill.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
