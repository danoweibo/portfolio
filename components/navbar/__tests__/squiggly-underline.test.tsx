import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SquigglyUnderline } from "../squiggly-underline";

// motion/react and framer-motion are mocked in vitest.setup.ts (see root config)
describe("SquigglyUnderline", () => {
  it("renders without crashing", () => {
    const { container } = render(<SquigglyUnderline />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders an SVG element", () => {
    const { container } = render(<SquigglyUnderline />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
  });

  it("SVG path has correct stroke color", () => {
    const { container } = render(<SquigglyUnderline />);
    const path = container.querySelector("path");
    expect(path).toBeTruthy();
    expect(path?.getAttribute("stroke")).toBe("#7043EC");
  });

  it("SVG preserves aspect ratio with 'none'", () => {
    const { container } = render(<SquigglyUnderline />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("preserveAspectRatio")).toBe("none");
  });

  it("wrapper div has pointer-events-none so it doesn't capture clicks", () => {
    const { container } = render(<SquigglyUnderline />);
    // motion.div renders as a plain div in the mock
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("pointer-events-none");
  });
});
