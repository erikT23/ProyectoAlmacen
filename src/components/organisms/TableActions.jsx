import styled from "styled-components";
import { AccionTabla } from "../atoms/index";

export function TableActions() {
  return (
    <Container>
      <AccionTabla />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
