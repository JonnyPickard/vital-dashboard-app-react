import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Column } from "@tanstack/react-table";
import { InputHTMLAttributes, useEffect, useState } from "react";

export function Filter<T>({ column }: { column: Column<T, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      list={column.id + "list"}
    />
  );
}

// Borrowed + reworked from:
//  https://github.com/TanStack/table/blob/main/examples/react/filters/src/main.tsx#L400
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  list,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  list: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" viewBox="0 0 40 40" boxSize="5" />
      </InputLeftElement>
      <Input
        borderRadius="4"
        size="sm"
        list={list}
        type="text"
        background="white"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputGroup>
  );
}
