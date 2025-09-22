import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useCourseStore } from "@/stores/Courses/Course";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { useUpdater } from "@/services/utils/storeUtils";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { Status } from "@/services/utils/choiceUtils";
import { ModalCompProps } from "@/services/types/Extras";
import { UnitPayload } from "@/services/types/Unit";
import { useUnitStore } from "@/stores/Unit/Unit";
import { CreateModal } from "@/components/Modal";
import { MinimalCourse } from "@/services/types/Course";

export function CreateUnitForm({
  onSubmit,
  onCancel,
  isOpen,
  editId,
  isEdit,
}: ModalCompProps) {
  const { fetchMinimal, courseMinimal } = useCourseStore();
  const { fetchSubjectMinimal, subjectMinimalList } = useSubjectStore();

  const unitPayload = useUnitStore((state) => state.unitPayload);
  const setUnitPayload = useUnitStore((state) => state.setPayload);
  const createUnit = useUnitStore((state => state.createUnit))
  const editUnit = useUnitStore((state) => state.editUnit);
  const fetchUnitById = useUnitStore((state) => state.fetchUnitById);
  const unitItem = useUnitStore((state) => state.unitItem);

  const { payload, updateField, reset } =
    useUpdater<UnitPayload>(unitPayload);

  const handleSubmit = () => {
    setUnitPayload(payload);
    if(editId && isEdit){
      editUnit(editId)
    } else {
      createUnit()
    }
    onSubmit?.();
    reset();
  };

  const handleCourseChange = (course: any) => {
    if (course) {
      fetchSubjectMinimal(course?.id);
      updateField("course_id", course.id)
    }
  };
  const handleClose = () => {
    reset();
    onCancel();
  };

  useEffect(() => {
    if (editId && isEdit) {
      fetchUnitById(editId);
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if (unitItem) {
      updateField("title", unitItem.title);
      updateField("subject_id", unitItem.subject.id);
      updateField("description", unitItem.description);
      updateField("completion_time", unitItem.completion_time);
      updateField("order", unitItem.order);
      updateField("status", unitItem.status);
      updateField("objectives", unitItem.objectives);
      updateField("course_id", unitItem.course.id);
      fetchSubjectMinimal(unitItem?.course?.id);
    }
  }, [unitItem]);

  useEffect(() => {
    fetchMinimal();
  }, []);

  useEffect(() => {
  }, [editId, isEdit, unitItem, courseMinimal])

  const modalActions = [
    {
      title: `${editId ? "Update Unit" : "Create Unit"}`,
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Close",
      onAction: handleClose,
      variant: "danger",
    },
  ];

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Subject"
      width="4xl"
      actions={modalActions}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="title" className="text-gray-700">
            Unit Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Introduction to React Components"
            value={payload.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            className="bg-white border-gray-300 w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course" className="text-gray-700">
            Course *
          </Label>
          <MultiSelect
            options={courseMinimal}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => String(option.id)}
            value={payload.course_id}
            onValueChange={(value: any) => handleCourseChange(value)}
          />
        </div>
        <div>
          <Label htmlFor="subject" className="text-gray-800">
            Subject *
          </Label>
          <MultiSelect
            options={subjectMinimalList}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => String(option.id)}
            value={payload.subject_id}
            onValueChange={(value: any) => updateField("subject_id", value.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="order" className="text-gray-700">
            Order *
          </Label>
          <Input
            id="order"
            type="number"
            placeholder="1"
            value={payload.order}
            onChange={(e) => updateField("order", Number(e.target.value))}
            required
            className="bg-white border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-gray-700">
            Duration *
          </Label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g., 15:30"
            value={payload.completion_time}
            onChange={(e) =>
              updateField("completion_time", Number(e.target.value))
            }
            className="bg-white border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="status" className="text-gray-700">
            Status *
          </Label>
          <MultiSelect
            options={Status}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={payload.status}
            onValueChange={(value: any) => updateField("status", value?.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700">
          Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what students will learn in this subject..."
          value={payload.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
          className="bg-white border-gray-300 min-h-20"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700">
          Objectives *
        </Label>
        <Textarea
          placeholder="Add a learning objective..."
          value={payload.objectives}
          onChange={(e) => updateField("objectives", e.target.value)}
          className="bg-white border-gray-300"
        />
      </div>
    </CreateModal>
  );
}
