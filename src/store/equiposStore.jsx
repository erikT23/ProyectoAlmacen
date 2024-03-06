import { create } from "zustand";
import {
  CountEquipos,
  DeleteEquipos,
  EditEquipos,
  InsertEquipos,
  SearchEquipos,
  ShowEquipos,
  ShowEquiposComunes
} from "../supabase/index";

export const useEquiposStore = create((set, get) => ({
  equiposData: [],
  equiposCount: [],

  showEquipos: async () => {
    const response = await ShowEquipos();
    set({ equiposData: response });
    return response;
  },

  countEquipos: async (p) => {
    const response = await CountEquipos(p);
    set({ equiposCount: response });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },

  dataEquipos: [],
  item: [],
  parametros: {},
  mostrarEquipos: async (p) => {
    const response = await ShowEquipos(p);
    set({ parametros: response });
    set({ dataEquipos: response });
    set({ item: response[0] });
    return response;
  },

  selectEquipos: (p) => {
    set({ item: p });
  },

  insertarEquipos: async (p) => {
    await InsertEquipos(p);
    const { mostrarEquipos } = get();
    const { parametros } = get();
    set(mostrarEquipos(parametros));
  },

  borrarEquipos: async (p) => {
    await DeleteEquipos(p);
    const { mostrarEquipos } = get();
    const { parametros } = get();
    set(mostrarEquipos(parametros));
  },

  editEquipos: async (p) => {
    await EditEquipos(p);
    const { mostrarEquipos } = get();
    const { parametros } = get();
    set(mostrarEquipos(parametros));
  },

  searchEquipos: async (p) => {
    const response = await SearchEquipos(p);
    set({ data: response });
    return response;
  },

  showEquiposComunes: async () => {
    const response = await ShowEquiposComunes();
    set({ dataEquipos: response });
    return response;
  },
}));
