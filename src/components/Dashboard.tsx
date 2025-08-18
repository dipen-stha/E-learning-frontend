

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen, Clock, Award, TrendingUp, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { Badge } from "@/components/ui/Badge"
import Navigation from "@/components/Navigation"

// Mock data for courses
const latestCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    duration: "8 hours",
    rating: 4.8,
    students: 1234,
    image: "/react-course-thumbnail.png",
    price: "$89",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Chen",
    duration: "12 hours",
    rating: 4.9,
    students: 2156,
    image: "/ui-ux-course-thumbnail.png",
    price: "$79",
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Dr. Emily Rodriguez",
    duration: "15 hours",
    rating: 4.7,
    students: 3421,
    image: "/placeholder-6k3se.png",
    price: "$99",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Alex Thompson",
    duration: "6 hours",
    rating: 4.6,
    students: 987,
    image: "/digital-marketing-course-thumbnail.png",
    price: "$69",
  },
]

const enrolledCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    instructor: "John Smith",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: "Async/Await Patterns",
    image: "/javascript-course-icon.png",
  },
  {
    id: 2,
    title: "CSS Grid & Flexbox",
    instructor: "Lisa Wang",
    progress: 45,
    totalLessons: 16,
    completedLessons: 7,
    nextLesson: "Grid Template Areas",
    image: "/css-course-icon.png",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    instructor: "David Kumar",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    nextLesson: "Express Middleware",
    image: "/nodejs-course-icon.png",
  },
]

const achievements = [
  { title: "First Course Completed", icon: Award, earned: true },
  { title: "Week Streak", icon: TrendingUp, earned: true },
  { title: "Quick Learner", icon: Clock, earned: false },
  { title: "Course Creator", icon: BookOpen, earned: false },
]

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userName] = useState("Alex") // This would come from auth context

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latestCourses.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latestCourses.length) % latestCourses.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-cyan-100">
      <Navigation />

      <header className="bg-white/80 backdrop-blur-sm border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Welcome back, {userName}!
              </h1>
              <p className="text-gray-600 mt-1">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-violet-100 text-violet-700">
                <TrendingUp className="w-4 h-4 mr-1" />7 day streak
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Latest Courses Slider */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Courses</h2>
          <div className="relative">
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-violet-200">
              <CardContent className="p-0">
                <div className="relative h-80 flex items-center">
                  <div
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {latestCourses.map((course) => (
                      <div key={course.id} className="w-full flex-shrink-0 flex">
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                          <Badge className="w-fit mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">New Course</Badge>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-4">by {course.instructor}</p>
                          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </span>
                            <span>{course.students} students</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                              Enroll Now - {course.price}
                            </Button>
                            <Button
                              variant="outline"
                              className="border-violet-300 text-violet-600 hover:bg-violet-50 bg-transparent"
                            >
                              Preview
                            </Button>
                          </div>
                        </div>
                        <div className="w-1/2 p-8">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 bg-white/90 border-violet-200 hover:bg-violet-50"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 bg-white/90 border-violet-200 hover:bg-violet-50"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {latestCourses.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-gradient-to-r from-violet-600 to-cyan-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* My Courses Progress */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>
          <div className="grid gap-6">
            {enrolledCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h3>
                      <p className="text-gray-600 mb-3">by {course.instructor}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                            {course.progress}%
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Next: {course.nextLesson}</p>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats and Achievements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Learning Stats */}
          <Card className="bg-white/90 backdrop-blur-sm border-violet-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    12
                  </div>
                  <div className="text-sm text-gray-600">Courses Enrolled</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-violet-50 rounded-lg">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                    47h
                  </div>
                  <div className="text-sm text-gray-600">Hours Learned</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    3
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-violet-50 rounded-lg">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                    7
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/90 backdrop-blur-sm border-violet-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.earned
                        ? "bg-gradient-to-br from-violet-50 to-cyan-50 border-2 border-violet-200"
                        : "bg-gray-50 border-2 border-gray-200 opacity-60"
                    }`}
                  >
                    <achievement.icon
                      className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? "text-violet-600" : "text-gray-400"}`}
                    />
                    <div className={`text-sm font-medium ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                      {achievement.title}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Catalog</h3>
                <p className="text-gray-600 text-sm">Discover new courses and expand your skills</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Study Schedule</h3>
                <p className="text-gray-600 text-sm">Plan your learning time effectively</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Certificates</h3>
                <p className="text-gray-600 text-sm">View and download your achievements</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
