"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

export function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" })
  const letters = text.split("")

  return (
    <h2
      ref={ref}
      aria-label={text}
      className="text-6xl lg:text-8xl font-bold tracking-tight text-gray-900 overflow-hidden"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isInView ? i * 0.04 : (letters.length - 1 - i) * 0.03,
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  )
}
