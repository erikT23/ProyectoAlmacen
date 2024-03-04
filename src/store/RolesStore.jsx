import { create } from "zustand";
import { ShowRoles } from "../supabase/index";

export const useRolesStore = create((set) => ({
  rolesData: [],
  item: [],
  parametros: {},
  showRoles: async () => {
    const response = await ShowRoles();
    set({ rolesData: response });
    set({ item: response });
    set({ parametros: response });
    return response;
  },
}));
