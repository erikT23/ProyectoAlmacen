import { useState } from "react";
import styled from "styled-components";
import { Header } from "../organisms/index";
import { useEquiposStore } from "../../store";
export function EquiposTemplate() {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    setopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };
  const { setBuscador } = useEquiposStore();

  return (
    <Container>
      {openRegistro && (
        <RegistrarEquipo
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setopenRegistro(!openRegistro)}
        />
      )}
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1"></section>
      <section className="area2"></section>
      <section className="main"></section>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
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
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    background-color: rgba(77, 237, 106, 0.14);
  }

  .main {
    grid-area: main;
    background-color: rgba(179, 46, 241, 0.14);
  }
`;
