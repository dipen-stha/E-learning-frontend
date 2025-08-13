import { CourseDetail } from "./Course";

export interface UserCourseDetail {
    user_name: string,
    status: string,
    started_at: Date,
    completed_at: Date | null,
    course: CourseDetail,
    next_subject: string,
    completion_percent: number
    total_subjects: number | null;
    completed_subjects: number | null;
}

export interface UserCourseStats {
    completed_courses: number,
    courses_enrolled: number
}


export interface UserCourseState {
    userCourseDetails: UserCourseDetail[]
    userCourseItem: UserCourseDetail | null
    isLoading: boolean
    userCourseStats: UserCourseStats | null
    isEnrolledToCourse: boolean

    fetchUserCourseStats: (userId: number) => void;
    fetchUserCourseDetails: (userId: number) => void;
    fetchUserCourseByCourse: (courseId: number) => void;

    setUserStats: (userStats: UserCourseStats) => void;
    setUserCourseDetails: (detailList: UserCourseDetail[]) => void;
    setUserCourseItem: (item: UserCourseDetail) => void;

}