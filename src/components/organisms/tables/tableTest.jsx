import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

export function TableTest({ data }) {
  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Container>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr>
            <td>test1</td>
            <td>test2</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div``;
