import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Upload, X, Plus, User } from "lucide-react";
import { useCourseStore } from "@/stores/Courses/Course";
import { CoursePayload, CourseData } from "@/services/types/Course";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useUserStore } from "@/stores/User/User";
import { MultiSelect } from "../ui/MultiSelect";

interface CreateCourseFormProps {
  onSubmit: (data: CourseData, file: File | null) => void;
  onCancel: () => void;
}

export function CreateCourseForm({
  onSubmit,
  onCancel,
}: CreateCourseFormProps) {
  const {
    coursePayload,
    createCourse,
    setCoursePayload,
    fetchCategoryList,
    categoryList,
  } = useCourseStore();
  const { fetchTutors, userMinimalList } = useUserStore();
  const initialPayload: CoursePayload = {
    course: {
      title: "",
      description: "",
      completion_time: 0,
      price: 0,
      requirements: "",
      objectives: "",
      categories_id: [],
      instructor_id: "",
    },
    file: null,
  };

  const [payload, setPayload] = useState<CoursePayload>(initialPayload);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoursePayload(payload);
    await onSubmit(payload.course, payload?.file);
  };

  const updatePayload = (updates: Partial<CoursePayload>) => {
    const updated = { ...payload, ...updates };
    setPayload(updated);
  };

  const updateCourseField = (
    field: keyof CourseData,
    value: string | boolean | number
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

  const handleSelectValueChange = (field: keyof CourseData, value: string) => {
    updateCourseField(field, value);
  };

  const handleCategoriesChange = () => {
    
  }

  useEffect(() => {
    fetchCategoryList();
    fetchTutors();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Thumbnail */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={payload?.file || "/placeholder.svg"} />
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
          <Label htmlFor="categories" className="text-sm font-medium text-gray-700">
            Categories *
          </Label>
          <MultiSelect
            label="title"
            value="id"
            options={categoryList}
            selected={payload.course.categories_id}
            onChange={handleCategoriesChange}
            placeholder="Select categories"
            className="w-full"
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

        <div className="space-y-2">
          <Label
            htmlFor="instructor"
            className="text-sm font-medium text-gray-700"
          >
            Instructor *
          </Label>
          <Select
            name="instructor_id"
            value={payload.course.instructor_id}
            onValueChange={(value) =>
              handleSelectValueChange("instructor_id", value)
            }
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select a instructor">
                {userMinimalList.find(
                  (user) => String(user.id) === String(payload.course.instructor_id)
                )?.name || "Select a instructor"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border-gray-200">
              {userMinimalList.map((user, index) => (
                <SelectItem value={user.id} key={index}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Create Course
        </Button>
      </div>
    </form>
  );
}
