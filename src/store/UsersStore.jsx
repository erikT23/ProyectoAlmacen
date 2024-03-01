import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { create } from "zustand";
import { EditUser } from "../index";
import {
  DeleteUser,
  InsertUser,
  ShowAllUsers,
  ShowUsers,
} from "../supabase/index";

export const useUserStore = create((set, get) => ({
  insertAdminUser: async (p) => {
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

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: p.correo,
      password: p.password,
      options: {
        data: {
          rol: p.rol,
        },
      },
      email_confirm: true,
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al crear el usuario " + error.message,
      });
      return;
    }
    const dataUser = await InsertUser({
      idauth: data.user.id,
      fechaRegistro: new Date(),
      rol: p.rol,
      correo: data.user.email,
      password: data.user.password,
      nombre: p.nombre,
    });
    supabaseAdmin.auth.signOut();

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

    const { error } = await supabaseAdmin.auth.admin.updateUserById(p.idauth, {
      password: p.password,
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al editar el usuario " + error.message,
      });
    }
    await EditUser(p);
    const { showAllUsers } = get();
    const { parametros } = get();
    set(showAllUsers(parametros));
    supabaseAdmin.auth.signOut();
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
    supabaseAdmin.auth.signOut();
  },
}));
