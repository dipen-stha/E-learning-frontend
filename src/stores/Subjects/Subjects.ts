import { create } from "zustand";
import api from "@/services/api/interceptor";
import { subjectAPI } from "@/services/api/endpoints/courses";
import { SubjectPayload, SubjectState } from "@/services/types/Subject";

const initialPayload: SubjectPayload = {
  title: "",
  description: "",
  objectives: "",
  course_id: null,
  order: 0,
  status: "",
  completion_time: 0,
};

export const useSubjectStore = create<SubjectState>((set, get) => ({
  // Store only essential state
  subjectPayload: initialPayload,
  subjectDetailList: [],
  subjectMinimalList: [],
  subjectItem: null,
  isLoading: false,

  setSubjectPayload: (data: Partial<SubjectPayload>) =>
    set((state) => ({ subjectPayload: { ...state.subjectPayload, ...data } })),
  resetSubjectPayload: () => set({subjectPayload: initialPayload}),

  createSubject: async () => {
    set({isLoading: true})
    const payload = get().subjectPayload;
    if (!payload) return;

    try {
      const response = await api.post(subjectAPI.createSubject, payload);

      set({isLoading: false})
      return response.data;
    } catch (err) {
      console.error("Create subject failed:", err);
      set({isLoading: false})
      throw err;
    }
  },
  updateSubject: async (subjectId: number) => {
    set({isLoading: true})
    try{
      await api.patch(subjectAPI.updateSubject(subjectId), get().subjectPayload)
      set({isLoading: false})
    } catch (error){
      set({isLoading: false})
    }
  },
  fetchSubjects: async () => {
    set({isLoading: true})
    try {
      const response = await api.get(subjectAPI.fetchSubjects);

      set({ subjectDetailList: response.data, isLoading: false});
      return response.data;
    } catch (err) {
      set({isLoading: false})
      console.error("Fetch subjects failed:", err);
      throw err;
    }
  },


  fetchSubjectsByCourse: async (courseId: number) => {
    set({isLoading: true})
    try {
      const response = await api.get(subjectAPI.fetchSubjectsByCourse(courseId));
      set({ subjectDetailList: response.data, isLoading: false});
      return response.data;
    } catch (err) {
      set({isLoading: false})
      console.error("Fetch subjects by course failed:", err);
      throw err;
    }
  },
  fetchSubjectMinimal: async(courseId: number) => {
    set({isLoading: true})
    try{
      const response = await api.get(subjectAPI.fetchSubjectMinimal(courseId))
      if(response.data){
        set({subjectMinimalList: response.data})
      }
      set({isLoading:false})
    } catch (error){
      set({isLoading:false})
    }
  },
  fetchSubjectById: async(subjectId) => {
    try{
      const response = await api.get(subjectAPI.fetchSubjectById(subjectId))
      set({subjectItem: response.data})
    } catch {
    }
  },

  // Reset state to free memory
  reset: () => set({ subjectPayload: initialPayload, subjectDetailList: [] }),
}));
