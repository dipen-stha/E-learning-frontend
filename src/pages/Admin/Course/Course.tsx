;

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
  BookOpen,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  Clock,
  TrendingUp,
  Play,
  Pause,
} from "lucide-react";
import { CreateModal } from "@/components/Modal";
import { CreateCourseForm } from "@/components/Admin/Course";
import { CourseData } from "@/services/types/Course";
import { useCourseStore } from "@/stores/Courses/Course";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {createCourse} = useCourseStore()
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Sarah Miller",
      instructorAvatar: "/diverse-students-studying.png",
      category: "Web Development",
      status: "Published",
      students: 1234,
      rating: 4.9,
      duration: "12 hours",
      lessons: 24,
      price: 99,
      createdDate: "2024-01-15",
      completionRate: 95,
      revenue: 122166,
    },
    {
      id: 2,
      title: "Python for Beginners",
      instructor: "Mike Johnson",
      instructorAvatar: "/diverse-students-studying.png",
      category: "Programming",
      status: "Published",
      students: 987,
      rating: 4.8,
      duration: "16 hours",
      lessons: 32,
      price: 79,
      createdDate: "2023-11-20",
      completionRate: 89,
      revenue: 77973,
    },
    {
      id: 3,
      title: "Advanced JavaScript",
      instructor: "John Doe",
      instructorAvatar: "/diverse-students-studying.png",
      category: "Web Development",
      status: "Draft",
      students: 0,
      rating: 0,
      duration: "20 hours",
      lessons: 40,
      price: 129,
      createdDate: "2024-03-01",
      completionRate: 0,
      revenue: 0,
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "Emily Brown",
      instructorAvatar: "/diverse-students-studying.png",
      category: "Design",
      status: "Published",
      students: 756,
      rating: 4.7,
      duration: "14 hours",
      lessons: 28,
      price: 89,
      createdDate: "2024-02-10",
      completionRate: 87,
      revenue: 67284,
    },
    {
      id: 5,
      title: "Data Science Basics",
      instructor: "David Wilson",
      instructorAvatar: "/diverse-students-studying.png",
      category: "Data Science",
      status: "Archived",
      students: 543,
      rating: 4.6,
      duration: "18 hours",
      lessons: 36,
      price: 109,
      createdDate: "2023-08-05",
      completionRate: 82,
      revenue: 59187,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web Development":
        return "bg-blue-100 text-blue-800";
      case "Programming":
        return "bg-purple-100 text-purple-800";
      case "Design":
        return "bg-pink-100 text-pink-800";
      case "Data Science":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateCourse = async (data: CourseData, file: File | null) => {
    try{
      await createCourse(data, file);
      setIsCreateModalOpen(false)
    } catch (error) {
      // setIsCreateModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create, edit, and manage all courses on your platform.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">156</div>
            <p className="text-xs text-gray-600">+3 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Published
            </CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">142</div>
            <p className="text-xs text-gray-600">91% of total courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">3,520</div>
            <p className="text-xs text-gray-600">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">4.7</div>
            <p className="text-xs text-gray-600">Based on 2,847 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="bg-white border-none">
        <CardHeader>
          <CardTitle className="text-gray-600">Courses</CardTitle>
          <CardDescription>
            Manage all courses, track performance, and monitor student
            engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-none">
                <DropdownMenuLabel className="text-gray-600">
                  Filter by Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("all")}
                  className="text-gray-600"
                >
                  All Courses
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("published")}
                  className="text-gray-600"
                >
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("draft")}
                  className="text-gray-600"
                >
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("archived")}
                  className="text-gray-600"
                >
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-300">
                <TableHead className="text-gray-600">Course</TableHead>
                <TableHead className="text-gray-600">Instructor</TableHead>
                <TableHead className="text-gray-600">Category</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-gray-600">Students</TableHead>
                <TableHead className="text-gray-600">Rating</TableHead>
                <TableHead className="text-gray-600">Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="border-gray-200">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {course.title}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {course.duration}
                        </span>
                        <span>{course.lessons} lessons</span>
                        <span>${course.price}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={course.instructorAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">
                        {course.instructor}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(course.category)}
                    >
                      {course.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(course.status)}
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">
                        {course.students.toLocaleString()}
                      </p>
                      {course.completionRate > 0 && (
                        <div className="space-y-1">
                          <Progress
                            value={course.completionRate}
                            className="h-1"
                          />
                          <p className="text-xs text-gray-600">
                            {course.completionRate}% completion
                          </p>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.rating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">
                          {course.rating}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No ratings</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-gray-600">
                      ${course.revenue.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-none">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Students
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {course.status === "Published" ? (
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
                          Delete Course
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
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Course"
        width="4xl"
      >
        <CreateCourseForm
          onSubmit={handleCreateCourse}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </CreateModal>
    </div>
  );
}
