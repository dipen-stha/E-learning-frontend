import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { useUserStore } from "@/stores/User/User";
import { useUserCourseStore } from "@/stores/UserCourses/UserCourse";
import { useCourseStore } from "@/stores/Courses/Course";
import { Link } from "react-router";

// Mock data for courses

const achievements = [
  { title: "First Course Completed", icon: Award, earned: true },
  { title: "Week Streak", icon: TrendingUp, earned: true },
  { title: "Quick Learner", icon: Clock, earned: false },
  { title: "Course Creator", icon: BookOpen, earned: false },
];

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { userDetail } = useUserStore();
  const {
    fetchUserCourseDetails,
    fetchUserCourseStats,
    userCourseDetails,
    userCourseStats,
  } = useUserCourseStore();
  const { fetchCourseDetails, courseDetails } = useCourseStore();
  const userName = userDetail?.profile.name;
  const userId = userDetail?.id;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courseDetails.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + courseDetails.length) % courseDetails.length
    );
  };

  useEffect(() => {
    if (userId) {
      fetchUserCourseDetails(userId);
      fetchUserCourseStats(userId);
    }
    fetchCourseDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-cyan-100">

      <header className="bg-white/80 backdrop-blur-sm border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Welcome back, {userName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-violet-100 text-violet-700"
              >
                <TrendingUp className="w-4 h-4 mr-1" />7 day streak
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Latest Courses Slider */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Latest Courses
          </h2>
          <div className="relative">
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-violet-200">
              <CardContent className="p-0">
                <div className="relative h-80 flex items-center">
                  <div
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {courseDetails.map((course) => (
                      <div
                        key={`${course.id}`}
                        className="w-full flex-shrink-0 flex"
                      >
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                          <Badge className="w-fit mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
                            New Course
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            by {`${course.instructor?.name}`}
                          </p>
                          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {`${course.completion_time} hours`}
                            </span>
                            <span className="flex items-center gap-1">
                              {course.course_rating ? (
                                <>
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  {`${course.course_rating}`}
                                </>
                              ) : (
                                `Not Rated`
                              )}
                            </span>
                            <span>{`${course.student_count}`} students</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Link to={`/course-detail/${course.id}`}>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                              {`Enroll Now - $${course.price}`}
                            </Button>
                            </Link>
                            <Button
                              // variant="link"
                              className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700"
                            >
                              Preview
                            </Button>
                          </div>
                        </div>
                        <div className="w-1/2 p-8">
                          <img
                            src={course.image_url || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <Button
                    size="icon"
                    className="absolute left-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg cursor-pointer"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="absolute right-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg cursor-pointer"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {courseDetails.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600"
                      : "bg-gray-300"
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
            {userCourseDetails.map((userCourse, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={userCourse.course.image_url || "/placeholder.svg"}
                      alt={userCourse.course.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        <Link to={`/course-detail/${userCourse.course.id}`}>
                          {userCourse.course.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3">
                        by {userCourse.course.instructor?.name}
                      </p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>
                              {userCourse.completed_subjects}/
                              {userCourse.total_subjects} lessons
                            </span>
                          </div>
                          <Progress
                            value={userCourse.completion_percent}
                            className="h-2"
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                            {userCourse.completion_percent}%
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Next: {userCourse.next_subject}
                      </p>
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
              <CardTitle className="text-xl font-semibold text-gray-800">
                Learning Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    {userCourseStats?.courses_enrolled}
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
                    {userCourseStats?.completed_courses}
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
              <CardTitle className="text-xl font-semibold text-gray-800">
                Achievements
              </CardTitle>
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
                      className={`w-8 h-8 mx-auto mb-2 ${
                        achievement.earned ? "text-violet-600" : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        achievement.earned ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Browse Catalog
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover new courses and expand your skills
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Study Schedule
                </h3>
                <p className="text-gray-600 text-sm">
                  Plan your learning time effectively
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-violet-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Certificates
                </h3>
                <p className="text-gray-600 text-sm">
                  View and download your achievements
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
