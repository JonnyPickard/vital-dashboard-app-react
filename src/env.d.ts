/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VITAL_LABS_API_URL: string;
  readonly VITE_VITAL_LABS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
