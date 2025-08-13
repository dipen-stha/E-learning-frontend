"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Play, Clock, Users, Star, CheckCircle, Circle, BookOpen, Award, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { Badge } from "@/components/ui/Badge"
import Navigation from "@/components/Navigation"
import { useParams } from "react-router-dom";
import { useCourseStore } from "@/stores/Courses/Course"
import { useUserCourseStore } from "@/stores/UserCourses/UserCourse"

// Mock course data with detailed units
const courseData = {
  id: 1,
  title: "JavaScript Fundamentals",
  instructor: "John Smith",
  instructorImage: "/placeholder.svg?height=60&width=60",
  description:
    "Master the fundamentals of JavaScript programming with hands-on projects and real-world examples. This comprehensive course covers everything from basic syntax to advanced concepts like closures and async programming.",
  image: "/javascript-course-icon.png",
  duration: "24 hours",
  totalLessons: 24,
  completedLessons: 18,
  progress: 75,
  rating: 4.8,
  students: 2847,
  price: "$79",
  enrolled: true,
  units: [
    {
      id: 1,
      title: "Getting Started with JavaScript",
      lessons: 4,
      completedLessons: 4,
      duration: "2 hours",
      progress: 100,
      topics: ["Variables and Data Types", "Basic Operators", "Control Structures", "Functions Basics"],
    },
    {
      id: 2,
      title: "Working with Arrays and Objects",
      lessons: 5,
      completedLessons: 5,
      duration: "3 hours",
      progress: 100,
      topics: ["Array Methods", "Object Properties", "Destructuring", "Spread Operator", "Rest Parameters"],
    },
    {
      id: 3,
      title: "DOM Manipulation",
      lessons: 6,
      completedLessons: 4,
      duration: "4 hours",
      progress: 67,
      topics: [
        "Selecting Elements",
        "Event Listeners",
        "Creating Elements",
        "Styling with JS",
        "Form Handling",
        "Local Storage",
      ],
    },
    {
      id: 4,
      title: "Asynchronous JavaScript",
      lessons: 5,
      completedLessons: 3,
      duration: "3.5 hours",
      progress: 60,
      topics: ["Callbacks", "Promises", "Async/Await", "Fetch API", "Error Handling"],
    },
    {
      id: 5,
      title: "Advanced Concepts",
      lessons: 4,
      completedLessons: 2,
      duration: "3 hours",
      progress: 50,
      topics: ["Closures", "Prototypes", "Classes", "Modules"],
    },
  ],
  nextLesson: {
    title: "Event Delegation",
    unit: "DOM Manipulation",
    duration: "25 min",
  },
}

export default function CourseDetails() {
  const [activeUnit, setActiveUnit] = useState<number | null>(null)
  const { course_id } = useParams();
  const { fetchCourseById, courseItem} = useCourseStore();
  const { fetchUserCourseByCourse, userCourseItem } = useUserCourseStore();

  const handleBackToDashboard = () => {
    // This would handle navigation back to dashboard
    console.log("Navigate back to dashboard")
  }

  const handleStartLesson = (unitId: number) => {
    // This would handle starting a lesson
    console.log(`Starting lesson in unit ${unitId}`)
  }

  const toggleUnit = (unitId: number) => {
    setActiveUnit(activeUnit === unitId ? null : unitId)
  }

  useEffect(() => {
    if(course_id) {
      fetchCourseById(Number(course_id));
      fetchUserCourseByCourse(Number(course_id));
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-50 to-cyan-100">
      <Navigation />

      {/* Course Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">In Progress</Badge>
                <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
                  {userCourseItem?.completed_subjects}/{userCourseItem?.total_subjects} Lessons
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                {courseItem?.title}
              </h1>

              <div className="flex items-center gap-6 mb-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <img
                    src={courseData.instructorImage || "/placeholder.svg"}
                    alt={courseData.instructor}
                    className="w-8 h-8 rounded-full border-2 border-indigo-200"
                  />
                  <span>by {courseItem?.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{courseItem?.completion_time} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{courseItem?.course_rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>{courseItem?.student_count} students</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{courseItem?.description}</p>

              {/* Overall Progress */}
              <div className="bg-gradient-to-r from-white/80 to-rose-50/80 backdrop-blur-sm rounded-lg p-4 mb-6 border border-rose-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">Course Progress</span>
                  <span className="text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
                    {userCourseItem?.completion_percent}%
                  </span>
                </div>
                <Progress value={userCourseItem?.completion_percent} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">
                  Next: <span className="text-emerald-600 font-medium">{courseData.nextLesson.title}</span> in{" "}
                  {courseData.nextLesson.unit}
                </p>
              </div>
            </div>

            <div className="lg:w-1/3">
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-transparent bg-gradient-to-r from-violet-200 via-rose-200 to-cyan-200 p-0.5 rounded-lg sticky top-24">
                <div className="bg-white/95 rounded-lg">
                  <CardContent className="p-6">
                    <img
                      src={courseData.image || "/placeholder.svg"}
                      alt={courseData.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-indigo-100"
                    />
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 mb-3 shadow-lg"
                      onClick={() => handleStartLesson(3)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-gray-200 border-rose-300 text-sky-600 hover:bg-rose-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resources
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Units */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Course Content
          </h2>
          <div className="space-y-4">
            {courseData.units.map((unit, index) => (
              <Card
                key={unit.id}
                className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-cyan-50/50 transition-all duration-300"
                  onClick={() => toggleUnit(unit.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          unit.progress === 100
                            ? "bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-300"
                            : unit.progress > 50
                              ? "bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-300"
                              : "bg-gradient-to-r from-rose-100 to-rose-200 border-2 border-rose-300"
                        }`}
                      >
                        {unit.progress === 100 ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className={`w-5 h-5 ${unit.progress > 50 ? "text-amber-600" : "text-rose-500"}`} />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                          {unit.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-indigo-500" />
                            {unit.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-500" />
                            {unit.duration}
                          </span>
                          <span className="text-amber-600 font-medium">
                            {unit.completedLessons}/{unit.lessons} completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold bg-clip-text text-transparent mb-1 ${
                          unit.progress === 100
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                            : unit.progress > 50
                              ? "bg-gradient-to-r from-amber-500 to-orange-500"
                              : "bg-gradient-to-r from-rose-500 to-pink-500"
                        }`}
                      >
                        {unit.progress}%
                      </div>
                      <Progress value={unit.progress} className="w-24 h-2" />
                    </div>
                  </div>
                </CardHeader>

                {activeUnit === unit.id && (
                  <CardContent className="pt-0">
                    <div className="border-t border-gradient-to-r from-violet-100 to-cyan-100 pt-4">
                      <h4 className="font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                        Topics Covered:
                      </h4>
                      <div className="grid gap-2">
                        {unit.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                              topicIndex < unit.completedLessons
                                ? "hover:bg-emerald-50/70 border border-emerald-200/50"
                                : "hover:bg-rose-50/70 border border-rose-200/50"
                            }`}
                          >
                            {topicIndex < unit.completedLessons ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                topicIndex < unit.completedLessons ? "text-emerald-800 font-medium" : "text-gray-600"
                              }`}
                            >
                              {topic}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-indigo-100">
                        <Button
                          className={`${
                            unit.progress === 100
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                              : "bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700"
                          } shadow-lg`}
                          onClick={() => handleStartLesson(unit.id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {unit.progress === 100 ? "Review Unit" : "Continue Unit"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Course Stats */}
        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Your Progress
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center border-2 border-emerald-300">
                  <BookOpen className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  {courseData.completedLessons}
                </div>
                <div className="text-sm text-emerald-700 font-medium">Lessons Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center border-2 border-amber-300">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  18h
                </div>
                <div className="text-sm text-amber-700 font-medium">Time Invested</div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center border-2 border-rose-300">
                  <Award className="w-8 h-8 text-rose-600" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  3
                </div>
                <div className="text-sm text-rose-700 font-medium">Units Completed</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
