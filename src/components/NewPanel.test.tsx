import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";

import { NEW_PANEL } from "../constants.ts";
import { updatePanelsAction } from "../services/createNewPanel.ts";
import { useLabTests } from "../services/useLabTests.ts";
import { Wrapper } from "../tests/ProviderWrapper";
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
vi.mock("../services/useLabTests");

beforeEach(() => {
  // Default sets a successful response from the lab_tests api
  // You can overide this in individual tests
  (useLabTests as Mock).mockImplementation(() => ({
    data: buildLabTestsResponseMockData(3),
    isSuccess: true,
    isError: false,
  }));
});

test("renders the page heading with the correct title", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  const heading = screen.getByRole("heading", {
    level: 2,
    name: NEW_PANEL.NAME,
  });

  expect(heading.textContent).toEqual(NEW_PANEL.NAME);
});

test("renders the form with correct fields & elemments", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  expect(
    screen.getByRole("textbox", { name: /Panel Name/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("combobox", { name: /Collection Method/i }),
  ).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /Select 17-oh-progesterone-lcms test to add to Panel./i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /Save Panel/i }),
  ).toBeInTheDocument();
});

test("renders an alert istead of the table when the lab_tests fetch fails", async () => {
  (useLabTests as Mock).mockImplementation(() => ({
    data: [],
    isSuccess: false,
    isError: true,
  }));

  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  expect(screen.queryByRole("table")).not.toBeInTheDocument();

  expect(screen.getByRole("alert")).toHaveTextContent(
    "There was a problem requesting lab tests.",
  );
});

test("should validate form fields are required", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

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
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  const panelNameInput = screen.getByRole("textbox", { name: /Panel Name/i });
  await userEvent.type(panelNameInput, "a");

  const submitButton = screen.getByRole("button", { name: /Save Panel/i });
  await userEvent.click(submitButton);

  expect(
    screen.getByText(/Panel Name must be at least 4 characters./i),
  ).toBeInTheDocument();
});

test("should call the submit handler with valid form data", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  const panelNameInput = screen.getByRole("textbox", { name: /Panel Name/i });
  await userEvent.type(panelNameInput, "Test");

  const collectionMethodSelect = screen.getByRole("combobox", {
    name: /Collection Method/i,
  });
  await userEvent.selectOptions(collectionMethodSelect, "Test Kit");

  await userEvent.click(
    screen.getByRole("checkbox", {
      name: /Select 17-oh-progesterone-lcms test to add to Panel./i,
    }),
  );

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

test("Show selected toggle checkbox should filter table by selected biomarkers only", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  expect(
    screen.getByRole("checkbox", {
      name: /Select 17-oh-progesterone-lcms test to add to Panel./i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", {
      name: /Select abo-grouping test to add to Panel./i,
    }),
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("checkbox", {
      name: /Select 17-oh-progesterone-lcms test to add to Panel./i,
    }),
  );
  await userEvent.click(
    screen.getByRole("checkbox", {
      name: /Toggle show selected/i,
    }),
  );

  expect(
    screen.queryByRole("checkbox", {
      name: /Select abo-grouping test to add to Panel./i,
    }),
  ).not.toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("checkbox", {
      name: /Toggle show selected/i,
    }),
  );
  expect(
    screen.getByRole("checkbox", {
      name: /Select abo-grouping test to add to Panel./i,
    }),
  ).toBeInTheDocument();
});
