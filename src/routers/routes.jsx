import { Route, Routes } from "react-router-dom";
import { Home, ProtectedRoutes, UserAuth } from "../index";
import { Login } from "../pages/index";

export function MyRoutes() {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoutes user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
