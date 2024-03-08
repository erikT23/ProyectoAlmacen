import { create } from "zustand";
import { ShowDepartamentosConCentros } from "../supabase/index";

export const useCentrosStore = create((set) => ({
  centrosData: [],

  showCentros: async () => {
    const response = await ShowDepartamentosConCentros();
    set({ centrosData: response });
    return response;
  },
}));
