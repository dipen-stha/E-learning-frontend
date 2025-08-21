import { MinimalCourse } from "./Course"
import { Profile, UserMinimal } from "./user"

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
}

export interface SubjectState {
    subjectPayload: SubjectPayload
    subjectDetailList: SubjectDetail[]
    isLoading: boolean,

    setSubjectPayload: (data: SubjectPayload) => void;

    createSubject: () => Promise<void>
    fetchSubjects: () => Promise<void>
    fetchSubjectsByCourse: (courseId: number) => Promise<void>
    reset: () => void;
}