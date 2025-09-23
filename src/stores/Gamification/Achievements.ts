import { achievementsAPI } from "@/services/api/endpoints/gamification";
import api from "@/services/api/interceptor";
import { AchievementsPayload, AchievementsState } from "@/services/types/Gamification";
import toast from "react-hot-toast";
import { create } from "zustand";


const intialPayload = {
    title: "",
    description: "",
    icon: "",
    is_expirable: false,
    is_active: true
}

const initialState = {
    achievementPayload: intialPayload,
    isItemLoading: false,
    isListLoading: false,
    isCreateUpdateLoading: false,
    achievementList: [],
    achievementItem: null
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
    ...initialState,
    setPayload: (data: AchievementsPayload) => set({achievementPayload: data}),
    createAchievement: async() => {
        set({isCreateUpdateLoading: true})
        try{
            await api.post(achievementsAPI.createAchievement, get().achievementPayload)
            set({isCreateUpdateLoading: false})
            toast.success("Achievement Created Successfully")
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error creating achievement")
            throw error
        }
    },
    updateAchievement: async(achievementId: number) => {
        set({isCreateUpdateLoading: true})
        try{
            await api.patch(achievementsAPI.updateAchievement(achievementId), get().achievementPayload)
            set({isCreateUpdateLoading: false})
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("There was an error updating this achievement")
            throw error
        }
        
    },
    fetchAchievementById: async(achievementId: number) => {
        set({isItemLoading: true})
        try{
            const response = await api.get(achievementsAPI.fetchAchievementById(achievementId))
            set({achievementItem: response.data, isItemLoading: false})
        } catch (error) {
            set({isItemLoading: false})
            toast.error("There was an error while fetching")
            throw error
        }
    },
    fetchAchievementList: async() => {
        set({isListLoading: true})
        try{
            const response = await api.get(achievementsAPI.fetchAchievementList)
            set({achievementList: response.data, isListLoading: false})
        } catch (error) {
            set({isListLoading: false})
            toast.error("There was an error while fetching")
            throw error
        }
    }
}))