import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
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
    )
    return()=>{
      authListener.subscription;
    }
  }, []);
};
