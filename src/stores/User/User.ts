import { UserDataPayload, UserDetail, UserPayload, UserState } from "@/services/types/user";
import { create } from "zustand";   
import api from "@/services/api/interceptor";
import { authAPI, userAPI } from "@/services/api/endpoints/user";

export const useUserStore = create<UserState>((set, get) => ({
    userDetail: null,
    isLoading: true,
    hasError: false,
    isAuthenticated: false,
    isAdminAuthenticated: false,
    userPayload: {
        user: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            gender: "",
            dob: new Date(),
            is_active: true,
        },
        avatar: null
    } as UserPayload,

    setUserDetails: (userDetail: UserDetail) => set({userDetail: userDetail}),
    setUserPayload: (data: UserPayload) => set({userPayload: data}),
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
    },
    fetchAdminSelf: async() => {
        const currentState = get();
        const accessToken = localStorage.getItem("access");
        if(accessToken){
        if (currentState.isAdminAuthenticated && !currentState.isLoading) {
            return
        }
        set({isLoading: true})
        try{
            const response = await api.get(authAPI.adminSelf)
            const userDetail = response.data
            set({userDetail, isAdminAuthenticated: true, hasError: false, isLoading: false})
            return
        } catch {
            set({isLoading: false, hasError: true, isAdminAuthenticated: false})
            return
        }
        }
        else{
            console.log("Token not found")
            set({isLoading: false, hasError: true, isAdminAuthenticated: false})
        }
    },
    createUser: async (user: UserDataPayload, file: File | null) => {
        get().isLoading = true;
        const formData = new FormData();
        formData.append("user", JSON.stringify({
            ...user,
            dob: user.dob.toISOString().split("T")[0]
        }))
        if(file){
            formData.append("image", file)
        }
        try {
            const response = await api.post(userAPI.createUser, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            set({hasError: false, isLoading: false});
            return
        } catch (error) {
            set({isLoading: false, hasError: true})
            throw error;
        }  
    }
}))