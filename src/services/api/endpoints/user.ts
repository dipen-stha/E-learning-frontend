export const authAPI = {
  fetchself: "/auth/me/",
  login: "/auth/login/",
  refresh: "/auth/refresh/",
  adminLogin: "auth/admin/login/",
  adminSelf: "auth/admin/me",
};

export const userAPI = {
  createUser: "/users/create/",
  updateUser: (userId: number) => `/users/${userId}/update/`,
  fetchById: (userId: number) => `/users/${userId}/`,
  getStudentList: "/users/get/students/",
  getTutorsList: "/users/tutors/get/minimal/",
  getStudenStats: "/users/students/get/user-stats/",
};
