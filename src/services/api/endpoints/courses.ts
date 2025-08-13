const prefix = "/courses"
export const courseAPI = {
    fetchAll: `${prefix}/get/all/`,
    fetchById: (courseId: number) =>`${prefix}/get/${courseId}/`
}