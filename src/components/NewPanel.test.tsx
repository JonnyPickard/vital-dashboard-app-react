import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import NewPanel, { NEW_PANEL_NAME } from "./NewPanel";
import { testableBiomarkersMockData } from "../tests/mocks/mock-testable-biomarkers-data.ts";

vi.mock("../services/fetchTestableBiomarkers", () => ({
  fetchTestableBiomarkers: vi
    .fn()
    .mockImplementation(() => testableBiomarkersMockData),
}));

describe("NewPanel", () => {
  it("renders the heading with the correct title", () => {
    console.log(fetchTestableBiomarkers());
    render(<NewPanel />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: NEW_PANEL_NAME,
    });

    expect(heading.textContent).toEqual(NEW_PANEL_NAME);
  });
});
