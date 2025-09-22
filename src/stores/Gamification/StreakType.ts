import { streakTypeAPI } from "@/services/api/endpoints/gamification"
import api from "@/services/api/interceptor"
import { StreakTypePayload, StreakTypeState } from "@/services/types/Gamification"
import toast from "react-hot-toast"
import { create } from "zustand"

const initialPayload = {
    title: "",
    description: "",
    is_active: false,
}

const initialState = {
    streakTypePayload: initialPayload,
    streakTypeItem: null,
    streakTypeList: [],
    isListLoading: false,
    isItemLoading: false,
    isCreateUpdateLoading: false,

}

export const useStreakTypeStore = create<StreakTypeState>((set, get) => ({
    ...initialState,
    setPayload: (data: StreakTypePayload) => set({streakTypePayload: data}),

    createStreakType: async() => {
        set({isCreateUpdateLoading: true})
        try{
            await api.post(streakTypeAPI.createStreakType, get().streakTypePayload)
            set({isCreateUpdateLoading: false})
            toast.success("Streak Type Created Successfully")
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error while creating streak type")
        }
    },

    updateStreakType: async(streakTypeId: number) => {
        set({isCreateUpdateLoading: true})
        try{
            await api.patch(streakTypeAPI.updateStreakType(streakTypeId), get().streakTypePayload)
            set({isCreateUpdateLoading: false})
            toast.success("Streak Type Updated Successfully")
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error while updating this streak type")
        }
    },

    fetchStreakTypeById: async(streakTypeId: number) => {
        set({isItemLoading: true})
        try{
            const response = await api.get(streakTypeAPI.fetchStreakTypeById(streakTypeId))
            set({streakTypeItem: response.data})
            set({isItemLoading: false})
        } catch (error) {
            set({isItemLoading: false})
            toast.error("There was an error fetching")
        }
    },

    fetchStreakTypeList: async() => {
        set({isListLoading: true})
        try{
            const response = await api.get(streakTypeAPI.fetchAllStreakType)
            set({streakTypeList: response.data})
            set({isListLoading: false})
        } catch (error) {
            set({isListLoading: false})
            toast.error("Error fetching list")
        }
    },

    removeStreakType: async(streakTypeId: number) => {
        set({isCreateUpdateLoading: true})
        try{
            await api.delete(streakTypeAPI.removeStreakType(streakTypeId))
            set({isCreateUpdateLoading: false})
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error deleting")
        }
    }

}))