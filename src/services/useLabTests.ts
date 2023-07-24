import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

import type { LabTestsResponseData } from "../types/LabTestsResponseData.ts";

export function useLabTests() {
  return useQuery<LabTestsResponseData, AxiosError>("labTests", async () => {
    const { data } = await axios.get<LabTestsResponseData>(
      "/lab_tests/markers",
    );

    return data;
  });
}
