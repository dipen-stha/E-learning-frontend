export interface CourseDetail {
    id: number,
    title: string,
    expected_completion_time: number | null,
    description: string | null, 
    price: number,
    completion_time: number,
    student_count: number,
    course_rating: number | null,
    instructor: string | null,
    image_url: string | null,
}

export interface CourseState {
    courseDetails: CourseDetail[],
    courseItem: CourseDetail | null, 
    isLoading: boolean,

    setCourseDetails: (userDetails: CourseDetail[]) => void;
    setCourseItem: (courseItem: CourseDetail) => void;
    fetchCourseDetails: () => void;
    fetchCourseById: (course_id: number) => void; 
}