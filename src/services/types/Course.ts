import { Profile } from "./user";

export interface CategoryDetail {
  id: string;
  title: string;
}

export interface MinimalCourse {
  id: number;
  title: string;
  image_url: string;
}

export interface CourseDetail {
  id: number;
  title: string;
  description?: string;
  price: number;
  completion_time: number;
  student_count: number;
  course_rating?: number;
  instructor?: Profile;
  instructor_name?: string;
  image_url?: string;
  subjects: SubjectDetail[] | [];
  categories: string[] | [];
  total_revenue?: number;
  status: string;
  is_enrolled: boolean;
}

export interface SubjectDetail {
  id: number;
  title: string;
  completion_time?: number;
  order?: number;
  units: UserUnitDetail[];
  course?: CourseDetail;
  total_units?: number;
  completed_units?: number;
  completion_percent?: number;
}

export interface UserUnitDetail {
  id: number;
  title: string;
  is_completed: boolean;
}

export interface CourseData {
  title: string;
  description: string;
  categories_id: number[];
  completion_time: number;
  price: number;
  instructor_id: number | null;
  requirements: string;
  objectives: string;
  status: string;
}

export interface CoursePayload {
  course: CourseData;
  file: File | null;
}

export interface CourseState {
  courseDetails: CourseDetail[];
  courseMinimal: MinimalCourse[];
  coursePayload: CoursePayload;
  courseItem: CourseDetail | null;
  categoryList: CategoryDetail[] | [];
  isLoading: boolean;

  setCourseDetails: (userDetails: CourseDetail[]) => void;
  setCourseItem: (courseItem: CourseDetail) => void;
  setCoursePayload: (data: CoursePayload) => void;

  fetchCourseDetails: () => void;
  fetchLatestCourses: () => Promise<void>;
  fetchCourseById: (course_id: number) => Promise<void>;
  createCourse: () => Promise<void>;
  fetchCategoryList: () => Promise<void>;
  fetchMinimal: () => Promise<void>;
  reset: () => void;
}

export interface EnrollPayload {
  user_id: number | null;
  course_id: number | null;
  amount: number;
  status: string;
  provider: string;
}

export interface PaymentDetail {
  session_id: string;
  payment_id: number;
  url: string;
}

export interface UserEnrollment {
  instructor: string;
  course: MinimalCourse;
  next_subject: string;
  next_subject_id?: number;
  completion_percent: number;
  total_subjects: number;
  completed_subjects: number;
  is_completed: boolean;
  is_started: boolean;
  subjects: SubjectDetail[];
}

export interface EnrollmentState {
  enrollmentPayload: EnrollPayload;
  paymentSuccess: boolean;
  paymentDetail: PaymentDetail | null;
  isLoading: boolean;
  userCourseEnrollmentItem: UserEnrollment | null;
  userCourseEnrollmentsList: UserEnrollment[];

  setPayload: (data: EnrollPayload) => void;
  makePayment: () => void;
  fetchUserEnrollmentByCourse: (courseId: number) => Promise<void>;
  fetchUserEnrollments: () => Promise<void>;
}

export interface UnitContentDetail {
  id: number;
  title: string;
  completion_time: number;
  order: number;
  course: string;
  instructor: Profile;
  content_type: string;
  description: string;
  file_url?: string;
  status: string;
}

export interface UnitContentData {
  title: string;
  completion_time: number;
  order: number;
  description: string;
  content_type: string;
  status: string;
  video_time_stamps: ContentVideoTimeStamps[];
  unit_id: number | null;
}

export interface ContentVideoTimeStamps {
  id: string;
  title: string;
  time_stamp: string | number;
}

export interface UnitContentPayload {
  content: UnitContentData;
  file: File | null;
}

export interface UnitContentState {
  payload: UnitContentPayload;
  contentsList: UnitContentDetail[];
  contentItem: UnitContentDetail | null;
  isLoading: boolean;
  setPayload: (data: UnitContentPayload) => void;
  createUnitContent: () => Promise<boolean>;
  fetchAllContents: () => Promise<void>;
  resetPayload: () => void;
}
