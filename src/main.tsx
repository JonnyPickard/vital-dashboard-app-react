import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { NewPanel } from "./components/NewPanel.tsx";
import { theme } from "./theme.ts";

const extendedTheme = extendTheme(theme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={extendedTheme}>
      <NewPanel />
    </ChakraProvider>
  </React.StrictMode>,
);
