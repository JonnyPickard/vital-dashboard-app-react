import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import type { LabsResponseData } from "../types/labs-response-data";

interface BiomarkersTableProps {
  biomarkersList: LabsResponseData["markers"];
}

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  const { register } = useFormContext();

  return (
    <TableContainer display="flex" borderRadius="10">
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>SELECTED</Th>
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
                <Td>
                  <Checkbox {...register(`biomarkers.${marker.slug}`)} />
                </Td>
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
