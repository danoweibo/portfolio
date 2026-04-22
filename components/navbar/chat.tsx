import { motion } from "motion/react";

interface LiveChatProps {
  onBack: () => void;
}

export function LiveChat({ onBack }: LiveChatProps) {
  return (
    <motion.div
      key="liveChat"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex cursor-pointer items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* ── Replace this block with the Telegram-powered chat UI ── */}
      <div className="flex h-48 items-center justify-center">
        <p className="text-lg font-semibold text-gray-900">
          Not supported yet!
        </p>
      </div>
    </motion.div>
  );
}
