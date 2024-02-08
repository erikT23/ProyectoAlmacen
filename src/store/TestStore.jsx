import { create } from "zustand";
import { ShowTest, CountTest, SearchTest } from "../supabase/index";

export const useTestStore = create((set, get) => ({
  datatest: [],
  testcount: [],
  showtest: async (p) => {
    const response = await ShowTest(p);
    set({ datatest: response });
    return response;
  },
  counttest: async (p) => {
    const response = await CountTest(p);
    set({ testcount: response });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  data: [],
  item: [],
  parametros: {},
  mostrarMarca: async (p) => {
    const response = await SearchTest(p)
    
  },
}));
