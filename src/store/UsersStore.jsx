import { create } from "zustand";
import { supabase } from "../index";
import { InsertUser, ShowUsers } from "../supabase/index";

export const useUserStore = create((set, get) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
      options: {
        data: {
          nombre: p.nombre,
        },
      },
    });
    
    if (error) return;

    const dataUser = await InsertUser({
      idAuth: data.user.id,
      fechaRegistro: new Date(),
      rol: "admin",
    });
    return dataUser;
  },
  idUser: 0,
  showUsers: async () => {
    const response = await ShowUsers();
    set({ idUser: response.id });
    return response;
  },
}));
