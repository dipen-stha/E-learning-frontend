export interface CourseDetail {
    id: Number,
    title: String,
    expected_completion_time: Number | null,
    price: Number,
    completion_time: Number,
}

export interface CourseState {
    courseDetails: CourseDetail[],
    isLoading: boolean,

    setCourseDetails: (userDetails: CourseDetail[]) => void;
    fetchCourseDetails: () => void;
}