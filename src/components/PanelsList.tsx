import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useStateMachine } from "little-state-machine";

import { PageHeader } from "./PageHeader";

export const PANELS_LIST_NAME = "Your Panels";
export const PANELS_LIST_SUBTITLE =
  "A list of all the Panels you have created.";

export function PanelsList() {
  const { getState } = useStateMachine();

  console.log(getState().panels);

  return (
    <Box padding="4">
      <PageHeader
        headingText={PANELS_LIST_NAME}
        subtitleText={PANELS_LIST_SUBTITLE}
      />
      <TableContainer display="flex" borderRadius="10">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>LAB TEST</Th>
              <Th>SAMPLE TYPE</Th>
              <Th>BIOMARKERS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getState().panels.map(
              ({ panelName, collectionMethod, biomarkers }, i) => (
                <Tr key={`${panelName}-${i}`}>
                  <Td>{panelName}</Td>
                  <Td>{collectionMethod}</Td>
                  {/* TODO: Workout nicer display of markers */}
                  <Td>{biomarkers.slice(0, 1)}</Td>
                </Tr>
              ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
