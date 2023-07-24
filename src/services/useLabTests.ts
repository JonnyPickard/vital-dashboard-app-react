import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

import { buildLabTestsResponseMockData } from "../tests/mocks/labTestsResponseMockData";
import type { LabTestsResponseData } from "../types/LabTestsResponseData.ts";

export function useLabTests() {
  return useQuery<LabTestsResponseData, AxiosError>("labTests", async () => {
    // TODO: Currently set as this so I don't spam the api while developing
    return Promise.resolve(buildLabTestsResponseMockData(30));
    // const { data } = await axios.get<LabTestsResponseData>(
    //   "/lab_tests/markers",
    // );

    // return data;
  });
}
