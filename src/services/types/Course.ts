import { Profile } from "./user"

export interface CategoryDetail {
    id: string
    title: string
}

export interface MinimalCourse {
    id: number
    title: string
}

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
    categories: string[] | []
    total_revenue: number | null
    status: string
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

export interface CourseData {
    title: string
    description: string
    categories_id: number[]
    completion_time: number
    price: number
    instructor_id: number | null
    requirements: string
    objectives: string
}

export interface CoursePayload {
    course: CourseData
    file: File | null
}

export interface CourseState {
    courseDetails: CourseDetail[]
    courseMinimal: MinimalCourse[]
    coursePayload: CoursePayload | null
    courseItem: CourseDetail | null
    categoryList: CategoryDetail[] | []
    isLoading: boolean

    setCourseDetails: (userDetails: CourseDetail[]) => void;
    setCourseItem: (courseItem: CourseDetail) => void;
    setCoursePayload: (data: CoursePayload) => void;
    fetchCourseDetails: () => void;
    fetchCourseById: (course_id: number) => void;
    createCourse: (data: CourseData, image: File | null) => Promise<void>;
    fetchCategoryList: () => Promise<void>;
    fetchMinimal: () => Promise<void>;
    reset: () => void;
}