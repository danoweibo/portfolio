"use client"

import { useRef } from "react"

import { motion, useScroll, useTransform, useInView } from "motion/react"

import Image from "next/image"

import { CAREERS } from "@/lib/constants"

import { AnimatedHeading } from "./animated-heading"
import { ScrolljackCarousel } from "./scrolljack-carousel"

interface CareerEntryProps {
  career: (typeof CAREERS)[0]
}

function CareerEntry({ career }: CareerEntryProps) {
  const bannerRef = useRef(null)
  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "center center"],
  })
  const bannerScale = useTransform(bannerProgress, [0, 1], [0.85, 1])

  const listRef = useRef(null)
  const listInView = useInView(listRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  })

  return (
    <div className="mb-24 last:mb-0">
      {/* Banner */}
      <motion.div
        ref={bannerRef}
        style={{ scale: bannerScale }}
        className="overflow-hidden rounded-2xl w-full"
      >
        <Image
          src={career.banner}
          alt={career.company}
          width={1200}
          height={400}
          className="w-full object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </motion.div>

      {/* Role + Company + @ icon row */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{career.role}</h3>
          <p className="text-lg text-gray-500 mt-1">{career.company}</p>
        </div>
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="28"
            fill="#9ca3af"
          >
            @
          </text>
        </svg>
      </div>

      {/* Contributions list */}
      <ul
        ref={listRef}
        className="mt-6 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"
      >
        {career.contributions.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="flex items-start gap-3 text-gray-600 text-sm"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Conditional carousel */}
      {career.images.length > 0 && (
        <div className="mt-12">
          <ScrolljackCarousel images={career.images} height="500px" />
        </div>
      )}
    </div>
  )
}

export function CareersSection() {
  return (
    <section id="career" className="bg-[#fafafa] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeading text="Career" />
        <div className="mt-16">
          {CAREERS.map((career) => (
            <CareerEntry key={career.id} career={career} />
          ))}
        </div>
      </div>
    </section>
  )
}
