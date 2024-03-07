import { create } from "zustand";
import { ShowDepartamentosConCentros } from "../supabase/index";

export const useCentrosStore = create((set) => ({
  tiposData: [],

  showCentros: async () => {
    const response = await ShowDepartamentosConCentros();
    set({ tiposData: response });
    return response;
  },
}));
