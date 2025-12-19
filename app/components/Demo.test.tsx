import { render, screen, fireEvent } from "@testing-library/react";
import Demo from "./Demo";

const mockProps = {
  close: jest.fn(),
  palette: { name: "test", colors: [] },
  title: "Test Title",
  description: "Test description",
  features: [
    { label: "Uptime", value: "99.99%" },
    { label: "Funding", value: "$159m" },
  ],
  callToActionButtons: [
    { label: "Explore", onClick: jest.fn() },
    { label: "About", onClick: jest.fn() },
  ],
  imageUrl: "/test-image.jpg",
  isDarkMode: false,
  onToggleDarkMode: jest.fn(),
  tags: ["modern-analogous-1"],
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