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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
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
import { CreateContentForm } from "@/pages/Admin/Content/UnitContents/Create";
import {
  BookOpen,
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
  FileText,
  Video,
  CheckCircle,
  Circle,
  Image,
} from "lucide-react";
import { useUnitContentStore } from "@/stores/Courses/Content";
import { ContentType, getStatusColor, getTypeColor, mapChoice, Status } from "@/services/utils/choiceUtils";

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const fetchAllContents = useUnitContentStore((state) => state.fetchAllContents)
  const contentList = useUnitContentStore((state) => state.contentsList)

  const courses = [
    { id: 1, title: "React Fundamentals" },
    { id: 2, title: "Python for Beginners" },
    { id: 3, title: "Advanced JavaScript" },
    { id: 4, title: "UI/UX Design Principles" },
    { id: 5, title: "Data Science Basics" },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video className="h-4 w-4 text-blue-600" />;
      case "PDF":
        return <FileText className="h-4 w-4 text-purple-600" />;
      default:
        return <Image className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleModalSubmit = async () => {
    // Here you would typically make an API call to create the unit
      setIsModalEdit(false);
      setEditId(null);
      setIsCreateModalOpen(false);
      fetchAllContents();
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsModalEdit(false);
    setEditId(null);
  };

  const handleContentEdit = (contentId: number) => {
    setIsCreateModalOpen(true);
    setIsModalEdit(true);
    setEditId(contentId);
  }

  useEffect(() => {
    fetchAllContents();
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contents Management</h1>
          <p className="text-gray-600 mt-1">
            Manage Units Contents
          </p>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-600">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Units
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">298</div>
            <p className="text-xs text-gray-600">87% of total units</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Units</CardTitle>
            <Circle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44</div>
            <p className="text-xs text-gray-600">13% pending review</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-gray-600">Across all units</p>
          </CardContent>
        </Card>
      </div>

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

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-200">
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
                <TableHead>Instructor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead>Students</TableHead> */}
                {/* <TableHead>Completion</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentList && contentList.map((content) => (
                <TableRow key={content.id} className="border-gray-200">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                        {content.order}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {content.title}
                        </p>
                        <p className="text-xs text-gray-600 max-w-xs truncate">
                          {content.description}
                        </p>
                        {content.completion_time && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="mr-1 h-3 w-3" />
                            {content.completion_time} minutes
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-gray-900">
                      {content.course.title}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={content.instructor?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {content.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">
                        {content.instructor.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(content.content_type)}
                      <Badge
                        variant="secondary"
                        className={getTypeColor(content.content_type)}
                      >
                        {mapChoice(content.content_type, ContentType)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(content.status)}
                    >
                      {mapChoice(content.status, Status)}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <p className="text-sm font-medium">
                      {content.students.toLocaleString()}
                    </p>
                  </TableCell> */}
                  {/* <TableCell>
                    {content.completionRate > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{content.completionRate}%</span>
                        </div>
                        <Progress
                          value={content.completionRate}
                          className="h-1 w-16"
                        />
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
                      <DropdownMenuContent align="end" className="border-gray-200">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview Unit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContentEdit(content.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Unit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {content.status === "Published" ? (
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
                          Delete Unit
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
      <CreateContentForm
        isOpen={isCreateModalOpen}
        onSubmit={handleModalSubmit}
        onCancel={handleModalClose}
        editId={editId}
        isEdit={isModalEdit}
      />
    </div>
  );
}
