import "little-state-machine";

import type { Panel } from "./types/Panel";

declare module "little-state-machine" {
  interface GlobalState {
    panels: Panel[];
  }
}
