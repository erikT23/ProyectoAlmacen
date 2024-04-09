import { useState } from "react";
import styled from "styled-components";

import { useUserStore } from "../../store";
import {
  Header,
  InputRetraso,
  RegistrarBitacoras,
  TableBitacoras,
} from "../organisms/index";

// Template de la bitacora, se encarga de mostrar la tabla de bitacoras y gestionar la informacion que se le envia a la tabla su uso especifico se mostrara en la tabla equipos
export function BitacoraTemplate({ data: bitacoraData }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <Container>
      {
        openRegistro && (
          <RegistrarBitacoras
            dataSelect={dataSelect}
            accion={accion}
            onClose={() => setopenRegistro(!openRegistro)}
          />
        )
        // los template estan divididos en areas para facilitar el diseño y la organizacion de los componentes
      }
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
          data={bitacoraData}
          setopenRegistro={setopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
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
