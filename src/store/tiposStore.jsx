import { create } from "zustand";
import { ShowTipos, ShowTiposById } from "../supabase/index";

export const useTiposStore = create((set) => ({
  tiposData: [],

  showTipos: async () => {
    const response = await ShowTipos();
    set({ tiposData: response });
    return response;
  },

  showTiposById: async (id) => {
    const response = await ShowTiposById(id);
    set({ tiposData: response });
    return response;
  },
}));
