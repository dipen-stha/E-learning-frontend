import { QuestionDetail, QuestionPayload } from "@/services/types/Assessment";
import { create } from "zustand";

const initialPayload = {
    question: "",
    course_id: null,
    subject_id: null,
    assessment_id: null,
    options: []
}

const initialState = {
    isItemLoading: false,
isListLoading: false,
isCreateUpdateLoading: false,
questionPayload: initialPayload,
questionsList: [],
questionItem: null
}

// export const useQuestionStore = create<QuestionDetail>((set, get) => ({
//  ...initialState,
//  createQuestion: async() => {

//  },

// }))