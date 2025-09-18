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
            <div className="flex justify-between">
            <span className="text-md text-gray-600">{assessmentItem?.course.title}</span>
            <span className="text-md text-gray-600">Total points: {assessmentItem?.max_points}</span>
            </div>
            <Card className="border-none">
                <CardHeader className="text-xl">Assessment Description</CardHeader>
                <CardContent className="border border-gray-200 p-3 mx-6 rounded-md shadow-md">
                    <div >
                        <span>{assessmentItem?.description}</span>
                    </div>
                </CardContent>
            </Card>
                <Card className="border-none">
                <CardHeader className="text-xl">Assessment Details</CardHeader>
                <CardContent className="border border-gray-200 p-3 mx-6 rounded-md shadow-md">
                    <div className="grid grid-cols-4">
                        <div className="flex-col items-center justify-center text-center space-y-6 bg-sky-50 min-h-[150px] rounded-md border border-sky-200 px-1 py-6">
                            <div className="flex items-center gap-x-2"><Icon name="GraduationCap" className="text-emerald-400"/><span>Marks Requirement</span></div>
                            <div><span className="text-4xl font-bold">{assessmentItem?.pass_points} / {assessmentItem?.max_points}</span></div>
                        </div>
                        <div className="space-y-3 bg-sky-3">
                            <span></span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </CreateModal>
  );
};

export default Preview;
