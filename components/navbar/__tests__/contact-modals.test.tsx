import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactModals } from "../modals";

// document.body is the portal target — jsdom provides it automatically.

// ── CONTACT mock values (mirrors what constants would export) ────────────────
// The constants module is auto-mocked in vitest.setup — individual test files
// can override via vi.mock if needed. Here we rely on the global mock.

function renderModals(
  overrides: Partial<React.ComponentProps<typeof ContactModals>> = {},
) {
  return render(
    <ContactModals
      activeModal={null}
      onClose={vi.fn()}
      copiedKey={null}
      onCopy={vi.fn()}
      {...overrides}
    />,
  );
}

// ── No modal ─────────────────────────────────────────────────────────────────

describe("ContactModals — null state", () => {
  it("renders nothing when activeModal is null", () => {
    renderModals({ activeModal: null });
    // Portal container is present but empty
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.querySelector("[data-testid]")).toBeNull();
  });
});

// ── Phone modal ───────────────────────────────────────────────────────────────

describe("ContactModals — phone", () => {
  it("shows phone label heading", () => {
    renderModals({ activeModal: "phone" });
    expect(screen.getByText(/call us|phone/i)).toBeTruthy();
  });

  it("Copy button shows 'Copy to clipboard' by default", () => {
    renderModals({ activeModal: "phone" });
    expect(screen.getByText(/copy to clipboard/i)).toBeTruthy();
  });

  it("Copy button shows 'Copied!' when copiedKey is 'phone'", () => {
    renderModals({ activeModal: "phone", copiedKey: "phone" });
    expect(screen.getByText(/copied!/i)).toBeTruthy();
  });

  it("clicking copy calls onCopy", () => {
    const onCopy = vi.fn();
    renderModals({ activeModal: "phone", onCopy });
    fireEvent.click(screen.getByText(/copy to clipboard/i));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    renderModals({ activeModal: "phone", onClose });
    // The backdrop is the outermost motion.div (first child of body portal)
    const backdrop = document.body.lastChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("does NOT call onClose when the modal card is clicked", () => {
    const onClose = vi.fn();
    renderModals({ activeModal: "phone", onClose });
    // Click the heading — it's inside the card which stops propagation
    fireEvent.click(screen.getByText(/copy to clipboard/i));
    expect(onClose).not.toHaveBeenCalled();
  });
});

// ── Email modal ───────────────────────────────────────────────────────────────

describe("ContactModals — email", () => {
  it("shows email label heading", () => {
    renderModals({ activeModal: "email" });
    expect(screen.getByText(/email|mail/i)).toBeTruthy();
  });

  it("Copy button shows 'Copied!' when copiedKey is 'email'", () => {
    renderModals({ activeModal: "email", copiedKey: "email" });
    expect(screen.getByText(/copied!/i)).toBeTruthy();
  });

  it("Copy button does NOT show 'Copied!' when copiedKey is 'phone'", () => {
    renderModals({ activeModal: "email", copiedKey: "phone" });
    expect(screen.getByText(/copy to clipboard/i)).toBeTruthy();
  });
});

// ── Meeting modal ─────────────────────────────────────────────────────────────

describe("ContactModals — meeting", () => {
  it("renders a 'Book Now' link", () => {
    renderModals({ activeModal: "meeting" });
    expect(screen.getByText(/book now/i)).toBeTruthy();
  });
});

// ── Chat modal ────────────────────────────────────────────────────────────────

describe("ContactModals — chat", () => {
  it("shows WhatsApp and Live Chat buttons by default", () => {
    renderModals({ activeModal: "chat" });
    expect(screen.getByText(/chat on whatsapp/i)).toBeTruthy();
    expect(screen.getByText(/open live chat/i)).toBeTruthy();
  });

  it("switches to LiveChatPlaceholder when 'Open Live Chat' is clicked", () => {
    renderModals({ activeModal: "chat" });
    fireEvent.click(screen.getByText(/open live chat/i));
    // LiveChatPlaceholder renders "Live Chat" heading and a Back button
    expect(screen.getByText("Live Chat")).toBeTruthy();
    expect(screen.getByText(/back/i)).toBeTruthy();
  });

  it("returns to chat options when Back is clicked in LiveChatPlaceholder", () => {
    renderModals({ activeModal: "chat" });
    fireEvent.click(screen.getByText(/open live chat/i));
    fireEvent.click(screen.getByText(/back/i));
    expect(screen.getByText(/chat on whatsapp/i)).toBeTruthy();
  });
});
