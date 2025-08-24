import { create } from "zustand";
import api from "@/services/api/interceptor";
import { UnitAPI } from "@/services/api/endpoints/courses";
import { UnitState, UnitPayload } from "@/services/types/Unit";

const initialUnitPayload: UnitPayload = {
  title: "",
  description: "",
  completion_time: 0,
  status: "",
  subject_id: null,
  objectives: "",
  order: 0,
};

const initialState = {
  unitListDetails: [],
  unitItem: null,
  unitPayload: initialUnitPayload,
  isLoading: false,
};

export const useUnitStore = create<UnitState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitPayload) => set({ unitPayload: data }),
  fetchAllUnits: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(UnitAPI.fetchAllUnits);
      set({ unitListDetails: response.data });
      set({ isLoading: false });
    } catch {
      console.log("There was an error");
      set({ isLoading: false });
    }
  },
  createUnit: async () => {
    set({isLoading: true})
    try{
        await api.post(UnitAPI.createUnit, get().unitPayload)
        set({isLoading: false, unitPayload: initialUnitPayload})
    } catch (error) {
        console.log("Error Creating Unit")
        set({isLoading: false})
    }
  },
  reset: async () => {
    set({
      unitListDetails: [],
      unitItem: null,
      unitPayload: initialUnitPayload,
      isLoading: false,
    });
  },
}));
