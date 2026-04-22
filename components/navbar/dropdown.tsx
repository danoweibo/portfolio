import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { PartnerIcon } from "@/components/icons";
import { motion, AnimatePresence } from "motion/react";
import type { DropdownItem } from "@/lib/types";

interface NavDropdownProps {
  /** Items to render inside the dropdown list */
  items: DropdownItem[];
  isOpen: boolean;
  /** desktop: hover open/close; mobile: toggle on click */
  onOpen: () => void;
  onClose: () => void;
  /** Forwarded ref so useNavbar can detect outside clicks */
  dropdownRef: RefObject<HTMLDivElement>;
  mobileBtnRef: RefObject<HTMLButtonElement>;
  /** Controls desktop vs mobile rendering variant */
  variant: "desktop" | "mobile";
  /** Delay after nav links finish animating in */
  animationDelay: number;
  hasMounted: boolean;
}

const connectBtnClass = cn(
  "inline-flex items-center justify-center gap-2 cursor-pointer rounded-full bg-black",
  "text-white font-semibold",
  "transition-colors duration-200 ease-in-out",
  "hover:bg-gray-50 hover:text-gray-900 active:bg-gray-50 active:text-gray-900",
  "data-[open=true]:bg-gray-50 data-[open=true]:text-gray-900",
);

/**
 * "Let's Connect" button + dropdown menu.
 *
 * Renders two variants from one component:
 *  - `desktop` — attached to a `div` ref, opens on `mouseEnter/Leave`
 *  - `mobile`  — button ref only, opens on click (positioned absolute)
 */
export function NavDropdown({
  items,
  isOpen,
  onOpen,
  onClose,
  dropdownRef,
  mobileBtnRef,
  variant,
  animationDelay,
  hasMounted,
}: NavDropdownProps) {
  const dropdownList = (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "absolute top-full mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl",
        variant === "desktop" ? "right-0 w-64" : "right-4 z-50 w-56",
      )}
      style={variant === "mobile" ? { top: "calc(100% + 8px)" } : undefined}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            item.action();
            onClose();
          }}
          className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
        >
          <item.icon className="h-6 w-6 text-black/55" />
          <div>
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            <p className="text-xs text-gray-500">{item.subtitle}</p>
          </div>
        </button>
      ))}
    </motion.div>
  );

  if (variant === "desktop") {
    return (
      <motion.div
        ref={dropdownRef}
        className="relative"
        initial={hasMounted ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <button
          className={cn(connectBtnClass, "px-5 py-2 text-sm")}
          data-open={isOpen}
        >
          Let&apos;s connect
          <PartnerIcon className="h-5 w-5 text-current" />
        </button>

        <AnimatePresence>{isOpen && dropdownList}</AnimatePresence>
      </motion.div>
    );
  }

  // Mobile variant — button ref sits here, dropdown is absolutely positioned
  return (
    <motion.div
      className="relative"
      initial={hasMounted ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1">
        <button
          ref={mobileBtnRef}
          onClick={isOpen ? onClose : onOpen}
          className={cn(connectBtnClass, "px-4 py-2 text-xs")}
          data-open={isOpen}
        >
          Let&apos;s connect
          <PartnerIcon className="h-5 w-5 text-current" />
        </button>
      </div>

      <AnimatePresence>{isOpen && dropdownList}</AnimatePresence>
    </motion.div>
  );
}
