import { create } from "zustand";
import {
  CountModelos,
  DeleteModelos,
  EditModelos,
  InsertModelos,
  ShowModelos,
} from "../supabase/index";

export const useModelosStore = create((set, get) => ({
  modelosData: [],
  modelosCount: [],

  showMarcas: async (p) => {
    const response = await ShowModelos(p);
    set({ modelosData: response });
    return response;
  },

  countModelos: async (p) => {
    const response = await CountModelos(p);
    set({ modelosCount: response });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },

  dataModelos: [],
  item: [],
  parametros: {},
  mostrarModelos: async (p) => {
    const response = await ShowModelos(p);
    set({ parametros: response });
    set({ dataModelos: response });
    set({ item: response[0] });
    return response;
  },

  selectModelos: (p) => {
    set({ item: p });
  },

  insertarModelos: async (p) => {
    await InsertModelos(p);
    const { mostrarModelos } = get();
    const { parametros } = get();
    set(mostrarModelos(parametros));
  },

  borrarModelos: async (p) => {
    await DeleteModelos(p);
    const { mostrarModelos } = get();
    const { parametros } = get();
    set(mostrarModelos(parametros));
  },

  editModelos: async (p) => {
    await EditModelos(p);
    const { mostrarModelos } = get();
    const { parametros } = get();
    set(mostrarModelos(parametros));
  },

  searchModelos: async (p) => {
    const response = await ShowModelos(p);
    set({ dataModelos: response });
  },
}));
