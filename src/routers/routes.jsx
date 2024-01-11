import { Route, Routes } from "react-router-dom";
import { Home } from "../index";
export function MyRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   
  );
}
