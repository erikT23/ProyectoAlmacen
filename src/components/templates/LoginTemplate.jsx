import styled from "styled-components";
import { Btnsave } from "../../components/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/index";

export function LoginTemplate() {
  const navigate = useNavigate();
  const { insertAdminUser } = useUserStore();
  const mutationInsertUser = useMutation({
    mutationKey: ["insertUserAdmin"],
    mutationFn: async () => {
      const p = {
        email: "20203tn152@utez.edu.mx",
        password: "pass1234",
      };
      const dt = await insertAdminUser(p);
      if (dt) {
        navigate("/");
      }
    },
  });
  return (
    <Container>
      <h1>hola login template</h1>
      <Btnsave
        titulo="Crear cuenta"
        bgcolor="#3AA597"
        funcion={mutationInsertUser.mutateAsync}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
