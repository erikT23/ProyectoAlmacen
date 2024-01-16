import styled from "styled-components";
import { Btnsave } from "../../components/index";
import { useUsersStore } from "../../store/index";
import { useMutation } from "@tanstack/react-query";
export function LoginTemplate() {
  const { insertAdminUser } = useUsersStore();
  const mutation = useMutation({
    mutationKey: ["insertar usuario Admin"],
    mutationFn: async () => {
      await insertAdminUser;
    },
  });
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
