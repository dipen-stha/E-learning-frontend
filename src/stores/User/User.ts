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
    role: ""
  },
  avatar: null,
};

export const useUserStore = create<UserState>((set, get) => ({
  userDetail: null,
  userItem: null,
  userDetailList: [],
  userMinimalList: [],
  isListLoading: false,
  isItemLoading: false,
  isCreateUpdateLoading: false,
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
  completeLoader: () => set({ isItemLoading: false }),

  fetchSelf: async () => {
    set({ isItemLoading: true });
    const currentState = get();
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      if (currentState.isAuthenticated && !currentState.isItemLoading) {
        set({isItemLoading: false})
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
          isItemLoading: false,
        });
        return;
      } catch {
        set({ isItemLoading: false, isAuthChecked: true, hasError: true, isAuthenticated: false });
        return;
      }
    } else {
      console.log("Token not found");
      set({ isItemLoading: false, isAuthChecked: true, hasError: true, isAuthenticated: false });
    }
  },
  fetchAdminSelf: async () => {
    set({ isItemLoading: true });
    const currentState = get();
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      if (currentState.isAdminAuthenticated && !currentState.isItemLoading) {
        set({ isItemLoading: false })
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
          isItemLoading: false,
        });
        return;
      } catch {
        console.log("error")
        set({ isItemLoading: false, hasError: true, isAdminAuthenticated: false, isAdminAuthChecked: true });
        return;
      }
    } else {
      console.log("Token not found");
      set({ isItemLoading: false, hasError: true, isAdminAuthenticated: false, isAdminAuthChecked: true });
    }
  },
  createUser: async () => {
    get().isCreateUpdateLoading = true;
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
      set({ hasError: false, isCreateUpdateLoading: false, userPayload: initialPayload });
      return;
    } catch (error) {
      set({ isCreateUpdateLoading: false, hasError: true });
      throw error;
    }
  },

  updateUser: async(userId: number) => {
    set({isCreateUpdateLoading: true})
    const formData = new FormData();
    const payload = get().userPayload
    const user = payload?.user
    const file = payload?.avatar
    formData.append(
      "user",
      JSON.stringify(user)
    );
    if (file && file instanceof File) {
      formData.append("file", file);
    }
    try {
      await api.patch(userAPI.updateUser(userId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ hasError: false, isCreateUpdateLoading: false, userPayload: initialPayload });
      return;
    } catch (error) {
      set({ isCreateUpdateLoading: false, hasError: true });
      throw error;
    }
    
  },

  fetchUserById: async(userId: number) => {
    set({isItemLoading: true})
    try{
      const response = await api.get(userAPI.fetchById(userId))
      if(response.data){
        set({userItem: response.data})
      }
    } catch (error) {
      set({isItemLoading: false})
      throw error
    }
  },

  fetchStudents: async () => {
    get().isListLoading = true;
    try {
      const response = await api.get(userAPI.getStudentList);
      if (response.data) {
        get().setUserDetailList(response.data);
        get().isListLoading = false;
      }
    } catch (error) {
      throw error;
    }
  },
  fetchTutors: async () => {
    get().isListLoading = true;
    try {
      const response = await api.get(userAPI.getTutorsList);
      if (response.data) {
        set({ userMinimalList: response.data });
        get().isListLoading = false;
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
      isListLoading: false,
      isCreateUpdateLoading: false,
      isItemLoading: false,
      hasError: false,
      isAuthChecked: false,
      isAdminAuthChecked: false,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      userPayload: initialPayload,
    }),
}));
