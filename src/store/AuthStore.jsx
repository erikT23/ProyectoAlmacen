import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create(() => ({
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });
    if (error) {
      throw new Error("A ocurrido un error durante el registro" + error);
    }
    return data.user;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(
        "A ocurrido un error durante el cierre de la sesion" + error
      );
    }
  },
}));
