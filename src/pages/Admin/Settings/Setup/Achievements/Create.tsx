import { CreateModal } from "@/components/Modal";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Textarea } from "@/components/ui/Textarea";
import { ModalCompProps } from "@/services/types/Extras";
import { AchievementsPayload } from "@/services/types/Gamification";
import { AchievementRuleSet } from "@/services/utils/choiceUtils";
import { useUpdater } from "@/services/utils/storeUtils";
import { useAchievementsStore } from "@/stores/Gamification/Achievements";
import { useEffect } from "react";

export const Create = ({
  isOpen,
  onCancel,
  onSubmit,
  editId,
  isEdit,
}: ModalCompProps) => {
  const achievementPayload = useAchievementsStore(
    (state) => state.achievementPayload
  );
  const setPayload = useAchievementsStore((state) => state.setPayload);
  const createAchievement = useAchievementsStore(
    (state) => state.createAchievement
  );
  const updateAchievement = useAchievementsStore(
    (state) => state.updateAchievement
  );
  const fetchAchievementById = useAchievementsStore(
    (state) => state.fetchAchievementById
  );
  const achievementItem = useAchievementsStore(
    (state) => state.achievementItem
  );

  const { updateField, payload, reset } =
    useUpdater<AchievementsPayload>(achievementPayload);

  const handleSubmit = async () => {
    setPayload(payload);
    if (editId && isEdit) {
      updateAchievement(editId);
    } else {
      await createAchievement();
    }
    reset();
    onSubmit?.();
  };

  const handleClose = () => {
    onCancel();
    reset();
  };

  const modalActions = [
    {
      title: "Create Achievement",
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
    if (editId && isEdit) {
      fetchAchievementById(editId);
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if (achievementItem) {
      updateField("title", achievementItem.title);
      updateField("icon", achievementItem.icon);
      updateField("description", achievementItem.description);
      updateField("is_expirable", achievementItem.is_expirable);
      updateField("is_active", achievementItem.is_active);
      updateField("rule_type", achievementItem.rule_type);
      updateField("threshold", achievementItem.threshold);
    }
  }, [achievementItem]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
      actions={modalActions}
      title="Create Achievement"
      width="2xl"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="title" className="">
            Title *
          </Label>
          <Input
            id="achievementTitle"
            name="title"
            placeholder="Enter the title of the achievement"
            value={payload.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="icon">Icon *</Label>
          <Input
            id="achievementIcon"
            name="icon"
            placeholder="e.g., Icon"
            value={payload.icon}
            onChange={(e) => updateField("icon", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="achievementDescription"
            name="description"
            placeholder="Enter description of the Achievements"
            rows={4}
            value={payload.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rule_type">Rule Type</Label>
          <MultiSelect
            options={AchievementRuleSet}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={payload.rule_type}
            onValueChange={(value: any) =>
              updateField("rule_type", value.value)
            }
          />
        </div>
        <div>
          <Label htmlFor="threshold">Threshold</Label>
          <Input
            type="number"
            id="ruleThreshold"
            name="threshold"
            value={payload.threshold}
            onChange={(e) => updateField("threshold", e.target.value)}
          />
        </div>
        <div>
          <Checkbox
            label="Expirable"
            checked={payload.is_expirable}
            onChange={(e) => updateField("is_expirable", e.target.checked)}
          />
        </div>
        <div>
          <Checkbox
            label="Status"
            checked={payload.is_active}
            onChange={(e) => updateField("is_active", e.target.checked)}
          />
        </div>
      </div>
    </CreateModal>
  );
};
