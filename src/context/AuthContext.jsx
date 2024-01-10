import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index";

const Authcontext = createContext();

export const AuthcontextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        async (event, session) => {
          if (session?.user == null) {
            setUser(null);
          } else {
            setUser(session?.user);
          }
        };
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);
  return (
    <Authcontext.Provider value={{ user }}>{children}</Authcontext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(Authcontext);
};
