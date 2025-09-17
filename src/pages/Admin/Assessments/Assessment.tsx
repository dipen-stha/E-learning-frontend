"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
import { CreateAssignmentForm } from "./Create";
import {
  Search,
  Plus,
  User,
  Check,
  X,
  FileText,
  Upload,
  MoreHorizontal,
} from "lucide-react";
import { useAssessmentStore } from "@/stores/Assessment/Assessment";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import Preview from "./Preview";

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalPreview, setIsmodalPreview] = useState<boolean>(false);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const fetchAssessmentList = useAssessmentStore((state) => state.fetchAssessmentList)
  const assessmentList = useAssessmentStore((state) => state.assessmentDetails)
  const isListLoading = useAssessmentStore((state) => state.isListLoading)


  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Text":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Project":
        return "bg-green-100 text-green-800 border-green-200";
      case "File Submission":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };


  const handleAssessmentEdit = (id: number) => {
    setIsModalEdit(true);
    setEditId(id)
    setIsCreateModalOpen(true);
  }

  const handleSubmitModal = async () => {
    await fetchAssessmentList();
    setIsCreateModalOpen(false);
    setIsModalEdit(false);
    setEditId(null)
  };

  const handleModalClose = async() => {
    setIsCreateModalOpen(false)
    setIsModalEdit(false);
    setEditId(null)
    setPreviewId(null);
    setIsmodalPreview(false);
  }

  const handlePreviewClick = (assessmentId: number) => {
    setPreviewId(assessmentId);
    setIsmodalPreview(true);
  }

  useEffect(() => {
    fetchAssessmentList();
  }, [])

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
                <TableHead className="text-gray-600">Subject</TableHead>

                {/* <TableHead className="text-gray-600">Due Date</TableHead> */}
                {/* <TableHead className="text-gray-600">Status</TableHead> */}
                {/* <TableHead className="text-gray-600">Progress</TableHead> */}
                {/* <TableHead className="text-gray-600">Avg. Grade</TableHead> */}
                <TableHead className="text-right text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody loading={isListLoading} rows={5} columns={5}>
              {assessmentList.map((assessment) => (
                <TableRow key={assessment.id} className="border-gray-200">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {assessment.title}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{assessment.max_points} points</span>
                        <span>•</span>
                        <span>{assessment.pass_points}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-[5px]">
                      <Badge variant="outline" className="border-none">
                        
                    <Icon
                      name={assessment.assessment_type.icon}
                      className={getTypeColor(assessment.assessment_type.icon)}
                    />
                      {assessment.assessment_type.title}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        {assessment.course.title}
                      </p>
                      {/* <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={
                              assessment.instructorAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback className="text-xs">
                            {assessment.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">
                          {assessment.instructor}
                        </span>
                      </div> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        {assessment.subject.title}
                      </p>

                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-900">
                        {assessment.dueDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(assessment.status)}
                    >
                      {assessment.status}
                    </Badge>
                  </TableCell> */}
                  {/* <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-900">
                          {assessment.submissions}/{assessment.totalStudents}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full"
                          style={{
                            width: `${getSubmissionProgress(
                              assessment.submissions,
                              assessment.totalStudents
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell> */}
                  {/* <TableCell>
                    {assessment.avgGrade ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {assessment.avgGrade}%
                        </span>
                        {assessment.avgGrade >= 90 ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : assessment.avgGrade >= 70 ? (
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
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
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
                        <DropdownMenuItem className="text-gray-900" onClick={() => handlePreviewClick(assessment.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Preview Assessment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-900" onClick={() => handleAssessmentEdit(assessment.id)}>
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

        <CreateAssignmentForm
          isOpen={isCreateModalOpen}
          onSubmit={handleSubmitModal}
          onCancel={handleModalClose}
          isEdit={isModalEdit}
          editId={editId}
        />
        <Preview isOpen={isModalPreview} previewId={previewId} onCancel={handleModalClose}/>
    </div>
  );
}
