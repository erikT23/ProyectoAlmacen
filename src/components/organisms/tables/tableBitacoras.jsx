import { rankItem } from "@tanstack/match-sorter-utils";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import { v } from "../../../styles/index";
import { Filter, Paginacion } from "./index";
import { TableActions } from "../TableActions";
import Swal from "sweetalert2";
import { useBitacoraStore, useUserStore } from "../../../store";

// componente de la tabla de bitacoras, detalle de su funcionamiento en la tabla de equipos

export function TableBitacoras({
  data,
  setopenRegistro,
  setdataSelect,
  setAccion,
  globalFilter,
}) {
  function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  }

  const [columnFilters, setColumnFilters] = useState([]);
  const [setPagina] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { borrarBitacora } = useBitacoraStore();
  const { activeUser } = useUserStore();

  // union de los roles y que centros puede acceder cada rol, frente a cada uno se muestra su nombre en la base de datos y el nombre de los centros donde puede acceder
  const rolesACentros = {
    4: [5, 7], // Lindo Maya: PLI y PMY
    3: [6, 4], // Mar Beach: PMA y PBE
    5: [5], // Grand: GHP
  };

  // cuando se llama la funion editar se verifica si el usuario tiene permisos para editar el equipo, si no tiene permisos se muestra un mensaje de error
  const editar = (data) => {
    if (activeUser.rol_id !== 1) {
      const centrosPermitidos = rolesACentros[activeUser.rol_id];
      if (centrosPermitidos && centrosPermitidos.includes(data.centro_id)) {
        // El usuario tiene un rol permitido y el equipo está asignado a un centro permitido
      } else {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para eliminar este equipo",
        });
      }
    }

    // abre el modal de registro con los datos del equipo seleccionado o vacio si se va a insertar un nuevo equipo
    setopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  };

  // funcion para eliminar un equipo, se muestra un mensaje de confirmacion antes de eliminar el equipo
  const eliminar = (p) => {
    if (activeUser.rol_id !== 1) {
      // 1 es el ID del rol "Administrador"
      const centrosPermitidos = rolesACentros[activeUser.rol_id];
      if (centrosPermitidos && centrosPermitidos.includes(p.centro_id)) {
        // El usuario tiene un rol permitido y el equipo está asignado a un centro permitido
      } else {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para eliminar este equipo",
        });
      }
    }
    // mensaje de confirmacion para eliminar el equipo
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
        await borrarBitacora({ id: p.id });
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      }
    });
  };

  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: (info) => (
        <td
          data-title="Fecha"
          className="ContentCell"
        >
          <span>{new Date(info.getValue()).toLocaleString()}</span>
        </td>
      ),
    },
    {
      accessorKey: "correo",
      header: "Correo",
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
      accessorKey: "numserie",
      header: "Numero de serie",
      cell: (info) => (
        <td
          data-title="Nombre"
          className="ContentCell"
          style={{ height: "auto", width: "auto" }}
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      accessorKey: "modelos.marcas.nombre",
      header: "Marca",
      cell: (info) => (
        <td
          data-title="Departamento"
          className="ContentCell"
        >
          <span>{info.row.original.modelos.marcas.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "modelos.nombre",
      header: "Modelo",
      cell: (info) => (
        <td
          data-title="Departamento"
          className="ContentCell"
        >
          <span>{info.row.original.modelos.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "tipos.nombre",
      header: "Tipo",
      cell: (info) => (
        <td
          data-title="Departamento"
          className="ContentCell"
        >
          <span>{info.row.original.tipos.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "categoria",
      header: "Categoria",
      cell: (info) => (
        <td
          data-title="Nombre"
          className="ContentCell"
          style={{ height: "auto", width: "auto" }}
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      accessorKey: "estados.nombre",
      header: "Estado",
      cell: (info) => (
        <td
          data-title="Departamento"
          className="ContentCell"
        >
          <span>{info.row.original.estados.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "accion",
      header: "Accion",
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
      accessorKey: "motivo",
      header: "Motivo",
      enableColumnFilter: false,
      cell: (info) => (
        <td
          style={{ width: "150px" }}
          data-title="Nombre"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      // campo para las acciones de la tabla, se llama el componente TableActions que recibe las funciones de editar y eliminar y se le pasa la informacion del equipo seleccionado usando las funciones de la libreria de la tabla
      accessorKey: "accionesMarcas",
      header: "Acciones Marcas",
      enableSorting: false,
      enableColumnFilter: false,

      cell: (info) => (
        <td className="ContentCell">
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
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });
  return (
    <Container>
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <FaSortUp />,
                      desc: <FaSortDown />,
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Filter
                        column={header.column}
                        table={table}
                      />
                    </div>
                  ) : null}
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
      .filter {
        display: flex;
        justify-content: center;
        align-items: center;
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
