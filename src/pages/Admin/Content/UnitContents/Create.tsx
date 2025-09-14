import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Upload, X, Plus, Clock } from "lucide-react";
import { ModalCompProps } from "@/services/types/Extras";
import { CreateModal } from "@/components/Modal";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { ContentType } from "@/services/utils/choiceUtils";
import { useCourseStore } from "@/stores/Courses/Course";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { useUnitStore } from "@/stores/Unit/Unit";
import { useUpdater } from "@/services/utils/storeUtils";
import {
  ContentVideoTimeStamps,
  UnitContentData,
  UnitContentPayload,
} from "@/services/types/Course";
import { useUnitContentStore } from "@/stores/Courses/Content";
import { Status } from "@/services/utils/choiceUtils";

export function CreateContentForm({
  onSubmit,
  onCancel,
  isOpen,
  editId,
  isEdit,
}: ModalCompProps) {
  const [timestamps, setTimestamps] = useState<ContentVideoTimeStamps[]>([]);
  const [newTimestamp, setNewTimestamp] = useState({
    time: "",
    description: "",
  });

  const fetchCourses = useCourseStore((state) => state.fetchMinimal);
  const courseDetails = useCourseStore((state) => state.courseMinimal);

  const subjectList = useSubjectStore((state) => state.subjectMinimalList);
  const fetchSubjectMinimal = useSubjectStore(
    (state) => state.fetchSubjectMinimal
  );

  const fetchMinimalList = useUnitStore((state) => state.fetchMinimalUnitList);
  const unitList = useUnitStore((state) => state.unitMinimalList);

  const contentPayload = useUnitContentStore((state) => state.payload);
  const setPayload = useUnitContentStore((state) => state.setPayload);
  const createContent = useUnitContentStore((state) => state.createUnitContent);
  const updateContent = useUnitContentStore((state) => state.updateContent);
  const fetchContentById = useUnitContentStore(
    (state) => state.fetchContentById
  );
  const contentItem = useUnitContentStore((state) => state.contentItem);

  const initialPayload = contentPayload;

  const { payload, updateField, reset } =
    useUpdater<UnitContentPayload>(initialPayload);

  const handleModalClose = () => {
    reset();
    onCancel();
  };

  const handleCourseChange = (course: any) => {
    if (course) {
      fetchSubjectMinimal(course?.id);
      updateField("content.course_id", course.id);
    }
  };

  const handleSubjectChange = (subject: any) => {
    if (subject) {
      fetchMinimalList(subject.id);
      updateField("content.subject_id", subject.id);
    }
  };

  const addTimestamp = () => {
    if (newTimestamp.time.trim() && newTimestamp.description.trim()) {
      const timestamp: ContentVideoTimeStamps = {
        id: Date.now().toString(),
        time_stamp: newTimestamp.time.trim(),
        title: newTimestamp.description.trim(),
      };
      setTimestamps((prev) => {
        const updated = [...prev, timestamp];
        updateField("content.video_time_stamps", updated);
        return updated;
      });
      setNewTimestamp({ time: "", description: "" });
    }
  };

  const removeTimestamp = (id: string) => {
    setTimestamps((prev) => prev.filter((timestamp) => timestamp.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateField("file", file);
  };

  const handleSubmit = async () => {
    setPayload(payload);
    if(editId && isEdit) {
      await updateContent(editId)
    } else {
      createContent();
    }
    onSubmit();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (editId && isEdit) {
      fetchContentById(editId);
    }
  }, [editId, isEdit]);

  useEffect(() => {
    if (contentItem) {
      updateField("content", {
        title: contentItem.title,
        description: contentItem.description,
        completion_time: contentItem.completion_time,
        content_type: contentItem.content_type,
        order: contentItem.order,
        unit_id: contentItem.unit.id,
        subject_id: contentItem.subject.id,
        course_id: contentItem.course.id,
        status: contentItem.status,
        video_time_stamps: contentItem.video_time_stamps,
      });
      updateField("file", contentItem.file_url);
      if(contentItem.video_time_stamps.length > 0) setTimestamps(contentItem.video_time_stamps);
      fetchSubjectMinimal(contentItem.course.id);
      fetchMinimalList(contentItem.subject.id);
    }
  }, [contentItem]);

  const modalActions = [
    {
      title: `${isEdit ? "Update Content": "Create Content"}`,
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Close",
      onAction: handleModalClose,
      variant: "danger",
    },
  ];

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Create A New Unit"
      width="4xl"
      actions={modalActions}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium text-gray-700">
            Upload Content File *
          </Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <input
                type="file"
                id="content-file"
                name="file"
                accept="*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("content-file")?.click()}
              >
                Choose File
              </Button>
              <p className="text-xs text-gray-600 mt-2">
                Supports videos, documents, images, and archives up to 100MB
              </p>
              {payload.file && <p>Selected: {payload.file.name ?? payload.file}</p>}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Content Title *
          </Label>
          <Input
            id="title"
            value={payload.content.title}
            onChange={(e) => updateField("content.title", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="Enter content title"
            required
          />
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
            value={payload.content.description}
            onChange={(e) => updateField("content.description", e.target.value)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="Describe the content..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Content Type *
          </Label>
          {/* <Select
            value={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="border-gray-200">
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4 text-red-600" />
                  Video
                </div>
              </SelectItem>
              <SelectItem value="document">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-blue-600" />
                  Document
                </div>
              </SelectItem>
              <SelectItem value="image">
                <div className="flex items-center">
                  <ImageIcon className="mr-2 h-4 w-4 text-green-600" />
                  Image
                </div>
              </SelectItem>
              <SelectItem value="archive">
                <div className="flex items-center">
                  <Archive className="mr-2 h-4 w-4 text-orange-600" />
                  Archive
                </div>
              </SelectItem>
            </SelectContent>
          </Select> */}
          <MultiSelect
            options={ContentType}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={payload.content.content_type}
            onValueChange={(value: any) =>
              updateField("content.content_type", String(value?.value))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="course" className="text-sm font-medium text-gray-700">
            Associated Course
          </Label>
          <MultiSelect
            options={courseDetails}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => String(option.id)}
            value={payload.content.course_id}
            onValueChange={handleCourseChange}
          />
        </div>
        <div>
          <Label htmlFor="module" className="text-sm font-medium text-gray-700">
            Subject
          </Label>
          <MultiSelect
            options={subjectList}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => String(option.id)}
            value={payload.content.subject_id}
            onValueChange={handleSubjectChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="module" className="text-sm font-medium text-gray-700">
            Unit
          </Label>
          <MultiSelect
            options={unitList}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => String(option.id)}
            value={payload.content.unit_id}
            onValueChange={(value: any) =>
              updateField("content.unit_id", value?.id)
            }
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="duration"
            className="text-sm font-medium text-gray-700"
          >
            Duration (minutes)
          </Label>
          <Input
            id="duration"
            type="number"
            value={payload.content.completion_time}
            onChange={(e) =>
              updateField("content.completion_time", Number(e.target.value))
            }
            className="bg-white border-gray-300"
            placeholder="e.g., 15"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="duration"
            className="text-sm font-medium text-gray-700"
          >
            Order
          </Label>
          <Input
            id="order"
            type="number"
            value={payload.content.order}
            onChange={(e) =>
              updateField("content.order", Number(e.target.value))
            }
            className="bg-white border-gray-300"
            placeholder="e.g., 15"
          />
        </div>
        <div>
          <Label
            htmlFor="duration"
            className="text-sm font-medium text-gray-700"
          >
            Status
          </Label>
          <MultiSelect
            options={Status}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            value={payload.content.status}
            onValueChange={(value: any) =>
              updateField("content.status", value.value)
            }
          />
        </div>
        {payload.content.content_type === "VIDEO" && (
          <div className="md:col-span-2 space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <Label className="text-sm font-medium text-gray-700">
                Video Timestamps
              </Label>
            </div>
            <p className="text-xs text-gray-600">
              Add timestamps to mark important sections in your video
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">
                  Time (mm:ss)
                </Label>
                <Input
                  value={newTimestamp.time}
                  onChange={(e) =>
                    setNewTimestamp((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-300"
                  placeholder="e.g., 05:30"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-medium text-gray-700">
                  Description
                </Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTimestamp.description}
                    onChange={(e) =>
                      setNewTimestamp((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="bg-white border-gray-300"
                    placeholder="e.g., Introduction to React Hooks"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTimestamp())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addTimestamp}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {timestamps.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">
                  Added Timestamps
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {timestamps.map((timestamp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="outline"
                          className="text-red-600 border-red-200"
                        >
                          {timestamp.time_stamp}
                        </Badge>
                        <span className="text-sm text-gray-700">
                          {timestamp.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTimestamp(timestamp.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CreateModal>
  );
}
