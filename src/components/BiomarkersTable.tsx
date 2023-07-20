import { useMemo } from "react";
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

import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

// Define your row shape
type Biomarker = {
  selected: boolean;
  name: string;
  lab: string;
  testCode: number;
  price: string;
};

const columnHelper = createColumnHelper<Biomarker>();

const columns = [
  columnHelper.display({ id: "selected", cell: (info) => info.getValue() }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lab", { cell: (info) => info.getValue() }),
  columnHelper.accessor("testCode", { cell: (info) => info.getValue() }),
  columnHelper.accessor("price", { cell: (info) => info.getValue() }),
];

interface BiomarkersTableProps {
  biomarkersList: LabsResponseData["markers"];
}

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  const { register } = useFormContext();
  const data = useMemo(
    () =>
      biomarkersList.map((biomarker) => ({
        selected: false,
        name: biomarker.name,
        lab: `Labcorp ${biomarker.lab_id}`,
        testCode: biomarker.lab_id,
        price: biomarker.price,
      })),
    [biomarkersList],
  );

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data,
    columns,
  });

  return (
    <TableContainer display="flex" borderRadius="10">
      <Table variant="simple">
        <Thead bg="gray.50">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
  // return (
  //   <TableContainer display="flex" borderRadius="10">
  //     <Table variant="simple">
  //       <Thead bg="gray.50">
  //         <Tr>
  //           <Th>SELECTED</Th>
  //           <Th>NAME</Th>
  //           <Th>LAB</Th>
  //           <Th>TEST CODE</Th>
  //           <Th isNumeric>PRICE</Th>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         {biomarkersList.map((marker) => {
  //           return (
  //             <Tr key={marker.id}>
  //               <Td>
  //                 <Checkbox {...register(`biomarkers.${marker.slug}`)} />
  //               </Td>
  //               <Td>{marker.name}</Td>
  //               <Td>Labcorp ({marker.lab_id})</Td>
  //               <Td>{marker.provider_id}</Td>
  //               <Td isNumeric>{marker.price}</Td>
  //             </Tr>
  //           );
  //         })}
  //       </Tbody>
  //     </Table>
  //   </TableContainer>
  // );
}
