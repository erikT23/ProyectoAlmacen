import { create } from "zustand";
import { ShowBitacora } from "../supabase/index";

export const useBitacoraStore = create((set) => ({
  bitacoraData: [],

  showBitacora: async () => {
    const response = await ShowBitacora();
    set({ bitacoraData: response });
    return response;
  },
}));
