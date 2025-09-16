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
    fetchAssessmentList: `${prefix}/all/`
}