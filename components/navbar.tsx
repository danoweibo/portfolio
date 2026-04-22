"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { SITE, NAV_LINKS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  PhoneIcon,
  ChatIcon,
  PartnerIcon,
  MeetingIcon,
  EmailIcon,
} from "@/components/icons";

type ModalType = "phone" | "email" | "meeting" | "chat" | null;

// ─── Squiggly underline (per nav link) ───────────────────────────────────────
function SquigglyUnderline() {
  return (
    <motion.div className="pointer-events-none absolute right-0 -bottom-[4px] left-0 h-[8px]">
      <svg
        width="100%"
        height="8"
        viewBox="0 0 37 8"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: 84.20591735839844,
            strokeDashoffset: 84.20591735839844,
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  // Track copied state per modal context
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  // Active nav section for squiggly underline
  const [activeSection, setActiveSection] = useState<string>("");

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const totalLinks = NAV_LINKS.length;

  // ─── Mount + scroll + resize ───────────────────────────────────────────────
  useEffect(() => {
    setHasMounted(true);

    const evaluate = () => setIsMobile(window.innerWidth < 1024);
    evaluate();

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", evaluate, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  // ─── Intersection Observer for active section squiggly ────────────────────
  useEffect(() => {
    if (!hasMounted) return;

    // NAV_LINKS should be shaped like: { href: "#about", label: "About" }
    // We observe each section by its id derived from the href
    const sectionIds = NAV_LINKS.map((l) => l.href.replace(/^#/, "")).filter(
      Boolean,
    );
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    // Use a Map to track which sections are currently visible and pick the topmost
    const visibleSections = new Map<string, number>();

    const pickActive = () => {
      if (visibleSections.size === 0) {
        setActiveSection("");
        return;
      }
      // Pick the section with the smallest top ratio (highest on screen)
      let best = "";
      let bestRatio = -Infinity;
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      setActiveSection(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
          pickActive();
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [hasMounted]);

  // ─── Close dropdown when clicking outside ─────────────────────────────────
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdownOpen]);

  // ─── Nav width ────────────────────────────────────────────────────────────
  let navWidth: string;
  if (isMobile === true) {
    navWidth = scrolled ? "88%" : "96%";
  } else {
    navWidth = scrolled ? "66.666%" : "83.333%";
  }

  // ─── Copy handler (keyed so each modal has independent state) ─────────────
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // fallback for older mobile browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setCopiedKey(null);
  };

  // ─── Dropdown items ───────────────────────────────────────────────────────
  const dropdownItems = [
    {
      icon: ChatIcon,
      label: CONTACT.chat.label,
      subtitle: CONTACT.chat.subtitle,
      action: () => setActiveModal("chat"),
    },
    {
      icon: PhoneIcon,
      label: CONTACT.phone.label,
      subtitle: CONTACT.phone.subtitle,
      action: () => setActiveModal("phone"),
    },
    {
      icon: EmailIcon,
      label: CONTACT.email.label,
      subtitle: CONTACT.email.subtitle,
      action: () => setActiveModal("email"),
    },
    {
      icon: MeetingIcon,
      label: CONTACT.meeting.label,
      subtitle: CONTACT.meeting.subtitle,
      action: () => setActiveModal("meeting"),
    },
  ];

  // ─── Shared "Let's Connect" button class ──────────────────────────────────
  // Fix (a): use inline-flex + items-center so text & icon are always centred.
  // Fix (b)/(c): explicit hover/active classes with transition.
  const connectBtnClass = cn(
    "inline-flex items-center justify-center gap-2 cursor-pointer rounded-full bg-black",
    "text-white font-semibold",
    // Smooth colour + bg transition
    "transition-colors duration-200 ease-in-out",
    // Hover (desktop) & active (both) state — Tailwind active: works on touch too
    "hover:bg-gray-50 hover:text-gray-900 active:bg-gray-50 active:text-gray-900",
    // [data-connect-icon] colour is inherited so no extra class needed on icon
  );

  // ─── Squiggly helper: does this nav link correspond to the active section? ─
  const isLinkActive = (href: string) => {
    const id = href.replace(/^#/, "");
    return activeSection === id;
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
        className="fixed top-4 left-1/2 z-40 flex -translate-x-1/2 items-center justify-between px-6 py-3"
      >
        {/* ── Logo ─────────────────────────────────────────────────────────── */}
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
            className="h-10 w-10"
          />
        </motion.a>

        {/* ── Desktop nav + Let's Connect ──────────────────────────────────── */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link, i) => {
              const active = isLinkActive(link.href);
              return (
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
                    className={cn(
                      "relative text-sm font-medium transition-colors",
                      active
                        ? "font-semibold text-gray-900"
                        : "text-gray-700 hover:text-gray-900",
                    )}
                  >
                    {link.label}
                    <AnimatePresence>
                      {active && <SquigglyUnderline />}
                    </AnimatePresence>
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Let's Connect — desktop */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={cn(connectBtnClass, "px-5 py-2 text-sm")}
              // colour of the icon inherits from the button text colour via currentColor
            >
              Let&apos;s connect
              <PartnerIcon className="h-5 w-5 text-current" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                >
                  {dropdownItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        setDropdownOpen(false);
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <item.icon className="h-5 w-5 text-gray-500" />
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

        {/* ── Mobile: Let's Connect + Hamburger ────────────────────────────── */}
        <div className="flex items-center gap-1 lg:hidden">
          {/* Let's Connect — mobile
              Fix (c): replace onTouchStart/onTouchEnd with a single onClick.
              The browser fires onClick reliably on tap; the old touch handler
              was both racing with onClick AND resetting state on touchend before
              the click could register, causing the "tap-and-hold" symptom. */}
          <button
            ref={mobileBtnRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={cn(connectBtnClass, "px-4 py-2 text-xs")}
          >
            Let&apos;s connect
            <PartnerIcon className="h-5 w-5 text-current" />
          </button>

          {/* Mobile dropdown — rendered relative to the button */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full right-4 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                // position is relative to the nav bar (which is position:fixed)
                style={{ top: "calc(100% + 8px)" }}
              >
                {dropdownItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      setDropdownOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <item.icon className="h-5 w-5 text-gray-500" />
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

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 cursor-pointer flex-col items-end justify-center gap-1.5"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              className="h-0.5 origin-center rounded-full bg-gray-900"
              style={{ width: 20 }}
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -5, width: 20 }
                  : { rotate: 0, y: 0, width: 14 }
              }
              className="h-0.5 origin-center rounded-full bg-gray-900"
              style={{ width: 14 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl lg:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 cursor-pointer items-center justify-center"
              aria-label="Close menu"
            >
              <motion.span
                animate={{ rotate: 45 }}
                className="absolute h-0.5 w-6 rounded-full bg-gray-900"
              />
              <motion.span
                animate={{ rotate: -45 }}
                className="absolute h-0.5 w-6 rounded-full bg-gray-900"
              />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => {
                const active = isLinkActive(link.href);
                return (
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
                        delay: (totalLinks - 1 - i) * 0.07,
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.07,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "relative text-3xl font-bold transition-colors",
                      active
                        ? "text-gray-900"
                        : "text-gray-900 hover:text-gray-600",
                    )}
                  >
                    {link.label}
                    <AnimatePresence>
                      {active && <SquigglyUnderline />}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modals (portalled to body) ───────────────────────────────────────── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
                >
                  {/* ── Chat modal (Fix: was missing) ─────────────────────── */}
                  {activeModal === "chat" && (
                    <>
                      <ChatIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {CONTACT.chat.label}
                      </h3>
                      <p className="mb-6 text-sm text-gray-500">
                        {CONTACT.chat.subtitle}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleCopy(CONTACT.chat.value, "chat")}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          {copiedKey === "chat" ? (
                            <>
                              <Check className="h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        {CONTACT.chat.value && (
                          <a
                            href={CONTACT.chat.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                          >
                            <ChatIcon className="h-4 w-4" />
                            Open Chat
                          </a>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Phone modal ──────────────────────────────────────── */}
                  {activeModal === "phone" && (
                    <>
                      <PhoneIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {CONTACT.phone.label}
                      </h3>
                      <p className="mb-6 text-2xl font-semibold text-gray-700">
                        {CONTACT.phone.subtitle}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleCopy(CONTACT.phone.subtitle, "phone")
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          {copiedKey === "phone" ? (
                            <>
                              <Check className="h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        <a
                          href={CONTACT.phone.value}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                        >
                          <PhoneIcon className="h-4 w-4" />
                          Call Now
                        </a>
                      </div>
                    </>
                  )}

                  {/* ── Email modal ──────────────────────────────────────── */}
                  {activeModal === "email" && (
                    <>
                      <EmailIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {CONTACT.email.label}
                      </h3>
                      <p className="mb-6 text-lg font-medium break-all text-gray-700">
                        {CONTACT.email.subtitle}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleCopy(CONTACT.email.subtitle, "email")
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          {copiedKey === "email" ? (
                            <>
                              <Check className="h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        <a
                          href={CONTACT.email.value}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                        >
                          <EmailIcon className="h-4 w-4" />
                          Mail Now
                        </a>
                      </div>
                    </>
                  )}

                  {/* ── Meeting modal ─────────────────────────────────────── */}
                  {activeModal === "meeting" && (
                    <>
                      <MeetingIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {CONTACT.meeting.label}
                      </h3>
                      <p className="mb-6 text-sm break-all text-gray-500">
                        {CONTACT.meeting.value}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleCopy(CONTACT.meeting.value, "meeting")
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          {copiedKey === "meeting" ? (
                            <>
                              <Check className="h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy to clipboard
                            </>
                          )}
                        </button>
                        <a
                          href={CONTACT.meeting.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                        >
                          <MeetingIcon className="h-4 w-4" />
                          Book Now
                        </a>
                      </div>
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
