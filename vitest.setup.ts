/**
 * vitest.setup.ts  —  place this at your project root and add to vitest.config.ts:
 *
 *   test: {
 *     environment: "jsdom",
 *     setupFiles: ["./vitest.setup.ts"],
 *   }
 *
 * Mocks:
 *  - motion/react      → renders plain HTML elements, no animation
 *  - next/image        → renders a plain <img>
 *  - @/lib/constants   → stable fixture data for all navbar tests
 *  - @/lib/utils       → real cn() pass-through (clsx-style)
 *  - @/components/icons → lightweight SVG stubs
 */

import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// ── motion/react ─────────────────────────────────────────────────────────────
// Replace every animated primitive with its plain HTML counterpart so tests
// are not blocked on WAAPI / requestAnimationFrame.
vi.mock("motion/react", () => {
  const makeForwardRef = (tag: string) =>
    React.forwardRef(
      (
        {
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
        ref: React.Ref<HTMLElement>,
      ) => {
        // Strip motion-specific props before passing to DOM
        const {
          initial,
          animate,
          exit,
          transition,
          whileHover,
          whileTap,
          whileFocus,
          whileDrag,
          variants,
          layout,
          layoutId,
          onAnimationStart,
          onAnimationComplete,
          onUpdate,
          ...domProps
        } = props as Record<string, unknown>;

        return React.createElement(tag, { ...domProps, ref }, children);
      },
    );

  const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => makeForwardRef(prop),
      },
    ),
    AnimatePresence,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn() }),
    useTransform: (_mv: unknown, _from: unknown, _to: unknown) => ({
      get: () => 0,
    }),
  };
});

// ── next/image ───────────────────────────────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => React.createElement("img", { src, alt, width, height, className }),
}));

// ── @/components/navbar/constants ────────────────────────────────────────────────
vi.mock("@/components/navbar/constants", () => ({
  Site: {
    name: "Acme",
    logo: "/logo.svg",
  },
  Links: [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ],
  Contact: {
    chat: {
      label: "Chat with us",
      subtitle: "Fast replies on WhatsApp",
      value: "https://wa.me/123456789",
    },
    phone: {
      label: "Call us",
      subtitle: "+1 (555) 000-0000",
      value: "tel:+15550000000",
    },
    email: {
      label: "Email us",
      subtitle: "hello@acme.com",
      value: "mailto:hello@acme.com",
    },
    meeting: {
      label: "Book a meeting",
      subtitle: "30-minute intro call",
      value: "https://cal.com/acme",
    },
  },
}));

// ── @/lib/utils ───────────────────────────────────────────────────────────────
vi.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) =>
    args
      .flat()
      .filter((x) => typeof x === "string" && x.length > 0)
      .join(" "),
}));

// ── @/components/icons ────────────────────────────────────────────────────────
const IconStub = (props: React.SVGProps<SVGSVGElement>) =>
  React.createElement("svg", { "data-testid": "icon", ...props });

vi.mock("@/components/icons", () => ({
  PhoneIcon: IconStub,
  ChatIcon: IconStub,
  PartnerIcon: IconStub,
  MeetingIcon: IconStub,
  EmailIcon: IconStub,
  WhatsAppIcon: IconStub,
}));
