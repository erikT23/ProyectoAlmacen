import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

export function Buscador({ setBuscador }) {
  const buscar = (e) => {
    setBuscador(e.target.value);
  };
  return (
    <Container>
      <article className="content">
        <CiSearch className="icono" />
        <input
          onChange={buscar}
          placeholder="Buscar"
        ></input>
      </article>
    </Container>
  );
}

const Container = styled.div`
  //background-color: ${(props) => props.theme.bg};
  width: fit-content;
  border-radius: 10px;
  height: 60px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 1px solid #414244;

  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;

    .icono {
      font-size: 18px;
    }

    input {
      font-size: 18px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
