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
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Download,
  Calendar,
} from "lucide-react";
import { CreateUserForm } from "@/components/Admin/User";
import { useUserStore } from "@/stores/User/User";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createUser = useUserStore(state => state.createUser)
  const fetchStudents = useUserStore(state => state.fetchStudents)
  const userDetailList = useUserStore(state => state.userDetailList)
  const fetchStudentStats = useUserStore(state => state.fetchStudentStats)
  const userStats = useUserStore(state => state.userStats)

  useEffect(() => {
    fetchStudents();
    fetchStudentStats();
  }, [])

  // useEffect(() => {
  //   return(() => {
  //     reset();
  //   }) 
  // },[reset])

  const getStatusColor = (status: boolean) => {
    if(status) {
      return "bg-green-100 text-green-800"
    } else {
      return "bg-gray-100 text-gray-800"
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Instructor":
        return "bg-blue-100 text-blue-800";
      case "Student":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateUser =  async () => {
    try{
      await createUser()
      await fetchStudents();
      setIsCreateModalOpen(false);
    } catch {
      console.log('error')
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage users, roles, and permissions across your platform.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-gray-300 hover:bg-gray-500 border-gray-200 text-gray-800 hover:text-gray-200">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{userStats.total_count}</div>
            <p className="text-xs text-green-600">+{userStats.percent_total_count}% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{userStats.active_count}</div>
            <p className="text-xs text-green-600">{userStats.percent_active_count}% of total users</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              New This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{userStats.monthly_creation}</div>
            <p className="text-xs text-green-600">+{userStats.percent_monthly_creation}% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Suspended
            </CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{userStats.suspended_count}</div>
            <p className="text-xs text-green-600">{userStats.percent_suspended_count}% of total users</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border-none">
        <CardHeader>
          <CardTitle className="text-gray-600">Users</CardTitle>
          <CardDescription>
            A list of all users in your platform including their role and
            status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
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
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel className="text-gray-600">
                  Filter by Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-gray-600"
                  onClick={() => ""}
                >
                  All Users
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-600"
                  onClick={() => ""}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-600"
                  onClick={() => ""}
                >
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-600"
                  onClick={() => ""}
                >
                  Suspended
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-600">User</TableHead>
                <TableHead className="text-gray-600">Role</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-gray-600">Courses</TableHead>
                <TableHead className="text-gray-600">Join Date</TableHead>
                <TableHead className="text-gray-600">Last Logged In</TableHead>
                <TableHead className="text-right text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userDetailList.map((user) => (
                <TableRow key={user.id} className="border-gray-200">
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.profile.name}
                      </p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getRoleColor(user.profile.role)}
                    >
                      {user.profile.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(user.is_active)}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      <p>{user.total_courses} enrolled</p>
                      <p className="text-xs text-gray-600">
                        {user.courses_completed} completed
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.joined_date}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.last_login}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-600"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white border-gray-100"
                      >
                        <DropdownMenuLabel className="text-gray-600">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-gray-600">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-600">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-600">
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
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

      {/* Create User Modal */}

        <CreateUserForm
          isOpen={isCreateModalOpen}
          onSubmit={handleCreateUser}
          onCancel={() => setIsCreateModalOpen(false)}
        />
    </div>
  );
}
