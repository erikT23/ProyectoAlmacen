import { createContext, useContext, useEffect, useState } from "react";
import { supabase, LinksArray } from "../index";
const Authcontext = createContext();

export const AuthcontextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
   const {data}=
   supabase.auth.onAuthStateChange((event, session) => {
     console.log(event, session)
   })
    
  }, [])
  
};
