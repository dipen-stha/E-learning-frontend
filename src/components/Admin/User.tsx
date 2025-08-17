"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Upload, User } from "lucide-react"

interface CreateUserFormProps {
  onSubmit: (userData: any) => void
  onCancel: () => void
}

export function CreateUserForm({ onSubmit, onCancel }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "active",
    phone: "",
    bio: "",
    avatar: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Picture */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={formData.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-100">
              <User className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <p className="text-xs text-gray-600 mt-1">JPG, PNG up to 2MB</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-white border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role *
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="bg-white border-gray-300"
            rows={3}
            placeholder="Brief description about the user..."
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
          Create User
        </Button>
      </div>
    </form>
  )
}
