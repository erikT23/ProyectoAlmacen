import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useEquiposStore } from "../../store/index";
import { CardData } from "../molecules/index";

export function Banner() {
  const {
    countComunes,
    countComunesData,
    countmbData,
    countMB,
    countlmData,
    countLm,
  } = useEquiposStore();
  useQuery({
    queryKey: ["countComunes"],
    queryFn: () => countComunes(),
  });

  useQuery({
    queryKey: ["countmb"],
    queryFn: () => countMB(),
  });

  useQuery({
    queryKey: ["countlm"],
    queryFn: () => countLm(),
  });
  return (
    <Container>
      <div className="content-wrapper-context">
        <ContentCards>
          <CardData
            title="Equipos en Lindo y Maya"
            numSerie={countlmData}
          />
           <CardData
            title="Equipos en Grand"
            numSerie={countlmData}
          />
           <CardData
            title="Equipos en Club"
            numSerie={countlmData}
          />
           <CardData
            title="Equipos en Bodega"
            numSerie={countlmData}
          />
          <CardData
            title="Equipos en Mar y Beach"
            numSerie={countmbData}
          />
          <CardData
            title="Equipos en comunes"
            numSerie={countComunesData}
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
