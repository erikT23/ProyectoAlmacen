import { create } from "zustand";
import { ShowTest } from "../supabase/index";

export const useTestStore = create((set, get) => ({
  datatest: [],
  showtest: async (p) => {
    const response = await ShowTest(p);
    set({ datatest: response });
    return response;
  },
}));
