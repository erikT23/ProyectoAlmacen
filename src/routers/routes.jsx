import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { SpinnerLoader } from "../components/molecules";
import { ProtectedRoutes, UserAuth } from "../index";
import {
  Bitacora,
  Centros,
  Centrosydepartamentos,
  Configuracion,
  Departamentos,
  Equipos,
  Home,
  Login,
  Marcas,
  MenuInventario,
  MenuMarcas,
  Modelos,
  Monitores,
  Usuarios,
} from "../pages/index";
import { useUserStore } from "../store";
// componente para el enrutamiento de las paginas de la aplicacion, primero verifica si hay un usuario logeado, en caso de no haberlo manda al login de la aplicacion

export function MyRoutes() {
  const { user } = UserAuth();

  const { showUsers } = useUserStore();

  const { isLoading } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,
  });

  if (isLoading) {
    return <SpinnerLoader />;
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
        {/* a las rutas se les indica un path que es la direccion de la url donde van a redirigir y un element que es la page del componente a donde se quiere ir */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/configurar"
          element={<Configuracion />}
        />
        <Route
          path="/bitacora"
          element={<Bitacora />}
        />

        <Route
          path="/configurar/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="/configurar/centros"
          element={<Centros />}
        />
        <Route
          path="/configurar/departamentos"
          element={<Departamentos />}
        />
        <Route
          path="/configurar/centrosydepartamentos"
          element={<Centrosydepartamentos />}
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
          element={<Monitores />}
        />
        <Route
          path="/configurar/menuInventario/monitores"
          element={<Monitores />}
        />
      </Route>
    </Routes>
  );
}
