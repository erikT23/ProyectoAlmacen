import styled from "styled-components";
import { v } from "../../styles/index";

export function Banner() {
  return (
    <Container className="content-wrapper-context">
      <span className="titulo">
        {<v.iconoempresa />}
        banner test
      </span>
      <div className="content-text">text placeholder</div>
    </Container>
  );
}

const Container = styled.div``;
