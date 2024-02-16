import { create } from "zustand";
import {
  CountMarcas,
  InsertMarcas,
  ShowMarcas,
  DeleteMarcas,
  EditMarcas,
  SearchMarcas,
} from "../supabase/index";

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
  mostrarMarcas: async (p) => {
    const response = await ShowMarcas(p);
    set({ parametros: response });
    set({ data: response });
    set({ item: response[0] });
    return response;
  },

  selectMarcas: (p) => {
    set({ item: p });
  },

  insertarMarcas: async (p) => {
    await InsertMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  borrarMarcas: async (p) => {
    await DeleteMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  editMarcas: async (p) => {
    await EditMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  searchMarcas: async (p) => {
    const response = await SearchMarcas(p);
    set({ data: response });
  },
}));
