import type React from "react";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Upload, User } from "lucide-react";
import { useUserStore } from "@/stores/User/User";
import { Checkbox } from "../ui/Checkbox";
import { UserDataPayload, UserPayload } from "@/services/types/user";

interface CreateUserFormProps {
  onSubmit: (userData: UserDataPayload, file: File | null) => void;
  onCancel: () => void;
  openModal: () => void;
}

export function CreateUserForm({
  onSubmit,
  onCancel,
  openModal,
}: CreateUserFormProps) {
  const { userPayload, setUserPayload, createUser } = useUserStore();
  const initialPayload: UserPayload = {
    user: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
      dob: new Date(),
      is_active: true,
    },
    avatar: null,
  };

  const [payload, setPayload] = useState<UserPayload>(initialPayload);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserPayload(payload);
    await onSubmit(payload.user, payload?.avatar);
  };

  const updatePayload = (updates: Partial<UserPayload>) => {
    const updated = { ...payload, ...updates };
    setPayload(updated);
  };

  const updateUserField = (
    field: keyof UserDataPayload,
    value: string | boolean | Date
  ) => {
    updatePayload({
      user: { ...payload.user, [field]: value },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserField(name as keyof UserDataPayload, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // const previewUrl = URL.createObjectURL(file)
      updatePayload({ avatar: file });
    }
  };

  const handleSelectValueChange = (value: string) => {
    updateUserField("gender", value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Picture */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={payload?.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-100">
              <User className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              id="avatar-upload"
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
              Upload Photo
            </Button>
            <p className="text-xs text-gray-600 mt-1">JPG, PNG up to 2MB</p>
            {payload?.avatar && (
              <p className="text-xs text-cyan-600 mt-1">
                Selected: {payload?.avatar.name}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-2">
          <Label htmlFor="Name" className="text-sm font-medium text-gray-700">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={payload?.user.name || ""}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username *
          </Label>
          <Input
            id="username"
            type="text"
            name="username"
            autoComplete="userName"
            value={payload?.user.username || ""}
            onChange={(e) => handleChange(e)}
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
            name="email"
            value={payload?.user.email || ""}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender *
          </Label>
          <Select
            value={payload?.user.gender}
            onValueChange={(value) => handleSelectValueChange(value)}
            name="gender"
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password *
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={payload?.user.password || ""}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password *
          </Label>
          <Input
            id="confirmPassword"
            name="confirm_password"
            type="password"
            autoComplete="confirm_password"
            value={payload?.user.confirm_password || ""}
            onChange={(e) => handleChange(e)}
            className="bg-white border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Active
          </Label>
          <Checkbox
            id="isActive"
            name="is_active"
            checked={payload?.user.is_active || true}
            onChange={(e) => handleChange(e)}
          ></Checkbox>
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
          Create User
        </Button>
      </div>
    </form>
  );
}
