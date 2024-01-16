import { create } from "zustand";
import { InsertUser, supabase } from "../index";

export const useUsersStore = create((set, get) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
    });
    if (error) {
      return;
    }
    console.log("user data", data);
    await InsertUser({
      idAuth: data.user.id,
      created_at: new Date(),
      rol: "admin",
    });
  },
}));
