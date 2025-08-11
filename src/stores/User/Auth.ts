import { LoginDetails, AuthState } from "@/services/types/user";
import {create} from "zustand";
import api from "@/services/api/interceptor";
import { authAPI } from "@/services/api/endpoints/user";

export const useAuthStore = create<AuthState>((set, get) => ({
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
    },
    refresh: async() => {
        const token = localStorage.getItem("refresh")
        try{
            const response = await api.post(authAPI.refresh, {refresh_token: token}, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const accessToken = response.data.access_token
            set({accessToken, hasError: false});
            localStorage.setItem("access", accessToken);
        } catch {
            get().hasLoginError();
        }
    },
}))