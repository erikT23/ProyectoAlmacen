import { createContext, useContext, useEffect, useState } from "react";
import { Supabase } from "../index";
import { set } from "react-hook-form";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data: authListener } = Supabase.auth.onAuthStateChange(
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
    return ()=>{
      authListener.subscription;
    }
  });
};
