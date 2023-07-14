import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const { VITE_VITAL_LABS_API_URL, VITE_VITAL_LABS_API_KEY } = import.meta.env;

export const APP_NAME = "Vital";

function fetchLabsData(apiUrl: string, apiKey: string) {
  fetch(apiUrl, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      Accept: "application/json",
      "x-vital-api-key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => console.log(response))
    .catch(console.error);
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vital</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() =>
            fetchLabsData(VITE_VITAL_LABS_API_URL, VITE_VITAL_LABS_API_KEY)
          }
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
