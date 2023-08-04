import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";

import {
  COLLECTION_METHODS,
  NEW_PANEL_FORM_TEXT as FORM,
  NEW_PANEL,
} from "../../constants";
import { updatePanelsAction, useLabTests } from "../../services";
import { Wrapper } from "../../tests/ProviderWrapper";
import { buildLabTestsResponseMockData } from "../../tests/mocks/labTestsResponseMockData.ts";
import { NewPanel } from "./NewPanel";
import { biomarkerCheckboxLabel } from "./utils";

vi.mock("little-state-machine", () => ({
  useStateMachine: vi
    .fn()
    .mockImplementation((action: typeof updatePanelsAction) => ({
      actions: action,
    })),
}));
vi.mock("../../services");

const mockData = buildLabTestsResponseMockData(3);
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
    screen.getByRole("textbox", { name: FORM.INPUT_1_LABEL }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("combobox", { name: FORM.SELECT_2_LABEL }),
  ).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();

  const biomarkerName = mockData.markers[0].slug;
  expect(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarkerName),
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: FORM.SUBMIT_BUTTON }),
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

  const submitButton = screen.getByRole("button", { name: FORM.SUBMIT_BUTTON });
  await userEvent.click(submitButton);

  expect(
    screen.getByText(FORM.INPUT_1_VALIDATION_REQUIRED),
  ).toBeInTheDocument();

  expect(
    screen.getByText(FORM.SELECT_2_VALIDATION_REQUIRED),
  ).toBeInTheDocument();

  expect(
    screen.getByText(FORM.TABLE_3_VALIDATION_REQUIRED),
  ).toBeInTheDocument();

  expect(updatePanelsAction).not.toHaveBeenCalled();
});

test("should validate Panel Name Input is at least 4 characters", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  const panelNameInput = screen.getByRole("textbox", {
    name: FORM.INPUT_1_LABEL,
  });
  await userEvent.type(panelNameInput, "a");

  const submitButton = screen.getByRole("button", { name: FORM.SUBMIT_BUTTON });
  await userEvent.click(submitButton);

  expect(
    screen.getByText(FORM.INPUT_1_VALIDATION_MIN_LENGTH),
  ).toBeInTheDocument();
});

test("should call the submit handler with valid form data", async () => {
  await act(() => Promise.resolve(render(<NewPanel />, { wrapper: Wrapper })));

  const panelNameInput = screen.getByRole("textbox", {
    name: FORM.INPUT_1_LABEL,
  });
  await userEvent.type(panelNameInput, "Test");

  const collectionMethodSelect = screen.getByRole("combobox", {
    name: FORM.SELECT_2_LABEL,
  });
  await userEvent.selectOptions(
    collectionMethodSelect,
    COLLECTION_METHODS.TEST_KIT_TITLE,
  );

  const biomarkerName = mockData.markers[0].slug;
  await userEvent.click(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarkerName),
    }),
  );

  const submitButton = screen.getByRole("button", { name: FORM.SUBMIT_BUTTON });
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

  const biomarker1Name = mockData.markers[0].slug;
  const biomarker2Name = mockData.markers[1].slug;
  expect(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarker1Name),
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarker2Name),
    }),
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarker1Name),
    }),
  );

  await userEvent.click(
    screen.getByRole("button", { name: FORM.FILTER_SHOW_SELECTED }),
  );

  expect(
    screen.queryByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarker2Name),
    }),
  ).not.toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", { name: FORM.FILTER_SHOW_ALL }),
  );

  expect(
    screen.getByRole("checkbox", {
      name: biomarkerCheckboxLabel(biomarker2Name),
    }),
  ).toBeInTheDocument();
});
