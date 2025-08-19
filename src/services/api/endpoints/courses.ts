const prefix = "/courses"
export const courseAPI = {
    fetchAll: `${prefix}/get/all/`,
    fetchById: (courseId: number) =>`${prefix}/get/${courseId}/`,
    createCourse: `${prefix}/create/`,
    fetchCategoryList: `${prefix}/category/get/`
}