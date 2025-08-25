import {
  UserDetail,
  UserPayload,
  UserState,
} from "@/services/types/user";
import { create } from "zustand";
import api from "@/services/api/interceptor";
import { authAPI, userAPI } from "@/services/api/endpoints/user";

const initialPayload = {
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
  avatar: null,
};

export const useUserStore = create<UserState>((set, get) => ({
  userDetail: null,
  userDetailList: [],
  userMinimalList: [],
  isLoading: false,
  hasError: false,
  isAuthenticated: false,
  isAuthChecked: false,
  isAdminAuthChecked: false,
  isAdminAuthenticated: false,
  userPayload: initialPayload,
  userStats: {
    total_count: 0,
    active_count: 0,
    suspended_count: 0,
    monthly_creation: 0,
    percent_total_count: 0,
    percent_active_count: 0,
    percent_monthly_creation: 0,
    percent_suspended_count: 0,
  },

  setUserDetails: (userDetail: UserDetail) => set({ userDetail: userDetail }),
  setUserPayload: (data: UserPayload) => set({ userPayload: data }),
  setUserDetailList: (dataList: UserDetail[]) =>
    set({ userDetailList: dataList }),
  hasFetchingError: () => set({ hasError: true }),
  setUserUnauthenticated: () => set({ isAuthenticated: false }),
  completeLoader: () => set({ isLoading: false }),

  fetchSelf: async () => {
    set({ isLoading: true });
    const currentState = get();
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      if (currentState.isAuthenticated && !currentState.isLoading) {
        set({isLoading: false})
        return;
      }
      try {
        const response = await api.get(authAPI.fetchself);
        const userDetail = response.data;
        set({
          userDetail,
          isAuthenticated: true,
          isAuthChecked: true,
          hasError: false,
          isLoading: false,
        });
        return;
      } catch {
        set({ isLoading: false, isAuthChecked: true, hasError: true, isAuthenticated: false });
        return;
      }
    } else {
      console.log("Token not found");
      set({ isLoading: false, isAuthChecked: true, hasError: true, isAuthenticated: false });
    }
  },
  fetchAdminSelf: async () => {
    set({ isLoading: true });
    const currentState = get();
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      if (currentState.isAdminAuthenticated && !currentState.isLoading) {
        set({ isLoading: false })
        return;
      }
      try {
        const response = await api.get(authAPI.adminSelf);
        const userDetail = response.data;
        set({
          userDetail,
          isAdminAuthenticated: true,
          isAdminAuthChecked: true,
          hasError: false,
          isLoading: false,
        });
        return;
      } catch {
        console.log("error")
        set({ isLoading: false, hasError: true, isAdminAuthenticated: false, isAdminAuthChecked: true });
        return;
      }
    } else {
      console.log("Token not found");
      set({ isLoading: false, hasError: true, isAdminAuthenticated: false, isAdminAuthChecked: true });
    }
  },
  createUser: async () => {
    get().isLoading = true;
    const formData = new FormData();
    const payload = get().userPayload
    const user = payload?.user
    const file = payload?.avatar
    formData.append(
      "user",
      JSON.stringify({
        ...user,
        dob: user?.dob.toISOString().split("T")[0],
      })
    );
    if (file) {
      formData.append("file", file);
    }
    try {
      await api.post(userAPI.createUser, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ hasError: false, isLoading: false, userPayload: initialPayload });
      return;
    } catch (error) {
      set({ isLoading: false, hasError: true });
      throw error;
    }
  },
  fetchStudents: async () => {
    get().isLoading = true;
    try {
      const response = await api.get(userAPI.getStudentList);
      if (response.data) {
        get().setUserDetailList(response.data);
        get().isLoading = false;
      }
    } catch (error) {
      throw error;
    }
  },
  fetchTutors: async () => {
    get().isLoading = true;
    try {
      const response = await api.get(userAPI.getTutorsList);
      if (response.data) {
        set({ userMinimalList: response.data });
        get().isLoading = false;
      }
    } catch (error) {
      throw error;
    }
  },
  fetchStudentStats: async() => {
    try{
      const response = await api.get(userAPI.getStudenStats)
      if(response.data){
        set({userStats: response.data})
      }
    } catch (error){
      console.log(error)
    }
  },

  reset: () =>
    set({
      userDetail: null,
      userDetailList: [],
      userMinimalList: [],
      isLoading: false,
      hasError: false,
      isAuthChecked: false,
      isAdminAuthChecked: false,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      userPayload: initialPayload,
    }),
}));
