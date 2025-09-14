import { useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

import { useCourseStore } from "@/stores/Courses/Course";
import { MultiSelect } from "../../../components/ui/MultiSelect";
import { useUpdater } from "@/services/utils/storeUtils";
import { SubjectPayload } from "@/services/types/Subject";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { Status } from "@/services/utils/choiceUtils";
import { ModalCompProps } from "@/services/types/Extras";
import { CreateModal } from "../../../components/Modal";

export function CreateSubjectForm({
  onSubmit,
  onCancel,
  isOpen,
  isEdit,
  editId,
}: ModalCompProps) {
  const { fetchMinimal, courseMinimal } = useCourseStore();
  const setSubjectPayload = useSubjectStore((state) => state.setSubjectPayload);
  const subjectPayload = useSubjectStore((state) => state.subjectPayload);
  const fetchSubjectById = useSubjectStore((state) => state.fetchSubjectById);
  const subjectItem = useSubjectStore((state) => state.subjectItem);
  const updateSubject = useSubjectStore((state) => state.updateSubject);
  const createSubject = useSubjectStore((state) => state.createSubject)

  const { payload, updateField, reset } = useUpdater<SubjectPayload>(subjectPayload);

  const handleSubmit = async () => {
    setSubjectPayload(payload);
    if(editId && isEdit) {
      try{
        await updateSubject(editId)
      } catch (error) {

      }
    } else{
      await createSubject()
    }
    onSubmit();
  };

  const handleClose = () => {
    reset();
    onCancel();
  }

  const modalOptions = [
    {
      title: `${isEdit ? "Update Subject" : "Create Subject"}`,
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Cancel",
      onAction: handleClose,
      variant: "danger",
    },
  ];

  useEffect(() => {
    fetchMinimal();
  }, []);

  useEffect(() => {
    if (editId && isEdit) {
      fetchSubjectById(editId);
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if (subjectItem) {
      updateField("title", subjectItem.title);
      updateField("description", subjectItem.description);
      updateField("course_id", subjectItem.course.id);
      updateField("completion_time", subjectItem.completion_time);
      updateField("order", subjectItem.order);
      updateField("objectives", subjectItem.objectives);
      updateField("status", subjectItem.status);
    }
  }, [subjectItem]);


  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Subject"
      width="4xl"
      actions={modalOptions}
    >
      {/* Basic Information */}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="title" className="text-gray-700">
            Subject Title *
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
            onValueChange={(value: any) => updateField("course_id", value.id)}
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

      <div className="mb-3">
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

      <div className="">
        <Label htmlFor="objectives" className="text-gray-700">
          Objectives
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
