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
} from "lucide-react";
import { CreateCourseForm } from "@/pages/Admin/Course/Create";
import { useCourseStore } from "@/stores/Courses/Course";
import { getStatusColor, mapStatus } from "@/services/utils/choiceUtils";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCourseDetails = useCourseStore(
    (state) => state.fetchCourseDetails
  );
  const courseDetails = useCourseStore((state) => state.courseDetails);
  const reset = useCourseStore((state) => state.reset);
  const isCourseListLoading = useCourseStore((state) => state.isListLoading);
  const paginationData = useCourseStore((state) => state.paginationData);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Information and Technology":
        return "bg-blue-100 text-blue-800";
      case "Science":
        return "bg-purple-100 text-purple-800";
      case "Maths":
        return "bg-pink-100 text-pink-800";
      case "Data Science":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateCourse = async () => {
    try {
      await fetchCourseDetails();
      setEditId(null);
      setIsModalEdit(false);
      setIsCreateModalOpen(false);
    } catch (error) {
      // setIsCreateModalOpen(true);
    }
  };

  const handleCourseEdit = (courseId: number) => {
    setIsCreateModalOpen(true);
    setIsModalEdit(true);
    setEditId(courseId);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsCreateModalOpen(false);
    setEditId(null);
  };

  useEffect(() => {
    fetchCourseDetails();
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
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-800 mt-1">
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
            <CardTitle className="text-sm font-medium text-gray-800">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">156</div>
            <p className="text-xs text-gray-800">+3 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Published
            </CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">142</div>
            <p className="text-xs text-gray-800">91% of total courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">3,520</div>
            <p className="text-xs text-gray-800">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Avg. Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">4.7</div>
            <p className="text-xs text-gray-800">Based on 2,847 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="bg-white border-none">
        <CardHeader>
          <CardTitle className="text-gray-800">Courses</CardTitle>
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
                <DropdownMenuLabel className="text-gray-800">
                  Filter by Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("all")}
                  className="text-gray-800"
                >
                  All Courses
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("published")}
                  className="text-gray-800"
                >
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("draft")}
                  className="text-gray-800"
                >
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("archived")}
                  className="text-gray-800"
                >
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table
            pagination={{
              initialPage: paginationData?.current_page as number,
              totalPages: paginationData?.total_pages as number,
            }}
          >
            <TableHeader>
              <TableRow className="border-gray-300">
                <TableHead className="text-gray-800 w-[300px]">
                  Course
                </TableHead>
                <TableHead className="text-gray-800 w-[250px]">
                  Instructor
                </TableHead>
                <TableHead className="text-gray-800 w-[300px]">
                  Category
                </TableHead>
                <TableHead className="text-gray-800">Status</TableHead>
                <TableHead className="text-gray-800">Students</TableHead>
                <TableHead className="text-gray-800">Rating</TableHead>
                <TableHead className="text-gray-800">Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody loading={isCourseListLoading} rows={5} columns={8}>
              {courseDetails.map((course) => (
                <TableRow key={course.id} className="border-gray-200">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {course.title}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-800">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {course.completion_time} minutes
                        </span>
                        <span>{course.subjects.length} lessons</span>
                        <span>${course.price}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={course.instructor?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {course.instructor?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">
                        {course.instructor?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={getCategoryColor(category.title)}
                      >
                        {category.title}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(course.status)}
                    >
                      {mapStatus(course.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">
                        {course.student_count.toLocaleString()}
                      </p>
                      {/* {course.completionRate > 0 && (
                        <div className="space-y-1">
                          <Progress
                            value={course.completionRate}
                            className="h-1"
                          />
                          <p className="text-xs text-gray-800">
                            {course.completionRate}% completion
                          </p>
                        </div>
                      )} */}
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.course_rating || 0 > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-800">
                          {course.course_rating || 0}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No ratings</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-gray-800">
                      ${course.total_revenue?.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-gray-200 bg-white"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCourseEdit(course.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Students
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* {course.status === "Published" ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Unpublish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )} */}
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

      <CreateCourseForm
        isOpen={isCreateModalOpen}
        onSubmit={handleCreateCourse}
        onCancel={handleModalClose}
        editId={editId}
        isEdit={isModalEdit}
      />
    </div>
  );
}
