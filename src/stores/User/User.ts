import { UserDetail, UserState } from "@/services/types/user";
import { create } from "zustand";
import api from "@/services/api/interceptor";
import { authAPI } from "@/services/api/endpoints/user";

export const useUserStore = create<UserState>((set, get) => ({
    userDetail: null,
    hasError: false,
    isAuthenticated: false,

    setUserDetails: (userDetail: UserDetail) => set({userDetail: userDetail}),
    hasFetchingError: () => set({hasError: true}),
    setUserUnauthenticated: () => set({isAuthenticated: false}),

    fetchSelf: async () => {
        try{
            const response = await api.get(authAPI.fetchself)
            const userDetail = response.data

            set({userDetail, isAuthenticated: true, hasError: false})
        } catch {
            get().hasFetchingError();
            get().setUserUnauthenticated()
        }
    }

}))