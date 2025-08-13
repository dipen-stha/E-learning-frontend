const prefix = "/common"
export const UserCourseAPI = {
    create: `${prefix}/user-course/create/`,
    fetchUserWise: (user_id: number) => `${prefix}/user-course/fetch/${user_id}/`,
    fetchUserCourseStats: (user_id: number) => `${prefix}/user-course/fetch-user-stats/${user_id}`,
    fetchUserCourseByCourse: (course_id: number) => `${prefix}/user-course/fetch-by-course/${course_id}`,
}