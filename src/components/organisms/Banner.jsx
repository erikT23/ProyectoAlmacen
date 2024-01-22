import styled from "styled-components";
import { v } from "../../styles/index";
import { CardData } from "../molecules/index";

export function Banner() {
  return (
    <Container className="content-wrapper-context">
      <span className="titulo">
        {<v.iconoempresa />}
        banner test
      </span>
      <div className="content-text">text placeholder</div>
      <ContentCards>
        <CardData></CardData>
      </ContentCards>
    </Container>
  );
}

const Container = styled.div``;

const ContentCards = styled.div``;
