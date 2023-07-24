import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>(props: TablePaginationProps<T>) {
  const { table } = props;
  return (
    <Flex align="center" justifyContent="space-between">
      <ButtonGroup gap="2">
        <IconButton
          size="sm"
          aria-label="Go to page 1"
          icon={<ArrowLeftIcon boxSize={3} />}
          onClick={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
        />

        <IconButton
          size="sm"
          aria-label="Previous page"
          icon={<ChevronLeftIcon boxSize={6} />}
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        />

        <IconButton
          size="sm"
          aria-label="Next page"
          icon={<ChevronRightIcon boxSize={6} />}
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        />

        <IconButton
          size="sm"
          aria-label="Go to last page"
          icon={<ArrowRightIcon boxSize={3} />}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
        />
      </ButtonGroup>

      <Text fontSize="sm">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Text>

      <Box>
        <Select
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
    </Flex>
  );
}
