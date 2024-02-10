import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import { TableActions } from "../index";
import Swal from "sweetalert2";

export function TableTest({ data }) {
  const editar = () => {};

  const eliminar = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar esto?",
      text: "este cambio sera irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado",
          text: "El registro ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => <span>{info.getValue()}</span>,
    },

    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: (info) => (
        <td>
          <TableActions
            editFunct={() => editar(info.row.original)}
            deleteFunct={() => eliminar(info.row.original)}
          />
        </td>
      ),
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
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((item) => (
            <tr key={item.id}>
              {item.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div``;
