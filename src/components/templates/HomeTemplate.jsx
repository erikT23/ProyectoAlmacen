import { useState } from "react";
import styled from "styled-components";
import { Title } from "../atoms/index";
import { Banner, Header } from "../organisms/index";

export function HomeTemplate() {
  const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <Title>Almacen Sistemas</Title>
      </section>
      <section className="area2"></section>
      <section className="main">
        <Banner />
      </section>
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
    justify-content: end;
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
