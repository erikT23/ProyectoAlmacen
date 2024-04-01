import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header, InputRetraso, TableBitacoras } from "../organisms/index";
export function BitacoraTemplate({ data: bitacoraData, tipos }) {
  const [state, setState] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formattedData, setFormattedData] = useState([]);


  console.log(tipos, "tiposData");

  useEffect(() => {
    if (bitacoraData && tipos) {
      const tiposById = {};
      tipos.forEach((tipo) => {
        tiposById[tipo.id] = tipo.nombre;
      });
  
      const newData = bitacoraData.map((bitacora) => {
        const dataVieja = bitacora.data_vieja ? JSON.parse(bitacora.data_vieja) : null;
        const dataNueva = bitacora.data_nueva ? JSON.parse(bitacora.data_nueva) : null;
  
        if (dataVieja && dataVieja.tipo_id) {
          dataVieja.tipo_id = tiposById[dataVieja.tipo_id] || dataVieja.tipo_id;
        }
  
        if (dataNueva && dataNueva.tipo_id) {
          dataNueva.tipo_id = tiposById[dataNueva.tipo_id] || dataNueva.tipo_id;
        }
  
        return {
          ...bitacora,
          fecha: new Date(bitacora.fecha).toLocaleString(),
          data_vieja: dataVieja ? Object.entries(dataVieja).map(([key, value]) => `${key}: ${value}`).join("\n") : null,
          data_nueva: dataNueva ? Object.entries(dataNueva).map(([key, value]) => `${key}: ${value}`).join("\n") : null,
        };
      });
  
      setFormattedData(newData);
    }
  }, [bitacoraData, tipos]);
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
