import {
  Box,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useStateMachine } from "little-state-machine";

import { PANELS_LIST } from "../constants";
import { PageHeader } from "./PageHeader";

export function PanelsList() {
  const { getState } = useStateMachine();

  return (
    <Box padding="4">
      <PageHeader
        headingText={PANELS_LIST.NAME}
        subtitleText={PANELS_LIST.SUBTITLE}
      />
      <TableContainer display="flex" borderRadius="md">
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
                  <Td>
                    <Tag size="sm" colorScheme="red" borderRadius="full">
                      <TagLabel>{collectionMethod}</TagLabel>
                    </Tag>
                  </Td>
                  <Td>
                    {/* NOTE: For now only showing max of 4 */}
                    {biomarkers.slice(0, 4).map((biomarker, i) => (
                      <Box marginBottom="2" key={`${biomarker}-${i}`}>
                        <Tag
                          key={`${biomarker}-${i}`}
                          size="sm"
                          colorScheme="blue"
                          borderRadius="full"
                        >
                          <TagLabel>{biomarker}</TagLabel>
                        </Tag>
                      </Box>
                    ))}
                  </Td>
                </Tr>
              ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
