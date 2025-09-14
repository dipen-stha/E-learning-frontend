import { create } from "zustand";
import api from "@/services/api/interceptor";
import { UnitAPI } from "@/services/api/endpoints/courses";
import { UnitState, UnitPayload } from "@/services/types/Unit";

const initialUnitPayload: UnitPayload = {
  title: "",
  description: "",
  completion_time: 0,
  status: "",
  course_id: null,
  subject_id: null,
  objectives: "",
  order: 0,
};

const initialState = {
  unitListDetails: [],
  unitItem: null,
  unitPayload: initialUnitPayload,
  isLoading: false,
  unitMinimalList: []
};

export const useUnitStore = create<UnitState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitPayload) => set({ unitPayload: data }),
  resetPayload: () => set({unitPayload: initialUnitPayload}),
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
  fetchUnitById: async(unitId: number) => {
    try{
      const response = await api.get(UnitAPI.fetchUnitById(unitId))
      if(response.data) {
       set({unitItem: response.data}) 
      }
    } catch (error) {
      throw error
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
  fetchMinimalUnitList: async(subjectId: number | null) => {
    let apiUrl = UnitAPI.minimalUnit
    if(subjectId){
      apiUrl = UnitAPI.minimalUnitBySubject(subjectId)
    }
    console.log(apiUrl)
    try{
      const response = await api.get(apiUrl)
      if(response.data){
        set({unitMinimalList: response.data})
      }
    } catch(error){
      console.log(error)
      throw error
    }
  },
  editUnit: async(unitId: number) => {
    try{
      const payload = get().unitPayload
      await api.patch(UnitAPI.updateUnit(unitId), payload)
    } catch (error){
      throw error
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
