import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ErrorCard, SpinnerLoader } from "../components/molecules/index";
import { ProtectedRoutes, UserAuth } from "../index";
import {
  Configuracion,
  Equipos,
  Home,
  Login,
  Marca,
  Marcas,
  MenuInventario,
  MenuMarcas,
  Modelos,
  Monitores,
  Usuarios
} from "../pages/index";
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
        <Route
          path="/configurar/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="/configurar/menuMarcas"
          element={<MenuMarcas />}
        />
        <Route
          path="/configurar/menuMarcas/marcas"
          element={<Marcas />}
        />
        <Route
          path="/configurar/menuMarcas/modelos"
          element={<Modelos />}
        />
        <Route
          path="/configurar/menuInventario"
          element={<MenuInventario />}
        />
        <Route
          path="/configurar/menuInventario/equipos"
          element={<Equipos />}
        />
        <Route
          path="/configurar/menuInventario/monitores"
          element={<Monitores />}/>
        <Route
          path="/configurar/menuInventario/monitores"
          element={<Monitores />}
        />
      </Route>
    </Routes>
  );
}
