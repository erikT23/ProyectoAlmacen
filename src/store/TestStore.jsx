import { create } from "zustand";
import { ShowTest, CountTest } from "../supabase/index";

export const useTestStore = create((set) => ({
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
  
}));
