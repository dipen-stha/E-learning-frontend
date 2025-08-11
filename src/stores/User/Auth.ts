import { LoginDetails, UserState } from "@/services/types/user";
import {create} from "zustand";
import api from "@/services/api/interceptor";


export const useUserStore = create<UserState>((set, get) => ({
    loginDetails: {username: "", password: "", remember: false},
    hasError: false,
    accessToken: null,
    refreshToken: null,

    setLoginDetails: (details: LoginDetails) => set({loginDetails: details}),
    hasLoginError: () => set({hasError: true}),

    login: async () => {
        try{
            const { loginDetails } = get();
            const response = await api.post("/auth/login", loginDetails, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;

            set({accessToken, refreshToken, hasError: false});
            localStorage.setItem("access", accessToken)
            localStorage.setItem("refresh", refreshToken)
        } catch {
            get().hasLoginError();
        }
    }
}))