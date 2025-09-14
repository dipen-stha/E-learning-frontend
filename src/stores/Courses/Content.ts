import { contentAPI } from "@/services/api/endpoints/courses";
import api from "@/services/api/interceptor";
import { UnitContentPayload, UnitContentState } from "@/services/types/Course";
import { create } from "zustand";

const initialPayload = {
  content: {
    title: "",
    completion_time: 0,
    order: 0,
    description: "",
    content_type: "",
    status: "",
    video_time_stamps: [],
    unit_id: null,
    subject_id: null,
    course_id: null, 
  },
  file: null,
};

const initialState = {
  payload: initialPayload,
  isLoading: false,
  contentsList: [],
  contentItem: null,
};

export const useUnitContentStore = create<UnitContentState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitContentPayload) => set({ payload: data }),
  createUnitContent: async () => {
    set({ isLoading: true });
    const formData = new FormData();
    const payload = get().payload;
    formData.append("content", JSON.stringify(payload?.content));
    if (payload?.file) formData.append("file", payload.file);
    try {
      await api.post(contentAPI.createUnitContent, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },
  updateContent: async (contentId: number) => {
    try {
      const formData = new FormData();
      const payload = get().payload;
      const file = payload.file
      formData.append("content", JSON.stringify(payload?.content));
      if (file && file instanceof File) formData.append("file", file);
      await api.patch(contentAPI.updateContent(contentId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  },
  resetPayload: () => set({ payload: initialPayload }),
  fetchContentById: async (contentId: number) => {
    try {
      const response = await api.get(contentAPI.fetchContentById(contentId));
      set({ contentItem: response.data });
    } catch (error) {
      throw error;
    }
  },
  fetchAllContents: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(contentAPI.fetchAllContents);
      if (response.data) {
        set({ contentsList: response.data, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
