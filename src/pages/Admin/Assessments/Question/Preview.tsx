import { CreateModal } from "@/components/Modal";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ModalCompProps } from "@/services/types/Extras";
import { useQuestionStore } from "@/stores/Assessment/Question/Question";
import { useEffect } from "react";

const Preview = ({
  isOpen,
  onCancel,
  editId,
  isEdit,
  previewId,
}: ModalCompProps) => {
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
  console.log(previewId);
  useEffect(() => {
    if (previewId) {
      fetchQuestionById(previewId);
    }
  }, [previewId]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Preview Question"
      actions={modalOptions}
      width="4xl"
    >
      <div className="space-y-3">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
          <CardContent>
            <div>
              <h3 className="text-xl">{questionItem?.question}</h3>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Badge className="bg-blue-100 text-blue-800">
                  <Icon name="BookOpen" size={16} />
                  <p>{questionItem?.course.title}</p>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex-col space-y-3">
          <Card className="border-gray-200 ">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 p-1 rounded-full"></div>
                <div className="font-bold">Question</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{questionItem?.question}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 ">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <div className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 p-1 rounded-full"></div>
                <div className="font-bold">Answer Options</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex-col space-y-3">
                {questionItem?.options.map((option) => (
                  <div
                    key={option.id}
                    className={`w-full p-3 gap-y-3 shadows-lg border rounded-md ${
                      option.is_correct
                        ? "bg-emerald-100 border-green-300 border-2"
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
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 p-1 rounded-full"></div>
                  <div className="font-bold">Question Details</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex-col items-center">
                  <div className="flex justify-between gap-x-3">
                    <p className="text-gray-600">Course: </p>
                    <p>{questionItem?.course.title}</p>
                  </div>
                  <div className="flex justify-between gap-x-3">
                    <p className="text-gray-600">Number of Options: </p>
                    <p>{questionItem?.options.length} options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 ">
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 p-1 rounded-full"></div>
                  <div className="font-bold">Creation Details</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex-col  items-center">
                  <div className="flex gap-x-3 justify-between">
                    <p className="text-gray-600">Correct Answer: </p>
                    <p className="text-emerald-600">{`${
                      questionItem?.options.find(
                        (item) => item.is_correct === true
                      )?.text
                    }`}</p>
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
