import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ErrorCard, SpinnerLoader } from "../components/molecules/index";
import { ProtectedRoutes, UserAuth } from "../index";
import { Configuracion, Home, Login, Marca } from "../pages/index";
import { useTestStore, useUserStore } from "../store/index";

export function MyRoutes() {
  const { user } = UserAuth();
  const { showUsers, idUser } = useUserStore();
  const { showtest, counttest } = useTestStore();

  const {
    data: datausers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,

  });
  const { data: datatest } = useQuery({
    queryKey: ["mostrar test"],
    queryFn: () => showtest({ id: 1 }),
    enabled: !!datausers,
  });
  
  useQuery({
    queryKey: ["contar Test"],
    queryFn: () => counttest({ id_user: idUser }),
    enabled: !!datatest,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <ErrorCard mensaje={error.message} />;
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        element={
          <ProtectedRoutes
            user={user}
            redirectTo="/login"
          />
        }
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/configurar"
          element={<Configuracion />}
        />
        <Route
          path="/configurar/marca"
          element={<Marca />}
        />
      </Route>
    </Routes>
  );
}
