

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Badge } from "@/components/ui/Badge"
import { Upload, X, Plus } from "lucide-react"

interface CreateCourseFormProps {
  onSubmit: (courseData: any) => void
  onCancel: () => void
}

export function CreateCourseForm({ onSubmit, onCancel }: CreateCourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    thumbnail: "",
    instructor: "",
    tags: [] as string[],
    requirements: "",
    objectives: "",
  })

  const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Thumbnail */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium text-gray-700">Course Thumbnail</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button type="button" variant="outline" size="sm" className="border-none">
                Upload Image
              </Button>
              <p className="text-xs text-gray-600 mt-2">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Course Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2 ">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="border-gray-300"
            rows={4}
            placeholder="Describe what students will learn in this course..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="programming" className="text-gray-600">Programming</SelectItem>
              <SelectItem value="design" className="text-gray-600">Design</SelectItem>
              <SelectItem value="business" className="text-gray-600">Business</SelectItem>
              <SelectItem value="marketing" className="text-gray-600">Marketing</SelectItem>
              <SelectItem value="data-science" className="text-gray-600">Data Science</SelectItem>
              <SelectItem value="languages" className="text-gray-600">Languages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level" className="text-sm font-medium text-gray-700">
            Level *
          </Label>
          <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
            Duration (hours)
          </Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
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
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructor" className="text-sm font-medium text-gray-700">
            Instructor *
          </Label>
          <Select value={formData.instructor} onValueChange={(value) => handleInputChange("instructor", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarah-miller">Sarah Miller</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="requirements" className="text-sm font-medium text-gray-700">
            Requirements
          </Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => handleInputChange("requirements", e.target.value)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="What do students need to know before taking this course?"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="objectives" className="text-sm font-medium text-gray-700">
            Learning Objectives
          </Label>
          <Textarea
            id="objectives"
            value={formData.objectives}
            onChange={(e) => handleInputChange("objectives", e.target.value)}
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
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
          Create Course
        </Button>
      </div>
    </form>
  )
}
