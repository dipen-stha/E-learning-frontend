import { CreateModal } from "@/components/Modal";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ModalCompProps } from "@/services/types/Extras";
import {
  ContentType,
  mapChoice,
  mapStatus,
} from "@/services/utils/choiceUtils";
import { useUnitContentStore } from "@/stores/Courses/Content";
import { useEffect } from "react";

export const Preview = ({ isOpen, onCancel, previewId }: ModalCompProps) => {
  const fetchContentById = useUnitContentStore(
    (state) => state.fetchContentById
  );
  const contentItem = useUnitContentStore((state) => state.contentItem);

  const modalActions = [
    {
      title: "Close",
      onAction: onCancel,
      variant: "primary",
    },
  ];

  useEffect(() => {
    if (previewId) {
      fetchContentById(previewId);
    }
  }, [previewId]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      title="View Content Details"
      actions={modalActions}
      width="4xl"
    >
      <div className="space-y-3">
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex-col items-center space-y-2">
              <div>
                <span className="text-2xl font-bold">
                  {contentItem?.subject.title}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <Badge className="bg-cyan-50 border-blue-800 text-blue-800">
                  <Icon name="BookOpen" />
                  <span>
                    {mapChoice(
                      contentItem?.content_type as string,
                      ContentType
                    )}
                  </span>
                </Badge>
                <Badge className="bg-emerald-50 border-green-800 text-green-800">
                  <Icon name="LayoutGrid" />
                  {mapStatus(contentItem?.status as string)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex-col border border-violet-200 rounded-md">
              <div>
                <video />
              </div>
              <div className="flex items-center gap-x-3 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-t">
                <div className="w-2 h-6 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full"></div>
                <div className="font-bold">Video Chapters</div>
              </div>
              <div className="flex-col items-center">
                {contentItem?.video_time_stamps.map((content) => (
                  <div className="">
                    <div className="flex items-center justify-between gap-x-4 p-4 border-b border-violet-100">
                      <div className="flex-col">
                        <div className="font-bold">{content.title}</div>
                        <div className="flex items-center gap-x-2 text-gray-600 text-sm">
                          <Icon name="Clock4" size={14}></Icon>
                          {content.time_stamp}
                        </div>
                      </div>
                      <div className="">
                        <Icon name="Play" className="" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent>
            <div className="grid grid-cols-3 space-x-3">
              <div className="space-y-3">
                <div className="border border-green-200 p-3 bg-emerald-50 rounded-md">
                  <div className="font-bold text-4xl text-center text-emerald-800">
                    {contentItem?.completion_time}
                  </div>
                  <div className="font-bold text-center text-emerald-800">
                    Total Duration
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border border-cyan-200 p-3 bg-cyan-50 rounded-md">
                  <div className="font-bold text-4xl text-center text-cyan-800">
                    {contentItem?.video_time_stamps.length}
                  </div>
                  <div className="font-bold text-center text-cyan-800">
                    Total Chapters
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border border-amber-200 p-3 bg-amber-50 rounded-md">
                  <div className="font-bold text-4xl text-center text-amber-800">
                    435
                  </div>
                  <div className="font-bold text-center text-amber-800">
                    Total Views
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreateModal>
  );
};
