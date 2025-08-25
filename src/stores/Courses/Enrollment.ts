import { create } from "zustand";

import {
  EnrollPayload,
  PaymentDetail,
  EnrollmentState,
} from "@/services/types/Course";
import api from "@/services/api/interceptor";
import { enrollAPI } from "@/services/api/endpoints/courses";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

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
        window.location.href=response.data.url
      }
    } catch {
      console.log();
    }
  },
}));
