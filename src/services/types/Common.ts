import { CourseDetail, SubjectDetail } from "./Course";
import { SubjectMinimal } from "./Subject";

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
    subjects: SubjectDetail[] | [];
}

export interface UserCourseStats {
    completed_courses: number,
    courses_enrolled: number
}


export interface UserSubjectStatus {
    id: number
    status: string
}

export interface UpcomingSubjects {
    course_id: number
    subject: SubjectMinimal
}

export interface UserCourseState {
    userCourseDetails: UserCourseDetail[]
    userCourseItem: UserCourseDetail | null
    isLoading: boolean
    userCourseStats: UserCourseStats | null
    isEnrolledToCourse: boolean
    userSubjectStatus: UserSubjectStatus[]
    upcomingSubjects: UpcomingSubjects[]


    createUserCourse: (userId: number, courseId:number) => void;
    fetchUserCourseStats: (userId: number) => Promise<void>;
    fetchUserCourseDetails: (userId: number) => Promise<void>;
    fetchUserCourseByCourse: (courseId: number) => Promise<void>;
    fetchCourseUserSubjectStatus: (courseId: number) => Promise<void>;
    fetchUpcomingCourse: () => Promise<void>;


    setUserStats: (userStats: UserCourseStats) => void;
    setUserCourseDetails: (detailList: UserCourseDetail[]) => void;
    setUserCourseItem: (item: UserCourseDetail) => void;

}


export interface UserSubjectDetail {

}

export interface UserSubjectStats {
    total_units: number
    completed_units: number
    completion_percent: number
}

export interface UserSubjectState {
    userSubjectStatus: UserSubjectStats | null

    createUserSubject: (subjectId: number) => Promise<void>;
    fetchUserSubjectStats: (subjectId: number) => Promise<void>;

}

export interface UpdatePayload {
    status: string
}

export interface UserUnitUpdatePayload extends UpdatePayload {
    unit_id: number | null
}

export interface UserUnitDetail {
    unit_id: number
    status: string
    contents?: UserContentStatus[]
}

export interface UserUnitState {
    userUnitStatus: UserUnitDetail[];
    updatePayload: UserUnitUpdatePayload;

    setUpdatePayload: (data: UserUnitUpdatePayload) => void;
    resetUpdatePayload: () => void;

    userUnitCreate: (unitId: number) => Promise<void>;
    fetchUserUnitBySubject: (subjectId: number) => Promise<void>;
    updateUserUnitStatus: () => Promise<void>;
}

export interface UserContentStatus{
    content_id: number
    status: string
}