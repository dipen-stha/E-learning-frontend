import { CreateModal } from "@/components/Modal";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ModalCompProps } from "@/services/types/Extras";
import { useAssessmentStore } from "@/stores/Assessment/Assessment";
import { useEffect } from "react";

const Preview = ({ isOpen, onCancel, previewId }: ModalCompProps) => {
  const fetchAssessmentById = useAssessmentStore((state) => state.fetchById);
  const assessmentItem = useAssessmentStore((state) => state.assessmentItem);
  const modalActions = [
    {
      title: "Close",
      onAction: onCancel,
      variant: "primary",
    },
  ];

  useEffect(() => {
    if (previewId) {
      fetchAssessmentById(previewId);
    }
  }, [previewId]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      actions={modalActions}
      title="Preview Assessment"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Badge className="bg-blue-100 text-blue-800">
            <Icon name="BookOpen" size={16} />
            <p>{assessmentItem?.course.title}</p>
          </Badge>
        </div>
        <Card className="border-none">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"></div>
              <div className="font-bold">Assessment Description</div>
            </div>
          </CardHeader>
          <CardContent className="border border-blue-200 bg-sky-50 p-3 mx-6 rounded-md shadow-md">
            <div>
              <span>{assessmentItem?.description}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none">
          <CardHeader className="">
            <div className="flex items-center gap-x-3">
              <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"></div>
              <div className="font-bold">Assessment Details</div>
            </div>
          </CardHeader>
          <CardContent className="border border-gray-200 p-3 mx-6 rounded-md shadow-md">
            <div className="grid grid-cols-4 space-x-4">
              <div className="flex-col items-center justify-center text-center space-y-6 bg-sky-50 min-h-[150px] rounded-md border border-sky-200 px-1 py-6">
                <div className="flex items-center gap-x-2">
                  <Icon name="GraduationCap" className="text-blue-800" />
                  <span className="text-cyan-800 text-sm">
                    Marks Requirement
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-cyan-800">
                    {assessmentItem?.pass_points} / {assessmentItem?.max_points}{" "}
                    points
                  </span>
                </div>
              </div>
              <div className="flex-col items-center justify-center text-center space-y-6 bg-emerald-50 min-h-[150px] rounded-md border border-green-200 px-1 py-6">
                <div className="flex items-center text-center gap-x-2 w-full">
                  <Icon name="CircleStar" className="text-emerald-800" />
                  <span className="text-emerald-800 text-sm">Completion</span>
                </div>
              </div>
              <div className="flex-col items-center justify-center text-center space-y-6 bg-violet-50 min-h-[150px] rounded-md border border-purple-200 px-1 py-6">
                <div className="flex items-center text-center gap-x-2">
                  <Icon name="ChartSpline" className="text-violet-800"></Icon>
                  <span className="text-violet-800 text-sm">Avg. Grade</span>
                </div>
              </div>
              <div className="flex-col items-center justify-center text-center space-y-6 bg-amber-50 min-h-[150px] rounded-md border border-yellow-200 px-1 py-6">
                <div className="flex items-center text-center gap-x-2">
                  <Icon name="Users" className="text-amber-800" />
                  <span className="text-amber-800 text-sm">Attempted</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreateModal>
  );
};

export default Preview;
