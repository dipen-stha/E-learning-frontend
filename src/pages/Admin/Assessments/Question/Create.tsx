import { CreateModal } from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Textarea } from "@/components/ui/Textarea";
import { OptionDetail, QuestionPayload } from "@/services/types/Assessment";
import { ModalCompProps } from "@/services/types/Extras";
import { useUpdater } from "@/services/utils/storeUtils";
import { useAssessmentStore } from "@/stores/Assessment/Assessment";
import { useQuestionStore } from "@/stores/Assessment/Question/Question";
import { useCourseStore } from "@/stores/Courses/Course";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { useEffect, useState } from "react";

export const CreateQuestion = ({
  isOpen,
  onSubmit,
  onCancel,
  editId,
  isEdit,
}: ModalCompProps) => {
  const initialOptions = [
    {
      id: 1,
      text: "",
      is_correct: false,
    },
    {
      id: 2,
      text: "",
      is_correct: false,
    },
  ];

  const fetchCourses = useCourseStore((state) => state.fetchMinimal);
  const courseList = useCourseStore((state) => state.courseMinimal);
  const fetchSubjects = useSubjectStore((state) => state.fetchSubjectsByCourse);
  const subjectList = useSubjectStore((state) => state.subjectDetailList);
  const fetchAssessments = useAssessmentStore(
    (state) => state.fetchAssessmentBySubject
  );
  const assessmentList = useAssessmentStore(
    (state) => state.minimalAssessments
  );

  const questionPayload = useQuestionStore((state) => state.questionPayload);
  const setPayload = useQuestionStore((state) => state.setPayload);
  const createQuestion = useQuestionStore((state) => state.createQuestion);
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const fetchQuestionById = useQuestionStore(
    (state) => state.fetchQuestionById
  );
  const questionItem = useQuestionStore((state) => state.questionItem);

  const { updateField, payload, reset } =
    useUpdater<QuestionPayload>(questionPayload);

  const [options, setOptions] = useState<OptionDetail[]>([]);

  const addOptions = () => {
    const newId = options.length + 1;
    setOptions([...options, { id: newId, text: "", is_correct: false }]);
  };

  const removeOption = (optionId: number) => {
    if (options.length > 2) {
      setOptions(options.filter((option, index) => index != optionId));
    }
  };

  const updateOption = (optionId: number, value: string) => {
    setOptions(
      options.map((item) =>
        item.id === optionId ? { ...item, text: value } : item
      )
    );
  };

  const markCorrect = (optionId: number) => {
    setOptions(
      options.map((item) => ({ ...item, is_correct: item.id === optionId }))
    );
  };

  const handleClose = () => {
    onCancel();
    reset();
    setOptions(initialOptions);
  };

  const handleSubmit = async () => {
    try {
      setPayload(payload);
      if (editId && isEdit) {
        await updateQuestion(editId);
      }else {
        await createQuestion();
      }
    } catch (error) {}
    reset();
    onSubmit?.();
    setOptions(initialOptions);
  };

  const modalOptions = [
    {
      title: `${editId ? "Update Question" : "Create Question"}`,
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Cancel",
      onAction: handleClose,
      variant: "danger",
    },
  ];

  const handleCourseChange = async (courseId: number) => {
    await fetchSubjects(courseId);
    updateField("course_id", courseId);
  };

  const handleSubjectChange = async (subjectId: number) => {
    await fetchAssessments(subjectId);
    updateField("subject_id", subjectId);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (editId && isEdit) {
      fetchQuestionById(editId);
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if (questionItem) {
      updateField("question", questionItem.question);
      updateField("course_id", questionItem.course.id);
      updateField("subject_id", questionItem.subject.id);
      updateField("assessment_id", questionItem.assessment?.id);
      updateField("options", questionItem.options);
      updateField("order", questionItem.order);
      fetchSubjects(questionItem.course.id);
      fetchAssessments(questionItem.subject.id);
      setOptions(questionItem.options);
    }
  }, [questionItem]);

  useEffect(() => {
    updateField("options", options);
  }, [options]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Questions"
      width="4xl"
      actions={modalOptions}
    >
      <div className="space-y-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="question" className="text-sm  text-gray-900">
                  Question
                </Label>
                <Textarea
                  id="questionTitle"
                  name="title"
                  placeholder="Enter question"
                  value={payload.question}
                  onChange={(e) => updateField("question", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm  text-gray-900">
                  Course *
                </Label>
                <MultiSelect
                  options={courseList}
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => String(option.id)}
                  onValueChange={(value: any) => handleCourseChange(value.id)}
                  value={payload.course_id}
                />
              </div>
              <div className="space-y-2">
                <Label>Subject *</Label>
                <MultiSelect
                  options={subjectList}
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => String(option.id)}
                  onValueChange={(value: any) => handleSubjectChange(value.id)}
                  value={payload.subject_id}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessment" className="text-sm  text-gray-900">
                  Assessment *
                </Label>
                <MultiSelect
                  options={assessmentList}
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => String(option.id)}
                  onValueChange={(value: any) =>
                    updateField("assessment_id", value.id)
                  }
                  value={payload.assessment_id}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order *</Label>
                <Input
                  id="questionOrder"
                  name="order"
                  type="number"
                  min="0"
                  placeholder="e.g., 0"
                  value={payload.order}
                  onChange={(e) => updateField("order", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">Answer Details</h3>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={addOptions}
                >
                  Add Option
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payload.options.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-3 p-2 gap-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-sm  text-gray-500 min-w-[60px]">
                    Option {String.fromCharCode(65 + index)}:
                  </span>
                  <Input
                    placeholder="Enter option text..."
                    value={item.text}
                    onChange={(e) =>
                      updateOption(item.id as number, e.target.value)
                    }
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-3">
                  {item.is_correct ? (
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => markCorrect(item.id as number)}
                    >
                      <Icon name="CircleCheckBig" /> Mark as correct
                    </Button>
                  ) : (
                    <Button
                      className="bg-gray-400 hover:bg-gray-500"
                      onClick={() => markCorrect(item.id as number)}
                    >
                      <Icon name="Circle" /> Mark as correct
                    </Button>
                  )}
                  <Button
                    className="bg-rose-700 hover:bg-rose-800"
                    onClick={() => removeOption(index)}
                  >
                    <Icon name="X" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="">
              <span className=" text-gray-600">Note: </span>
              <span className="text-sm text-gray-600">
                Click "Mark Correct" on the option that represents the correct
                answer. Only one option can be marked as correct.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreateModal>
  );
};
