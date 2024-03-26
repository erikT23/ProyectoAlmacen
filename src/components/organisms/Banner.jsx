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
    countimxData,
    countghpData,
    countbodegaComunesData,
    countImx,
    countGhp,
    countBodegaComunes,
    countMonitorLmData,
    countMonitorLm,
    countMonitorGhpData,
    countMonitorGhp,
    countMonitorClubData,
    countMonitorClub,
    countMonitorBodegaData,
    countMonitorBodega,
    countMonitorMbData,
    countMonitorMb,
    countMonitorComunesData,
    countMonitorComunes,
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
  useQuery({
    queryKey: ["countimxData"],
    queryFn: () => countImx(),
  });

  useQuery({
    queryKey: ["countghpData"],
    queryFn: () => countGhp(),
  });

  useQuery({
    queryKey: ["countbodegaComunesData"],
    queryFn: () => countBodegaComunes(),
  });
  /*asdasdasd*/
  useQuery({
    queryKey: ["countmonlm"],
    queryFn: () => countMonitorLm(),
  });

  useQuery({
    queryKey: ["countmonghp"],
    queryFn: () => countMonitorGhp(),
  });

  useQuery({
    queryKey: ["countmonimx"],
    queryFn: () => countMonitorClub(),
  });
  useQuery({
    queryKey: ["countmonbodega"],
    queryFn: () => countMonitorBodega(),
  });

  useQuery({
    queryKey: ["countmonmb"],
    queryFn: () => countMonitorMb(),
  });

  useQuery({
    queryKey: ["countmoncomunes"],
    queryFn: () => countMonitorComunes(),
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
            numSerie={countghpData}
          />
          <CardData
            title="Equipos en Club"
            numSerie={countimxData}
          />

          <CardData
            title="Equipos en Bodega"
            numSerie={countbodegaComunesData}
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
        <ContentCards>
          <CardData
            title="Monitores en Lindo y Maya"
            numSerie={countMonitorLmData}
          />
          <CardData
            title="Monitores en Grand"
            numSerie={countMonitorGhpData}
          />
          <CardData
            title="Monitores en Club"
            numSerie={countMonitorClubData}
          />

          <CardData
            title="Monitores en Bodega"
            numSerie={countMonitorBodegaData}
          />
          <CardData
            title="Monitores en Mar y Beach"
            numSerie={countMonitorMbData}
          />
          <CardData
            title="Monitores en comunes"
            numSerie={countMonitorComunesData}
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
  display: grid;
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
  width: auto;
`;
