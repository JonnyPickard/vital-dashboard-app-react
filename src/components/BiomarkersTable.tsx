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
  slug: string;
  name: string;
  lab: string;
  testCode: number;
  price: string;
};

const columnHelper = createColumnHelper<Biomarker>();

interface BiomarkersTableProps {
  biomarkersList: LabsResponseData["markers"];
}

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  const { register } = useFormContext();

  const columns = useMemo(
    () => [
      columnHelper.accessor("slug", {
        header: "",
        cell: (info) => (
          <Checkbox
            value={info.getValue()}
            {...register("biomarkers", {
              required: "You must select at least one test to create a Panel.",
            })}
          />
        ),
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lab", { cell: (info) => info.getValue() }),
      columnHelper.accessor("testCode", { cell: (info) => info.getValue() }),
      columnHelper.accessor("price", { cell: (info) => info.getValue() }),
    ],
    [register],
  );

  const data = useMemo(
    () =>
      biomarkersList.map((biomarker) => ({
        slug: biomarker.slug,
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
}
