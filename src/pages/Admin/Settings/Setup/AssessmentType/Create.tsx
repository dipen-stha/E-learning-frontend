import { CreateModal } from "@/components/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { ModalCompProps } from "@/services/types/Extras";
import { AssessmentTypePayload } from "@/services/types/Setup";
import { useUpdater } from "@/services/utils/storeUtils";
import { useAssessmentTypeStore } from "@/stores/Setup/AssessmentType";
import { useEffect } from "react";

const CreateAssignmentType = ({
  onSubmit,
  onCancel,
  isOpen,
  isEdit,
  editId,
}: ModalCompProps) => {

  const assessmentTypeCreate = useAssessmentTypeStore((state) => state.createAssessmentType)
  const assessmentTypePayload = useAssessmentTypeStore((state) => state.payload)
  const setPayload = useAssessmentTypeStore((state) => state.setPayload)
  const fetchTypeById = useAssessmentTypeStore((state) => state.fetchAssessmentTypeById)
  const assessmentTypeItem = useAssessmentTypeStore((state) => state.assessmentTypeItem)

  const {updateField, payload, reset} = useUpdater<AssessmentTypePayload>(assessmentTypePayload)
  const handleClose = () => {
    reset();
    onCancel();
  };

  const handleSubmit = async () => {
    setPayload(payload);
    if(editId && isEdit) {

    } else {
        await assessmentTypeCreate()
    }
    reset();
    onSubmit();
  };

  const modalActions = [
    {
      title: `${editId ? "Update Assessment Type" : "Create Assessment Type"}`,
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
    if(editId && isEdit) {
      fetchTypeById(editId)
    }
  }, [editId, isEdit])

  useEffect(() => {
    if(assessmentTypeItem) {
      updateField("title", assessmentTypeItem.title),
      updateField("description", assessmentTypeItem.description),
      updateField("icon", assessmentTypeItem.icon)
    }
  }, [assessmentTypeItem])

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Assessment Type"
      actions={modalActions}
      width="md"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Assessment Type Title *
            </Label>
            <Input
              id="title"
              name="typeTitle"
              placeholder="Enter the title of the type"
              value={payload.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="icon" className="text-sm font-medium text-gray-700">
              Icon *
            </Label>
            <Input
              id="icon"
              name="type_icon"
              placeholder="Enter the name of the icon to use"
              value={payload.icon}
              onChange={(e) => updateField("icon", e.target.value)}
              required
            ></Input>
          </div>
        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="type_description"
            placeholder="Enter the description of this assessment type"
            value={payload.description}
            onChange={(e) => updateField("description", e.target.value)}
            className=""
          />
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateAssignmentType;
