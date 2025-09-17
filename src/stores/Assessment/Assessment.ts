import { assessmentAPI } from "@/services/api/endpoints/assessment";
import api from "@/services/api/interceptor";
import { AssessmentPayload, AssessmentState } from "@/services/types/Assessment";
import toast from "react-hot-toast";
import { create } from "zustand";

const initialPayload = {
    title: "",
    assessment_type_id: null,
    course_id: null,
    subject_id: null,
    description: "",
    order: "",
    max_points: "",
    pass_points: "",
}

const initialState = {
    assessmentItem: null,
    assessmentDetails: [],
    isItemLoading: false,
    isListLoading: false,
    isCreateUpdateLoading: false,
    assessmentPayload: initialPayload,
    minimalAssessments: []
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
    ...initialState,
    setPayload:(data: AssessmentPayload) => set({assessmentPayload: data}),
    createAssessment: async() => {
        set({isCreateUpdateLoading: true})
        try{
            await api.post(assessmentAPI.createAssessment, get().assessmentPayload)
            set({isCreateUpdateLoading: false})
            toast.success("Assessment Created Successfully")
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error while creating this assessment")
            throw error
        }
    },
    updateAssessment: async(assessmentId: number) => {
        set({isCreateUpdateLoading: true})
        try{
            await api.patch(assessmentAPI.updateAssessment(assessmentId), get().assessmentPayload)
            set({isCreateUpdateLoading: false})
            toast.success("Assessment Updated")
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error updating this assessment")
            throw error
        }
    },
    fetchAssessmentList: async() => {
        set({isListLoading: true})
        try{
            const response = await api.get(assessmentAPI.fetchAssessmentList)
            set({assessmentDetails: response.data, isListLoading: false})
        } catch (error) {
            set({isListLoading: false})
            toast.error("Error fetching assessments")
            throw new Error
        }
    },
    fetchById: async(assessmentId: number) => {
        set({isItemLoading: true})
        try{
            const response = await api.get(assessmentAPI.fetchAssessmentById(assessmentId))
            set({assessmentItem: response.data, isItemLoading: false})
        } catch (error) {
            set({isItemLoading: false})
            toast.error("Error fetching this assessment")
            throw error
        }
    },
    fetchAssessmentBySubject: async(subjectId: number) => {
        try{
            const response = await api.get(assessmentAPI.fetchAssessmentsBySubject(subjectId))
            set({minimalAssessments: response.data})
        } catch (error) {
            toast.error("There was an error fetching list")
            throw error
        }
    }
}))