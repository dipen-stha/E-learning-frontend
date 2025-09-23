import { userAchievements, userGamificationAPI } from "@/services/api/endpoints/gamification"
import api from "@/services/api/interceptor"
import { UserGamificationState } from "@/services/types/Gamification"
import toast from "react-hot-toast"
import { create } from "zustand"

const initialState = {
    isListLoading: false,
    isItemLoading: false,
    isCreateUpdateLoading: false,
    userAchievements: null
}

export const useUserGamificationStore = create<UserGamificationState>((set, get) => ({
    ...initialState,
    userStreakCreateUpdate: async() => {
        set({isCreateUpdateLoading: true})
        try {
            await api.post(userGamificationAPI.createUpdateUserStreak)
            set({isCreateUpdateLoading: false})
        } catch (error) {
            set({isCreateUpdateLoading: false})
            toast.error("Error updating user streak")
        }
    },
    fetchAllUserAchievements: async() => {
        set({isItemLoading: true})
        try{
            const response = await api.get(userAchievements.allUserAchievements)
            set({userAchievements: response.data})
            set({isItemLoading: false})
        } catch (error) {
            set({isItemLoading: false})
            toast.error("Error fetching user achievements")
            throw error
        }
    },
    checkAndCreateUserAchievements: async() => {
        
    }
}))