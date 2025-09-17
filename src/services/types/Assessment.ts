import { CourseDetail, MinimalCourse } from "./Course"
import { AssessmentTypeDetail } from "./Setup"
import { SubjectMinimal } from "./Subject"

export interface AssessmentDetail {
    id: number
    title: string
    assessment_type: AssessmentTypeDetail
    course: CourseDetail
    subject: SubjectMinimal
    max_points: number
    pass_points: number
    description: string
    order: number
}

export interface AssessmentPayload {
    title: string
    assessment_type_id: number | null
    course_id: number | null
    subject_id: number | null
    max_points: number | string
    pass_points: number | string
    description: string
    order: number | string
}

export interface AssessmentMinimal {
    id: number
    title: string
    subject?: SubjectMinimal
}

export interface AssessmentState {
    assessmentItem: AssessmentDetail | null
    assessmentDetails: AssessmentDetail[]
    isItemLoading: boolean;
    isListLoading: boolean;
    isCreateUpdateLoading: boolean;
    assessmentPayload: AssessmentPayload
    minimalAssessments: AssessmentMinimal[]

    setPayload: (data: AssessmentPayload) => void;

    createAssessment: () => Promise<void>;
    updateAssessment: (assessmentId: number) => Promise<void>;
    fetchById: (assessmentId: number) => Promise<void>;
    fetchAssessmentList: () => Promise<void>;
    fetchAssessmentBySubject: (subjectId: number) => Promise<void>;
}

export interface OptionDetail {
    id?: number
    text: string
    is_correct: boolean
}

export interface QuestionDetail {
    id: number
    question: string;
    order: number;
    course: MinimalCourse;
    subject: SubjectMinimal;
    assessment: AssessmentDetail;
    options: OptionDetail[]
}

export interface QuestionPayload{
    question: string;
    order: number | string;
    course_id: number | null;
    subject_id: number | null;
    assessment_id: number | null;
    options: OptionDetail[]
}

export interface QuestionState {
    isItemLoading: boolean;
    isListLoading: boolean;
    isCreateUpdateLoading: boolean;
    questionPayload: QuestionPayload;
    questionsList: QuestionDetail[];
    questionItem: QuestionDetail | null;

    setPayload: (data: QuestionPayload) => void;

    createQuestion: () => Promise<void>;
    updateQuestion: (questionId: number) => Promise<void>;
    fetchQuestionById: (questionId: number) => Promise<void>;
    fetchAllQuestions: () => Promise<void>;
}