import "little-state-machine";

import type { ClientSidePanelList } from "./types/Panel";

declare module "little-state-machine" {
  interface GlobalState {
    // panels: ClientSidePanelList.panels;
  }
}
