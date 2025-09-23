import { PaginationArgs, PaginationData } from "./Extras";
import { SubjectMinimal } from "./Subject";
import { UnitMinimal } from "./Unit";
import { Profile } from "./user";

export interface CategoryDetail {
  id: number;
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
  categories: CategoryDetail[] | [];
  total_revenue?: number;
  status: string;
  is_enrolled: boolean;
  requirements: string;
  objectives: string
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
  isListLoading: boolean;
  isItemLoading: boolean;
  isCreateUpdateLoading: boolean;
  paginationData: PaginationData | null;

  setCourseDetails: (userDetails: CourseDetail[]) => void;
  setCourseItem: (courseItem: CourseDetail) => void;
  setCoursePayload: (data: CoursePayload) => void;

  fetchCourseDetails: () => Promise<void>;
  fetchLatestCourses: () => Promise<void>;
  fetchCourseById: (course_id: number) => Promise<void>;
  createCourse: () => Promise<void>;
  updateCourse: (courseId: number) => Promise<void>;
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
  course: MinimalCourse;
  subject: SubjectMinimal;
  unit: UnitMinimal
  instructor: Profile;
  content_type: string;
  description: string;
  file_url?: string;
  status: string;
  video_time_stamps: ContentVideoTimeStamps[];
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
  subject_id: number | null;
  course_id: number | null;
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
  isItemLoading: boolean;
  isListLoading: boolean;
  isCreateUpdateLoading: boolean;
  paginationData: PaginationData | null;
  setPayload: (data: UnitContentPayload) => void;
  createUnitContent: () => Promise<boolean>;
  updateContent: (contentId: number) => Promise<void>;
  fetchAllContents: (pagination?: PaginationArgs) => Promise<void>;
  fetchContentById: (contentId: number) => Promise<void>;
  resetPayload: () => void;
}
