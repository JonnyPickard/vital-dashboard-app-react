import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import { NewPanel } from "./components/NewPanel.tsx";
import { clientSidePanelListStore } from "./services/createNewPanel.ts";
import { theme } from "./theme.ts";

const extendedTheme = extendTheme(theme);

createStore(clientSidePanelListStore);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateMachineProvider>
      {process.env.NODE_ENV !== "production" && <DevTool />}
      <ChakraProvider theme={extendedTheme}>
        <NewPanel />
      </ChakraProvider>
    </StateMachineProvider>
  </React.StrictMode>,
);
