import styled from "styled-components";
import { v } from "../../styles/index";
import { CardData } from "../molecules/index";
import { useTestStore } from "../../store/index";

export function Banner() {
  const { datatest, testcount } = useTestStore();
  return (
    <Container>
      <div className="content-wrapper-context">
        <span className="titulo">
          {<v.iconoempresa />}
          {datatest.users?.nombre}
        </span>
        <div className="content-text">{datatest.users?.rol}</div>

        <ContentCards>
          <CardData
            title={datatest.users?.nombre}
            numSerie={datatest.users?.id}
          />
          <CardData
            title="count test"
            numSerie={testcount[0]?.permisos?.[0]?.count}
          />
        </ContentCards>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 solid #6b6b6b;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat, repeat;
  border-radius: 14px;
  overflow: hidden;
`;

const ContentCards = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 15px;
  cursor: pointer;
`;
