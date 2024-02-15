import { create } from "zustand";
import { CountMarcas, ShowMarcas } from "../supabase/index";

export const useMarcasStore = create((set, get) => ({
  marcasTest: [],
  marcasCount: [],

  showMarcas: async (p) => {
    const response = await ShowMarcas(p);
    set({ marcasTest: response });
    return response;
  },

  countMarcas: async (p) => {
    const response = await CountMarcas(p);
    set({ marcasCount: response });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },

  data: [],
  item: [],
  parametros: {},
}));
