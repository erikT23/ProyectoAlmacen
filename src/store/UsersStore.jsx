import Swal from "sweetalert2";
import { create } from "zustand";
import { supabase } from "../index";
import {
  DeleteUser,
  InsertUser,
  ShowUsers,
  ShowAllUsers,
} from "../supabase/index";

export const useUserStore = create((set) => ({
  insertAdminUser: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.password,
      options: {
        data: {
          rol: p.rol,
        },
      },
    });
    console.log("data del user", data);
    if (error) return;

    const dataUser = await InsertUser({
      idauth: data.user.id,
      fechaRegistro: new Date(),
      rol: data.rol,
      correo: data.user.email,
      password: data.user.password,
    });
    return dataUser;
  },
  userData: [],
  showAllUsers: async () => {
    const response = await ShowAllUsers();
    set({ userData: response });
    return response;
  },

  idUser: 0,
  showUsers: async () => {
    const response = await ShowUsers();
    set({ idUser: response.id });
    return response;
  },

  deleteUser: async (p) => {
    const { error } = await supabase.auth.admin.deleteUser(p.idauth);
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al eliminar el usuario " + error.message,
      });
      return;
    }

    await DeleteUser(p);
  },
}));
