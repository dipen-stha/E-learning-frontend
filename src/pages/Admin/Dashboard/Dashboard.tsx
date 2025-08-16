import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
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
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Activity,
  BarChart3,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your learning platform.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">2,847</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white text-gray-600 border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3 new this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white text-gray-600 border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white text-gray-600 border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Enrollments */}
        <Card className="lg:col-span-2 bg-white ">
          <CardHeader>
            <CardTitle className="text-gray-600">Recent Enrollments</CardTitle>
            <CardDescription>
              Latest student registrations and course enrollments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Student</TableHead>
                  <TableHead className="text-gray-600">Course</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-students-studying.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-600">John Doe</p>
                      <p className="text-xs text-gray-600">john@example.com</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">React Fundamentals</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">2 hours ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-students-studying.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sarah Miller</p>
                      <p className="text-xs text-gray-600">sarah@example.com</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">Advanced JavaScript</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">5 hours ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-students-studying.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mike Johnson</p>
                      <p className="text-xs text-gray-600">mike@example.com</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">Python Basics</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">1 day ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-students-studying.png" />
                      <AvatarFallback>EB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emily Brown</p>
                      <p className="text-xs text-gray-600">emily@example.com</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">UI/UX Design</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">2 days ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-white text-gray-600 border-none">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform health and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Server Status</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Database</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">CDN Status</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Degraded
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Performing Courses */}
        <Card className="bg-white text-gray-600 border-none">
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
            <CardDescription>
              Courses with highest engagement and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <BookOpen className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">React Fundamentals</p>
                    <p className="text-xs text-gray-600">
                      1,234 students enrolled
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <p className="text-xs text-gray-600">95% completion</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Python for Beginners</p>
                    <p className="text-xs text-gray-600">
                      987 students enrolled
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-xs text-gray-600">89% completion</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Advanced JavaScript</p>
                    <p className="text-xs text-gray-600">
                      756 students enrolled
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                  <p className="text-xs text-gray-600">87% completion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-white text-gray-600 border-none">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and events on your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-gray-600">
                    John Doe joined the platform
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />2 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Course completed</p>
                  <p className="text-xs text-gray-600">
                    Sarah Miller completed "React Basics"
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />5 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">New course published</p>
                  <p className="text-xs text-gray-600">
                    "Advanced TypeScript" is now live
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />1 hour ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">System maintenance</p>
                  <p className="text-xs text-gray-600">
                    Scheduled maintenance completed successfully
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />3 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-gray-600">
                    Monthly subscription from Premium User
                  </p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />5 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="default"
              className="h-20 flex-col space-y-2 bg-transparent text-gray-600"
            >
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button
              variant="default"
              className="h-20 flex-col space-y-2 bg-transparent text-gray-600"
            >
              <BookOpen className="h-6 w-6" />
              <span>Add Course</span>
            </Button>
            <Button
              variant="default"
              className="h-20 flex-col space-y-2 bg-transparent text-gray-600"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
            <Button
              variant="default"
              className="h-20 flex-col space-y-2 bg-transparent text-gray-600"
            >
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
