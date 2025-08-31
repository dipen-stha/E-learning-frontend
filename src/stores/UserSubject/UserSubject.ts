import { userSubjectAPI } from "@/services/api/endpoints/common";
import api from "@/services/api/interceptor";
import { UserSubjectState } from "@/services/types/Common";
import { create } from "zustand";

const initialState = {
    userSubjectStatus: null
}

export const useUserSubjectStore = create<UserSubjectState>((set, get) => ({
    ...initialState, 
    createUserSubject: () => {

    },

    fetchUserSubjectStats: async (subjectId: number) => {
        try{
            const response = await api.get(userSubjectAPI.fetchUserSubjectStatus(subjectId))
            set({userSubjectStatus: response.data})
        } catch (error) {
            console.log(error)
        }
    }
}))