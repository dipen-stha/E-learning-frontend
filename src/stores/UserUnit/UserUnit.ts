import { userUnitAPI } from "@/services/api/endpoints/common";
import api from "@/services/api/interceptor";
import { UserUnitState } from "@/services/types/Common";
import { create } from "zustand";


const initialState = {
    userUnitStatus: []
}
export const useUserUnitStore = create<UserUnitState>((set, get) => ({
    ...initialState,
    fetchUserUnitBySubject: async (subjectId: number) => {
        try{
            const response = await api.get(userUnitAPI.fetchUserUnitStatus(subjectId))
            set({userUnitStatus: response.data})
        } catch (error) {
            console.log(error)
        }
    },
    userUnitCreate: async (unitId: number) => {
        try {
            const payload = {
                unit_id: unitId
            }
            await api.post(userUnitAPI.createUserUnit, payload)
        } catch (error) {
            console.log(error)
        }
    }
}))