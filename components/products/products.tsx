"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { PRODUCTS } from "@/components/products/constants";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrolljackCarousel } from "@/components/ui/scrolljack-carousel";

interface ProductInfoProps {
  product: (typeof PRODUCTS)[0];
}

function ProductLogo({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mb-6 h-16 w-16 shrink-0">
      {/* Shimmer skeleton */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className={`rounded-2xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function ProductInfo({ product }: ProductInfoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-full flex-col justify-center px-6 lg:px-16"
    >
      {/* Product Logo with shimmer */}
      <ProductLogo src={product.icon} alt={product.name} />

      <h3 className="mb-3 text-3xl font-bold text-gray-900">{product.name}</h3>
      <p className="mb-8 text-base leading-relaxed text-gray-500">
        {product.description}
      </p>

      {/* Solves list */}
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
            className="flex items-center gap-3 text-sm font-medium text-gray-700"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
              ✓
            </span>
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Tech stack icons */}
      {product.stacks && product.stacks.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {product.stacks.map((stack) => (
            <div
              key={stack.icon}
              className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 shadow-sm"
              title={stack.name}
            >
              <Image
                src={`/images/simpleicons/${stack.icon}.svg`}
                alt={stack.name}
                width={14}
                height={14}
                className="h-3.5 w-3.5"
              />
              <span className="text-xs font-medium text-gray-600">
                {stack.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ProductsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <section id="products" className="bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <AnimatedHeading text="Products" />
        <motion.p
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg text-gray-500"
        >
          Showcasing top projects from my portfolio, these are high-impact
          products used by thousands today!
        </motion.p>
      </div>

      {PRODUCTS.map((product) => (
        <div key={product.id}>
          {/* Desktop: Two-pane sticky layout */}
          <div
            className="hidden lg:flex"
            style={{ height: `calc(100vh + ${product.images.length * 80}vh)` }}
          >
            <div className="sticky top-0 flex h-screen w-1/2 items-center">
              <ProductInfo product={product} />
            </div>
            <div className="w-1/2">
              <ScrolljackCarousel images={product.images} height="600px" />
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="block px-6 py-16 lg:hidden">
            <ProductInfo product={product} />
            <div className="mt-12">
              <ScrolljackCarousel images={product.images} height="600px" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
