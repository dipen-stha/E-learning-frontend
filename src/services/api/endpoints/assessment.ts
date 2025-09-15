const prefix = "assessments"

export const assessmentTypeAPI = {
    createAssessmentType: `${prefix}/type/create/`,
    updateAssessmentType: (id: number) => `${prefix}/type/${id}/update/`,
    fetchAssessmentTypeById: (id: number) => `${prefix}/type/${id}/`,
    fetchAllAssessmentTypes: `${prefix}/type/all/`
}