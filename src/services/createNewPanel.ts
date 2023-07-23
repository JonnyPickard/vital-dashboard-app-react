import { GlobalState } from "little-state-machine";

import { ClientSidePanelList, Panel } from "../types/Panel";

export const clientSidePanelListStore: ClientSidePanelList = {
  panels: [],
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
