import { MinimalCourse } from "./Course"
import { PaginationData } from "./Extras"
import { UnitDetail } from "./Unit"
import { UserMinimal } from "./user"

export interface SubjectMinimal {
    id: number
    title: string
}

export interface SubjectPayload {
    title: string
    description: string
    completion_time:number
    objectives: string
    course_id: number | null
    status: string
    order: number
}

export interface SubjectDetail {
    id: number
    title: string
    description: string
    status: string
    objectives: string
    student_count: string
    instructor: UserMinimal
    course: MinimalCourse
    total_units: number
    order: number
    completion_time: number
    units?: UnitDetail[]
}

export interface SubjectState {
    subjectPayload: SubjectPayload
    subjectItem: SubjectDetail | null
    subjectDetailList: SubjectDetail[]
    isItemLoading: boolean,
    isListLoading: boolean;
    isCreateUpdateLoading: boolean;
    subjectMinimalList: SubjectMinimal[],
    paginationData: PaginationData | null;

    setSubjectPayload: (data: SubjectPayload) => void;

    createSubject: () => Promise<void>
    updateSubject: (subjectId: number) => Promise<void>;
    fetchSubjects: () => Promise<void>
    fetchSubjectsByCourse: (courseId: number) => Promise<void>
    fetchSubjectMinimal: (courseId: number) => Promise<void>;
    fetchSubjectById: (subjectId: number) => Promise<void>;
    resetSubjectPayload: () => void;
    reset: () => void;
}