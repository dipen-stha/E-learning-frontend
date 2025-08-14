import { Profile } from "./user"

export interface CourseDetail {
    id: number
    title: string
    description: string | null
    price: number
    completion_time: number
    student_count: number
    course_rating: number | null
    instructor: Profile | null
    image_url: string | null
    subjects: SubjectDetail[] | []
}

export interface SubjectDetail {
    id: number
    title: string
    completion_time: number | null
    order: number | null
    units: UserUnitDetail[]
    course: CourseDetail | null
    total_units: number | null
    completed_units: number | null
    completion_percent: number | null
}

export interface UserUnitDetail {
    id: number
    title: string
    is_completed: boolean
}

export interface CourseState {
    courseDetails: CourseDetail[]
    courseItem: CourseDetail | null
    isLoading: boolean

    setCourseDetails: (userDetails: CourseDetail[]) => void;
    setCourseItem: (courseItem: CourseDetail) => void;
    fetchCourseDetails: () => void;
    fetchCourseById: (course_id: number) => void; 
}