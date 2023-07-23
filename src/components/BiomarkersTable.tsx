import {
  Button,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { LabTestsResponseData } from "../types/LabTestsResponseData";

declare module "@tanstack/table-core" {
  interface FilterFns {
    selected: FilterFn<unknown>;
  }
}

// Row Shape
type Biomarker = {
  slug: string;
  name: string;
  lab: string;
  testCode: number;
  price: string;
};

interface BiomarkersTableProps {
  biomarkersList: LabTestsResponseData["markers"];
}

const columnHelper = createColumnHelper<Biomarker>();

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const { register } = useFormContext();

  const columns = useMemo(
    () => [
      columnHelper.accessor("slug", {
        header: "",
        cell: ({ getValue, row }) => (
          <Checkbox
            value={getValue()}
            {...register("biomarkers", {
              required: "You must select at least one test to create a Panel.",
            })}
            isChecked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
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

  const selectedFilter: FilterFn<Biomarker> = (row) =>
    // Return true if the item checkbox has been checked & should be filtered in/out
    row.getIsSelected();

  const table = useReactTable({
    enableFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    data,
    columns,
    globalFilterFn: selectedFilter,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
    filterFns: {
      selected: selectedFilter,
    },
  });

  return (
    <>
      <Button
        marginBottom="4"
        onClick={() => {
          globalFilter === "fitlerSelected"
            ? setGlobalFilter("")
            : setGlobalFilter("fitlerSelected");
        }}
      >
        {/* TODO: Make this nicer to use. Maybe Show: [all, selected] */}
        {globalFilter === "fitlerSelected" ? "Show all" : "Show selected"}
      </Button>
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
    </>
  );
}
