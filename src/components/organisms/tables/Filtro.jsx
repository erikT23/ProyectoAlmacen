import { useMemo } from "react";
import { InputRetraso } from "../forms";

export function Filter({ column }) {
  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value, index) => (
          <option
            value={value}
            key={index}
          />
        ))}
      </datalist>
      <InputRetraso
        type="text"
        value={column.getFilterValue() ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`buscador (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}
