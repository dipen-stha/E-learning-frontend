import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { MultiSelect } from "@/components/ui/MultiSelect";

import { useCourseStore } from "@/stores/Courses/Course";
import { useAssessmentTypeStore } from "@/stores/Setup/AssessmentType";
import { useAssessmentStore } from "@/stores/Assessment/Assessment";
import { useUpdater } from "@/services/utils/storeUtils";
import { AssessmentPayload } from "@/services/types/Assessment";
import { CreateModal } from "@/components/Modal";
import { ModalCompProps } from "@/services/types/Extras";
import { useSubjectStore } from "@/stores/Subjects/Subjects";

export function CreateAssignmentForm({
  isOpen,
  onSubmit,
  onCancel,
  editId,
  isEdit,
}: ModalCompProps) {
  const fetchCourseMinimal = useCourseStore((state) => state.fetchMinimal);
  const courseMinimal = useCourseStore((state) => state.courseMinimal);

  const fetchAssessmentType = useAssessmentTypeStore(
    (state) => state.fetchAssessmentTypeList
  );
  const assessmentTypeList = useAssessmentTypeStore(
    (state) => state.assessmentTypeDetails
  );
  const assessmentTypePayload = useAssessmentStore(
    (state) => state.assessmentPayload
  );
  const setPayload = useAssessmentStore((state) => state.setPayload);
  const createAssessment = useAssessmentStore(
    (state) => state.createAssessment
  );
  const updateAssessment = useAssessmentStore((state) => state.updateAssessment)
  const fetchAssessmentById = useAssessmentStore((state) => state.fetchById);
  const assessmentDetail = useAssessmentStore((state) => state.assessmentItem);

  const subjectByCourse = useSubjectStore(
    (state) => state.fetchSubjectsByCourse
  );
  const subjectList = useSubjectStore((state) => state.subjectDetailList);

  const { updateField, payload, reset } = useUpdater<AssessmentPayload>(
    assessmentTypePayload
  );

  const handleSubmit = async () => {
    try {
      setPayload(payload);
      if (editId && isEdit) {
        await updateAssessment(editId)
      } else {
        await createAssessment();
      }
      onSubmit?.();
    } catch (error) {
      console.log("Error:", error);
      return;
    }
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  const handleCourseChange = async (courseId: number) => {
    await subjectByCourse(courseId);
    updateField("course_id", courseId);
  };

  useEffect(() => {
    if (editId && isEdit) {
      fetchAssessmentById(editId);
    }
  }, [isEdit, editId]);

  useEffect(() => {
    if (assessmentDetail) {
      updateField("title", assessmentDetail.title);
      updateField("description", assessmentDetail.description);
      updateField("order", assessmentDetail.order);
      updateField("max_points", assessmentDetail.max_points);
      updateField("pass_points", assessmentDetail.pass_points);
      updateField("assessment_type_id", assessmentDetail.assessment_type.id);
      updateField("course_id", assessmentDetail.course.id);
      updateField("subject_id", assessmentDetail.subject.id);
      subjectByCourse(assessmentDetail.course.id);
    }
  }, [assessmentDetail]);

  useEffect(() => {
    fetchCourseMinimal();
    fetchAssessmentType();
  }, []);

  const modalOptions = [
    {
      title: `${editId ? "Update Assessment" : "Create Assessment"}`,
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Cancel",
      onAction: handleClose,
      variant: "danger",
    },
  ];

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create a New Assignment"
      actions={modalOptions}
      width="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-foreground"
              >
                Assignment Title *
              </Label>
              <Input
                id="title"
                value={payload.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="border-border"
                placeholder="Enter assignment title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="course"
                className="text-sm font-medium text-foreground"
              >
                Course *
              </Label>
              <MultiSelect
                options={courseMinimal}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => String(option.id)}
                value={payload.course_id}
                onValueChange={(value: any) => handleCourseChange(value.id)}
              />
            </div>
            <div>
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Subject *
              </Label>
              <MultiSelect
                options={subjectList}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => String(option.id)}
                value={payload.subject_id}
                onValueChange={(value: any) =>
                  updateField("subject_id", value.id)
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-sm font-medium text-foreground"
              >
                Assignment Type *
              </Label>
              <MultiSelect
                options={assessmentTypeList}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => String(option.id)}
                value={payload.assessment_type_id}
                onValueChange={(value: any) =>
                  updateField("assessment_type_id", value.id)
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="order"
                className="text-sm font-medium text-foreground"
              >
                Order *
              </Label>
              <Input
                id="assessmentOrder"
                name="order"
                type="number"
                min="0"
                value={payload.order as number}
                onChange={(e) => updateField("order", e.target.value)}
                placeholder="e.g., 2"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="maxPoints"
                className="text-sm font-medium text-foreground"
              >
                Maximum Points *
              </Label>
              <Input
                id="maxPoints"
                name="max_points"
                type="number"
                min="0"
                value={payload.max_points as number}
                onChange={(e) => updateField("max_points", e.target.value)}
                className="border-border"
                placeholder="e.g., 100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Pass Points *
              </Label>
              <Input
                id="passPoints"
                name="pass_points"
                type="number"
                min="0"
                value={payload.pass_points as number}
                onChange={(e) => updateField("pass_points", e.target.value)}
                placeholder="e.g., 80"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={payload.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="border-border"
                rows={3}
                placeholder="Brief description of the assignment..."
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
      </form>
    </CreateModal>
  );
}
