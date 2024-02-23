import { create } from "zustand";
import { ShowTipos } from "../supabase/index";

export const useTiposStore = create((set) => ({
  tiposData: [],

  showTipos: async () => {
    const response = await ShowTipos();
    set({ tiposData: response });
    return response;
  },
}));
