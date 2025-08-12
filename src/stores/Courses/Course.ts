import {CourseState, CourseDetail} from "@/services/types/Course";
import { create } from "zustand";
import api from "@/services/api/interceptor";
import { courseAPI } from "@/services/api/endpoints/courses";

export const useCourseStore = create<CourseState>((set, get) => ({
    courseDetails: [],
    isLoading: false,
    setCourseDetails: (detailList: CourseDetail[]) => set({courseDetails: detailList}),
    fetchCourseDetails: async () => {
        try{
            get().isLoading = true;
            const response = await api.get(courseAPI.fetchAll)
            if(response.data){
                get().setCourseDetails(response.data)
            }
            get().isLoading = false;
        } catch {

        }
    }
}))