import { UserDetail, UserState } from "@/services/types/user";
import { create } from "zustand";   
import api from "@/services/api/interceptor";
import { authAPI } from "@/services/api/endpoints/user";

export const useUserStore = create<UserState>((set, get) => ({
    userDetail: null,
    isLoading: true,
    hasError: false,
    isAuthenticated: false,

    setUserDetails: (userDetail: UserDetail) => set({userDetail: userDetail}),
    hasFetchingError: () => set({hasError: true}),
    setUserUnauthenticated: () => set({isAuthenticated: false}),
    completeLoader: () => set({isLoading: false}),

    fetchSelf: async () => {
        const currentState = get();
        const accessToken = localStorage.getItem("access")
        if (accessToken){
        if (currentState.isAuthenticated && !currentState.isLoading) {
            return
        }
        set({isLoading: true})
        try{
            const response = await api.get(authAPI.fetchself)
            const userDetail = response.data
            set({userDetail, isAuthenticated: true, hasError: false, isLoading: false})
            return
        } catch {
            set({isLoading: false, hasError: true, isAuthenticated: false})
            return
        }
        }
        else{
            console.log("Token not found")
            set({isLoading: false, hasError: true, isAuthenticated: false})

        }
    }
}))