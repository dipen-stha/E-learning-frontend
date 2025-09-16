import { CreateModal } from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Textarea } from "@/components/ui/Textarea";
import { OptionDetail } from "@/services/types/Assessment";
import { ModalCompProps } from "@/services/types/Extras";
import { useState } from "react";

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

  const [options, setOptions] = useState<OptionDetail[]>(initialOptions);

  const addOptions = () => {
    const newId = options.length + 1;
    setOptions([...options, { id: newId, text: "", is_correct: false }]);
  };

  const removeOption = (optionId: number) => {
    if(options.length > 2){
        setOptions(options.filter((option, index) => index != optionId))
    }
  }

  const handleClose = () => {
    onCancel();
    setOptions(initialOptions);
  };

  const handleSubmit = () => {
    onSubmit();
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
                <Label
                  htmlFor="question"
                  className="text-sm  text-gray-900"
                >
                  Question
                </Label>
                <Textarea
                  id="questionTitle"
                  name="title"
                  placeholder="Enter question"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm  text-gray-900">Course *</Label>
                <MultiSelect />
              </div>
              <div className="space-y-2">
                <Label>Subject *</Label>
                <MultiSelect />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="assessment"
                  className="text-sm  text-gray-900"
                >
                  Assessment *
                </Label>
                <MultiSelect />
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
            {options.map((item, index) => (
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
                    // value={option.text}
                    // onChange={(e) => updateOption(option.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Icon name="Circle" /> Mark as correct
                  </Button>
                  <Button className="bg-rose-700 hover:bg-rose-800" onClick={() => removeOption(index)}>
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
