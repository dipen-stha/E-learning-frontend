import {CourseState, CourseDetail, CoursePayload, CourseData} from "@/services/types/Course";
import { create } from "zustand";
import api from "@/services/api/interceptor";
import { courseAPI } from "@/services/api/endpoints/courses";

export const useCourseStore = create<CourseState>((set, get) => ({
    courseDetails: [],
    courseItem: null,
    isLoading: false,
    coursePayload: {
        course: {
            title: "",
            description: "",
            completion_time: 0,
            price: 0,
            requirements: "",
            objectives: "",
            categories_id: [],
            instructor_id: ""
        },
        file: null,
    },
    categoryList: [],
    setCourseDetails: (detailList: CourseDetail[]) => set({courseDetails: detailList}),
    setCourseItem: (courseItem: CourseDetail) => set({courseItem: courseItem}),
    setCoursePayload: (data: CoursePayload) => set({coursePayload: data}),
    fetchCourseDetails: async () => {
        try{
            get().isLoading = true;
            const response = await api.get(courseAPI.fetchAll)
            if(response.data){
                get().setCourseDetails(response.data)
            }
            get().isLoading = false;
        } catch(error) {
            console.log("error")
        }
    },
    fetchCourseById: async(courseId: number) => {
        try{
            const response = await api.get(courseAPI.fetchById(courseId))
            if(response.data){
                get().setCourseItem(response.data)
            }
        } catch {

        }
    },
    createCourse: async (data: CourseData, image: File | null) => {
        get().isLoading = true;
        const formData = new FormData();
        formData.append("course", JSON.stringify(data))
        if(image){
            formData.append("file", image)
        }
        try{
            const response = await api.post(courseAPI.createCourse, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            set({isLoading: false})
            return
        } catch (error) {
            set({isLoading: false})
            throw error
        }
    },
    fetchCategoryList: async() => {
        try{
            const response = await api.get(courseAPI.fetchCategoryList)
            if(response.data){
                set({categoryList: response.data})
            }
        } catch (error){
            console.log(error)
        }
    },
}))