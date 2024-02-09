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
      accessorKey: "nombre",
      
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
          <tr>
            <th>id</th>
            <th>nombre</th>
          </tr>
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
