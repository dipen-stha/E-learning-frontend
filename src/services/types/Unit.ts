import { ContentDetail } from "./Content"
import { CourseDetail, SubjectDetail } from "./Course"

export interface UnitDetail {
    id: number
    title: string
    description: string
    status: string
    order: number
    course: CourseDetail
    subject: SubjectDetail
    completion_time: number
    objectives: string,
    contents?: ContentDetail[]
    is_completed?: boolean
}

export interface UnitPayload {
    title: string
    course_id: number | null
    subject_id: number | null
    description: string
    objectives: string
    order: number
    completion_time: number
    status: string
}

export interface UnitMinimal {
    id: number
    title: string
}

export interface UnitState {
    unitListDetails: UnitDetail[]
    unitItem: UnitDetail | null
    unitPayload: UnitPayload
    unitMinimalList: UnitMinimal[]
    isItemLoading: boolean;
    isListLoading: boolean;
    isCreateUpdateLoading: boolean;

    setPayload: (payloadData: UnitPayload) => void;
    resetPayload: () => void;

    fetchAllUnits: () => Promise<void>;
    fetchMinimalUnitList: (subjectId: number | null) => Promise<void>;
    createUnit: () => Promise<void>;
    editUnit: (unitId: number) => Promise<void>;
    fetchUnitById: (unitId: number) => Promise<void>;
    reset: () => void;
}