const prefix = "/courses"
export const courseAPI = {
    fetchAll: `${prefix}/get/all/`,
    fetchById: (courseId: number) =>`${prefix}/get/${courseId}/`,
    createCourse: `${prefix}/create/`,
    fetchCategoryList: `${prefix}/category/get/`,
    minimalFetch: `${prefix}/get/minimal/`
}

export const subjectAPI = {
    createSubject: `${prefix}/subject/create/`,
    fetchSubjects: `${prefix}/subject/get/all/`,
    fetchSubjectsByCourse: (id: number) => `${prefix}/subject/by_course/${id}/`,
    fetchSubjectMinimal: (id: number) => `${prefix}/subject/minimal/${id}/`
}

export const UnitAPI = {
    fetchAllUnits: `${prefix}/unit/get/all/`,
    createUnit: `${prefix}/unit/create/`,
    
}