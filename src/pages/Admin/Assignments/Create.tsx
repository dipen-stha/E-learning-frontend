"use client";

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
import { Badge } from "@/components/ui/Badge";
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  FileText,
  BookOpen,
  Calendar,
  Target,
  Plus,
  X,
  Upload,
  PenTool,
  FolderOpen,
  HelpCircle,
} from "lucide-react";

interface CreateAssignmentFormProps {
  onSubmit: (assignmentData: any) => void;
  onCancel: () => void;
}

interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
}

export function CreateAssignmentForm({
  onSubmit,
  onCancel,
}: CreateAssignmentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    course: "",
    maxPoints: "",
    dueDate: "",
    dueTime: "",
    allowLateSubmissions: "false",
    latePenalty: "",
    instructions: "",
    submissionFormat: "",
    groupAssignment: "false",
    maxGroupSize: "",
    categories: [] as string[],
  });

  const [rubricCriteria, setRubricCriteria] = useState<RubricCriteria[]>([]);
  const [newCriteria, setNewCriteria] = useState({
    name: "",
    description: "",
    maxPoints: "",
  });
  const [attachments, setAttachments] = useState<string[]>([]);
  const [newAttachment, setNewAttachment] = useState("");

  const courseOptions = [
    { label: "React Fundamentals", value: "react-fundamentals" },
    { label: "Advanced JavaScript", value: "advanced-javascript" },
    { label: "UI/UX Design Principles", value: "ui-ux-design" },
    { label: "Data Science Basics", value: "data-science" },
    { label: "Python for Beginners", value: "python-beginners" },
  ];

  const categoryOptions = [
    { label: "Programming", value: "programming" },
    { label: "Design", value: "design" },
    { label: "Theory", value: "theory" },
    { label: "Research", value: "research" },
    { label: "Analysis", value: "analysis" },
    { label: "Creative", value: "creative" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rubricCriteria,
      attachments,
      totalPoints:
        rubricCriteria.reduce((sum, criteria) => sum + criteria.maxPoints, 0) ||
        Number.parseInt(formData.maxPoints),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addRubricCriteria = () => {
    if (newCriteria.name.trim() && newCriteria.maxPoints) {
      const criteria: RubricCriteria = {
        id: Date.now().toString(),
        name: newCriteria.name.trim(),
        description: newCriteria.description.trim(),
        maxPoints: Number.parseInt(newCriteria.maxPoints),
      };
      setRubricCriteria((prev) => [...prev, criteria]);
      setNewCriteria({ name: "", description: "", maxPoints: "" });
    }
  };

  const removeRubricCriteria = (id: string) => {
    setRubricCriteria((prev) => prev.filter((criteria) => criteria.id !== id));
  };

  const addAttachment = () => {
    if (newAttachment.trim() && !attachments.includes(newAttachment.trim())) {
      setAttachments((prev) => [...prev, newAttachment.trim()]);
      setNewAttachment("");
    }
  };

  const removeAttachment = (attachment: string) => {
    setAttachments((prev) => prev.filter((item) => item !== attachment));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "essay":
        return <PenTool className="h-5 w-5 text-purple-600" />;
      case "quiz":
        return <HelpCircle className="h-5 w-5 text-blue-600" />;
      case "project":
        return <FolderOpen className="h-5 w-5 text-green-600" />;
      case "file-submission":
        return <Upload className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <BookOpen className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">
            Basic Information
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2 space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Assignment Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-input border-border"
              placeholder="Enter assignment title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="type"
              className="text-sm font-medium text-foreground"
            >
              Assignment Type *
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essay">
                  <div className="flex items-center">
                    <PenTool className="mr-2 h-4 w-4 text-purple-600" />
                    Essay
                  </div>
                </SelectItem>
                <SelectItem value="quiz">
                  <div className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4 text-blue-600" />
                    Quiz
                  </div>
                </SelectItem>
                <SelectItem value="project">
                  <div className="flex items-center">
                    <FolderOpen className="mr-2 h-4 w-4 text-green-600" />
                    Project
                  </div>
                </SelectItem>
                <SelectItem value="file-submission">
                  <div className="flex items-center">
                    <Upload className="mr-2 h-4 w-4 text-orange-600" />
                    File Submission
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="course"
              className="text-sm font-medium text-foreground"
            >
              Course *
            </Label>
            <Select
              value={formData.course}
              onValueChange={(value) => handleInputChange("course", value)}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map((course) => (
                  <SelectItem key={course.value} value={course.value}>
                    {course.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="maxPoints"
              className="text-sm font-medium text-foreground"
            >
              Maximum Points *
            </Label>
            <Input
              id="maxPoints"
              type="number"
              value={formData.maxPoints}
              onChange={(e) => handleInputChange("maxPoints", e.target.value)}
              className="bg-input border-border"
              placeholder="e.g., 100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Categories
            </Label>
            <MultiSelect
              options={categoryOptions}
              //   value={formData.categories}
              //   onChange={(categories) => handleInputChange("categories", categories.join(","))}
              placeholder="Select categories..."
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-input border-border"
              rows={3}
              placeholder="Brief description of the assignment..."
            />
          </div>
        </div>
      </div>

      {/* Due Date & Settings Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Calendar className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">
            Due Date & Settings
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="dueDate"
              className="text-sm font-medium text-foreground"
            >
              Due Date *
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="dueTime"
              className="text-sm font-medium text-foreground"
            >
              Due Time
            </Label>
            <Input
              id="dueTime"
              type="time"
              value={formData.dueTime}
              onChange={(e) => handleInputChange("dueTime", e.target.value)}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="allowLateSubmissions"
              className="text-sm font-medium text-foreground"
            >
              Late Submissions
            </Label>
            <Select
              value={formData.allowLateSubmissions}
              onValueChange={(value) =>
                handleInputChange("allowLateSubmissions", value)
              }
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Not Allowed</SelectItem>
                <SelectItem value="true">Allow with Penalty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.allowLateSubmissions === "true" && (
            <div className="space-y-2">
              <Label
                htmlFor="latePenalty"
                className="text-sm font-medium text-foreground"
              >
                Late Penalty (% per day)
              </Label>
              <Input
                id="latePenalty"
                type="number"
                value={formData.latePenalty}
                onChange={(e) =>
                  handleInputChange("latePenalty", e.target.value)
                }
                className="bg-input border-border"
                placeholder="e.g., 10"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="submissionFormat"
              className="text-sm font-medium text-foreground"
            >
              Submission Format
            </Label>
            <Select
              value={formData.submissionFormat}
              onValueChange={(value) =>
                handleInputChange("submissionFormat", value)
              }
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Entry</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
                <SelectItem value="both">Text + File Upload</SelectItem>
                <SelectItem value="url">Website URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="groupAssignment"
              className="text-sm font-medium text-foreground"
            >
              Group Assignment
            </Label>
            <Select
              value={formData.groupAssignment}
              onValueChange={(value) =>
                handleInputChange("groupAssignment", value)
              }
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Individual</SelectItem>
                <SelectItem value="true">Group Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.groupAssignment === "true" && (
            <div className="space-y-2">
              <Label
                htmlFor="maxGroupSize"
                className="text-sm font-medium text-foreground"
              >
                Maximum Group Size
              </Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={formData.maxGroupSize}
                onChange={(e) =>
                  handleInputChange("maxGroupSize", e.target.value)
                }
                className="bg-input border-border"
                placeholder="e.g., 4"
              />
            </div>
          )}
        </div>
      </div>

      {/* Instructions Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <FileText className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">
            Instructions & Resources
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="instructions"
              className="text-sm font-medium text-foreground"
            >
              Detailed Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) =>
                handleInputChange("instructions", e.target.value)
              }
              className="bg-input border-border"
              rows={6}
              placeholder="Provide detailed instructions for students..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Resource Attachments
            </Label>
            <div className="flex space-x-2">
              <Input
                value={newAttachment}
                onChange={(e) => setNewAttachment(e.target.value)}
                className="bg-input border-border"
                placeholder="Add resource link or file name"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAttachment())
                }
              />
              <Button
                type="button"
                onClick={addAttachment}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((attachment) => (
                  <Badge
                    key={attachment}
                    variant="secondary"
                    className="bg-muted text-muted-foreground"
                  >
                    {attachment}
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grading Rubric Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Target className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">
            Grading Rubric
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Criteria Name
              </Label>
              <Input
                value={newCriteria.name}
                onChange={(e) =>
                  setNewCriteria((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-input border-border"
                placeholder="e.g., Content Quality"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Description
              </Label>
              <Input
                value={newCriteria.description}
                onChange={(e) =>
                  setNewCriteria((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-input border-border"
                placeholder="Brief description"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Max Points
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={newCriteria.maxPoints}
                  onChange={(e) =>
                    setNewCriteria((prev) => ({
                      ...prev,
                      maxPoints: e.target.value,
                    }))
                  }
                  className="bg-input border-border"
                  placeholder="Points"
                />
                <Button
                  type="button"
                  onClick={addRubricCriteria}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {rubricCriteria.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Rubric Criteria
              </Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {rubricCriteria.map((criteria) => (
                  <div
                    key={criteria.id}
                    className="flex items-center justify-between bg-card p-3 rounded border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-card-foreground">
                          {criteria.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-accent border-accent"
                        >
                          {criteria.maxPoints} pts
                        </Badge>
                      </div>
                      {criteria.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {criteria.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRubricCriteria(criteria.id)}
                      className="text-muted-foreground hover:text-destructive ml-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Points:{" "}
                {rubricCriteria.reduce(
                  (sum, criteria) => sum + criteria.maxPoints,
                  0
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Create Assignment
        </Button>
      </div>
    </form>
  );
}
