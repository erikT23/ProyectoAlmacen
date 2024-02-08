import { create } from "zustand";
import { ShowTest, CountTest, SearchTest, InsertTest } from "../supabase/index";

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
  mostrarTest: async (p) => {
    const response = await SearchTest(p);
    set({ parametros: response });
    set({ data: response });
    set({ item: response[0] });
    return response;
  },

  selectTest: (p) => {
    set({ item: p });
  },

  insertTest: async (p) => {
    await InsertTest(p);

    const { mostrarTest } = get();
    set(mostrarTest);
  },
}));
