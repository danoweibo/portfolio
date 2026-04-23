import { useState } from "react";

import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

import {
  PhoneIcon,
  ChatIcon,
  EmailIcon,
  MeetingIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { LiveChat } from "@/components/navbar/chat";
import { Contact } from "@/components/navbar/constants";

import type { ModalType, SubModalType } from "@/lib/types";

interface ContactModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  /** Lifted from useNavbar so copy state resets correctly on modal close */
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

/**
 * Renders all four Contact modals (chat | phone | email | meeting) via a
 * React portal into `document.body`.
 *
 * The chat modal internally manages the `subModal` state (default view vs.
 * the live-chat sub-view) because that state is purely local to the chat flow.
 *
 * `copiedKey` and `onCopy` are owned by `useNavbar` so that the copied state
 * is reset whenever the parent closes the modal.
 */
export function ContactModals({
  activeModal,
  onClose,
  copiedKey,
  onCopy,
}: ContactModalsProps) {
  const [subModal, setSubModal] = useState<SubModalType>(null);

  // Reset sub-modal whenever the parent modal closes
  const handleClose = () => {
    setSubModal(null);
    onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
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
            {/* ── Chat ──────────────────────────────────────────────────── */}
            {activeModal === "chat" && (
              <AnimatePresence mode="wait">
                {subModal === "liveChat" ? (
                  <LiveChat onBack={() => setSubModal(null)} />
                ) : (
                  <motion.div
                    key="chatOptions"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ChatIcon className="mx-auto mb-4 h-12 w-12 text-stone-700" />
                    <h3 className="mb-2 text-xl font-bold text-black">
                      {Contact.chat.label}
                    </h3>
                    <p className="text-md mb-6 font-semibold text-gray-500">
                      {Contact.chat.subtitle}
                    </p>
                    <div className="space-y-3 md:flex md:gap-3 md:space-y-0">
                      <a
                        href={Contact.chat.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Chat on WhatsApp
                      </a>
                      <button
                        onClick={() => setSubModal("liveChat")}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 md:w-fit"
                      >
                        Open Live Chat
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* ── Phone ─────────────────────────────────────────────────── */}
            {activeModal === "phone" && (
              <>
                <PhoneIcon className="mx-auto mb-4 h-12 w-12 text-stone-700" />
                <h3 className="mb-2 text-xl font-bold text-black">
                  {Contact.phone.label}
                </h3>
                <p className="text-md mb-6 font-semibold text-gray-500">
                  {Contact.phone.subtitle}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onCopy(Contact.phone.subtitle, "phone")}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {copiedKey === "phone" ? (
                      <>
                        <Check className="h-4 w-4" strokeWidth={3} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={3} /> Copy to
                        clipboard
                      </>
                    )}
                  </button>
                  <a
                    href={Contact.phone.value}
                    className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
                  >
                    Call Now
                  </a>
                </div>
              </>
            )}

            {/* ── Email ─────────────────────────────────────────────────── */}
            {activeModal === "email" && (
              <>
                <EmailIcon className="mx-auto mb-4 h-12 w-12 text-stone-700" />
                <h3 className="mb-2 text-xl font-bold text-black">
                  {Contact.email.label}
                </h3>
                <p className="text-md mb-6 font-semibold break-all text-gray-500">
                  {Contact.email.subtitle}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onCopy(Contact.email.subtitle, "email")}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {copiedKey === "email" ? (
                      <>
                        <Check className="h-4 w-4" strokeWidth={3} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={3} /> Copy to
                        clipboard
                      </>
                    )}
                  </button>
                  <a
                    href={Contact.email.value}
                    className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
                  >
                    Mail Now
                  </a>
                </div>
              </>
            )}

            {/* ── Meeting ───────────────────────────────────────────────── */}
            {activeModal === "meeting" && (
              <>
                <MeetingIcon className="mx-auto mb-4 h-12 w-12 text-stone-700" />
                <h3 className="mb-2 text-xl font-bold text-black">
                  {Contact.meeting.label}
                </h3>
                <p className="mb-6 text-sm font-semibold break-all text-gray-500">
                  {Contact.meeting.subtitle}
                </p>
                <a
                  href={Contact.meeting.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
                >
                  Book Now
                </a>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
