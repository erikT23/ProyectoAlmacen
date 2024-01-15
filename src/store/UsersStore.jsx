import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,

      
    });
  },
}));
