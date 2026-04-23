"use client"

import { useEffect, useRef, useState } from "react"

import { motion, useAnimation } from "motion/react"

import Image from "next/image"

import { SKILLS } from "@/lib/constants"

import { AnimatedHeading } from "./animated-heading"


export function SkillsSection() {
  const items = [...SKILLS, ...SKILLS]
  const controls = useAnimation()
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startScroll = () => {
    controls.start({
      x: [0, "-50%"],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    })
  }

  useEffect(() => {
    startScroll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePause = () => {
    if (!isPaused) {
      controls.stop()
      setIsPaused(true)
    }
  }

  const handleResume = () => {
    if (isPaused) {
      setIsPaused(false)
      startScroll()
    }
  }

  return (
    <section id="skills" className="bg-[#fafafa] py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12">
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
        <motion.div animate={controls} className="flex gap-12 w-max">
          {items.map((skill, i) => (
            <div
              key={`${skill.label}-${i}`}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className="w-12 h-12 relative">
                <Image
                  src={skill.icon}
                  alt={skill.label}
                  fill
                  className="object-contain"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <span className="text-xs text-gray-500 text-center whitespace-nowrap">
                {skill.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
