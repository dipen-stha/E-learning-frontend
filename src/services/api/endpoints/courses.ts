const prefix = "/courses"
export const courseAPI = {
    fetchLatestCourses: `${prefix}/get/latest-courses/`,
    fetchAll: `${prefix}/get/all/`,
    fetchById: (courseId: number) =>`${prefix}/get/${courseId}/`,
    createCourse: `${prefix}/create/`,
    updateCourse: (courseId: number) =>  `${prefix}/${courseId}/update/`,
    fetchCategoryList: `${prefix}/category/get/`,
    minimalFetch: `${prefix}/get/minimal/`
}

export const subjectAPI = {
    createSubject: `${prefix}/subject/create/`,
    fetchSubjects: `${prefix}/subject/get/all/`,
    updateSubject: (subjectId: number) => `${prefix}/subject/${subjectId}/update/`,
    fetchSubjectsByCourse: (id: number) => `${prefix}/subject/by_course/${id}/`,
    fetchSubjectMinimal: (id: number) => `${prefix}/subject/minimal/${id}/`,
    fetchSubjectById: (id: number) => `${prefix}/subject/get_by_id/${id}/`
}

export const UnitAPI = {
    fetchAllUnits: `${prefix}/unit/get/all/`,
    fetchUnitById: (unitId: number) => `${prefix}/unit/${unitId}`,
    createUnit: `${prefix}/unit/create/`,
    updateUnit: (unitId: number) =>`${prefix}/unit/${unitId}/update/`,
    minimalUnit: `${prefix}/unit/minimal/`,
    minimalUnitBySubject: (id: number) => `${prefix}/unit/minimal/by_subject/${id}`
    
}

export const contentAPI = {
    createUnitContent: `${prefix}/content/create/`,
    updateContent: (contentId: number) => `${prefix}/content/${contentId}/update/`,
    fetchAllContents: `${prefix}/content/fetch/all/`,
    fetchContentById: (contentId: number) => `${prefix}/content/get/${contentId}/`
}

export const enrollAPI = {
    createStripeSession: `/enrollment/create-enrollment-session/`,
    fetchUserEnrolledCourses: `/enrollment/user-enrolled-courses/`,
    fetchUserCourseById: (id: number) => `/enrollment/user-fetch-by-course/${id}/`
}