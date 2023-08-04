import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  IconButton,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

import { TABLE_PAGINATION } from "../../../constants";

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>(props: TablePaginationProps<T>) {
  const { table } = props;
  return (
    <SimpleGrid
      templateColumns="1fr 2fr 1fr"
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="sm" textAlign="center">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Text>

      <ButtonGroup justifyContent="center" gap="2">
        <Tooltip label={TABLE_PAGINATION.ARIA_LABEL_FIRST_PAGE}>
          <IconButton
            size="sm"
            aria-label={TABLE_PAGINATION.ARIA_LABEL_FIRST_PAGE}
            icon={<ArrowLeftIcon boxSize={3} />}
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          />
        </Tooltip>

        <Tooltip label={TABLE_PAGINATION.ARIA_LABEL_PREVIOUS_PAGE}>
          <IconButton
            size="sm"
            aria-label={TABLE_PAGINATION.ARIA_LABEL_PREVIOUS_PAGE}
            icon={<ChevronLeftIcon boxSize={6} />}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
        </Tooltip>

        <Tooltip label={TABLE_PAGINATION.ARIA_LABEL_NEXT_PAGE}>
          <IconButton
            size="sm"
            aria-label={TABLE_PAGINATION.ARIA_LABEL_NEXT_PAGE}
            icon={<ChevronRightIcon boxSize={6} />}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
        </Tooltip>

        <Tooltip label={TABLE_PAGINATION.ARIA_LABEL_LAST_PAGE}>
          <IconButton
            size="sm"
            aria-label={TABLE_PAGINATION.ARIA_LABEL_LAST_PAGE}
            icon={<ArrowRightIcon boxSize={3} />}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          />
        </Tooltip>
      </ButtonGroup>

      <Box>
        <Select
          borderRadius="md"
          size="sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
    </SimpleGrid>
  );
}
