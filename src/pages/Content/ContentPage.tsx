import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  ImageIcon,
  Video,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  ChevronDown,
  CirclePlay,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { useSubjectStore } from "@/stores/Subjects/Subjects";
import { ContentType, mapChoice } from "@/services/utils/choiceUtils";
import { useUserSubjectStore } from "@/stores/UserSubject/UserSubject";
import { useUserUnitStore } from "@/stores/UserUnit/UserUnit";
import { useUserContentStore } from "@/stores/UserContent/UserContent";
import { ContentTypeRender } from "./ContentType";
import { useUserGamificationStore } from "@/stores/Gamification/UserGamification";

export default function LessonContent() {
  const [currentPage, setCurrentPage] = useState(0); // 0 for header page, 1 for content page
  const [activeSection, setActiveSection] = useState(1);
  const [focusedContentId, setFocusedContentId] = useState<number | null>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { subject_id } = useParams();

  const fetchSubjectById = useSubjectStore((state) => state.fetchSubjectById);
  const subjectItem = useSubjectStore((state) => state.subjectItem);
  const fetchUserSubjectStats = useUserSubjectStore(
    (state) => state.fetchUserSubjectStats
  );
  const userSubjectStats = useUserSubjectStore(
    (state) => state.userSubjectStatus
  );

  const fetchUserUnitBySubject = useUserUnitStore(
    (state) => state.fetchUserUnitBySubject
  );

  const userContentCreate = useUserContentStore(
    (state) => state.userContentCreate
  );
  const updateUserContentStatus = useUserContentStore(
    (state) => state.updateUserContentStatus
  );
  const setUserContentUpdatePayload = useUserContentStore(
    (state) => state.setUpdatePayload
  );
  const resetPayload = useUserContentStore((state) => state.resetPayload);

  const userUnitStatus = useUserUnitStore((state) => state.userUnitStatus);

  const createUpdateUserStreak = useUserGamificationStore((state) => state.userStreakCreateUpdate)

  const handleBackToCourse = () => {
    console.log("Navigate back to course");
    navigate(`/course-detail/${subjectItem?.course.id}`);
  };

  const handleUnitButtonClicked = async (unitId: number, contentId: number) => {
    let status = checkuserContentStatus(unitId, contentId);
    if (status === "COMPLETED") {
    } else if (status === "NOT_STARTED") {
      try {
        await userContentCreate(contentId);
        setFocusedContentId(contentId);
        await fetchUserUnitBySubject(Number(subject_id));
      } catch {
        console.log("Error starting the unit");
      }
    } else if (status === "IN_PROGRESS") {
      const payload = {
        content_id: contentId,
        status: "COMPLETED",
      };
      setUserContentUpdatePayload(payload);
      await updateUserContentStatus();
      await createUpdateUserStreak();
      resetPayload();
      await fetchUserUnitBySubject(Number(subject_id));
      await fetchUserSubjectStats(Number(subject_id));
    }
  };

  const scrollToContent = () => {
    setCurrentPage(1);
  };

  const scrollToHeader = () => {
    setCurrentPage(0);
  };

  // const checkUserUnitStatus = (unitId: number) => {
  //   return userUnitStatus.find((item) => item.unit_id === unitId)?.status
  // }

  const checkuserContentStatus = (unitId: number, contentId: number) => {
    if (userUnitStatus.length > 0) {
      let unit = userUnitStatus.find((item) => item.unit_id === unitId);
      if (!unit || !unit.contents) return "NOT_STARTED";
      if (unit.contents.length === 0) return "NOT_STARTED";
      const status = unit.contents?.find(
        (content) => content.content_id === contentId
      )?.status;
      return status ?? "NOT_STARTED";
    }
    return "NOT_STARTED";
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mainContainerRef.current) return;

      const target = e.target as HTMLElement;
      const isInContentArea = scrollContainerRef.current?.contains(target);
      if (isInContentArea) {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && e.deltaY < 0 && scrollContainer.scrollTop <= 5) {
          // At top of content and scrolling up - switch to header page
          e.preventDefault();
          setCurrentPage(0);
          return;
        }
        // Allow normal scrolling within content area
        return;
      }

      if (e.deltaY > 0 && currentPage === 0) {
        // Scrolling down from header page
        e.preventDefault();
        setCurrentPage(1);
      } else if (e.deltaY < 0 && currentPage === 1) {
        // Scrolling up from content page - only if at top of content
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && scrollContainer.scrollTop <= 10) {
          e.preventDefault();
          setCurrentPage(0);
        }
      }
    };

    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [currentPage]);

  const filterUnit = (unitId: number) => {
    return userUnitStatus.find((unit) => unit.unit_id === unitId);
  };

  useEffect(() => {
    fetchSubjectById(Number(subject_id));
    fetchUserSubjectStats(Number(subject_id));
    fetchUserUnitBySubject(Number(subject_id));
  }, []);

  useEffect(() => {
    if (currentPage !== 1) return;

    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      let newActiveSection = activeSection;
      let units = subjectItem?.units;
      // Find which section is most visible
      if (units)
        for (const section of units) {
          const element = contentRefs.current[section.id];
          if (!element) continue;

          const elementTop = element.offsetTop - scrollContainer.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          // Check if section is in viewport
          if (
            elementTop <= scrollTop + containerHeight / 2 &&
            elementBottom > scrollTop + containerHeight / 2
          ) {
            newActiveSection = section.id;
            break;
          }
        }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [activeSection, currentPage]);

  const handleSectionClick = (sectionId: number) => {
    setActiveSection(sectionId);
    const element = contentRefs.current[sectionId];
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elementTop = element.offsetTop - container.offsetTop - 20;

      container.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video className="w-4 h-4" />;
      case "TEXT":
        return <FileText className="w-4 h-4" />;
      case "CODE":
        return <BookOpen className="w-4 h-4" />;
      case "IMAGE":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div
      ref={mainContainerRef}
      className="h-screen overflow-hidden bg-gradient-to-br from-violet-100 to-cyan-100"
    >
      <div className="relative h-full">
        {/* Header Page */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            currentPage === 0 ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="h-[90%] flex flex-col ">
            <header className="bg-white/80 backdrop-blur-sm border-b border-violet-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToCourse}
                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course
                  </Button>
                  <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">
                    {subjectItem?.title}
                  </Badge>
                </div>
              </div>
            </header>

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  {subjectItem?.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Part of{" "}
                  <span className="font-medium">{`${subjectItem?.course.title}`}</span>
                </p>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-violet-200 mb-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-gray-800">
                      Lesson Progress
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                      {userSubjectStats?.completion_percent}%
                    </span>
                  </div>
                  <Progress
                    value={userSubjectStats?.completion_percent}
                    className="h-3 mb-4"
                  />
                  <p className="text-gray-600">
                    {userSubjectStats?.completed_units} of{" "}
                    {userSubjectStats?.total_units} sections completed •{" "}
                    {subjectItem?.completion_time} hours
                  </p>
                </div>

                <Button
                  onClick={scrollToContent}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-lg px-8 py-4 rounded-xl"
                >
                  Start Learning
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Scroll down to begin</p>
              <ChevronDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Content Page */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            currentPage === 1 ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm border-b border-violet-200 flex-shrink-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={scrollToHeader}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Overview
                    </Button>
                    <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">
                      {subjectItem?.title}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    {subjectItem?.title}
                  </h2>
                </div>
              </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-0">
              <div className="flex gap-8 h-full">
                <div className="w-80 flex-shrink-0">
                  <Card className="bg-white/90 backdrop-blur-sm border-violet-200 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                        Lesson Sections
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 overflow-y-auto max-h-[calc(100%-80px)]">
                      {subjectItem?.units?.map((section) => (
                        <div
                          key={section.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
                            activeSection === section.id
                              ? "bg-gradient-to-r from-violet-50 to-cyan-50 border-2 border-violet-200 scale-[1.02] shadow-md"
                              : "hover:bg-violet-50/50 border border-transparent hover:scale-[1.01] hover:shadow-sm"
                          }`}
                          onClick={() => handleSectionClick(section.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex-shrink-0 transition-colors duration-300 ${
                                filterUnit(section.id)?.status === "COMPLETED"
                                  ? "text-emerald-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {filterUnit(section.id)?.status ===
                              "COMPLETED" ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : filterUnit(section.id)?.status ===
                                "IN_PROGRESS" ? (
                                <CirclePlay className="w-5 h-5 text-cyan-700" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div
                                  className={`transition-colors duration-300 ${
                                    activeSection === section.id
                                      ? "text-violet-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {getContentIcon(
                                    String(section.contents?.[0]?.content_type)
                                  )}
                                </div>
                                <span
                                  className={`text-sm font-medium truncate transition-colors duration-300 ${
                                    activeSection === section.id
                                      ? "text-violet-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {section.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {section.completion_time}{" "}
                                  {section.completion_time === 1
                                    ? `minute`
                                    : `minutes`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-r-full transition-all duration-300 ${
                              activeSection === section.id
                                ? "opacity-100 scale-y-100"
                                : "opacity-0 scale-y-0"
                            }`}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    ref={scrollContainerRef}
                    className="h-full overflow-y-auto pr-2 space-y-8 md:min-w-[800px] lg:min-w-[800px]"
                  >
                    {subjectItem?.units?.map((section) => (
                      <div
                        key={section.id}
                        ref={(el) => {
                          contentRefs.current[section.id] = el;
                        }}
                        className="scroll-mt-4"
                      >
                        <Card className="border-gray-200  px-2">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-3xl bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                                {section.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          {section?.contents?.map((content) => {
                            let isFocused = false;
                            if (
                              checkuserContentStatus(section.id, content.id) ===
                                "IN_PROGRESS" ||
                              checkuserContentStatus(section.id, content.id) ===
                                "COMPLETED"
                            )
                              isFocused = true;
                            return (
                              <Card
                                key={content.id}
                                className="bg-white/90 backdrop-blur-sm border-violet-200"
                              >
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                                        {content.title}
                                      </CardTitle>
                                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                          {getContentIcon(content.content_type)}
                                          <span className="capitalize">
                                            {mapChoice(
                                              content.content_type,
                                              ContentType
                                            )}{" "}
                                            Content
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          <span>
                                            {content.completion_time}{" "}
                                            {content.completion_time === 1
                                              ? `minute`
                                              : `minutes`}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() =>
                                        handleUnitButtonClicked(
                                          section.id,
                                          content.id
                                        )
                                      }
                                      className={`${
                                        checkuserContentStatus(
                                          section.id,
                                          content.id
                                        ) === "COMPLETED"
                                          ? "bg-emerald-500 hover:bg-emerald-600"
                                          : "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                                      }`}
                                    >
                                      {checkuserContentStatus(
                                        section.id,
                                        content.id
                                      ) === "COMPLETED" ? (
                                        <>
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Completed
                                        </>
                                      ) : (
                                        <>
                                          <Circle className="w-4 h-4 mr-2" />
                                          {checkuserContentStatus(
                                            section.id,
                                            content.id
                                          ) === "IN_PROGRESS"
                                            ? `Mark Complete`
                                            : `Start  Unit`}
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <ContentTypeRender content={content} contentFocused={isFocused} />
                                </CardContent>
                              </Card>
                            );
                          })}
                        </Card>
                      </div>
                    ))}

                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={handleBackToCourse}
                        className="border-violet-300 text-violet-600 hover:bg-violet-50 bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Course
                      </Button>
                      <Button
                        onClick={() => console.log("Next lesson")}
                        className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                      >
                        Next Lesson
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
