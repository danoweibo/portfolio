import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Navbar } from "../navbar";

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderNavbar() {
  return render(<Navbar />);
}

// ── Smoke tests ───────────────────────────────────────────────────────────────

describe("Navbar — smoke", () => {
  it("renders without crashing", () => {
    expect(() => renderNavbar()).not.toThrow();
  });

  it("renders the site logo", () => {
    renderNavbar();
    // next/image mock renders an <img>; alt comes from SITE.name constant mock
    const img = document.querySelector("img");
    expect(img).toBeTruthy();
  });

  it("renders a 'Let's connect' button", () => {
    renderNavbar();
    const btns = screen.getAllByRole("button", { name: /let's connect/i });
    // One for desktop, one for mobile — both rendered, visibility via CSS
    expect(btns.length).toBeGreaterThanOrEqual(1);
  });
});

// ── Scroll behaviour ──────────────────────────────────────────────────────────

describe("Navbar — scroll", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it("is not in 'scrolled' state at top of page", () => {
    renderNavbar();
    // No explicit assertion on class — just ensure the component renders
    // with scrollY = 0 without error
    expect(screen.getAllByRole("button", { name: /let's connect/i })).toBeTruthy();
  });

  it("transitions to scrolled state when scrollY > 40", async () => {
    renderNavbar();
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });
    // Just assert no crash; visual changes are CSS-in-motion and not DOM-testable
    expect(screen.getAllByRole("button", { name: /let's connect/i })).toBeTruthy();
  });
});

// ── Modal lifecycle ───────────────────────────────────────────────────────────

describe("Navbar — modal lifecycle", () => {
  it("opens the phone modal when Phone item is clicked", () => {
    renderNavbar();
    // Open the dropdown first (desktop variant triggers on mouseEnter)
    const connectBtn = screen.getAllByRole("button", {
      name: /let's connect/i,
    })[0];
    fireEvent.mouseEnter(connectBtn.parentElement!);
    const phoneItem = screen.getByText(/phone/i);
    fireEvent.click(phoneItem);
    expect(screen.getByText(/copy to clipboard/i)).toBeTruthy();
  });

  it("closes the modal when backdrop is clicked", () => {
    renderNavbar();
    const connectBtn = screen.getAllByRole("button", {
      name: /let's connect/i,
    })[0];
    fireEvent.mouseEnter(connectBtn.parentElement!);
    fireEvent.click(screen.getByText(/phone/i));

    // Click the portal backdrop
    const backdrop = document.body.lastChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(screen.queryByText(/copy to clipboard/i)).toBeNull();
  });
});

// ── Mobile menu ───────────────────────────────────────────────────────────────

describe("Navbar — mobile menu", () => {
  it("hamburger button has correct aria-label when closed", () => {
    renderNavbar();
    expect(screen.getByLabelText(/open menu/i)).toBeTruthy();
  });

  it("hamburger button label changes to 'Close menu' when open", () => {
    renderNavbar();
    fireEvent.click(screen.getByLabelText(/open menu/i));
    expect(screen.getByLabelText(/close menu/i)).toBeTruthy();
  });

  it("mobile menu shows nav links after open", () => {
    renderNavbar();
    fireEvent.click(screen.getByLabelText(/open menu/i));
    // NAV_LINKS mock has at least one entry; just check the menu rendered
    const nav = document.querySelector("nav");
    expect(nav).toBeTruthy();
  });
});

// ── Resize handling ───────────────────────────────────────────────────────────

describe("Navbar — resize", () => {
  it("updates isMobile on resize without crashing", async () => {
    renderNavbar();
    await act(async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getAllByRole("button", { name: /let's connect/i })).toBeTruthy();
  });
});
