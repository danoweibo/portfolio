"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortfolioLogo from "@/components/branding/logo";
import {
  PhoneIcon,
  ChatIcon,
  MeetingIcon,
  EmailIcon,
} from "@/components/icons";
import { Contact, Links } from "@/components/navbar/constants";
import { NavDropdown } from "@/components/navbar/dropdown";
import { useNavbar } from "@/components/navbar/hooks/navbar";
import { MobileMenu } from "@/components/navbar/menu";
import { ContactModals } from "@/components/navbar/modals";
import { SquigglyUnderline } from "@/components/navbar/squiggly";
import { Site } from "@/lib/constants";
import type { ModalType } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Top-level Navbar component.
 *
 * Responsibilities:
 *  - Owns `activeModal` state (which Contact modal is open)
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
  const NAV_DONE = 0.2 + (Links.length - 1) * 0.08 + 0.4;

  // Items passed to both dropdown variants
  const dropdownItems = [
    {
      icon: ChatIcon,
      label: Contact.chat.label,
      subtitle: Contact.chat.subtitle,
      action: () => setActiveModal("chat"),
    },
    {
      icon: PhoneIcon,
      label: Contact.phone.label,
      subtitle: Contact.phone.subtitle,
      action: () => setActiveModal("phone"),
    },
    {
      icon: EmailIcon,
      label: Contact.email.label,
      subtitle: Contact.email.subtitle,
      action: () => setActiveModal("email"),
    },
    {
      icon: MeetingIcon,
      label: Contact.meeting.label,
      subtitle: Contact.meeting.subtitle,
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
          aria-label={`${Site.name} home`}
          initial={hasMounted ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="shrink-0"
        >
          <PortfolioLogo size={48} className="h-12 w-12" />
        </motion.a>

        {/* ── Desktop nav links + dropdown ──────────────────────────────── */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {Links.map((link, i) => {
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
                      "relative text-sm font-semibold transition-colors",
                      active
                        ? "font-bold text-black"
                        : "text-gray-800 hover:text-black",
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
            dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
            mobileBtnRef={mobileBtnRef as React.RefObject<HTMLButtonElement>}
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
            dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
            mobileBtnRef={mobileBtnRef as React.RefObject<HTMLButtonElement>}
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
