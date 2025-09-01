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
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CreateUnitForm } from "@/pages/Admin/Content/Units/Create";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Clock,
  Play,
  Pause,
} from "lucide-react";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { getStatusColor, mapStatus } from "@/services/utils/choiceUtils";
import { useCourseStore } from "@/stores/Courses/Course";
import { useUnitStore } from "@/stores/Unit/Unit";

export default function UnitContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createUnit = useUnitStore((state) => state.createUnit);
  const fetchAllUnits = useUnitStore((state) => state.fetchAllUnits);
  const unitDetailList = useUnitStore((state) => state.unitListDetails);
  // const fetchSubjectsByCourse = useUnitStore(state => state.fetchSubjectsByCourse)
  const isUnitLoading = useUnitStore((state) => state.isLoading);
  const resetPayload = useUnitStore((state) => state.resetPayload)
  const courseMinimal = useCourseStore((state) => state.courseMinimal);
  const fetchCourseMinimal = useCourseStore((state) => state.fetchMinimal);
  const fetchSubjectMinimal = useSubjectStore(
    (state) => state.fetchSubjectMinimal
  );
  const subjectMinimal = useSubjectStore((state) => state.subjectMinimalList);
  const reset = useUnitStore((state) => state.reset);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId);
    fetchSubjectMinimal(Number(courseId));
    // fetchSubjectsByCourse(Number(courseId));
  };

  const handleModalClose = () => {
    resetPayload();
    setIsCreateModalOpen(false);
  }

  const handleCreateUnit = async () => {
    try {
      await createUnit();
      setIsCreateModalOpen(false);
      await fetchAllUnits();
    } catch {}
  };

  const handleSubjectChanage = (value: any) => {
    setSelectedSubject(value)
  };

  useEffect(() => {
    fetchAllUnits();
    fetchCourseMinimal();
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Units Management</h1>
          <p className="text-gray-600 mt-1">Manage subject units.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Mode
          </Button>
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Unit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-600">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Subjects</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">298</div>
            <p className="text-xs text-gray-600">87% of total subjects</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Subjects</CardTitle>
            <Circle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44</div>
            <p className="text-xs text-gray-600">13% pending review</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-gray-600">Across all subjects</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Units Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Course Units</CardTitle>
          <CardDescription>
            Manage individual units and lessons within your courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>

            <Select value={selectedCourse} onValueChange={handleCourseChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="all">All Courses</SelectItem>
                {courseMinimal.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={handleSubjectChanage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                {subjectMinimal.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 shadow-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-200">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedStatus("published")}
                >
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("draft")}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("archived")}>
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead>Unit</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Subject</TableHead>
                {/* <TableHead>Instructor</TableHead> */}
                {/* <TableHead>Type</TableHead> */}
                <TableHead>Status</TableHead>
                {/* <TableHead>Students</TableHead> */}
                {/* <TableHead>Completion</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {isUnitLoading ? (
              <TableBody>
                <TableRow>
                  <td>Loading.... </td>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {unitDetailList &&
                  unitDetailList?.map((unit) => (
                    <TableRow key={unit.id} className="border-gray-200">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                            {unit.order}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                              {unit.title}
                            </p>
                            <p className="text-xs text-gray-600 max-w-xs truncate">
                              {unit.description}
                            </p>
                            {unit.completion_time && (
                              <div className="flex items-center text-xs text-gray-600">
                                <Clock className="mr-1 h-3 w-3" />
                                {unit.completion_time}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-gray-900">{`${unit.course}`}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-gray-900">{`${unit.subject}`}</p>
                      </TableCell>
                      {/* <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={unit.instructor?.name || "/placeholder.svg"} />
                        <AvatarFallback>
                          {unit.instructor?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{unit.instructor?.name}</span>
                    </div>
                  </TableCell> */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(unit.status)}
                        >
                          {mapStatus(unit.status)}
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                    <p className="text-sm font-medium">{unit.student_count.toLocaleString()}</p>
                  </TableCell> */}
                      {/* <TableCell>
                    {unit.completionRate > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{unit.completionRate}%</span>
                        </div>
                        <Progress value={unit.completionRate} className="h-1 w-16" />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No data</span>
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview unit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit unit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {unit.status === "Published" ? (
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Unpublish
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Publish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete unit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>

      <CreateUnitForm
        isOpen={isCreateModalOpen}
        onSubmit={handleCreateUnit}
        onCancel={handleModalClose}
      />
    </div>
  );
}
