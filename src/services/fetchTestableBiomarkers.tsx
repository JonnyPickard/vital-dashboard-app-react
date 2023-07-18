const { VITE_VITAL_LABS_API_KEY } = import.meta.env;
import type { LabsResponseData } from "../types/labs-response-data";

export const fetchTestableBiomarkers =
  async (): Promise<LabsResponseData | null> => {
    try {
      const labsResponseData = await fetch("/api", {
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "x-vital-api-key": VITE_VITAL_LABS_API_KEY,
          "Content-Type": "application/json",
        },
      });

      return labsResponseData.json() as Promise<LabsResponseData>;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
