import { userContentAPI } from "@/services/api/endpoints/common";
import api from "@/services/api/interceptor";
import {
  UserContentState,
  UserContentUpdatePayload,
} from "@/services/types/Common";
import { create } from "zustand";

const intitalUpdatePayload = {
  content_id: null,
  status: "",
};

const initialState = {
  updatePayload: intitalUpdatePayload,
};

export const useUserContentStore = create<UserContentState>((set, get) => ({
  ...initialState,
  setUpdatePayload: (data: UserContentUpdatePayload) =>
    set({ updatePayload: data }),
  resetPayload: () => set({updatePayload: intitalUpdatePayload}),
  userContentCreate: async (content_id: number) => {
    try {
      const payload = {
        content_id: content_id,
      };
      await api.post(userContentAPI.createuserContent, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateUserContentStatus: async () => {
    try {
      await api.patch(userContentAPI.updateStatus, get().updatePayload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
