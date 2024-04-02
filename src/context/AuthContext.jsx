import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index";
const AuthContext = createContext();

/**
 * Crea el contexto de auteitificacion para que la aplicacion verifique que haya un usuario logeado.
 * hace uso de una funcion de supabase para verificar los cambios en el estado de la autentificacion
 * */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([null]);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user == null) {
          setUser(null);
        } else {
          setUser(session?.user);
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
