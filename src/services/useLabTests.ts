import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

import { buildLabTestsResponseMockData } from "../tests/mocks/labTestsResponseMockData.ts";
import type { LabTestsResponseData } from "../types/LabTestsResponseData.ts";

const { DEV } = import.meta.env;

export function useLabTests() {
  return useQuery<LabTestsResponseData, AxiosError>("labTests", async () => {
    if (DEV) {
      return Promise.resolve(buildLabTestsResponseMockData(5));
    }
    const { data } = await axios.get<LabTestsResponseData>(
      "/lab_tests/markers",
    );

    return data;
  });
}
