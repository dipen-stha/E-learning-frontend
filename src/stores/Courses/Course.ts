import { create } from "zustand";
import api from "@/services/api/interceptor";
import { courseAPI } from "@/services/api/endpoints/courses";
import { CourseState, CourseDetail, CoursePayload } from "@/services/types/Course";

// Initial payload
const initialCoursePayload: CoursePayload = {
  course: {
    title: "",
    description: "",
    completion_time: 0,
    price: 0,
    requirements: "",
    objectives: "",
    categories_id: [],
    instructor_id: null,
    status: ""
  },
  file: null,
}

// Initial store state
const initialState = {
  courseDetails: [],
  courseItem: null,
  isLoading: false,
  coursePayload: initialCoursePayload,
  categoryList: [],
  courseMinimal: [],
};

export const useCourseStore = create<CourseState>((set, get) => ({
  // States
    ...initialState,
  // Setters
  setCourseDetails: (details: CourseDetail[]) => set({ courseDetails: details }),
  setCourseItem: (item: CourseDetail) => set({ courseItem: item }),
  setCoursePayload: (data) => set({coursePayload: data}),

  // Async actions
  fetchCourseDetails: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(courseAPI.fetchAll);
      if (response.data) set({ courseDetails: response.data });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchCourseById: async (courseId: number) => {
    set({ isLoading: true });
    try {
      const response = await api.get(courseAPI.fetchById(courseId));
      if (response.data) set({ courseItem: response.data });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createCourse: async () => {
    set({ isLoading: true });
    const formData = new FormData();
    const payload = get().coursePayload
    formData.append("course", JSON.stringify(payload?.course));
    if (payload?.file) formData.append("file", payload?.file);

    try {
      const response = await api.post(courseAPI.createCourse, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      set({isLoading: false})
      console.error("Failed to create course:", error);
      throw error;
    }
  },

  fetchCategoryList: async () => {
    try {
      const response = await api.get(courseAPI.fetchCategoryList);
      if (response.data) set({ categoryList: response.data });
    } catch (error) {
      console.error("Failed to fetch category list:", error);
      throw error;
    }
  },

  fetchMinimal: async () => {
    try {
      const response = await api.get(courseAPI.minimalFetch);
      if (response.data) set({ courseMinimal: response.data });
    } catch (error) {
      console.error("Failed to fetch minimal courses:", error);
      throw error;
    }
  },

  // Reset
  reset: () => set({
    courseDetails: [],
    courseItem: null,
    isLoading: false,
    coursePayload: initialCoursePayload,
    categoryList: [],
    courseMinimal: [],
  }),
}));
