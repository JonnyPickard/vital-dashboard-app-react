import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { NEW_PANEL } from "../constants.ts";
import { updatePanelsAction } from "../services/createNewPanel.ts";
import { buildLabTestsResponseMockData } from "../tests/mocks/labTestsResponseMockData.ts";
import { NewPanel } from "./NewPanel";

vi.mock("little-state-machine", () => ({
  useStateMachine: vi
    .fn()
    .mockImplementation((action: typeof updatePanelsAction) => ({
      actions: action,
    })),
}));
vi.mock("../services/createNewPanel");

vi.mock("../services/fetchAllLabTests", () => ({
  fetchAllLabTests: vi
    .fn()
    .mockImplementation(() => buildLabTestsResponseMockData(3)),
}));

afterEach(() => {
  vi.clearAllMocks();
});

test("renders the page heading with the correct title", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

  const heading = screen.getByRole("heading", {
    level: 2,
    name: NEW_PANEL.NAME,
  });

  expect(heading.textContent).toEqual(NEW_PANEL.NAME);
});

test("renders the form with correct fields & elemments", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

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

test("should validate form fields are required", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

  const submitButton = screen.getByRole("button", { name: /Save Panel/i });
  await userEvent.click(submitButton);

  expect(screen.getByText(/Panel Name is required./i)).toBeInTheDocument();

  expect(
    screen.getByText(/Collection Method is required./i),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/You must select at least one test to create a Panel./i),
  ).toBeInTheDocument();

  expect(updatePanelsAction).not.toHaveBeenCalled();
});

test("should validate Panel Name Input is at least 4 characters", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

  const panelNameInput = screen.getByRole("textbox", { name: /Panel Name/i });
  await userEvent.type(panelNameInput, "a");

  const submitButton = screen.getByRole("button", { name: /Save Panel/i });
  await userEvent.click(submitButton);

  expect(
    screen.getByText(/Panel Name must be at least 4 characters./i),
  ).toBeInTheDocument();
});

test("should call the submit handler with valid form data", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

  const panelNameInput = screen.getByRole("textbox", { name: /Panel Name/i });
  await userEvent.type(panelNameInput, "Test");

  const collectionMethodSelect = screen.getByRole("combobox", {
    name: /Collection Method/i,
  });
  await userEvent.selectOptions(collectionMethodSelect, "Test Kit");

  const checkboxes = screen.getAllByRole("checkbox");
  await userEvent.click(checkboxes[0]);

  const submitButton = screen.getByRole("button", { name: /Save Panel/i });
  await userEvent.click(submitButton);

  expect(updatePanelsAction).toHaveBeenCalledWith(
    expect.objectContaining({
      biomarkers: ["17-oh-progesterone-lcms"],
      collectionMethod: "test_kit",
      panelName: "Test",
    }),
  );
});

test("Show selected toggle button should filter table by selected biomarkers only", async () => {
  await act(() =>
    Promise.resolve(render(<NewPanel />, { wrapper: BrowserRouter })),
  );

  expect(screen.getAllByRole("checkbox")).toHaveLength(2);

  await userEvent.click(screen.getAllByRole("checkbox")[0]);

  await userEvent.click(
    screen.getByRole("button", {
      name: /Show selected/i,
    }),
  );

  expect(screen.getAllByRole("checkbox")).toHaveLength(1);

  expect(
    screen.queryByRole("button", {
      name: /Show selected/i,
    }),
  ).not.toBeInTheDocument();

  await userEvent.click(screen.getAllByRole("checkbox")[0]);

  await userEvent.click(
    screen.getByRole("button", {
      name: /Show all/i,
    }),
  );

  expect(screen.getAllByRole("checkbox")).toHaveLength(2);
});
