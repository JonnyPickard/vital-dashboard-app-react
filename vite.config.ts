/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_VITAL_LABS_API_KEY, VITE_VITAL_LABS_API_URL } = loadEnv(
    mode,
    process.cwd(),
  );

  return {
    plugins: [react()],
    base: "vital-dashboard-app-react",
    server: {
      open: "/panels/create",
      proxy: {
        "/lab_tests/markers": {
          target: VITE_VITAL_LABS_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lab_tests\/markers/, ""),
          headers: {
            Accept: "application/json",
            "x-vital-api-key": VITE_VITAL_LABS_API_KEY,
            "Content-Type": "application/json",
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.ts",
    },
  };
});
