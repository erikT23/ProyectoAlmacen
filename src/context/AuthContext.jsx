import { createContext, useContext, useEffect, useState } from "react";
import { Supabase } from "../index";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data: authListener } = Supabase.auth.onAuthStateChange(
      // eslint-disable-next-line no-unused-vars
      (event, session) => {
        async (event, session) => {
          console.log(event, session);
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
