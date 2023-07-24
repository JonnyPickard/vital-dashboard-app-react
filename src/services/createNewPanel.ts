import { GlobalState } from "little-state-machine";

import { COLLECTION_METHODS } from "../constants";
import { ClientSidePanelList, Panel } from "../types/Panel";

// Note: This is just some example default data for display purposes
const defaultPanels = [
  {
    panelName: "Lipid Panel",
    collectionMethod: COLLECTION_METHODS.TEST_KIT,
    biomarkers: ["17-oh-progesterone-lcms", "cortisol"],
  },
];

export const clientSidePanelListStore: ClientSidePanelList = {
  panels: defaultPanels,
};

export function updatePanelsAction(
  state: GlobalState,
  payload: Panel,
): ClientSidePanelList {
  return {
    ...state,
    panels: [...state.panels, payload],
  };
}
