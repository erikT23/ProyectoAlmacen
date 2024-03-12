import { create } from "zustand";
import {
  DeleteEquipos,
  EditDepartamentos,
  InsertDepartamentos,
  ShowDepartamentos,
} from "../supabase/index";

export const useDepartamentosStore = create((set, get) => ({
  departamentosData: [],

  showDepartamentos: async () => {
    const response = await ShowDepartamentos();
    set({ departamentosData: response });
    return response;
  },

  dataDepartamentos: [],
  item: [],
  parametros: {},
  mostrarDepartamentos: async (p) => {
    const response = await ShowDepartamentos(p);
    set({ parametros: response });
    set({ dataDepartamentos: response });
    set({ item: response[0] });
    return response;
  },

  insertarDepartamentos: async (p) => {
    await InsertDepartamentos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },

  borrarEquipos: async (p) => {
    await DeleteEquipos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },

  editarDepartamentos: async (p) => {
    await EditDepartamentos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },
}));
