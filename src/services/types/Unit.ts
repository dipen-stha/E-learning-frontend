import { CourseDetail, SubjectDetail } from "./Course"

export interface UnitDetail {
    id: number
    title: string
    description: string
    status: string
    order: number
    course: CourseDetail | string
    subject: SubjectDetail | string
    completion_time: number
    objectives: string
}

export interface UnitPayload {
    title: string
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
    isLoading: boolean

    setPayload: (payloadData: UnitPayload) => void;

    fetchAllUnits: () => Promise<void>;
    fetchMinimalUnitList: (subjectId: number | null) => Promise<void>;
    createUnit: () => Promise<void>;
    reset: () => void;
}