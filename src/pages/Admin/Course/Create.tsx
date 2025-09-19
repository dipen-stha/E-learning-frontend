import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Upload, User } from "lucide-react";
import { useCourseStore } from "@/stores/Courses/Course";
import { CategoryDetail, CoursePayload } from "@/services/types/Course";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/Avatar";
import { useUserStore } from "@/stores/User/User";
import { MultiSelect } from "../../../components/ui/MultiSelect";
import { ModalCompProps } from "@/services/types/Extras";
import { CreateModal } from "../../../components/Modal";
import { Status } from "@/services/utils/choiceUtils";
import { useUpdater } from "@/services/utils/storeUtils";

export function CreateCourseForm({
  onSubmit,
  onCancel,
  isOpen,
  isEdit,
  editId,
}: ModalCompProps) {
  const setCoursePayload = useCourseStore((state) => state.setCoursePayload);
  const createCourse = useCourseStore((state) => state.createCourse);
  const fetchCategoryList = useCourseStore((state) => state.fetchCategoryList);
  const categoryList = useCourseStore((state) => state.categoryList);
  const fetchCourseById = useCourseStore((state) => state.fetchCourseById);
  const courseItem = useCourseStore((state) => state.courseItem);

  const fetchTutors = useUserStore((state) => state.fetchTutors);
  const userMinimalList = useUserStore((state) => state.userMinimalList);
  const coursePayload = useCourseStore((state) => state.coursePayload);
  const updateCourse = useCourseStore((state) => state.updateCourse);

  const initialPayload = coursePayload;

  const { payload, updateField, reset } =
    useUpdater<CoursePayload>(initialPayload);

  const handleSubmit = async () => {
    console.log(payload)
    await setCoursePayload(payload);
    if (isEdit && editId) {
      try {
        await updateCourse(editId);
      } catch (error) {}
    } else {
      createCourse();
    }
    await onSubmit?.();
    reset();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      updateField("file", file);
    }
  };

  const handleClose = () => {
    onCancel();
    reset();
  };

  const handleValueChange = (value: any) => {
    updateField("course.categories_id", value.map((cat: CategoryDetail) => cat.id))
  }
  
  const modalActions = [
    {
      title: `${isEdit ? "Update Course" : "Create Course"}`,
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
    fetchCategoryList();
    fetchTutors();
  }, []);

  useEffect(() => {
    if (isEdit && editId) {
      fetchCourseById(editId);
    }
  }, [isEdit, editId]);

  useEffect(() => {
    if (courseItem) {
      updateField("course", {
        title: courseItem.title,
        description: courseItem.description || "",
        categories_id: courseItem.categories.map((category) => category.id),
        completion_time: courseItem.completion_time,
        price: courseItem.price,
        instructor_id: courseItem.instructor?.id,
        status: courseItem.status,
        requirements: courseItem.requirements,
        objectives: courseItem.objectives,
      },
    );
    updateField("file", courseItem.image_url)
    }
  }, [courseItem]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={handleClose}
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
            onChange={(e) => updateField("course.title", e.target.value)}
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
            onChange={(e) => updateField("course.description", e.target.value)}
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
            getOptionValue={(option) => String(option.id)}
            options={categoryList}
            value={payload.course.categories_id}
            onValueChange={(value: any) =>
              handleValueChange(value)
            }
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
            getOptionValue={(option) => String(option.id)}
            value={payload.course.instructor_id}
            options={userMinimalList}
            onValueChange={(value: any) =>
              updateField("course.instructor_id", value.id)
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
            onChange={(e) =>
              updateField("course.completion_time", e.target.value)
            }
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
            onChange={(e) => updateField("course.price", e.target.value)}
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
            value={payload.course.status as string}
            onValueChange={(value: any) => updateField("course.status", value?.value)}
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
            onChange={(e) => updateField("course.requirements", e.target.value)}
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
            onChange={(e) => updateField("course.objectives", e.target.value)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="What will students learn from this course?"
          />
        </div>
      </div>
    </CreateModal>
  );
}
