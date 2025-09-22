import { contentAPI } from "@/services/api/endpoints/courses";
import api from "@/services/api/interceptor";
import { UnitContentPayload, UnitContentState } from "@/services/types/Course";
import { PaginationArgs } from "@/services/types/Extras";
import toast from "react-hot-toast";
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
  isItemLoading: false,
  isListLoading: false,
  isCreateUpdateLoading: false,
  contentsList: [],
  contentItem: null,
  paginationData: null,
};

export const useUnitContentStore = create<UnitContentState>((set, get) => ({
  ...initialState,
  setPayload: (data: UnitContentPayload) => set({ payload: data }),
  createUnitContent: async () => {
    set({ isCreateUpdateLoading: true });
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
      toast.success("Content Created Successfully");
      set({ isCreateUpdateLoading: false });
      return true;
    } catch (error) {
      toast.error("There was an error creating content.");
      set({ isCreateUpdateLoading: false });
      return false;
    }
  },
  updateContent: async (contentId: number) => {
    set({ isCreateUpdateLoading: true });
    try {
      const formData = new FormData();
      const payload = get().payload;
      const file = payload.file;
      formData.append("content", JSON.stringify(payload?.content));
      if (file && file instanceof File) formData.append("file", file);
      await api.patch(contentAPI.updateContent(contentId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isCreateUpdateLoading: false });
      toast.success("Toast updated successfully");
    } catch (error) {
      toast.error("There was an error udpating the content");
      set({ isCreateUpdateLoading: false });
      throw error;
    }
  },
  resetPayload: () => set({ payload: initialPayload }),
  fetchContentById: async (contentId: number) => {
    set({ isItemLoading: true });
    try {
      const response = await api.get(contentAPI.fetchContentById(contentId));
      set({
        contentItem: response.data,
        isItemLoading: false,
      });
    } catch (error) {
      set({ isItemLoading: true });
      toast.error("Error fetching");
      throw error;
    }
  },
  fetchAllContents: async (pagination?: PaginationArgs) => {
    set({ isListLoading: true });
    try {
      const response = await api.get(contentAPI.fetchAllContents, {
        params: {
          offset: pagination?.offset ?? 0,
          limit: pagination?.limit ?? 10,
          page: pagination?.page ?? 10,
        },
      });
      if (response.data.data) {
        set({
          contentsList: response.data.data,
          isListLoading: false,
          paginationData: {
            current_page: response.data.current_page,
            total_pages: response.data.total_pages,
          },
        });
      }
    } catch (error) {
      toast.error("Error fetching");
      set({ isListLoading: false });
      throw error;
    }
  },
}));
