import { Profile } from "./user"

export interface CategoryDetail {
    id: string
    title: string
}

export interface MinimalCourse {
    id: number
    title: string
    image_url: string
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
    is_enrolled: boolean
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
    status: string
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
    createCourse: () => Promise<void>;
    fetchCategoryList: () => Promise<void>;
    fetchMinimal: () => Promise<void>;
    reset: () => void;
}

export interface EnrollPayload {
    user_id: number | null
    course_id: number | null
    amount: number
    status: string
    provider: string
}

export interface PaymentDetail {
    session_id: string
    payment_id: number
    url: string
}

export interface UserEnrollment {
    instructor: string
    course: MinimalCourse
    next_subject: string
    completion_percent: number
    total_subjects:number
    completed_subjects: number
    is_completed: boolean
    is_started: boolean
    subjects: SubjectDetail[]
}

export interface EnrollmentState {
    enrollmentPayload: EnrollPayload
    paymentSuccess: boolean
    paymentDetail: PaymentDetail | null
    isLoading: boolean
    userCourseEnrollmentItem: UserEnrollment | null
    userCourseEnrollmentsList: UserEnrollment[] 

    setPayload: (data: EnrollPayload) => void;
    makePayment: () => void;
    fetchUserEnrollmentByCourse: (courseId: number) => Promise<void>; 
    fetchUserEnrollments: () => Promise<void>;
}

export interface UnitContentData{
    completion_time: number
    order: number
    description: string
    content_type: string
    status: string
    video_time_stamps: ContentVideoTimeStamps[]
    unit_id: number | null
}

export interface ContentVideoTimeStamps {
    title: string
    video_stamp: string
}

export interface UnitContentPayload {
    content: UnitContentData
    file: File | null
}

export interface UnitContentState {
    payload: UnitContentPayload;
    isLoading: boolean;
    setPayload: (data: UnitContentPayload) => void;
    createUnitContent: () => Promise<void>;
}