import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StateMachineProvider, createStore } from "little-state-machine";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NewPanel } from "./components/NewPanel";
import { PanelsList } from "./components/PanelsList";
import { clientSidePanelListStore } from "./services";
import { theme } from "./theme.ts";

const queryClient = new QueryClient();

const extendedTheme = extendTheme(theme);

createStore(clientSidePanelListStore);

const { BASE_URL } = import.meta.env;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateMachineProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={extendedTheme}>
          <BrowserRouter>
            <Routes>
              <Route path={BASE_URL} element={<Layout />}>
                <Route
                  path={`${BASE_URL}/panels/create`}
                  element={<NewPanel />}
                />
                <Route path={`${BASE_URL}/panels`} element={<PanelsList />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </StateMachineProvider>
  </React.StrictMode>,
);
