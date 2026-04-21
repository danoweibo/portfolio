"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, CalendarDays, Copy, Check } from "lucide-react";
import Image from "next/image";
import { SITE, NAV_LINKS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ModalType = "phone" | "email" | "meeting" | null;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copied, setCopied] = useState(false);
  const [connectHovered, setConnectHovered] = useState(false);
  const [connectActive, setConnectActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  /**
   * isMobile — true when viewport < 1024px (Tailwind's `lg` breakpoint).
   *
   * Why `null` as initial value:
   *   During SSR / before hydration, `window` doesn't exist so we can't
   *   know the real value. We use `null` as a sentinel meaning "not yet
   *   measured". The navWidth calc below falls back to desktop values for
   *   `null`, which is the safe default (avoids a FOUC on desktop builds).
   *   The moment the useEffect fires on the client, isMobile is set to the
   *   real value and Framer Motion re-animates to the correct width.
   */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalLinks = NAV_LINKS.length;

  useEffect(() => {
    setHasMounted(true);

    // Called immediately AND on every resize so isMobile stays accurate.
    const evaluate = () => setIsMobile(window.innerWidth < 1024);
    evaluate(); // ← runs synchronously, correct value before first paint

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", evaluate, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  // ─── Width table ─────────────────────────────────────────────────────────────
  //  isMobile null  (SSR)    → desktop fallback
  //  isMobile false (desktop)→ 83.333% default │ 66.666% scrolled
  //  isMobile true  (mobile) → 96%     default │ 88%     scrolled
  // ─────────────────────────────────────────────────────────────────────────────
  let navWidth: string;
  if (isMobile === true) {
    navWidth = scrolled ? "88%" : "96%";
  } else {
    // covers both false (desktop) and null (SSR fallback)
    navWidth = scrolled ? "66.666%" : "83.333%";
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setCopied(false);
  };

  const dropdownItems = [
    {
      icon: Phone,
      label: CONTACT.phone.label,
      subtitle: CONTACT.phone.subtitle,
      action: () => setActiveModal("phone"),
    },
    {
      icon: Mail,
      label: CONTACT.email.label,
      subtitle: CONTACT.email.subtitle,
      action: () => setActiveModal("email"),
    },
    {
      icon: CalendarDays,
      label: CONTACT.meeting.label,
      subtitle: CONTACT.meeting.subtitle,
      action: () => setActiveModal("meeting"),
    },
  ];

  // Gradient animates by shifting background-position on hover/press
  const connectGradientStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(90deg, #111827 0%, #374151 25%, #111827 50%, #374151 75%, #111827 100%)",
    backgroundSize: "200% 100%",
    backgroundPosition:
      connectHovered || connectActive ? "right center" : "left center",
    transition: "background-position 0.5s ease",
  };

  return (
    <>
      <motion.nav
        animate={{
          width: navWidth,
          borderRadius: scrolled ? 12 : 0,
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid transparent",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-3"
      >
        {/*
          ─────────────────────────────────────────────
          LEFT: Logo — always left on every viewport
          ─────────────────────────────────────────────
        */}
        <motion.a
          href="/"
          aria-label={`${SITE.name} home`}
          initial={hasMounted ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-shrink-0"
        >
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </motion.a>

        {/*
          ─────────────────────────────────────────────
          RIGHT (desktop): Nav links + Let's Connect
          ─────────────────────────────────────────────
        */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={hasMounted ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.08,
                  ease: "easeOut",
                }}
              >
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Let's Connect — desktop */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => {
              setDropdownOpen(true);
              setConnectHovered(true);
            }}
            onMouseLeave={() => {
              setDropdownOpen(false);
              setConnectHovered(false);
            }}
          >
            <button
              onMouseDown={() => setConnectActive(true)}
              onMouseUp={() => setConnectActive(false)}
              style={connectGradientStyle}
              className="rounded-full text-white px-5 py-2 text-sm font-medium cursor-pointer"
            >
              {"Let's connect "}
              <span aria-hidden="true">🤝</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {dropdownItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/*
          ─────────────────────────────────────────────
          RIGHT (mobile): Let's Connect + Hamburger
          ─────────────────────────────────────────────
        */}
        <div className="flex lg:hidden items-center gap-1">
          {/* Let's Connect — mobile */}
          <div className="relative">
            <button
              onTouchStart={() => setConnectActive(true)}
              onTouchEnd={() => {
                setConnectActive(false);
                setDropdownOpen((prev) => !prev);
              }}
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={connectGradientStyle}
              className="rounded-full text-white px-4 py-2 text-xs font-medium cursor-pointer"
            >
              {"Let's connect "}
              <span aria-hidden="true">🤝</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {dropdownItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-end justify-center w-8 h-8 gap-1.5 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="h-0.5 bg-gray-900 rounded-full origin-center"
              style={{ width: 20 }}
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -5, width: 20 }
                  : { rotate: 0, y: 0, width: 14 }
              }
              className="h-0.5 bg-gray-900 rounded-full origin-center"
              style={{ width: 14 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex flex-col items-center justify-center lg:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <motion.span
                animate={{ rotate: 45 }}
                className="absolute h-0.5 w-6 bg-gray-900 rounded-full"
              />
              <motion.span
                animate={{ rotate: -45 }}
                className="absolute h-0.5 w-6 bg-gray-900 rounded-full"
              />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: {
                      duration: 0.2,
                      // Reverse stagger: last link exits first
                      delay: (totalLinks - 1 - i) * 0.07,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.07,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "text-3xl font-bold text-gray-900",
                    "hover:text-gray-600 transition-colors",
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 text-center"
                >
                  {activeModal === "phone" && (
                    <>
                      <Phone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {CONTACT.phone.label}
                      </h3>
                      <p className="text-2xl font-semibold text-gray-700 mb-6">
                        {CONTACT.phone.subtitle}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleCopy(CONTACT.phone.subtitle)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        <a
                          href={CONTACT.phone.value}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 rounded-xl text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </div>
                    </>
                  )}

                  {activeModal === "email" && (
                    <>
                      <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {CONTACT.email.label}
                      </h3>
                      <p className="text-lg font-medium text-gray-700 mb-6 break-all">
                        {CONTACT.email.subtitle}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleCopy(CONTACT.email.subtitle)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        <a
                          href={CONTACT.email.value}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 rounded-xl text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Mail Now
                        </a>
                      </div>
                    </>
                  )}

                  {activeModal === "meeting" && (
                    <>
                      <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {CONTACT.meeting.label}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 break-all">
                        {CONTACT.meeting.value}
                      </p>
                      <button
                        onClick={() => handleCopy(CONTACT.meeting.value)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy to clipboard
                          </>
                        )}
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
