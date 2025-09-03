import { create } from "zustand";

import { EnrollPayload, EnrollmentState } from "@/services/types/Course";
import api from "@/services/api/interceptor";
import { enrollAPI } from "@/services/api/endpoints/courses";

const initialPayload = {
  user_id: null,
  course_id: null,
  amount: 0,
  status: "",
  provider: "",
};

const initialState = {
  enrollmentPayload: initialPayload,
  paymentSuccess: false,
  paymentDetail: null,
  isLoading: false,
  userCourseEnrollmentItem: null,
  userCourseEnrollmentsList: [],
};

export const useEnrollStore = create<EnrollmentState>((set, get) => ({
  ...initialState,
  setPayload: (data: EnrollPayload) => set({ enrollmentPayload: data }),
  makePayment: async () => {
    try {
      const response = await api.post(
        enrollAPI.createStripeSession,
        get().enrollmentPayload
      );
      if (response.data) {
        set({ paymentDetail: response.data });
        set({ enrollmentPayload: initialPayload });
        window.location.href = response.data.url;
      }
    } catch (error) {
      throw error;
    }
  },
  fetchUserEnrollmentByCourse: async (courseId: number) => {
    try {
      set({ isLoading: true });
      const response = await api.get(enrollAPI.fetchUserCourseById(courseId));
      set({ userCourseEnrollmentItem: response.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  fetchUserEnrollments: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get(enrollAPI.fetchUserEnrolledCourses);
      set({ userCourseEnrollmentsList: response.data });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
