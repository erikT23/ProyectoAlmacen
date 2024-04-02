import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header, InputRetraso, TableBitacoras } from "../organisms/index";

// Template de la bitacora, se encarga de mostrar la tabla de bitacoras y gestionar la informacion que se le envia a la tabla su uso especifico se mostrara en la tabla equipos, aqui solo se explica el funcionamiento especifico de la funcion para mostrar los nombres de los id en la bitacora
export function BitacoraTemplate({
  data: bitacoraData,
  tipos,
  modelos,
  centros,
  estados,
  departamentos,
  marcas,
}) {
  const [state, setState] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formattedData, setFormattedData] = useState([]);

  console.log(tipos, "tiposData");

  useEffect(() => {
    // recibe la informacion de la page bitacora y la formatea para mostrarla en la tabla
    if (
      bitacoraData &&
      tipos &&
      modelos &&
      centros &&
      estados &&
      departamentos &&
      marcas
    ) {
      // Mapea los arrays de tipos, modelos, centros, estados, departamentos y marcas por id
      const tiposById = mapArrayById(tipos);
      const modelosById = mapArrayById(modelos);
      const centrosById = mapArrayById(centros);
      const estadosById = mapArrayById(estados);
      const departamentosById = mapArrayById(departamentos);
      const marcasById = mapArrayById(marcas);

      // usa la informacion que trae la consulta sobre la tabla bitacora para poder trabajar con ella
      const newData = bitacoraData.map((bitacora) => {
        const dataVieja = bitacora.data_vieja
          ? JSON.parse(bitacora.data_vieja)
          : null;
        const dataNueva = bitacora.data_nueva
          ? JSON.parse(bitacora.data_nueva)
          : null;

          // se llaman las funciones para modificar la informacion vieja y nueva de la tabla bitacora
        replaceIdsWithNames(
          dataVieja,
          tiposById,
          modelosById,
          centrosById,
          estadosById,
          departamentosById,
          marcasById
        );
        replaceIdsWithNames(
          dataNueva,
          tiposById,
          modelosById,
          centrosById,
          estadosById,
          departamentosById,
          marcasById
        );

        return {
          // vuelve a tomar la informacion y arma un objeto con la informacion de la bitacora para pasarla a la tabla
          ...bitacora,
          fecha: new Date(bitacora.fecha).toLocaleString(),
          data_vieja: dataVieja
            ? Object.entries(dataVieja)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            : null,
          data_nueva: dataNueva
            ? Object.entries(dataNueva)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            : null,
        };
      });

      setFormattedData(newData);
    }
  }, [bitacoraData, tipos, modelos, centros, estados, departamentos, marcas]);

  function mapArrayById(array) {
    const map = {};
    array.forEach((item) => {
      map[item.id] = item.nombre;
    });
    return map;
  }

  // funcion que reemplaza los ids por los nombres de los objetos en la tabla bitacora
  function replaceIdsWithNames(
    data,
    tiposById,
    modelosById,
    centrosById,
    estadosById,
    departamentosById,
    marcasById
  ) {
    // si la data existe se reemplazan los ids por los nombres de los objetos correspondientes
    if (data) {
      if (data.tipo_id) {
        data.tipo_id = tiposById[data.tipo_id] || data.tipo_id;
      }
      if (data.modelo_id) {
        data.modelo_id = modelosById[data.modelo_id] || data.modelo_id;
      }
      if (data.centro_id) {
        data.centro_id = centrosById[data.centro_id] || data.centro_id;
      }
      if (data.estado_id) {
        data.estado_id = estadosById[data.estado_id] || data.estado_id;
      }
      if (data.departamento_id) {
        data.departamento_id =
          departamentosById[data.departamento_id] || data.departamento_id;
      }
      if (data.marca_id) {
        data.marca_id = marcasById[data.marca_id] || data.marca_id;
      }
    }
  }
  console.log(bitacoraData, "formattedData");

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1"></section>
      <section className="area2">
        <InputRetraso
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscador"
        />
      </section>
      <section className="main">
        <TableBitacoras
          data={formattedData}
          globalFilter={globalFilter}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    // background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    //background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .main {
    grid-area: main;
    // background-color: rgba(179, 46, 241, 0.14);
  }
`;
