import {
  Box,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
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

import type { LabTestsResponseData } from "../../types/LabTestsResponseData";
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
        cell: ({ getValue, row }) => {
          const value = getValue();

          return (
            <Box>
              <Checkbox
                aria-label={`Select ${value} test to add to Panel.`}
                id={`biomarkers-checkbox-${value}-${row.index}`}
                value={value}
                {...register("biomarkers", {
                  required:
                    "You must select at least one test to create a Panel.",
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
                      {header.column.getCanFilter() && header.index === 0 ? (
                        <Flex>
                          <Tooltip
                            label="Toggle show selected"
                            shouldWrapChildren
                            hasArrow
                          >
                            <Checkbox
                              id="toggle-show-selected"
                              aria-label="Toggle show selected"
                              backgroundColor="white"
                              onChange={toggleSelected}
                            />
                          </Tooltip>
                        </Flex>
                      ) : (
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
      <Flex justify="end">
        <TablePagination table={table} />
      </Flex>
    </>
  );
}
