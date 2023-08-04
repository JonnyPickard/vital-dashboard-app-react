import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
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
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { NEW_PANEL_FORM_TEXT as FORM_TEXT } from "../../../constants";
import type { LabTestsResponseData } from "../../../types/LabTestsResponseData";
import { biomarkerCheckboxLabel } from "../utils";
import { Filter } from "./ColumnFilter";
import { TablePagination } from "./TablePagination";

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
  testCode: string;
  price: string;
};

interface BiomarkersTableProps {
  biomarkersList?: LabTestsResponseData["markers"];
}

const columnHelper = createColumnHelper<Biomarker>();

export function BiomarkersTable({ biomarkersList }: BiomarkersTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const { register } = useFormContext();

  const columns = useMemo(
    () => [
      columnHelper.accessor("slug", {
        maxSize: 2,
        header: "",
        enableColumnFilter: false,
        cell: ({ getValue, row }) => {
          const value = getValue();

          return (
            <Box>
              <Checkbox
                aria-label={biomarkerCheckboxLabel(value)}
                id={`biomarkers-checkbox-${value}-${row.index}`}
                value={value}
                {...register("biomarkers", {
                  required: FORM_TEXT.TABLE_3_VALIDATION_REQUIRED,
                })}
                isChecked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
              />
            </Box>
          );
        },
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

  const data = useMemo(() => {
    return biomarkersList
      ? biomarkersList.map((biomarker) => ({
          slug: biomarker.slug,
          name: biomarker.name,
          lab: `Labcorp ${biomarker.lab_id}`,
          testCode: biomarker.provider_id,
          price: biomarker.price,
        }))
      : [];
  }, [biomarkersList]);

  const toggleSelected = () => {
    globalFilter === "fitlerSelected"
      ? setGlobalFilter("")
      : setGlobalFilter("fitlerSelected");
  };

  const selectedFilter: FilterFn<Biomarker> = (row) =>
    // Return true if the item checkbox has been checked & should be filtered in/out
    row.getIsSelected();

  const table = useReactTable({
    enableFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
    globalFilterFn: selectedFilter,
    filterFns: {
      selected: selectedFilter,
    },
  });

  return (
    <>
      <TableContainer
        marginBottom="4"
        borderWidth="1px"
        borderColor="gray.100"
        borderRadius="md"
      >
        <Table variant="simple" layout="fixed">
          <Thead bg="gray.50">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    // Used to lock checkbox column size from growing
                    width={header.column.getSize() || "initial"}
                  >
                    <Flex direction="column">
                      {header.column.columnDef.header && (
                        <Text marginBottom={2}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                      )}
                      {header.column.getCanFilter() && (
                        <Filter column={header.column} />
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id} overflow="hidden" textOverflow="ellipsis">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="space-between">
        <Button size="sm" marginRight="4" onClick={toggleSelected}>
          {globalFilter === "fitlerSelected"
            ? FORM_TEXT.FILTER_SHOW_ALL
            : FORM_TEXT.FILTER_SHOW_SELECTED}
        </Button>
        <TablePagination table={table} />
      </Flex>
    </>
  );
}
