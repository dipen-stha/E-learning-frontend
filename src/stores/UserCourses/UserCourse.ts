import { create } from "zustand";

import api from "@/services/api/interceptor"
import { UserCourseAPI } from "@/services/api/endpoints/common";
import { UserCourseState, UserCourseDetail } from "@/services/types/Common";


export const useUserCourseStore = create<UserCourseState>((set, get) => ({
    userCourseDetails: [],
    isLoading: false,
    
    setUserCourseDetails: (detailList: UserCourseDetail[]) => set({userCourseDetails: detailList}),

    fetchUserCourseDetails: async (userId: number) => {
        get().isLoading = true;
        try{
            const response = await api.get(UserCourseAPI.fetchUserWise(userId));
            if(response.data)
                get().setUserCourseDetails(response.data);
            get().isLoading = false;
        } catch {
            get().isLoading = false;
            console.log("There was an error fetching user course")
        }
    }
}))