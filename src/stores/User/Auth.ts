import { LoginDetails, AuthState } from "@/services/types/user";
import {create} from "zustand";
import api from "@/services/api/interceptor";
import { authAPI } from "@/services/api/endpoints/user";
import toast from "react-hot-toast";


export const useAuthStore = create<AuthState>((set, get) => ({
    loginDetails: {username: "", password: "", remember: false},
    hasError: false,
    accessToken: localStorage.getItem("access") || null,
    refreshToken: localStorage.getItem("refresh") || null,

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
            return true;
        } catch {
            get().hasLoginError();
            return false;
        }
    },
    adminLogin: async() => {
        try{
            const { loginDetails } = get();
            const response = await api.post(authAPI.adminLogin, loginDetails ,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            set({accessToken: response.data.access_token, refreshToken: response.data.refresh_token, hasError: false})
            localStorage.setItem("access", response.data.access_token)
            localStorage.setItem("refresh", response.data.refresh_token)
            toast.success("Logged in Successfully")
            return true;
        } catch {
            get().hasLoginError();
            toast.error("There was an error logging in")
            return false;
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
    logout: () => {
        try{
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            set({accessToken: null, refreshToken: null, loginDetails: {username: "", password: "", remember: false}})
            toast.success("Logged Out")
        } catch (e) {
            console.log("There was an error logging out")
        }
    }
}))