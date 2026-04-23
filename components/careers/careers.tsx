"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { CAREERS } from "@/components/careers/constants";
import { EmailIcon } from "@/components/icons";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrolljackCarousel } from "@/components/ui/scrolljack-carousel";

interface CareerEntryProps {
  career: (typeof CAREERS)[0];
}

// Shimmer skeleton for the banner while image loads
function BannerSkeleton() {
  return (
    <div className="relative h-65 w-full overflow-hidden rounded-2xl bg-gray-200 md:h-85 lg:h-100">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function CareerEntry({ career }: CareerEntryProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const bannerRef = useRef(null);
  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "center center"],
  });
  const bannerScale = useTransform(bannerProgress, [0, 1], [0.85, 1]);

  const listRef = useRef(null);
  const listInView = useInView(listRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <div className="mb-24 last:mb-0">
      {/* Banner with shimmer skeleton */}
      <motion.div
        ref={bannerRef}
        style={{ scale: bannerScale }}
        className="relative w-full overflow-hidden rounded-2xl"
      >
        {/* Skeleton shown until image loads */}
        {!bannerLoaded && <BannerSkeleton />}

        <Image
          src={career.banner}
          alt={career.company}
          width={1200}
          height={400}
          className={`w-full object-cover transition-opacity duration-500 ${
            bannerLoaded ? "opacity-100" : "absolute inset-0 opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setBannerLoaded(true)}
        />
      </motion.div>

      {/* Role + Company + @ icon row */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{career.role}</h3>
          <h6 className="text-lg text-gray-500">{career.company}</h6>
          <p className="text-xs font-medium text-gray-500">{career.duration}</p>
        </div>
        <EmailIcon className="h-8 w-8 text-[#9ca3af]" />
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
            className="flex items-start gap-3 text-sm text-gray-600"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Tech stack icons */}
      {career.stacks && career.stacks.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {career.stacks.map((stack) => (
            <div
              key={stack.icon}
              className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 shadow-sm"
              title={stack.name}
            >
              <Image
                src={`https://cdn.simpleicons.org/${stack.icon}`}
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

      {/* Conditional carousel */}
      {career.images.length > 0 && (
        <div className="mt-12">
          <ScrolljackCarousel images={career.images} height="500px" />
        </div>
      )}
    </div>
  );
}

export function CareersSection() {
  return (
    <section id="career" className="bg-[#fafafa] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedHeading text="Career" />
        <div className="mt-16">
          {CAREERS.map((career) => (
            <CareerEntry key={career.id} career={career} />
          ))}
        </div>
      </div>
    </section>
  );
}
