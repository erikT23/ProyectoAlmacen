import styled from "styled-components";

export function AccionTabla({funcion, icono, color, fontsize}) {
  return (
    <Container
      onClick={funcion}
      $color={color}
      $fontsize={fontsize}
    >
      {icono}
    </Container>
  );
}

const Container = styled.span``;
