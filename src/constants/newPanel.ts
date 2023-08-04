export enum NEW_PANEL {
  NAME = "New Panel",
  SUBTITLE = "Create a new panel of lab tests available for ordering to your team.",
}

export enum COLLECTION_METHODS {
  TEST_KIT = "test_kit",
  TEST_KIT_TITLE = "Test Kit",
  AT_HOME_PHLEBOTOMY = "at_home_phlebotomy",
  AT_HOME_PHLEBOTOMY_TITLE = "At Home Phlebotomy",
}

export enum NEW_PANEL_FORM_TEXT {
  INPUT_1_LABEL = "Panel Name",
  INPUT_1_HELPER = "What you would like to call the Panel.",
  INPUT_1_PLACEHOLDER = "e.g. Lipid Panel",
  INPUT_1_VALIDATION_REQUIRED = "Panel Name is required.",
  INPUT_1_VALIDATION_MIN_LENGTH = "Panel Name must be at least 4 characters.",
  SELECT_2_LABEL = "Collection Method",
  SELECT_2_HELPER = "The test collection methodology you want to use.",
  SELECT_2_PLACEHOLDER = "Select option",
  SELECT_2_VALIDATION_REQUIRED = "Collection Method is required.",
  TABLE_3_LABEL = "Available Lab Tests",
  TABLE_3_HELPER = "The lab tests you would like to order.",
  TABLE_3_VALIDATION_REQUIRED = "You must select at least one test to create a Panel.",
  TABLE_3_FETCH_ALERT_TITLE = "There was a problem requesting lab tests.",
  TABLE_3_FETCH_ALERT_DESCRIPTION = "Please try refreshing the page.",
  SUBMIT_BUTTON = "Save Panel",
  SUBMIT_SUCCESS_HEADER = "Panel Saved",
  SUBMIT_SUCCESS_LINK_CREATE_MORE = "Create More?",
  SUBMIT_SUCCESS_LINK_VIEW_PANELS = "View Panels?",
  FILTER_SHOW_SELECTED = "Show Selected",
  FILTER_SHOW_ALL = "Show All",
}

export enum TABLE_PAGINATION {
  ARIA_LABEL_FIRST_PAGE = "Go to page 1",
  ARIA_LABEL_LAST_PAGE = "Go to last page",
  ARIA_LABEL_PREVIOUS_PAGE = "Previous page",
  ARIA_LABEL_NEXT_PAGE = "Next page",
}
