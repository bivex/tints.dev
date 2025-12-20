/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T09:04:05
 * Last Updated: 2025-12-19T09:05:40
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Demo from "./Demo";

const mockPalette = {
  id: "test-palette",
  name: "Test Palette",
  value: "#3B82F6",
  valueStop: 500,
  swatches: [
    { stop: 50, hex: "#eff6ff" },
    { stop: 100, hex: "#dbeafe" },
    { stop: 200, hex: "#bfdbfe" },
    { stop: 300, hex: "#93c5fd" },
    { stop: 400, hex: "#60a5fa" },
    { stop: 500, hex: "#3b82f6" },
    { stop: 600, hex: "#2563eb" },
    { stop: 700, hex: "#1d4ed8" },
    { stop: 800, hex: "#1e40af" },
    { stop: 900, hex: "#1e3a8a" },
  ],
  h: 217,
  s: 91,
  lMin: 0,
  lMax: 100,
  colorMode: "perceived" as const,
  mode: "oklch" as const,
  stopSelection: "auto",
  generationMode: "curated" as const,
  colorScheme: "monochromatic" as const,
  temperature: "neutral" as const,
  contrast: "auto" as const,
  accessibility: false,
  description: "Test palette description",
  tags: ["test"],
};

const mockProps = {
  close: vi.fn(),
  palette: mockPalette,
  title: "Test Title",
  description: "Test description",
  features: [
    { label: "Uptime", value: "99.99%" },
    { label: "Funding", value: "$159m" },
  ],
  callToActionButtons: [
    { label: "Explore", onClick: vi.fn() },
    { label: "About", onClick: vi.fn() },
  ],
  imageUrl: "/test-image.jpg",
  isDarkMode: false,
  onToggleDarkMode: vi.fn(),
  tags: ["modern-analogous-1"],
  palettes: [mockPalette],
};

describe("Demo Component", () => {
  it("renders all UI components correctly", () => {
    render(<Demo {...mockProps} />);

    // Check if title is rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("Test description")).toBeInTheDocument();

    // Check if features are rendered
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("99.99%")).toBeInTheDocument();

    // Check if tag is rendered
    expect(screen.getByText("modern-analogous-1")).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("calls onToggleDarkMode when toggle button is clicked", () => {
    render(<Demo {...mockProps} />);

    const toggleButton = screen.getByRole("button", { name: /moon|sun/i });
    fireEvent.click(toggleButton);

    expect(mockProps.onToggleDarkMode).toHaveBeenCalled();
  });

  it("calls close when close button is clicked", () => {
    render(<Demo {...mockProps} />);

    const closeButton = screen.getByText("Close Demo");
    fireEvent.click(closeButton);

    expect(mockProps.close).toHaveBeenCalled();
  });
});