import { create } from "zustand";
import { ShowBitacora } from "../supabase/index";

//store para mostrar la bitacora funcionamiento especifico en el store de equipos

export const useBitacoraStore = create((set) => ({
  bitacoraData: [],

  showBitacora: async () => {
    const response = await ShowBitacora();
    set({ bitacoraData: response });
    return response;
  },
}));
