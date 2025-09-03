import type React from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Upload, User } from "lucide-react";
import { useUserStore } from "@/stores/User/User";
import { Checkbox } from "../../../components/ui/Checkbox";
import { ModalCompProps } from "@/services/types/Extras";
import { CreateModal } from "../../../components/Modal";
import { useUpdater } from "@/services/utils/storeUtils";
import { UserPayload } from "@/services/types/user";
import { useEffect } from "react";

export function CreateUserForm({
  onSubmit,
  onCancel,
  isOpen,
  isEdit,
  editId,
}: ModalCompProps) {
  const setUserPayload = useUserStore((state) => state.setUserPayload);
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const userPayload = useUserStore((state) => state.userPayload);
  const fetchUserById = useUserStore((state) => state.fetchUserById);
  const userDetail = useUserStore((state) => state.userDetail);
  const { payload, updateField } = useUpdater<UserPayload>(userPayload);

  const handleSubmit = async () => {
    setUserPayload(payload);
    if (isEdit && editId) {
      updateUser(editId as number);
    } else {
      createUser();
    }
    await onSubmit();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      updateField("avatar", file);
    }
  };

  const modalOptions = [
    {
      title: "Create User",
      onAction: handleSubmit,
      variant: "primary",
    },
    {
      title: "Cancel",
      onAction: onCancel,
      variant: "danger",
    },
  ];
  useEffect(() => {
    if (isEdit && editId) {
      fetchUserById(editId);
    }
  }, [isEdit, editId]);

  useEffect(() => {
    if (userDetail){
      updateField("user", {
      name: userDetail.profile.name || "",
      gender: userDetail.profile.gender || "",
      username: userDetail.username || "",
      dob: userDetail.profile.dob || "",
      is_active: userDetail.is_active ?? true,
      email: userDetail.email || "",
      password: "",
      confirm_password: "",
      })
      updateField("avatar", userDetail.profile.avatar)
    }
  }, [userDetail])

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onCancel}
      title="Create New User"
      actions={modalOptions}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Picture */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={
                payload?.avatar instanceof File
                  ? URL.createObjectURL(payload.avatar)
                  : (payload?.avatar as string) || "/placeholder.svg"
              }
            />
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
                Selected:{" "}
                {payload?.avatar instanceof File
                  ? payload.avatar.name
                  : payload.avatar}
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
            onChange={(e) => updateField("user.name", e.target.value)}
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
            onChange={(e) => updateField("user.username", e.target.value)}
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
            onChange={(e) => updateField("user.email", e.target.value)}
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
            onValueChange={(value) => updateField("user.gender", value)}
            name="gender"
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent className="border-gray-200">
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
            onChange={(e) => updateField("user.password", e.target.value)}
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
            onChange={(e) =>
              updateField("user.confirm_password", e.target.value)
            }
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
            checked={payload?.user.is_active}
            onChange={(e) => updateField("user.is_active", e.target.checked)}
          ></Checkbox>
        </div>
      </div>
    </CreateModal>
  );
}
