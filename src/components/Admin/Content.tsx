"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Badge } from "@/components/ui/Badge"
import { Upload, FileText, Video, ImageIcon, Archive, X, Plus } from "lucide-react"

interface CreateContentFormProps {
  onSubmit: (contentData: any) => void
  onCancel: () => void
}

export function CreateContentForm({ onSubmit, onCancel }: CreateContentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    course: "",
    module: "",
    duration: "",
    fileSize: "",
    tags: [] as string[],
    isPublic: "false",
    allowDownload: "false",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-600" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-600" />
      case "archive":
        return <Archive className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium text-gray-700">Upload Content File *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button type="button" variant="outline" size="sm">
                Choose File
              </Button>
              <p className="text-xs text-gray-600 mt-2">Supports videos, documents, images, and archives up to 100MB</p>
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
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="Enter content title"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="Describe the content..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Content Type *
          </Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
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
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lesson">Lesson</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="course" className="text-sm font-medium text-gray-700">
            Associated Course
          </Label>
          <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react-fundamentals">React Fundamentals</SelectItem>
              <SelectItem value="advanced-javascript">Advanced JavaScript</SelectItem>
              <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
              <SelectItem value="data-structures">Data Structures</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="module" className="text-sm font-medium text-gray-700">
            Module/Chapter
          </Label>
          <Input
            id="module"
            value={formData.module}
            onChange={(e) => handleInputChange("module", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="e.g., Module 1, Chapter 3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
            Duration (minutes)
          </Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            className="bg-white border-gray-300"
            placeholder="e.g., 15"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
            Visibility
          </Label>
          <Select value={formData.isPublic} onValueChange={(value) => handleInputChange("isPublic", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">Private (Course Members Only)</SelectItem>
              <SelectItem value="true">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allowDownload" className="text-sm font-medium text-gray-700">
            Download Permission
          </Label>
          <Select value={formData.allowDownload} onValueChange={(value) => handleInputChange("allowDownload", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">View Only</SelectItem>
              <SelectItem value="true">Allow Download</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="md:col-span-2 space-y-2">
          <Label className="text-sm font-medium text-gray-700">Tags</Label>
          <div className="flex space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="bg-white border-gray-300"
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-cyan-100 text-cyan-800">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-cyan-600">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
          Upload Content
        </Button>
      </div>
    </form>
  )
}
