import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import { testableBiomarkersMockData } from "../tests/mocks/mock-testable-biomarkers-data.ts";
import { NEW_PANEL_NAME, NewPanel } from "./NewPanel";

vi.mock("../services/fetchTestableBiomarkers", () => ({
  fetchTestableBiomarkers: vi.fn().mockImplementation(() => ({
    ...testableBiomarkersMockData,
    // TODO: Make a builder instead of this
    ...{ markers: testableBiomarkersMockData.markers.slice(0, 2) },
  })),
}));

it("renders the page heading with the correct title", async () => {
  await act(() => Promise.resolve(render(<NewPanel />)));

  const heading = screen.getByRole("heading", {
    level: 2,
    name: NEW_PANEL_NAME,
  });

  expect(heading.textContent).toEqual(NEW_PANEL_NAME);
});

it.only("renders the form with the correct fields", async () => {
  await act(() => Promise.resolve(render(<NewPanel />)));

  expect("hello").toEqual("hello");

  expect(
    screen.getByRole("textbox", { name: /Panel Name/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("combobox", { name: /Collection Method/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /Show selected/i }),
  ).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", { name: /Available Lab Tests/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /Save Panel/i }),
  ).toBeInTheDocument();
});

/* 
  TODO: Behavioural tests for form

  - Happy path - user fills form and submit
  - Unhappy path - validation errors
*/
