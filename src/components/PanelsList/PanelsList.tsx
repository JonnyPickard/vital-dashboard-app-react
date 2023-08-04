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

import { PANELS_LIST, PANELS_LIST_TABLE as TABLE } from "../../constants";
import { PageHeader } from "../Layout";

export function PanelsList() {
  const { getState } = useStateMachine();

  return (
    <Box padding="4">
      <PageHeader
        headingText={PANELS_LIST.NAME}
        subtitleText={PANELS_LIST.SUBTITLE}
      />
      <TableContainer
        marginBottom="4"
        borderWidth="1px"
        borderColor="gray.100"
        borderRadius="md"
      >
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>{TABLE.HEADER_PANEL_NAME}</Th>
              <Th>{TABLE.HEADER_SAMPLE_TYPE}</Th>
              <Th>{TABLE.HEADER_BIOMARKERS}</Th>
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
