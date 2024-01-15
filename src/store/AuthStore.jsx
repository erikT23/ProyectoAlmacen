import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create((set, get) => ({
  sigInWithEmail: async () => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
     
    });
    if(error){
        return null
    }
    
  },
}));
