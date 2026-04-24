"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { FOOTER } from "@/components/footer/constants";
import {
  PortfolioIcon,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";
import { Site } from "@/lib/constants";

const platformIcons: Record<string, React.ElementType> = {
  X: XIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GithubIcon,
  Discord: DiscordIcon,
  YouTube: YouTubeIcon,
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
      className="border-t border-gray-200 bg-[#fafafa] px-6 py-16"
    >
      <div ref={contentRef} className="mx-auto max-w-5xl">
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
                src={Site.logo}
                alt={Site.name}
                width={80}
                height={80}
                className="h-20 w-20"
              />
            </motion.div>
            <motion.p
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-momo mt-3 text-2xl font-medium text-gray-900"
            >
              {FOOTER.tagline}
            </motion.p>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-6">
            {FOOTER.socials.map((s) => {
              const Icon = platformIcons[s.platform] || PortfolioIcon;
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
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Desktop copyright */}
        <p className="mt-8 hidden text-right text-xs text-gray-400 lg:block">
          {FOOTER.copyright.base}{" "}
          <strong className="font-medium text-gray-500">
            {FOOTER.copyright.role}
          </strong>
        </p>

        {/* Mobile layout */}
        <div className="flex flex-col items-center text-center lg:hidden">
          <motion.div
            animate={
              contentInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={Site.logo}
              alt={Site.name}
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </motion.div>

          <motion.p
            animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-momo mt-3 text-xl font-medium text-gray-900"
          >
            {FOOTER.tagline}
          </motion.p>

          {/* Mobile socials with handle */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {FOOTER.socials.map((s) => {
              const Icon = platformIcons[s.platform] || PortfolioIcon;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <Icon className="h-5 w-5" />
                  <span>{s.handle}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile copyright */}
          <p className="mt-8 text-xs text-gray-400">
            {FOOTER.copyright.base}{" "}
            <strong className="font-medium text-gray-500">
              {FOOTER.copyright.role}
            </strong>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
