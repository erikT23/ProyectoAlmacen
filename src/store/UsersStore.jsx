import Swal from "sweetalert2";
import { create } from "zustand";
import { EditUser, supabase } from "../index";
import {
  DeleteUser,
  InsertUser,
  ShowUsers,
  ShowAllUsers,
} from "../supabase/index";
import { createClient } from "@supabase/supabase-js";

export const useUserStore = create((set, get) => ({
  insertAdminUser: async (p) => {
    console.log("data de p en store", p);
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.password,
      options: {
        data: {
          rol: p.rol,
        },
      },
    });
    if (error) return;

    const dataUser = await InsertUser({
      idauth: data.user.id,
      fechaRegistro: new Date(),
      rol: data.rol,
      correo: data.user.email,
      password: data.user.password,
    });
    console.log("data del datauser en store", dataUser);
    return dataUser;
  },
  userData: [],
  item: [],
  parametros: {},
  showAllUsers: async () => {
    const response = await ShowAllUsers();
    set({ userData: response });
    set({ parametros: response });
    set({ item: response[0] });
    return response;
  },

  editUser: async (p) => {
    await EditUser(p);
    const { showAllUsers } = get();
    const { parametros } = get();
    set(showAllUsers(parametros));
  },

  idUser: 0,
  activeUser: [],
  showUsers: async () => {
    const response = await ShowUsers();
    set({ idUser: response.id, activeUser: response });
    return response;
  },

  deleteUser: async (p) => {
    const supabaseAdmin = createClient(
      import.meta.env.VITE_APP_SUPABASE_URL,
      import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const { error } = await supabaseAdmin.auth.admin.deleteUser(p.idauth);
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al eliminar el usuario " + error.message,
      });
      return;
    }

    await DeleteUser(p);
    const { showAllUsers } = get();
    const { parametros } = get();
    set(showAllUsers(parametros));
  },
}));
