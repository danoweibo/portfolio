import { motion, AnimatePresence } from "motion/react";
import { Links } from "@/components/navbar/constants";
import { SquigglyUnderline } from "@/components/navbar/squiggly";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLinkActive: (href: string) => boolean;
}

/**
 * Full-screen overlay navigation rendered on mobile (< lg breakpoint).
 *
 * Links animate in sequentially on open and reverse-sequentially on close.
 * The squiggly underline appears beneath the currently active section link.
 *
 * Only nav links are shown here — the "Let's Connect" contact options
 * are accessible via the dropdown button in the main navbar bar.
 */
export function MobileMenu({ isOpen, onClose, isLinkActive }: MobileMenuProps) {
  const totalLinks = Links.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl lg:hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
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

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-8">
            {Links.map((link, i) => {
              const active = isLinkActive(link.href);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
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
  );
}
