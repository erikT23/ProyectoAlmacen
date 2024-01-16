import styled from "styled-components";
import { Btnsave } from "../../components/index";
import { useUsersStore } from "../../store/index";
export function LoginTemplate() {
  const { insertAdminUser } = useUsersStore();
  return (
    <Container>
      <h1>hola login template</h1>
      <Btnsave titulo="Crear cuenta" bgcolor="#3AA597" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
