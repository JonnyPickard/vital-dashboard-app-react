import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import { testableBiomarkersMockData } from "../tests/mocks/mock-testable-biomarkers-data.ts";
import { NEW_PANEL_NAME, NewPanel } from "./NewPanel";

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

/* 
  TODO: Behavioural tests for form

  - Happy path - user fills form and submit
  - Unhappy path - validation errors
*/
