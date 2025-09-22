import { create } from "zustand";
import api from "@/services/api/interceptor";
import { UnitAPI } from "@/services/api/endpoints/courses";
import { UnitState, UnitPayload } from "@/services/types/Unit";
import toast from "react-hot-toast";

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
  isItemLoading: false,
  isListLoading: false,
  isCreateUpdateLoading: false,
  unitMinimalList: []
};

export const useUnitStore = create<UnitState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitPayload) => set({ unitPayload: data }),
  resetPayload: () => set({unitPayload: initialUnitPayload}),
  fetchAllUnits: async () => {
    set({ isListLoading: true });
    try {
      const response = await api.get(UnitAPI.fetchAllUnits);
      set({ unitListDetails: response.data });
      set({ isListLoading: false });
    } catch {
      console.log("There was an error");
      toast.error("There was an error")
      set({ isListLoading: false });
    }
  },
  fetchUnitById: async(unitId: number) => {
    set({isItemLoading: true})
    try{
      const response = await api.get(UnitAPI.fetchUnitById(unitId))
      if(response.data) {
       set({unitItem: response.data}) 
      }
      set({isItemLoading: false})
    } catch (error) {
      set({isItemLoading: false})
      toast.error("There was an error")
      throw error
    }
  },
  createUnit: async () => {
    set({isCreateUpdateLoading: true})
    try{
        await api.post(UnitAPI.createUnit, get().unitPayload)
        set({isCreateUpdateLoading: false, unitPayload: initialUnitPayload})
        toast.success("Unit Created Successfully")
    } catch (error) {
        console.log("Error Creating Unit")
        toast.error("There was an error creating")
        set({isCreateUpdateLoading: false})
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
      toast.success("Unit udpated successfully")
    } catch (error){
      toast.error("There was an error updating the unit")
      throw error
    }
  },
  reset: async () => {
    set({
      unitListDetails: [],
      unitItem: null,
      unitPayload: initialUnitPayload,
      isItemLoading: false,
      isListLoading: false,
      isCreateUpdateLoading: false,
    });
  },
}));
