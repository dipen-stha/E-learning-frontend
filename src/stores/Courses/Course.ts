import { create } from "zustand";
import api from "@/services/api/interceptor";
import { courseAPI } from "@/services/api/endpoints/courses";
import {
  CourseState,
  CourseDetail,
  CoursePayload,
} from "@/services/types/Course";
import toast from "react-hot-toast";

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
    status: "",
  },
  file: null,
};

// Initial store state
const initialState = {
  courseDetails: [],
  courseItem: null,
  isListLoading: false,
  isItemLoading: false,
  isCreateUpdateLoading: false,
  coursePayload: initialCoursePayload,
  categoryList: [],
  courseMinimal: [],
};

export const useCourseStore = create<CourseState>((set, get) => ({
  // States
  ...initialState,
  // Setters
  setCourseDetails: (details: CourseDetail[]) =>
    set({ courseDetails: details }),
  setCourseItem: (item: CourseDetail) => set({ courseItem: item }),
  setCoursePayload: (data) => set({ coursePayload: data }),

  // Async actions
  fetchCourseDetails: async () => {
    set({ isListLoading: true });
    try {
      const response = await api.get(courseAPI.fetchAll);
      if (response.data) set({ courseDetails: response.data });
      set({isListLoading: false})
    } catch (error) {
      set({ isListLoading: false });
      throw error;
    }
  },
  fetchLatestCourses: async () => {
    set({ isListLoading: true });
    try {
      const response = await api.get(courseAPI.fetchLatestCourses);
      set({ courseDetails: response.data, isListLoading: false });
    } catch (error) {
      set({ isListLoading: false });
      throw error;
    }
  },
  fetchCourseById: async (courseId: number) => {
    set({ isItemLoading: true });
    try {
      const response = await api.get(courseAPI.fetchById(courseId));
      if (response.data) set({ courseItem: response.data, isItemLoading: false });
    } catch (error) {
      set({ isItemLoading: false });
      throw error;
    }
  },

  createCourse: async () => {
    set({ isCreateUpdateLoading: true });
    const formData = new FormData();
    const payload = get().coursePayload;
    formData.append("course", JSON.stringify(payload?.course));
    if (payload?.file) formData.append("file", payload?.file);

    try {
      const response = await api.post(courseAPI.createCourse, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({isCreateUpdateLoading: false})
      toast.success("Course created successfully")
      return response.data;
    } catch (error) {
      set({ isCreateUpdateLoading: false });
      toast.error("Error creating course")
      console.error("Failed to create course:", error);
      throw error;
    }
  },
  updateCourse: async (courseId: number) => {
    set({ isCreateUpdateLoading: true });
    const formData = new FormData();
    const payload = get().coursePayload;
    const file = payload.file
    formData.append("course", JSON.stringify(payload?.course));
    if(file && file instanceof File) formData.append("file", file)
    try {
      await api.patch(courseAPI.updateCourse(courseId), formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      set({ isCreateUpdateLoading: false });
      toast.success("Course updated successfully")
    } catch (error) {
      set({ isCreateUpdateLoading: false });
      toast.error("Error updating course")
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
  reset: () =>
    set({
      courseDetails: [],
      courseItem: null,
      isListLoading: false,
      isItemLoading: false,
      isCreateUpdateLoading: false,
      coursePayload: initialCoursePayload,
      categoryList: [],
      courseMinimal: [],
    }),
}));
