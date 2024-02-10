import styled from "styled-components";
import { AccionTabla } from "../atoms/index";
import { v } from "../../styles/index";

export function TableActions({ editFunct, deleteFunct }) {
  return (
    <Container>
      <AccionTabla
        funcion={editFunct}
        color="#aac50d"
        icono={<v.iconeditarTabla />}
        fontsize="20px"
      />
      <AccionTabla
        funcion={deleteFunct}
        color="#aac50d"
        icono={<v.iconeliminarTabla />}
        fontsize="20px"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
