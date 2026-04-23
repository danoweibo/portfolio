"use client"

import { useRef } from "react"

import { motion, useScroll, useTransform } from "motion/react"

import Image from "next/image"

interface Props {
  images: string[]
  height?: string
}

export function ScrolljackCarousel({ images, height = "500px" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1])

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
            const opacity = useTransform(rawIndex, [i - 1, i, i + 1], [0, 1, 0])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(rawIndex, [i - 1, i, i + 1], [0.94, 1, 0.94])

            return (
              <motion.div
                key={src}
                style={{ opacity, scale, position: "absolute", inset: 0 }}
              >
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="object-contain rounded-2xl"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
