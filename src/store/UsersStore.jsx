import { create } from "zustand";
import { supabase } from "../index";
import { InsertUser } from "../supabase/index";

export const useUserStore = create((set, get) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
    });

    console.log("dara del registro del auth", data);

    if (error) return;

    const dataUser = await InsertUser({
      idAuth: data.user.id,
      fechaRegistro: new Date(),
      rol: "admin",
    });
    console.log("la ata user", dataUser);
    return dataUser;
  },
}));
