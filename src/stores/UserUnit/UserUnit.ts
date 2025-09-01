import { userUnitAPI } from "@/services/api/endpoints/common";
import api from "@/services/api/interceptor";
import { UserUnitState, UserUnitUpdatePayload } from "@/services/types/Common";
import { create } from "zustand";

const intitalUpdatePayload = {
    unit_id: null,
    status: ""
}


const initialState = {
    userUnitStatus: [],
    updatePayload: intitalUpdatePayload
}
export const useUserUnitStore = create<UserUnitState>((set, get) => ({
    ...initialState,
    setUpdatePayload: (data: UserUnitUpdatePayload) => set({updatePayload: data}),

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
    },
    updateUserUnitStatus: async() => {
        try{
            await api.patch(userUnitAPI.updateStatus, get().updatePayload)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    resetUpdatePayload: () => set({updatePayload: intitalUpdatePayload})
}))