import styled from "styled-components";
import { Btnsave, FooterLogin } from "../../components/index";
import { useAuthStore } from "../../store/index";
export function HomeTemplate() {
  const { signOut } = useAuthStore();
  return (
    <Container>
      <h1>Home</h1>
      <Btnsave titulo="Cerrar Sesion" bgcolor="#a53a48" funcion={signOut} />
      <FooterLogin />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
