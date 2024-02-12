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
import { useTestStore } from "../../../store/index";

export function TableTest({ data }) {
  const { deleteTest } = useTestStore();
  const editar = () => {};

  const eliminar = (p) => {
    //esto sirve para prevenir que se elimine una categoria por defecto
    /* if (p.descripcion === "generica") {
      return Swal.fire({
        icon: "error",
        title: " Error",
        text: "No se puede eliminar una categoria generica",
      });
      return;
    }*/

    Swal.fire({
      title: "¿Estas seguro de eliminar esto?",
      text: "este cambio sera irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTest({ id: p.id });
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
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
