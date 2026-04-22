import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { NavDropdown } from "@/components/navbar/dropdown";
import type { DropdownItem } from "@/lib/types";

// ── Shared fixtures ──────────────────────────────────────────────────────────

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-icon" {...props} />
);

function makeItems(overrides: Partial<DropdownItem>[] = []): DropdownItem[] {
  return [
    {
      icon: MockIcon,
      label: "Chat",
      subtitle: "Message us",
      action: vi.fn(),
    },
    {
      icon: MockIcon,
      label: "Phone",
      subtitle: "Call us",
      action: vi.fn(),
    },
    ...overrides.map((o) => ({
      icon: MockIcon,
      label: "Extra",
      subtitle: "extra subtitle",
      action: vi.fn(),
      ...o,
    })),
  ];
}

function defaultProps(
  overrides: Partial<React.ComponentProps<typeof NavDropdown>> = {},
): React.ComponentProps<typeof NavDropdown> {
  return {
    items: makeItems(),
    isOpen: false,
    onOpen: vi.fn(),
    onClose: vi.fn(),
    dropdownRef: createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>,
    mobileBtnRef:
      createRef<HTMLButtonElement>() as React.RefObject<HTMLButtonElement>,
    variant: "desktop",
    animationDelay: 0,
    hasMounted: true,
    ...overrides,
  };
}

// ── Desktop variant ──────────────────────────────────────────────────────────

describe("NavDropdown — desktop variant", () => {
  it("renders the trigger button", () => {
    render(<NavDropdown {...defaultProps()} />);
    expect(screen.getByRole("button", { name: /let's connect/i })).toBeTruthy();
  });

  it("does not render dropdown list when closed", () => {
    render(<NavDropdown {...defaultProps({ isOpen: false })} />);
    expect(screen.queryByText("Chat")).toBeNull();
  });

  it("renders dropdown items when open", () => {
    render(<NavDropdown {...defaultProps({ isOpen: true })} />);
    expect(screen.getByText("Chat")).toBeTruthy();
    expect(screen.getByText("Phone")).toBeTruthy();
  });

  it("calls onOpen on mouseEnter", () => {
    const onOpen = vi.fn();
    render(<NavDropdown {...defaultProps({ onOpen })} />);
    const wrapper = screen
      .getByRole("button", { name: /let's connect/i })
      .closest("div")!;
    fireEvent.mouseEnter(wrapper);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on mouseLeave", () => {
    const onClose = vi.fn();
    render(<NavDropdown {...defaultProps({ onClose })} />);
    const wrapper = screen
      .getByRole("button", { name: /let's connect/i })
      .closest("div")!;
    fireEvent.mouseLeave(wrapper);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls item action and onClose when a dropdown item is clicked", () => {
    const action = vi.fn();
    const onClose = vi.fn();
    const items = makeItems();
    items[0].action = action;
    render(<NavDropdown {...defaultProps({ isOpen: true, items, onClose })} />);
    fireEvent.click(screen.getByText("Chat"));
    expect(action).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders item subtitles", () => {
    render(<NavDropdown {...defaultProps({ isOpen: true })} />);
    expect(screen.getByText("Message us")).toBeTruthy();
    expect(screen.getByText("Call us")).toBeTruthy();
  });
});

// ── Mobile variant ───────────────────────────────────────────────────────────

describe("NavDropdown — mobile variant", () => {
  it("renders the trigger button", () => {
    render(<NavDropdown {...defaultProps({ variant: "mobile" })} />);
    expect(screen.getByRole("button", { name: /let's connect/i })).toBeTruthy();
  });

  it("calls onOpen when button clicked while closed", () => {
    const onOpen = vi.fn();
    render(
      <NavDropdown
        {...defaultProps({ variant: "mobile", isOpen: false, onOpen })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /let's connect/i }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when button clicked while open", () => {
    const onClose = vi.fn();
    render(
      <NavDropdown
        {...defaultProps({ variant: "mobile", isOpen: true, onClose })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /let's connect/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders dropdown items when open", () => {
    render(
      <NavDropdown {...defaultProps({ variant: "mobile", isOpen: true })} />,
    );
    expect(screen.getByText("Chat")).toBeTruthy();
    expect(screen.getByText("Phone")).toBeTruthy();
  });
});
