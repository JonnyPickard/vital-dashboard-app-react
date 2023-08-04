import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

import { buildLabTestsResponseMockData } from "../tests/mocks/labTestsResponseMockData.ts";
import type { LabTestsResponseData } from "../types/LabTestsResponseData.ts";

export function useLabTests() {
  return useQuery<LabTestsResponseData, AxiosError>("labTests", async () => {
    // Note: For Production, due to cors issues this is set to retun mock data instead of hitting the actual API
    // This is so I can deploy to github pages & also not have to upload personal API keys.
    // However, In development it still will hit the actual API.
    if (import.meta.env.PROD) {
      return Promise.resolve(buildLabTestsResponseMockData(50));
    }

    const { data } = await axios.get<LabTestsResponseData>(
      "/lab_tests/markers",
    );

    return data;
  });
}
