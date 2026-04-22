# Navbar Component

A responsive, animated navigation bar built with **Next.js**, **Tailwind CSS**, and **Motion (Framer Motion)**. Supports scroll-aware shrinking, active-section highlighting, a "Let's Connect" contact dropdown, four contact modals, and a full-screen mobile menu.

---

## Import

```tsx
import { Navbar } from "@/components/navbar";
```

Place it once at the top level of your layout (e.g. `app/layout.tsx`):

```tsx
import { Navbar } from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

---

## File Structure

```
components/navbar/
├── __tests__/
│   ├── navbar.test.tsx             # Integration tests for the full Navbar
│   ├── squiggly-underline.test.tsx # Unit tests for the SVG underline
│   ├── contact-modals.test.tsx     # Unit + integration tests for all modals
│   └── nav-dropdown.test.tsx       # Unit tests for both dropdown variants
├── navbar.tsx                      # ← Main component (orchestrator)
├── squiggly-underline.tsx          # Animated SVG underline for active links
├── nav-dropdown.tsx                # "Let's Connect" button + dropdown list
├── contact-modals.tsx              # Portal-rendered contact modal system
├── live-chat-placeholder.tsx       # Isolated live-chat sub-view (TODO)
├── mobile-menu.tsx                 # Full-screen mobile nav overlay
├── use-navbar.ts                   # Custom hook — all stateful/side-effect logic
├── types.ts                        # Shared TypeScript types
├── index.ts                        # Barrel export
├── vitest.setup.ts                 # Test mocks (motion, next/image, constants)
├── README.md                       # This file
└── TODO.md                         # Upcoming work notes
```

---

## External Dependencies

| Package | Used For |
|---|---|
| `motion/react` | All animations (nav shrink, link entrance, modals, squiggly) |
| `next/image` | Optimised logo image |
| `lucide-react` | Copy / Check icons inside modals |
| `@/lib/constants` | `SITE`, `NAV_LINKS`, `CONTACT` data |
| `@/lib/utils` | `cn()` class merging utility |
| `@/components/icons` | `PhoneIcon`, `ChatIcon`, `PartnerIcon`, `MeetingIcon`, `EmailIcon` |

---

## Sub-components

### `navbar.tsx`
The root component. Owns `activeModal` state and wires together all sub-components. Computes `NAV_DONE` (the delay after the last nav link finishes animating) and passes it down as `animationDelay` to `NavDropdown`.

**Props:** none — all data comes from `@/lib/constants`.

---

### `use-navbar.ts`
Custom hook that encapsulates every piece of stateful or side-effectful logic so `navbar.tsx` stays declarative.

**Returns:**

| Key | Type | Description |
|---|---|---|
| `scrolled` | `boolean` | `true` when `scrollY > 40` |
| `dropdownOpen` | `boolean` | Dropdown visibility |
| `setDropdownOpen` | `Dispatch` | Manual control (mobile tap) |
| `mobileMenuOpen` | `boolean` | Full-screen menu visibility |
| `setMobileMenuOpen` | `Dispatch` | Toggle hamburger |
| `isMobile` | `boolean \| null` | `null` on SSR, then resolved |
| `activeSection` | `string` | ID of the most-visible section |
| `hasMounted` | `boolean` | Prevents SSR animation flicker |
| `copiedKey` | `string \| null` | Which copy button is in "Copied!" state |
| `setCopiedKey` | `Dispatch` | Used by `closeModal` to reset |
| `dropdownRef` | `RefObject<HTMLDivElement>` | Outside-click detection (desktop) |
| `mobileBtnRef` | `RefObject<HTMLButtonElement>` | Outside-click detection (mobile) |
| `navWidth` | `string` | CSS width string, responsive + scroll-aware |
| `isLinkActive` | `(href: string) => boolean` | True when the section is in view |
| `handleCopy` | `(text, key) => void` | Clipboard write with 2 s feedback |

**Side effects:**
- `scroll` and `resize` event listeners (passive, cleaned up on unmount)
- `IntersectionObserver` on each section matching `NAV_LINKS[].href`
- `mousedown` / `touchstart` listeners when dropdown is open (outside-click)

---

### `squiggly-underline.tsx`
Pure visual component. Renders an SVG `<path>` that draws itself with a stroke-dashoffset animation over 0.6 s. No props, no state. Rendered inside `<AnimatePresence>` by both the desktop nav and the mobile menu.

**Animation:** `strokeDashoffset` from `84.2` → `0`, easing `easeOut`.

---

### `nav-dropdown.tsx`
Renders the "Let's Connect" button and its dropdown list of contact items.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `variant` | `"desktop" \| "mobile"` | Controls layout and open trigger |
| `items` | `DropdownItem[]` | List of contact options |
| `isOpen` | `boolean` | Controlled open state |
| `onOpen` | `() => void` | Called on `mouseEnter` (desktop) or button click when closed (mobile) |
| `onClose` | `() => void` | Called on `mouseLeave` (desktop) or button click when open (mobile) |
| `dropdownRef` | `RefObject<HTMLDivElement>` | Forwarded for outside-click detection |
| `mobileBtnRef` | `RefObject<HTMLButtonElement>` | Forwarded for outside-click detection |
| `animationDelay` | `number` | Entrance animation delay in seconds |
| `hasMounted` | `boolean` | Skips entrance animation on first SSR→CSR paint |

**Behaviour:**
- Desktop: the wrapper `div` listens to `mouseEnter`/`mouseLeave` so the whole button + dropdown area keeps the menu open.
- Mobile: a single button toggles open/close; the dropdown is `position: absolute` relative to the wrapper.

---

### `contact-modals.tsx`
Renders all four contact modals (`chat`, `phone`, `email`, `meeting`) via `createPortal` into `document.body`.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `activeModal` | `ModalType` | Which modal to show (`null` = none) |
| `onClose` | `() => void` | Dismisses modal; also resets `copiedKey` |
| `copiedKey` | `string \| null` | Drives the Copy → Copied! transition |
| `onCopy` | `(text, key) => void` | Clipboard handler from `useNavbar` |

**Chat modal internal state:** manages `subModal: SubModalType` locally because the WhatsApp / Live Chat split is scoped entirely to the chat flow. Resetting `subModal` to `null` on close is handled inside `ContactModals` itself.

---

### `live-chat-placeholder.tsx`
Isolated sub-view shown when the user clicks "Open Live Chat" inside the chat modal.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `onBack` | `() => void` | Returns to the main chat options view |

Currently shows a centred "Live Chat" heading. **This is the only file that needs to change when the Telegram integration is built.** See `TODO.md`.

---

### `mobile-menu.tsx`
Full-screen overlay navigation shown on `< lg` viewports.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Visibility |
| `onClose` | `() => void` | Called by close button and nav link clicks |
| `isLinkActive` | `(href: string) => boolean` | Highlights the active section link |

Links animate in sequentially on open and reverse-sequentially on close. Only nav links are shown; contact options remain in the `NavDropdown` button in the bar.

---

## Active Section Detection

`useNavbar` creates one `IntersectionObserver` per section ID derived from `NAV_LINKS[].href` (strips the leading `#`). Each section element must exist in the DOM with a matching `id` attribute.

The most visible section (highest `intersectionRatio`) wins. The `rootMargin` is `-20% 0px -20% 0px` so sections near the very top/bottom of the viewport don't flicker.

```html
<!-- Example: your page sections must have matching IDs -->
<section id="about">...</section>
<section id="work">...</section>
<section id="contact">...</section>
```

---

## Running Tests

```bash
# Run all tests once
npx vitest run

# Watch mode
npx vitest

# With coverage
npx vitest run --coverage
```

Ensure `vitest.config.ts` includes:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./components/navbar/vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

> If you already have a root-level `vitest.setup.ts`, merge the mock registrations from `navbar/vitest.setup.ts` into it rather than duplicating the `setupFiles` array.

---

## Data Configuration

All displayed text, links, and contact info lives in `@/lib/constants`. The navbar reads:

```ts
SITE.name      // Used as logo alt text and aria-label
SITE.logo      // Path to the logo image

NAV_LINKS      // Array of { href: string; label: string }
               // href should be a hash matching a section id (#about, #work…)

CONTACT.chat    // { label, subtitle, value }  — WhatsApp URL
CONTACT.phone   // { label, subtitle, value }  — tel: link, subtitle shown as number
CONTACT.email   // { label, subtitle, value }  — mailto: link, subtitle shown as address
CONTACT.meeting // { label, subtitle, value }  — booking URL shown and linked
```

To update contact info, edit only `@/lib/constants` — no component changes needed.
