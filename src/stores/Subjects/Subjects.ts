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

  // Setter
  setSubjectPayload: (data: Partial<SubjectPayload>) =>
    set((state) => ({ subjectPayload: { ...state.subjectPayload, ...data } })),

  // Create Subject
  createSubject: async () => {
    const payload = get().subjectPayload;
    if (!payload) return;

    try {
      const response = await api.post(subjectAPI.createSubject, payload);
      get().reset(); // free memory after creating
      return response.data;
    } catch (err) {
      console.error("Create subject failed:", err);
      throw err;
    }
  },

  // Fetch subjects lazily
  fetchSubjects: async () => {
    try {
      const response = await api.get(subjectAPI.fetchSubjects);
      // Store only minimal data needed
      set({ subjectDetailList: response.data.map((s: any) => ({
        id: s.id,
        title: s.title,
        course_id: s.course_id,
      }))});
      return response.data;
    } catch (err) {
      console.error("Fetch subjects failed:", err);
      throw err;
    }
  },

  fetchSubjectsByCourse: async (courseId: number) => {
    try {
      const response = await api.get(subjectAPI.fetchSubjectsByCourse(courseId));
      set({ subjectDetailList: response.data.map((s: any) => ({
        id: s.id,
        title: s.title,
      }))});
      return response.data;
    } catch (err) {
      console.error("Fetch subjects by course failed:", err);
      throw err;
    }
  },

  // Reset state to free memory
  reset: () => set({ subjectPayload: initialPayload, subjectDetailList: [] }),
}));
