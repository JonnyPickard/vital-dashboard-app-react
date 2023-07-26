import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StateMachineProvider, createStore } from "little-state-machine";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout.tsx";
import { NewPanel } from "./components/NewPanel.tsx";
import { PanelsList } from "./components/PanelsList.tsx";
import { clientSidePanelListStore } from "./services/createNewPanel.ts";
import { theme } from "./theme.ts";

const queryClient = new QueryClient();

const extendedTheme = extendTheme(theme);

createStore(clientSidePanelListStore);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateMachineProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={extendedTheme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/panels/create" element={<NewPanel />} />
                <Route path="/panels" element={<PanelsList />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StateMachineProvider>
  </React.StrictMode>,
);
