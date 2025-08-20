"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { FileText, Video, ImageIcon, Archive } from "lucide-react"
import { useCourseStore } from "@/stores/Courses/Course"
import { MultiSelect } from "../ui/MultiSelect"
import { useUpdater } from "@/services/utils/storeUtils"
import { SubjectPayload } from "@/services/types/Subject"
import { useSubjectStore } from "@/stores/Subjects/Subjects"
import { Status } from "@/services/utils/choiceUtils"

interface CreateUnitFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export function CreateUnitForm({ onSubmit, onCancel }: CreateUnitFormProps) {

  const {fetchMinimal, courseMinimal} = useCourseStore();
  const { subjectPayload, setSubjectPayload } = useSubjectStore();

  const initialPayload = subjectPayload 

  const {payload, updateField} = useUpdater<SubjectPayload>(initialPayload);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubjectPayload(payload)
    onSubmit()
  }

  useEffect(() => {
    fetchMinimal();
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
          <CardDescription>Essential details about the subject</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="title" className="text-gray-700">
                Subject Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to React Components"
                value={payload.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="bg-white border-gray-300 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course" className="text-gray-700">
                Course *
              </Label>
              <MultiSelect 
              options={courseMinimal}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => String(option.id)}
              onValueChange={(value) => updateField("course_id", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order" className="text-gray-700">
                Order *
              </Label>
              <Input
                id="order"
                type="number"
                placeholder="1"
                value={payload.order}
                onChange={(e) => updateField("order", Number(e.target.value))}
                required
                className="bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-700">
                Duration *
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g., 15:30"
                value={payload.completion_time}
                onChange={(e) => updateField("completion_time", Number(e.target.value))}
                className="bg-white border-gray-300"
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
              onValueChange={(value: any) => updateField("status", value?.value)}
               />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what students will learn in this subject..."
              value={payload.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
              className="bg-white border-gray-300 min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Learning Objectives</CardTitle>
          <CardDescription>What will students achieve after completing this subject?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 outline-none">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Add a learning objective..."
              value={payload.objectives}
              onChange={(e) => updateField("objectives", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
          Create Subject
        </Button>
      </div>
    </form>
  )
}
