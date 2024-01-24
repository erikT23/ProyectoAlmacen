import { Route, Routes } from "react-router-dom";
import { Home, Login } from "../pages/index";
import { UserAuth } from "../context/AuthContext";
import { ProtectedRoutes } from "../index";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/index";
import { SpinnerLoader, ErrorCard } from "../components/molecules/index";

export function MyRoutes() {
  const { user } = UserAuth();
  const { showUsers } = useUserStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    <ErrorCard mensaje={error.message} />;
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
      </Route>
    </Routes>
  );
}
