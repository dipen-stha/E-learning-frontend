import { CourseDetail } from "./Course";

export interface UserCourseDetail {
    user_name: String,
    status: String,
    started_at: Date,
    completed_at: Date | null,
    course: CourseDetail,
    next_subject: String,
    completion_percent: Number
}

export interface UserCourseState {
    userCourseDetails: UserCourseDetail[],
    isLoading: Boolean,

    fetchUserCourseDetails: (userId: number) => void;
    setUserCourseDetails: (detailList: UserCourseDetail[]) => void;
}