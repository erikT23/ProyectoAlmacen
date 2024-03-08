import { create } from "zustand";
import { ShowEstados } from "../supabase";

export const useEstadoStore = create((set) => ({
  estadosData: [],

  showEstados: async () => {
    const response = await ShowEstados();
    set({ estadosData: response });
    return response;
  },
}));
