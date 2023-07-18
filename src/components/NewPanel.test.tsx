import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import { NewPanel, NEW_PANEL_NAME } from "./NewPanel";
import { testableBiomarkersMockData } from "../tests/mocks/mock-testable-biomarkers-data.ts";
import { act } from "react-dom/test-utils";

vi.mock("../services/fetchTestableBiomarkers", () => ({
  fetchTestableBiomarkers: vi
    .fn()
    .mockImplementation(() => testableBiomarkersMockData),
}));

it("renders the heading with the correct title", async () => {
  // TODO: this seems really extra
  await act(() => Promise.resolve(render(<NewPanel />)));

  const heading = screen.getByRole("heading", {
    level: 2,
    name: NEW_PANEL_NAME,
  });

  expect(heading.textContent).toEqual(NEW_PANEL_NAME);
});

// it("renders the heading with the correct title", () => {
//   render(<NewPanel />);

//   const heading = screen.getByRole("heading", {
//     level: 2,
//     name: NEW_PANEL_NAME,
//   });

//   expect(heading.textContent).toEqual(NEW_PANEL_NAME);
// });
