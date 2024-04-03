import { create } from "zustand";
import {
  CountCelularesBodegaPar,
  CountCelularesComunes,
  CountCelularesGhp,
  CountCelularesImx,
  CountCelularesLm,
  CountCelularesMB,
  CountEquiposBodega,
  CountEquiposComunes,
  CountEquiposGhp,
  CountEquiposImx,
  CountEquiposLm,
  CountEquiposMB,
  CountMonitoresBodega,
  CountMonitoresComunes,
  CountMonitoresGhp,
  CountMonitoresImx,
  CountMonitoresLm,
  CountMonitoresMb,
  DeleteEquipos,
  EditEquipos,
  InsertEquipos,
  ShowEquipos,
  ShowEquiposComunes,
  ShowMonitores,
} from "../supabase/index";

export const useEquiposStore = create((set, get) => ({
  equiposData: [],
  equiposCount: [],

  showEquipos: async () => {
    const response = await ShowEquipos();
    set({ equiposData: response });
    return response;
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
  dataSinMonitor: [],
  showEquiposComunes: async () => {
    const response = await ShowEquiposComunes();
    set({ dataSinMonitor: response });
    return response;
  },
  dataMonitores: [],
  showMonitores: async () => {
    const response = await ShowMonitores();
    set({ dataMonitores: response });
    return response;
  },

  countComunesData: [],

  countComunes: async () => {
    const response = await CountEquiposComunes();
    set({ countComunesData: response });
    return response;
  },

  countmbData: [],

  countMB: async () => {
    const response = await CountEquiposMB();
    set({ countmbData: response });
    return response;
  },

  countlmData: [],

  countLm: async () => {
    const response = await CountEquiposLm();
    set({ countlmData: response });
    return response;
  },

  countimxData: [],
  countImx: async () => {
    const response = await CountEquiposImx();
    set({ countimxData: response });
    return response;
  },

  countghpData: [],
  countGhp: async () => {
    const response = await CountEquiposGhp();
    set({ countghpData: response });
    return response;
  },

  countbodegaComunesData: [],

  countBodegaComunes: async () => {
    const response = await CountEquiposBodega();
    set({ countbodegaComunesData: response });
    return response;
  },

  countMonitorLmData: [],

  countMonitorLm: async () => {
    const response = await CountMonitoresLm();
    set({ countMonitorLmData: response });
    return response;
  },

  countMonitorGhpData: [],
  countMonitorGhp: async () => {
    const response = await CountMonitoresGhp();
    set({ countMonitorGhpData: response });
    return response;
  },

  countMonitorClubData: [],
  countMonitorClub: async () => {
    const response = await CountMonitoresImx();
    set({ countMonitorClubData: response });
    return response;
  },

  countMonitorBodegaData: [],
  countMonitorBodega: async () => {
    const response = await CountMonitoresBodega();
    set({ countMonitorBodegaData: response });
    return response;
  },

  countMonitorMbData: [],
  countMonitorMb: async () => {
    const response = await CountMonitoresMb();
    set({ countMonitorMbData: response });
    return response;
  },

  countMonitorComunesData: [],
  countMonitorComunes: async () => {
    const response = await CountMonitoresComunes();
    set({ countMonitorComunesData: response });
    return response;
  },

  countCelularesParData: [],
  countCelularesPar: async () => {
    const response = await CountCelularesComunes();
    set({ countCelularesParData: response });
    return response;
  },

  countCelularesMbData: [],
  countCelularesMb: async () => {
    const response = await CountCelularesMB();
    set({ countCelularesMbData: response });
    return response;
  },

  countCelularesParBodegaData: [],
  countCelularesParBodega: async () => {
    const response = await CountCelularesBodegaPar();
    set({ countCelularesParBodegaData: response });
    return response;
  },

  countCelularesImxData: [],
  countCelularesImx: async () => {
    const response = await CountCelularesImx();
    set({ countCelularesImxData: response });
    return response;
  },

  countCelularesGhpData: [],
  countCelularesGrandes: async () => {
    const response = await CountCelularesGhp();
    set({ countCelularesGhpData: response });
    return response;
  },

  countCelularesLmData: [],
  countCelularesLm: async () => {
    const response = await CountCelularesLm();
    set({ countCelularesLmData: response });
    return response;
  },
}));
