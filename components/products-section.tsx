"use client"

import { useRef } from "react"

import { motion, useInView } from "motion/react"

import Image from "next/image"

import { PRODUCTS } from "@/lib/constants"

import { AnimatedHeading } from "./animated-heading"
import { ScrolljackCarousel } from "./scrolljack-carousel"

interface ProductInfoProps {
  product: (typeof PRODUCTS)[0]
}

function ProductInfo({ product }: ProductInfoProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-center h-full px-6 lg:px-16"
    >
      <Image
        src={product.icon}
        alt={product.name}
        width={64}
        height={64}
        className="rounded-2xl mb-6"
        loading="lazy"
      />
      <h3 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h3>
      <p className="text-gray-500 text-base leading-relaxed mb-8">
        {product.description}
      </p>
      <ul className="space-y-3">
        {product.solves.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{
              duration: 0.35,
              delay: 0.15 + i * 0.07,
              ease: "easeOut",
            }}
            className="flex items-center gap-3 text-gray-700 text-sm font-medium"
          >
            <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs shrink-0">
              ✓
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function ProductsSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  })

  return (
    <section id="products" className="bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <AnimatedHeading text="Products" />
        <motion.p
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-gray-500 text-lg max-w-2xl"
        >
          Showcasing top projects from my portfolio, these are high-impact
          products used by thousands today!
        </motion.p>
      </div>

      {/* Desktop layout */}
      {PRODUCTS.map((product) => (
        <div key={product.id}>
          {/* Desktop: Two-pane sticky layout */}
          <div
            className="hidden lg:flex"
            style={{ height: `calc(100vh + ${product.images.length * 80}vh)` }}
          >
            {/* Left pane — sticky product info */}
            <div className="w-1/2 sticky top-0 h-screen flex items-center">
              <ProductInfo product={product} />
            </div>
            {/* Right pane — scrolljack carousel */}
            <div className="w-1/2">
              <ScrolljackCarousel images={product.images} height="760px" />
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="block lg:hidden px-6 py-16">
            <ProductInfo product={product} />
            <div className="mt-12">
              <ScrolljackCarousel images={product.images} height="600px" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
