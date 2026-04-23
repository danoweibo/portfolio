"use client";

import { useRef } from "react";

import { MessageCircle, Bird, Cat, Play, House } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

import Image from "next/image";

import { SITE, FOOTER } from "@/lib/constants";

const platformIcons: Record<string, React.ElementType> = {
  X: Bird,
  LinkedIn: House,
  GitHub: Cat,
  Discord: MessageCircle,
  YouTube: Play,
};

export function FooterSection() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: false });

  return (
    <motion.footer
      ref={footerRef}
      style={{ y }}
      className="bg-[#fafafa] border-t border-gray-200 py-16 px-6"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto">
        {/* Desktop layout */}
        <div className="hidden lg:flex lg:items-start lg:justify-between">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col">
            <motion.div
              animate={
                contentInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </motion.div>
            <motion.p
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gray-900 font-medium text-lg mt-3"
            >
              {FOOTER.tagline}
            </motion.p>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-6">
            {FOOTER.socials.map((s) => {
              const Icon = platformIcons[s.platform] || Bird;
              return (
                <motion.a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  whileHover={{ scale: 1.2, color: "#111827" }}
                  transition={{ duration: 0.15 }}
                  className="text-gray-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Desktop copyright */}
        <p className="hidden lg:block text-gray-400 text-xs mt-8 text-right">
          {FOOTER.copyright}
        </p>

        {/* Mobile layout */}
        <div className="flex lg:hidden flex-col items-center text-center">
          <motion.div
            animate={
              contentInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </motion.div>

          <motion.p
            animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-900 font-medium text-lg mt-3"
          >
            {FOOTER.tagline}
          </motion.p>

          {/* Mobile socials with handle */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {FOOTER.socials.map((s) => {
              const Icon = platformIcons[s.platform] || Bird;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 text-sm"
                >
                  <Icon className="w-5 h-5" />
                  <span>{s.handle}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile copyright */}
          <p className="text-gray-400 text-xs mt-8">{FOOTER.copyright}</p>
        </div>
      </div>
    </motion.footer>
  );
}
