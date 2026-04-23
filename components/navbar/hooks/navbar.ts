/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";

import { Links } from "@/components/navbar/constants";

export function useNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  // ── Mount + scroll + resize ──────────────────────────────────────────────
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

  // ── IntersectionObserver for active section ──────────────────────────────
  useEffect(() => {
    if (!hasMounted) return;

    const sectionIds = Links.map((l) => l.href.replace(/^#/, "")).filter(
      Boolean,
    );
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    const pickActive = () => {
      if (visibleSections.size === 0) {
        setActiveSection("");
        return;
      }
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
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-20% 0px -20% 0px",
        },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [hasMounted]);

  // ── Close dropdown on outside click ─────────────────────────────────────
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

  // ── Copy to clipboard ────────────────────────────────────────────────────
  const handleCopy = (text: string, key: string) => {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
      } catch (_) {}
      document.body.removeChild(ta);
    };

    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }

    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ── Computed nav width ───────────────────────────────────────────────────
  let navWidth: string;
  if (isMobile === true) {
    navWidth = scrolled ? "88%" : "96%";
  } else {
    navWidth = scrolled ? "66.666%" : "83.333%";
  }

  // ── Squiggly active check ────────────────────────────────────────────────
  const isLinkActive = (href: string) => {
    const id = href.replace(/^#/, "");
    return activeSection === id;
  };

  return {
    scrolled,
    dropdownOpen,
    setDropdownOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    isMobile,
    activeSection,
    hasMounted,
    copiedKey,
    setCopiedKey,
    dropdownRef,
    mobileBtnRef,
    navWidth,
    isLinkActive,
    handleCopy,
  };
}
