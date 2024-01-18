import styled from "styled-components";
export function HomeTemplate() {
  return (
    <Container>
      <header className="header"></header>
      <section className="area1"></section>
      <section className="area2"></section>
      <section className="main"></section>
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
  }

  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
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
