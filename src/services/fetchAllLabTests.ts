import { buildLabTestsResponseMockData } from "../tests/mocks/labTestsResponseMockData.ts";
import type { LabTestsResponseData } from "../types/LabTestsResponseData.ts";

const { VITE_VITAL_LABS_API_KEY, DEV } = import.meta.env;

// TODO: Probably don't want a dev toggle here
export const fetchAllLabTests = DEV
  ? async () => Promise.resolve(buildLabTestsResponseMockData(5))
  : async (): Promise<LabTestsResponseData | null> => {
      try {
        const labsResponseData = await fetch("/api", {
          cache: "no-cache",
          headers: {
            Accept: "application/json",
            "x-vital-api-key": VITE_VITAL_LABS_API_KEY,
            "Content-Type": "application/json",
          },
        });

        return labsResponseData.json() as Promise<LabTestsResponseData>;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
