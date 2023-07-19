import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import type { LabsResponseData } from "../types/labs-response-data";

interface BiomarkersTableProps {
  biomarkersList: LabsResponseData["markers"];
}

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  return (
    <TableContainer display="flex" borderRadius="10">
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>NAME</Th>
            <Th>LAB</Th>
            <Th>TEST CODE</Th>
            <Th isNumeric>PRICE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {biomarkersList.map((marker) => {
            return (
              <Tr key={marker.id}>
                <Td>{marker.name}</Td>
                <Td>Labcorp ({marker.lab_id})</Td>
                <Td>{marker.provider_id}</Td>
                <Td isNumeric>{marker.price}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
