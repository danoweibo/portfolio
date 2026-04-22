"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { SITE, NAV_LINKS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  PhoneIcon,
  ChatIcon,
  MeetingIcon,
  EmailIcon,
} from "@/components/icons";
import { useNavbar } from "./use-navbar";
import { SquigglyUnderline } from "./squiggly-underline";
import { NavDropdown } from "./nav-dropdown";
import { MobileMenu } from "./mobile-menu";
import { ContactModals } from "./contact-modals";
import type { ModalType } from "@/lib/types";

/**
 * Top-level Navbar component.
 *
 * Responsibilities:
 *  - Owns `activeModal` state (which contact modal is open)
 *  - Composes all sub-components: logo, desktop nav links, NavDropdown,
 *    MobileMenu hamburger, ContactModals portal
 *  - Delegates scroll / resize / intersection / copy logic to `useNavbar`
 *
 * Import via the barrel:  import { Navbar } from "@/components/navbar"
 */
export function Navbar() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const {
    scrolled,
    dropdownOpen,
    setDropdownOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    hasMounted,
    copiedKey,
    setCopiedKey,
    dropdownRef,
    mobileBtnRef,
    navWidth,
    isLinkActive,
    handleCopy,
  } = useNavbar();

  const closeModal = () => {
    setActiveModal(null);
    setCopiedKey(null);
  };

  // Delay so the "Let's Connect" button appears after the last nav link
  const NAV_DONE = 0.2 + (NAV_LINKS.length - 1) * 0.08 + 0.4;

  // Items passed to both dropdown variants
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
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <motion.a
          href="/"
          aria-label={`${SITE.name} home`}
          initial={hasMounted ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="shrink-0"
        >
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </motion.a>

        {/* ── Desktop nav links + dropdown ──────────────────────────────── */}
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

          <NavDropdown
            variant="desktop"
            items={dropdownItems}
            isOpen={dropdownOpen}
            onOpen={() => setDropdownOpen(true)}
            onClose={() => setDropdownOpen(false)}
            dropdownRef={dropdownRef}
            mobileBtnRef={mobileBtnRef}
            animationDelay={NAV_DONE}
            hasMounted={hasMounted}
          />
        </div>

        {/* ── Mobile: dropdown + hamburger ──────────────────────────────── */}
        <div className="flex items-center gap-1 lg:hidden">
          <NavDropdown
            variant="mobile"
            items={dropdownItems}
            isOpen={dropdownOpen}
            onOpen={() => setDropdownOpen(true)}
            onClose={() => setDropdownOpen(false)}
            dropdownRef={dropdownRef}
            mobileBtnRef={mobileBtnRef}
            animationDelay={NAV_DONE}
            hasMounted={hasMounted}
          />

          {/* Hamburger toggle */}
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

      {/* ── Mobile full-screen menu ───────────────────────────────────────── */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isLinkActive={isLinkActive}
      />

      {/* ── Contact modals ────────────────────────────────────────────────── */}
      <ContactModals
        activeModal={activeModal}
        onClose={closeModal}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />
    </>
  );
}
