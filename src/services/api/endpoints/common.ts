const prefix = "/common"
export const UserCourseAPI = {
    create: `${prefix}/user-course/create/`,
    fetchUserWise: (user_id: number) => `${prefix}/user-course/fetch/${user_id}/`,
    fetchUserCourseStats: (user_id: number) => `${prefix}/user-course/fetch-user-stats/${user_id}`,
    fetchUserCourseByCourse: (course_id: number) => `${prefix}/user-course/fetch-by-course/${course_id}`,
    fetchCourseUserSubjectStatus: (subjectId: number) => `${prefix}/user-course/${subjectId}/subject-status/`,
    fetchUpcomingSubjects: `${prefix}/user-course/upcoming-subjects/`,
}

export const userSubjectAPI = {
    createUserSubject: `${prefix}/user-subject/create/`,
    fetchUserSubjectStatus: (id: number) => `${prefix}/user-subject/${id}/status/`
}

export const userUnitAPI = {
    createUserUnit: `${prefix}/user-unit/create/`,
    fetchUserUnitStatus: (subject_id: number) => `${prefix}/user-unit/${subject_id}/status/`,
    updateStatus: `${prefix}/user-unit/status-update/`
}