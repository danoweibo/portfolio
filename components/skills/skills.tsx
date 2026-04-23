"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SKILLS } from "@/components/skills/constants";
import { AnimatedHeading } from "@/components/ui/animated-heading";

const SPEED = 80; // px/s at full speed
const SMOOTH_TAU = 0.4; // seconds — controls how gently it eases

export function SkillsSection() {
  const items = [...SKILLS, ...SKILLS];
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false); // ← ref, not state

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;
    let lastTimestamp: number | null = null;
    let offset = 0;
    let velocity = SPEED; // start at full speed

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      // Read hover state from ref — no re-render, no effect restart
      const targetVelocity = isHoveredRef.current ? 0 : SPEED;

      const easingFactor = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocity += (targetVelocity - velocity) * easingFactor;

      const seqWidth = track.scrollWidth / 2;
      if (seqWidth > 0) {
        offset = (offset + velocity * dt) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []); // ← empty deps, loop runs once forever

  return (
    <section id="skills" className="overflow-hidden bg-[#fafafa] py-24">
      <div className="mx-auto mb-16 max-w-5xl px-6">
        <AnimatedHeading text="Skills" />
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
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
        </div>
      </div>
    </section>
  );
}
