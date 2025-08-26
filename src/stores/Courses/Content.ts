import { contentAPI } from "@/services/api/endpoints/courses";
import api from "@/services/api/interceptor";
import { UnitContentPayload, UnitContentState } from "@/services/types/Course";
import { create } from "zustand";

const initialPayload = {
  content: {
    completion_time: 0,
    order: 0,
    description: "",
    content_type: "",
    status: "",
    video_time_stamps: [],
    unit_id: null,
  },
  file: null,
};

const initialState = {
  payload: initialPayload,
  isLoading: false,
};

export const useUnitContentStore = create<UnitContentState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitContentPayload) => set({ payload: data }),
  createUnitContent: async () => {
    set({ isLoading: true });
    try {
      await api.post(contentAPI.createUnitContent);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
