import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Upload, User } from "lucide-react";
import { useCourseStore } from "@/stores/Courses/Course";
import {
  CoursePayload,
  CourseData,
  CategoryDetail,
} from "@/services/types/Course";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useUserStore } from "@/stores/User/User";
import { MultiSelect } from "../ui/MultiSelect";
import { ModalCompProps } from "@/services/types/Extras";
import { CreateModal } from "../Modal";
import { Status } from "@/services/utils/choiceUtils";

export function CreateCourseForm({
  onSubmit,
  onCancel,
  isOpen,
}: ModalCompProps) {
  const setCoursePayload = useCourseStore((state) => state.setCoursePayload);
  const fetchCategoryList = useCourseStore((state) => state.fetchCategoryList);
  const categoryList = useCourseStore((state) => state.categoryList);

  const fetchTutors = useUserStore((state) => state.fetchTutors);
  const userMinimalList = useUserStore((state) => state.userMinimalList);

  const initialPayload: CoursePayload = {
    course: {
      title: "",
      description: "",
      completion_time: 0,
      price: 0,
      requirements: "",
      objectives: "",
      categories_id: [],
      instructor_id: null,
      status: "",
    },
    file: null,
  };

  const [payload, setPayload] = useState<CoursePayload>(initialPayload);

  const handleSubmit = async () => {
    setCoursePayload(payload);
    await onSubmit();
  };

  const updatePayload = (updates: Partial<CoursePayload>) => {
    const updated = { ...payload, ...updates };
    setPayload(updated);
  };

  const updateCourseField = (
    field: keyof CourseData,
    value: string | boolean | number | string[]
  ) => {
    updatePayload({
      course: { ...payload.course, [field]: value },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateCourseField(name as keyof CourseData, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      updatePayload({ file: file });
    }
  };

  const handleSelectValueChange = (field: keyof CourseData, value: any) => {
    updateCourseField(field, value.id);
  };

  const handleCategoriesChange = (value: any) => {
    updateCourseField(
      "categories_id",
      value.map((item: CategoryDetail) => item.id)
    );
    console.log(payload);
  };

  const modalActions = [
    {
      title: "Create Course",
      onAction: handleSubmit,
      variant: "primary"
    },
    {
      title: "Cancel",
      onAction: onCancel,
      variant: "danger"
    },
  ];

  useEffect(() => {
    fetchCategoryList();
    fetchTutors();
  }, []);

  // useEffect(() => {
  //   return(() => {
  //     userReset();
  //     courseReset();
  //   })
  // }, [userReset, courseReset])

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Create New Course"
      actions={modalActions}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Thumbnail */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={String(payload?.file) || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-100">
              <User className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              id="avatar-upload"
              name="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <p className="text-xs text-gray-600 mt-1">JPG, PNG up to 2MB</p>
            {payload?.file && (
              <p className="text-xs text-cyan-600 mt-1">
                Selected: {payload?.file.name}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Course Title *
          </Label>
          <Input
            id="title"
            name="title"
            value={payload.course.title}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2 ">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description *
          </Label>
          <Textarea
            id="description"
            name="description"
            value={payload.course.description}
            onChange={(e) => handleChange(e)}
            className="border-gray-300"
            rows={4}
            placeholder="Describe what students will learn in this course..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="categories"
            className="text-sm font-medium text-gray-700"
          >
            Categories *
          </Label>
          <MultiSelect
            isMulti
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.id}
            options={categoryList}
            // value={categories}
            onValueChange={handleCategoriesChange}
            placeholder="Select categories"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="instructor"
            className="text-sm font-medium text-gray-700"
          >
            Instructor *
          </Label>
          <MultiSelect
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            options={userMinimalList}
            onValueChange={(value) =>
              handleSelectValueChange("instructor_id", value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="duration"
            className="text-sm font-medium text-gray-700"
          >
            Duration (hours)
          </Label>
          <Input
            id="duration"
            name="completion_time"
            type="number"
            value={payload.course.completion_time}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            placeholder="e.g., 10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price ($)
          </Label>
          <Input
            id="price"
            type="number"
            name="price"
            value={payload.course.price}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-gray-700">
            Status *
          </Label>
          <MultiSelect
            options={Status}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onValueChange={(value: any) =>
              handleSelectValueChange("status", value?.value)
            }
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="requirements"
            className="text-sm font-medium text-gray-700"
          >
            Requirements
          </Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={payload.course.requirements}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="What do students need to know before taking this course?"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="objectives"
            className="text-sm font-medium text-gray-700"
          >
            Learning Objectives
          </Label>
          <Textarea
            id="objectives"
            name="objectives"
            value={payload.course.objectives}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="What will students learn from this course?"
          />
        </div>
      </div>
    </CreateModal>
  );
}
