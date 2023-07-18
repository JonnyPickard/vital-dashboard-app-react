import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "./theme.ts";
import { NewPanel } from "./components/NewPanel.tsx";

const extendedTheme = extendTheme(theme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={extendedTheme}>
      <NewPanel />
    </ChakraProvider>
  </React.StrictMode>
);
