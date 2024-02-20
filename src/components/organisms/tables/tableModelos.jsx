import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import { v } from "../../../styles/index";
import { Paginacion } from "./index";

export function TableModelos({
  data,
  /*  setopenRegistro,
    setdataSelect,
    setAccion,*/
}) {
  const [, setPagina] = useState(1);
  // const { borrarMarcas } = useMarcasStore();
  /*const editar = (data) => {
      setopenRegistro(true);
      setdataSelect(data);
      setAccion("Editar");
    };*/

  /* const eliminar = (p) => {
      //esto sirve para prevenir que se elimine una categoria por defecto
       if (p.nombre === "generica") {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No se puede eliminar una categoria generica",
        });
        return;
      }
  
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
          await borrarMarcas({ id: p.id });
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
        }
      });
    };*/
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre del modelo",
      cell: (info) => (
        <td
          data-title="Nombre"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
        accessorKey: "marca_id",
        header: "Marca del modelo",
        cell: (info) => (
          <td
            data-title="Marca"
            className="ContentCell"
          >
            <span>{info.row.original.marcas.nombre}</span>
          </td>
        ),
      },
      {
        accessorKey: "tipo_id",
        header: "Tipo de modelo",
        cell: (info) => (
          <td
            data-title="Marca"
            className="ContentCell"
          >
            <span>{info.row.original.tipos.nombres}</span>
          </td>
        ),
      },
    /* {
        accessorKey: "accionesMarcas",
        header: "Acciones Marcas",
        enableSorting: false,
        cell: (info) => (
          <td className="ContentCell">
            <TableActions
              editFunct={() => editar(info.row.original)}
              deleteFunct={() => eliminar(info.row.original)}
            />
          </td>
        ),
      },*/
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
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <FaSortDown />
                    </span>
                  )}
                  {
                    {
                      asc: <FaSortUp />,
                      des: <FaSortDown />,
                    }[header.column.getIsSorted()]
                  }
                </th>
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
      <Paginacion
        table={table}
        irinicio={() => table.setPageIndex(0)}
        pagina={table.getState().pagination.pageIndex + 1}
        setPagina={setPagina}
        maximo={table.getPageCount()}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;