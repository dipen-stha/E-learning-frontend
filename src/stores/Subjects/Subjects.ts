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
  isLoading: false,

  // Setter
  setSubjectPayload: (data: Partial<SubjectPayload>) =>
    set((state) => ({ subjectPayload: { ...state.subjectPayload, ...data } })),

  // Create Subject
  createSubject: async () => {
    set({isLoading: true})
    const payload = get().subjectPayload;
    if (!payload) return;

    try {
      const response = await api.post(subjectAPI.createSubject, payload);
      // get().reset(); // free memory after creating
      set({isLoading: false})
      return response.data;
    } catch (err) {
      console.error("Create subject failed:", err);
      set({isLoading: false})
      throw err;
    }
  },

  // Fetch subjects lazily
  fetchSubjects: async () => {
    set({isLoading: true})
    try {
      const response = await api.get(subjectAPI.fetchSubjects);
      // Store only minimal data needed
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

  // Reset state to free memory
  reset: () => set({ subjectPayload: initialPayload, subjectDetailList: [] }),
}));
