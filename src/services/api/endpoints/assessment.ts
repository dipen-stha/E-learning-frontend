const prefix = "assessments"

export const assessmentTypeAPI = {
    createAssessmentType: `${prefix}/type/create/`,
    updateAssessmentType: (id: number) => `${prefix}/type/${id}/update/`,
    fetchAssessmentTypeById: (id: number) => `${prefix}/type/get/${id}/`,
    fetchAllAssessmentTypes: `${prefix}/type/all/`
}

export const assessmentAPI = {
    createAssessment: `${prefix}/create/`,
    updateAssessment: (id: number) => `${prefix}/${id}/update/`,
    fetchAssessmentById: (id: number) => `${prefix}/${id}/get/`,
    fetchAssessmentList: `${prefix}/all/`,
    fetchAssessmentsBySubject: (id: number) =>`${prefix}/${id}/by_subject/`,
}

export const questionAPI = {
    questionCreate: `${prefix}/question/create/`,
    fetchQuestionList: `${prefix}/question/all/`,
    updateQuestion: (questionId: number) => `${prefix}/question/${questionId}/update/`,
    getQuestionById: (questionId: number) => `${prefix}/question/${questionId}/get/`
}