import { CreateModal } from "@/components/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { courseAPI } from "@/services/api/endpoints/courses";
import api from "@/services/api/interceptor";
import { CategoryPayload } from "@/services/types/Course";
import { ModalCompProps } from "@/services/types/Extras";
import {} from "@/services/types/Gamification";
import { useUpdater } from "@/services/utils/storeUtils";
import React from "react";

const Create = ({
  isOpen,
  onCancel,
  onSubmit,
  editId,
  isEdit,
}: ModalCompProps) => {
  const initialPayload = {
    title: "",
  };
  const { updateField, payload, reset } =
    useUpdater<CategoryPayload>(initialPayload);
  const onModalSubmit = async () => {
    if (editId && isEdit) {
    } else {
      await api.post(courseAPI.createCourseCategory, payload);
    }
    onSubmit?.();
    reset();
  };

  const onModalClose = () => {
    onCancel();
    reset();
  };

  const modalActions = [
    {
      title: "Create Category Type",
      onAction: onModalSubmit,
      variant: "primary",
    },
    {
      title: "Close",
      onAction: onModalClose,
      variant: "outline",
    },
  ];

  return (
    <CreateModal
      actions={modalActions}
      isOpen={isOpen}
      onClose={onModalClose}
      title="Create Category"
      width="2xl"
    >
      <div className="flex-col space-y-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="title" className="text-gray-700">
            Title *
          </Label>
          <Input
            id="courseCategory"
            name="category"
            placeholder="e.g. Information Technology"
            className="bg-white border-gray-200 w-full"
            value={payload.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
      </div>
    </CreateModal>
  );
};

export default Create;
