import { questionAPI } from "@/services/api/endpoints/assessment";
import api from "@/services/api/interceptor";
import { QuestionPayload, QuestionState } from "@/services/types/Assessment";
import toast from "react-hot-toast";
import { create } from "zustand";

const initialPayload = {
  question: "",
  course_id: null,
  subject_id: null,
  assessment_id: null,
  options: [],
  order: "",
};

const initialState = {
  isItemLoading: false,
  isListLoading: false,
  isCreateUpdateLoading: false,
  questionPayload: initialPayload,
  questionsList: [],
  questionItem: null,
};

export const useQuestionStore = create<QuestionState>((set, get) => ({
  ...initialState,
  setPayload: (data: QuestionPayload) => set({ questionPayload: data }),
  createQuestion: async () => {
    set({isCreateUpdateLoading: true})
    try{
        await api.post(questionAPI.questionCreate, get().questionPayload)
        toast.success("Question Created Successfully")
        set({isCreateUpdateLoading: false})
    } catch (error) {
        set({isCreateUpdateLoading: false})
        toast.error("There was an error")
        throw error
    }
  },
  updateQuestion: async (questionId: number) => {
    set({isCreateUpdateLoading: true})
    try{
        await api.patch(questionAPI.updateQuestion(questionId), get().questionPayload)
        toast.success("Question Updated Successfully")
        set({isCreateUpdateLoading: false})
    } catch (error) {
        set({isCreateUpdateLoading: false})
        toast.error("There was an error")
        throw error
    }
  },
  fetchQuestionById: async (questionId: number) => {
    set({isItemLoading: true})
    try{
        const response = await api.get(questionAPI.getQuestionById(questionId))
        set({questionItem: response.data, isItemLoading: false})
    } catch (error) {
        set({isItemLoading: false})
        toast.error("There was an error fetching the details")
        throw error
    }
  },
  fetchAllQuestions: async () => {
    set({isListLoading: true})
    try{
        const response = await api.get(questionAPI.fetchQuestionList)
        set({questionsList: response.data, isListLoading: false})
    } catch (error) {
        set({isListLoading: false})
        toast.error("There was an error fetching questions")
        throw error
    }
  },
}));
