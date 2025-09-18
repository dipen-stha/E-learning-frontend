import { CreateModal } from "@/components/Modal";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ModalCompProps } from "@/services/types/Extras";
import { useQuestionStore } from "@/stores/Assessment/Question/Question";
import { useEffect } from "react";

const Preview = ({ isOpen, onCancel, previewId }: ModalCompProps) => {
  const fetchQuestionById = useQuestionStore(
    (state) => state.fetchQuestionById
  );
  const questionItem = useQuestionStore((state) => state.questionItem);

  const modalOptions = [
    {
      title: "Close",
      onAction: onCancel,
      variant: "primary",
    },
  ];

  useEffect(() => {
    if (previewId) fetchQuestionById;
  }, [previewId]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Preview Question"
      actions={modalOptions}
      width="3xl"
    >
      <div className="space-x-6">
        <div>
          <h3 className="text-xl">{questionItem?.question}</h3>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Badge className="bg-sky-100 border text-blue-800">
            <Icon name="BookOpen" size={14}/>
            <p>{questionItem?.course.title}</p>
            </Badge>
          </div>
        </div>
        <div className="border-b border-gray-200 my-3"></div>
        <div className="flex-col space-y-3">
          <Card className="border-gray-200 ">
            <CardHeader className="font-medium">Question</CardHeader>
            <CardContent>
              <p>{questionItem?.question}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 ">
            <CardHeader>Answer Options</CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-3 space-y-3">
                {questionItem?.options.map((option) => (
                  <div
                    className={`w-full p-3 gap-y-3 shadows-lg border ${
                      option.is_correct
                        ? "bg-emerald-100 border-green-200 border-2"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        name={`${
                          option.is_correct ? "CircleCheckBig" : "Circle"
                        }`}
                        className={`${
                          option.is_correct ? "text-green-600" : "text-gray-600"
                        }`}
                      />
                      <span>{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-x-3">
            <Card className="border-gray-200 ">
              <CardHeader>Question Details</CardHeader>
              <CardContent>
                <div className="flex-col items-center">
                  <div className="flex gap-x-3">
                    <p className="text-gray-600">Course: </p>
                    <p>{questionItem?.course.title}</p>
                  </div>
                  <div className="flex gap-x-3">
                    <p className="text-gray-600">Number of Options: </p>
                    <p>{questionItem?.options.length} options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 ">
                <CardHeader>Creation Details</CardHeader>
                <CardContent>
                    <div className="flex-col items-center">
                        <div className="flex gap-x-3">
                            <p className="text-gray-600">Correct Answer: </p>
                            <p className="text-emerald-600">{`${questionItem?.options.find((item) => (item.is_correct === true))?.text}`}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default Preview;
