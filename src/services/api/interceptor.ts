import { useAuthStore } from "@/stores/User/Auth";
import axios,  {AxiosError, AxiosInstance } from "axios";

const apiUrl: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
    return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const {
            config, response: { status }
        } = error;
        const originalRequest = config;
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { refreshToken } = useAuthStore();
            if(refreshToken){
                try{
                await axios.post(apiUrl + "/auth/refresh", {
                    refresh_token: refreshToken
                })
                } catch (e) {
                    console.error("Token Refresh Failed", e)
                    throw e;
                }
            }
        }
        return Promise.reject(error)
    }
)

export default api;