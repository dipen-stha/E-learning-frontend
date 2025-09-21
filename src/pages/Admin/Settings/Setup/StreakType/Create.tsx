import { CreateModal } from "@/components/Modal";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { ModalCompProps } from "@/services/types/Extras";
import { StreakTypePayload } from "@/services/types/Gamification";
import { useUpdater } from "@/services/utils/storeUtils";
import { useStreakTypeStore } from "@/stores/Gamification/StreakType";
import { useEffect } from "react";

export const CreateStreakType = ({
  isOpen,
  onCancel,
  onSubmit,
  editId,
  isEdit,
}: ModalCompProps) => {
  const streakTypePayload = useStreakTypeStore(
    (state) => state.streakTypePayload
  );
  const setPayload = useStreakTypeStore((state) => state.setPayload);
  const createStreakType = useStreakTypeStore(
    (state) => state.createStreakType
  );
  const updateStreakType = useStreakTypeStore(
    (state) => state.updateStreakType
  );
  const fetchStreakTypeById = useStreakTypeStore((state) => state.fetchStreakTypeById)
  const streakTypeItem = useStreakTypeStore((state) => state.streakTypeItem)
  const { updateField, payload, reset } =
    useUpdater<StreakTypePayload>(streakTypePayload);

  const onModalSubmit = async () => {
    setPayload(payload)
    if(editId && isEdit) {
        await updateStreakType(editId)
    } else {
        await createStreakType()
    }
    onSubmit?.();
    reset()
  };

  const onModalClose = () => {
    onCancel();
    reset();
  };

  const modalActions = [
    {
      title: "Create Streak Type",
      onAction: onModalSubmit,
      variant: "primary",
    },
    {
      title: "Close",
      onAction: onModalClose,
      variant: "outline",
    },
  ];
  useEffect(() => {
    if (editId && isEdit) {
        fetchStreakTypeById(editId)
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if(streakTypeItem){
        updateField("title", streakTypeItem.title)
        updateField("description", streakTypeItem.description)
        updateField("is_active", streakTypeItem.is_active)
    }
  }, [streakTypeItem])

  return (
    <CreateModal
      actions={modalActions}
      isOpen={isOpen}
      onClose={onModalClose}
      title="Create Streak Type"
      width="2xl"
    >
      <div className="flex-col space-y-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="title" className="text-gray-700">
            Title *
          </Label>
          <Input
            id="streakTitle"
            name="title"
            placeholder="e.g., Regular Course Contribution"
            className="bg-white border-gray-200 w-full"
            value={payload.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="description" className="text-gray-700">
            Description *
          </Label>
          <Textarea
            id="streakDescription"
            name="description"
            placeholder="e.g., Description of the Streak Type"
            value={payload.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
        <div className="flex gap-x-2 space-y-2 w-full items-center">
          {/* <Label htmlFor="is_active" className="text-gray-700 mt-2">
            Status
          </Label> */}
          <Checkbox
            id="status"
            name="is_active"
            checked={payload.is_active}
            onChange={(e) => updateField("is_active", e.target.checked)}
            label="Status"
          />
        </div>
      </div>
    </CreateModal>
  );
};
