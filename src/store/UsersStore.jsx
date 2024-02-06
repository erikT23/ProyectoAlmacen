import { create } from "zustand";
import { supabase } from "../index";
import { InsertUser, ShowUsers } from "../supabase/index";

export const useUserStore = create((set) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.password,
    });
    console.log("info en data userstore", data);
    if (error) return;

    const dataUser = await InsertUser({
      idauth: data.user.id,
      fechaRegistro: new Date(),
      rol: "admin",
      correo: data.user.email,
      password: data.user.password,
    });
    console.log("debug datauser" + dataUser);
    return dataUser;
  },
  idUser: 0,
  showUsers: async () => {
    const response = await ShowUsers();
    set({ idUser: response.id });
    return response;
  },
}));
