"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";
import { CreateModal } from "@/components/Modal";
import { CreateAssignmentForm } from "./Create";
import {
  Search,
  Plus,
  User,
  Calendar,
  Check,
  X,
  FileText,
  Upload,
} from "lucide-react";

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const assignments = [
    {
      id: 1,
      title: "React Component Architecture Essay",
      type: "Essay",
      course: "React Fundamentals",
      instructor: "Sarah Miller",
      instructorAvatar: "/diverse-students-studying.png",
      dueDate: "2024-04-15",
      status: "Active",
      submissions: 23,
      totalStudents: 30,
      avgGrade: 85,
      maxPoints: 100,
      createdDate: "2024-03-01",
    },
    {
      id: 2,
      title: "JavaScript ES6 Quiz",
      type: "Quiz",
      course: "Advanced JavaScript",
      instructor: "John Doe",
      instructorAvatar: "/diverse-students-studying.png",
      dueDate: "2024-04-20",
      status: "Draft",
      submissions: 0,
      totalStudents: 25,
      avgGrade: null,
      maxPoints: 50,
      createdDate: "2024-03-15",
    },
    {
      id: 3,
      title: "Portfolio Website Project",
      type: "Project",
      course: "UI/UX Design Principles",
      instructor: "Emily Brown",
      instructorAvatar: "/diverse-students-studying.png",
      dueDate: "2024-04-10",
      status: "Grading",
      submissions: 18,
      totalStudents: 20,
      avgGrade: 92,
      maxPoints: 150,
      createdDate: "2024-02-20",
    },
    {
      id: 4,
      title: "Data Analysis Report",
      type: "File Submission",
      course: "Data Science Basics",
      instructor: "David Wilson",
      instructorAvatar: "/diverse-students-studying.png",
      dueDate: "2024-03-30",
      status: "Completed",
      submissions: 22,
      totalStudents: 22,
      avgGrade: 88,
      maxPoints: 100,
      createdDate: "2024-02-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Grading":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Essay":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Quiz":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Project":
        return "bg-green-100 text-green-800 border-green-200";
      case "File Submission":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSubmissionProgress = (submissions: number, total: number) => {
    const percentage = (submissions / total) * 100;
    return Math.round(percentage);
  };

  const handleCreateAssignment = (assignmentData: any) => {
    console.log("Creating assignment:", assignmentData);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Assignment Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create, track, and grade assignments across all courses.
          </p>
        </div>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Assignments
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <p className="text-xs text-gray-600">+12 created this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Active Assignments
            </CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">34</div>
            <p className="text-xs text-gray-600">26.8% of total assignments</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Pending Grading
            </CardTitle>
            <Upload className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-gray-600">156 submissions to review</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Avg. Grade
            </CardTitle>
            <Plus className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87.5%</div>
            <p className="text-xs text-gray-600">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Table */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Assignments</CardTitle>
          <CardDescription className="text-gray-600">
            Manage assignments, track submissions, and monitor student progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="react-fundamentals">
                  React Fundamentals
                </SelectItem>
                <SelectItem value="advanced-javascript">
                  Advanced JavaScript
                </SelectItem>
                <SelectItem value="ui-ux-design">
                  UI/UX Design Principles
                </SelectItem>
                <SelectItem value="data-science">
                  Data Science Basics
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 bg-white border-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="grading">Grading</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-600">Assignment</TableHead>
                <TableHead className="text-gray-600">Type</TableHead>
                <TableHead className="text-gray-600">Course</TableHead>
                <TableHead className="text-gray-600">Due Date</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-gray-600">Progress</TableHead>
                <TableHead className="text-gray-600">Avg. Grade</TableHead>
                <TableHead className="text-right text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id} className="border-gray-200">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {assignment.title}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{assignment.maxPoints} points</span>
                        <span>•</span>
                        <span>Created {assignment.createdDate}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getTypeColor(assignment.type)}
                    >
                      {assignment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        {assignment.course}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={
                              assignment.instructorAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback className="text-xs">
                            {assignment.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">
                          {assignment.instructor}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-900">
                        {assignment.dueDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(assignment.status)}
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-900">
                          {assignment.submissions}/{assignment.totalStudents}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full"
                          style={{
                            width: `${getSubmissionProgress(
                              assignment.submissions,
                              assignment.totalStudents
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {assignment.avgGrade ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {assignment.avgGrade}%
                        </span>
                        {assignment.avgGrade >= 90 ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : assignment.avgGrade >= 70 ? (
                          <Plus className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-600">
                        No grades yet
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white border-gray-200"
                      >
                        <DropdownMenuLabel className="text-gray-900">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="text-gray-900">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-900">
                          <Upload className="mr-2 h-4 w-4" />
                          Edit Assignment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-900">
                          <User className="mr-2 h-4 w-4" />
                          View Submissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateModal
        isOpen={isCreateModalOpen}
        actions={[]}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Assignment"
        width="3xl"
      >
        <CreateAssignmentForm
          onSubmit={handleCreateAssignment}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </CreateModal>
    </div>
  );
}
