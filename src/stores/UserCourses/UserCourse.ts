import { create } from "zustand";

import api from "@/services/api/interceptor";
import { UserCourseAPI } from "@/services/api/endpoints/common";
import {
  UserCourseState,
  UserCourseDetail,
  UserCourseStats,
} from "@/services/types/Common";

export const useUserCourseStore = create<UserCourseState>((set, get) => ({
  userCourseDetails: [],
  userCourseStats: null,
  userCourseItem: null,
  isLoading: false,
  isEnrolledToCourse: false,

  setUserCourseDetails: (detailList: UserCourseDetail[]) =>
    set({ userCourseDetails: detailList }),
  setUserStats: (userStats: UserCourseStats) =>
    set({ userCourseStats: userStats }),
  setUserCourseItem: (item: UserCourseDetail) => set({ userCourseItem: item }),

  fetchUserCourseDetails: async (userId: number) => {
    get().isLoading = true;
    try {
      const response = await api.get(UserCourseAPI.fetchUserWise(userId));
      if (response.data) get().setUserCourseDetails(response.data);
      get().isLoading = false;
    } catch {
      get().isLoading = false;
      console.log("There was an error fetching user course");
    }
  },
  fetchUserCourseStats: async (userId: number) => {
    try {
      const response = await api.get(
        UserCourseAPI.fetchUserCourseStats(userId)
      );
      if (response.data) {
        get().setUserStats(response.data);
      }
    } catch {
      console.log("Error");
    }
  },
  fetchUserCourseByCourse: async (courseId: number) => {
    try {
      const response = await api.get(
        UserCourseAPI.fetchUserCourseByCourse(courseId)
      );
      if (response.data) {
        set({userCourseItem: response.data});
        get().isEnrolledToCourse = true;
      } else {
        get().isEnrolledToCourse = false;
      }
    } catch {
      console.log("error");
    }
  },
  
  createUserCourse: (userId, courseId) => {
    try{
        const payload = {
            user_id: userId,
            course_id: courseId
        }
        api.post(UserCourseAPI.create, payload)
    } catch (error) {
        console.log(error)
    }
  }
}));
