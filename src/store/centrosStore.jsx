import { create } from "zustand";
import {
  DeleteEquipos,
  EditCentros,
  InsertCentros,
  ShowCentros,
} from "../supabase/index";

export const useCentrosStore = create((set, get) => ({
  centrosData: [],

  showCentros: async () => {
    const response = await ShowCentros();
    set({ centrosData: response });
    return response;
  },

  dataCentros: [],
  item: [],
  parametros: {},
  mostrarCentros: async (p) => {
    const response = await ShowCentros(p);
    set({ parametros: response });
    set({ dataCentros: response });
    set({ item: response[0] });
    return response;
  },

  insertarCentros: async (p) => {
    await InsertCentros(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },

  borrarEquipos: async (p) => {
    await DeleteEquipos(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },

  editarCentros: async (p) => {
    await EditCentros(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },
}));
