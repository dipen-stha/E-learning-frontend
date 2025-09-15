import { create } from "zustand";
import {
  AssessmentTypeState,
  AssessmentTypePayload,
  AssessmentTypeDetail,
} from "@/services/types/Setup";
import api from "@/services/api/interceptor";
import { assessmentTypeAPI } from "@/services/api/endpoints/assessment";
import toast from "react-hot-toast";

const initialPayload = {
  title: "",
  description: "",
  icon: "",
};

const initialState = {
  payload: initialPayload,
  isItemLoading: false,
  isListLoading: false,
  isCreateUpdateLoading: false,
  assessmentTypeDetails: [],
  assessmentTypeItem: null,
};

export const useAssessmentTypeStore = create<AssessmentTypeState>(
  (set, get) => ({
    ...initialState,
    setPayload: (data: AssessmentTypePayload) => set({ payload: data }),
    createAssessmentType: async () => {
      set({ isCreateUpdateLoading: true });
      try {
        await api.post(assessmentTypeAPI.createAssessmentType, get().payload);
        set({ isCreateUpdateLoading: false });
        toast.success("Assessment Type created successfully")
      } catch (error) {
        set({ isCreateUpdateLoading: false });
        toast.error("There was an error")
        throw error;
      }
    },
    updateAssessmentType: async (typeId: number) => {},
    fetchAssessmentTypeById: async (typeId: number) => {},
    fetchAssessmentTypeList: async () => {
      set({ isListLoading: true });
      try {
        const response = await api.get(
          assessmentTypeAPI.fetchAllAssessmentTypes
        );
        set({ assessmentTypeDetails: response.data, isListLoading: false });
      } catch (error) {
        set({ isListLoading: false });
        throw error;
      }
    },
  })
);
