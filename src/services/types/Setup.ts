export interface AssessmentTypeDetail {
    id: number
    title: string
    description: string
    icon: string
}

export interface AssessmentTypePayload{
    title: string
    description: string
    icon: string
}

export interface AssessmentTypeState {
    assessmentTypeDetails: AssessmentTypeDetail[],
    assessmentTypeItem: AssessmentTypeDetail | null,
    isListLoading: boolean;
    isItemLoading: boolean;
    isCreateUpdateLoading: boolean;
    payload: AssessmentTypePayload;

    setPayload: (data: AssessmentTypePayload) => void;

    createAssessmentType: () => Promise<void>;
    updateAssessmentType: (id: number) => Promise<void>;
    fetchAssessmentTypeById: (id: number) => Promise<void>;
    fetchAssessmentTypeList: () => Promise<void>;
}