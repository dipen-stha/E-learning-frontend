const prefix = "/common"
export const UserCourseAPI = {
    create: `${prefix}/user-course/create/`,
    fetchUserWise: (user_id: Number) => `${prefix}/user-course/fetch/${user_id}/`
}