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
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

// Mock lesson data
const lessonData = {
  id: 1,
  title: "Event Delegation in JavaScript",
  courseTitle: "JavaScript Fundamentals",
  unit: "DOM Manipulation",
  duration: "25 min",
  progress: 60,
  sections: [
    {
      id: 1,
      title: "Introduction to Event Delegation",
      type: "video",
      duration: "5 min",
      completed: true,
      content: {
        videoUrl: "/javascript-event-delegation-video.png",
        description:
          "Learn the basics of event delegation and why it's important for efficient DOM manipulation.",
      },
    },
    {
      id: 2,
      title: "Event Bubbling Explained",
      type: "text",
      duration: "8 min",
      completed: true,
      content: {
        text: `Event bubbling is a fundamental concept in JavaScript that describes how events propagate through the DOM tree. When an event occurs on an element, it doesn't just affect that element - it "bubbles up" through its parent elements.

## How Event Bubbling Works

When you click on a nested element, the event starts at the target element and then bubbles up through each parent element until it reaches the document root. This behavior allows us to implement event delegation effectively.

### Example Code:
\`\`\`javascript
document.addEventListener('click', function(event) {
  console.log('Clicked element:', event.target);
  console.log('Current element:', event.currentTarget);
});
\`\`\`

This bubbling behavior is what makes event delegation possible and efficient.`,
      },
    },
    {
      id: 3,
      title: "Practical Implementation",
      type: "code",
      duration: "7 min",
      completed: false,
      content: {
        code: `// Event delegation example
const todoList = document.getElementById('todo-list');

todoList.addEventListener('click', function(event) {
  // Check if clicked element is a delete button
  if (event.target.classList.contains('delete-btn')) {
    const todoItem = event.target.closest('.todo-item');
    todoItem.remove();
  }
  
  // Check if clicked element is a complete button
  if (event.target.classList.contains('complete-btn')) {
    const todoItem = event.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});`,
        language: "javascript",
        description:
          "A practical example showing how to use event delegation for a todo list application.",
      },
    },
    {
      id: 4,
      title: "Visual Diagram",
      type: "image",
      duration: "3 min",
      completed: false,
      content: {
        imageUrl: "/event-delegation-diagram.png",
        description:
          "Visual representation of how event delegation works in the DOM tree.",
      },
    },
    {
      id: 5,
      title: "Best Practices & Performance",
      type: "text",
      duration: "2 min",
      completed: false,
      content: {
        text: `## Best Practices for Event Delegation

1. **Use specific selectors**: Always check for specific classes or attributes to avoid unintended behavior.
2. **Limit delegation scope**: Attach event listeners to the closest common parent, not always to the document.
3. **Performance benefits**: Reduces memory usage by having fewer event listeners.

### When to Use Event Delegation:
- Dynamic content that's added/removed frequently
- Large lists with many interactive elements
- When you need to handle events on elements that don't exist yet`,
      },
    },
  ],
  resources: [
    { name: "Event Delegation Cheat Sheet", type: "pdf", url: "#" },
    { name: "Practice Exercises", type: "zip", url: "#" },
    { name: "Code Examples", type: "js", url: "#" },
  ],
};

export default function LessonContent() {
  const [currentPage, setCurrentPage] = useState(0); // 0 for header page, 1 for content page
  const [activeSection, setActiveSection] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleBackToCourse = () => {
    console.log("Navigate back to course");
    navigate("/course-detail/2");
  };

  const handleSectionComplete = (sectionId: number) => {
    console.log(`Mark section ${sectionId} as complete`);
  };

  const scrollToContent = () => {
    setCurrentPage(1);
  };

  const scrollToHeader = () => {
    setCurrentPage(0);
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

  useEffect(() => {
    if (currentPage !== 1) return;

    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      let newActiveSection = activeSection;

      // Find which section is most visible
      for (const section of lessonData.sections) {
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

  const completedSections = lessonData.sections.filter(
    (section) => section.completed
  ).length;

  const renderContent = (section: (typeof lessonData.sections)[0]) => {
    switch (section.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={section.content.videoUrl || "/placeholder.svg"}
                alt="Video thumbnail"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/90 hover:bg-white text-gray-900 rounded-full w-16 h-16"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-gray-600">{section.content.description}</p>
          </div>
        );

      case "text":
        return (
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {section.content.text}
            </div>
          </div>
        );

      case "code":
        return (
          <div className="space-y-4">
            <p className="text-gray-600">{section.content.description}</p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{section.content.code}</code>
              </pre>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <img
              src={section.content.imageUrl || "/placeholder.svg"}
              alt={section.title}
              className="w-full rounded-lg border border-violet-200"
            />
            <p className="text-gray-600">{section.content.description}</p>
          </div>
        );

      default:
        return <div>Content type not supported</div>;
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "text":
        return <FileText className="w-4 h-4" />;
      case "code":
        return <BookOpen className="w-4 h-4" />;
      case "image":
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
          <div className="h-full flex flex-col">
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
                    {lessonData.unit}
                  </Badge>
                </div>
              </div>
            </header>

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  {lessonData.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Part of{" "}
                  <span className="font-medium">{lessonData.courseTitle}</span>
                </p>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-violet-200 mb-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-gray-800">
                      Lesson Progress
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                      {Math.round(
                        (completedSections / lessonData.sections.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (completedSections / lessonData.sections.length) * 100
                    }
                    className="h-3 mb-4"
                  />
                  <p className="text-gray-600">
                    {completedSections} of {lessonData.sections.length} sections
                    completed • {lessonData.duration}
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

            <div className="text-center pb-8">
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
                      {lessonData.unit}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    {lessonData.title}
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
                      {lessonData.sections.map((section) => (
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
                                section.completed
                                  ? "text-emerald-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {section.completed ? (
                                <CheckCircle className="w-5 h-5" />
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
                                  {getContentIcon(section.type)}
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
                                <span>{section.duration}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1 py-0 transition-colors duration-300 ${
                                    activeSection === section.id
                                      ? "border-violet-300 text-violet-600 bg-violet-50"
                                      : "border-gray-300 text-gray-500"
                                  }`}
                                >
                                  {section.type}
                                </Badge>
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
                    className="h-full overflow-y-auto pr-2 space-y-8"
                  >
                    {lessonData.sections.map((section) => (
                      <div
                        key={section.id}
                        ref={(el) => {contentRefs.current[section.id] = el}}
                        className="scroll-mt-4"
                      >
                        <Card className="bg-white/90 backdrop-blur-sm border-violet-200">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                                  {section.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    {getContentIcon(section.type)}
                                    <span className="capitalize">
                                      {section.type} Content
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{section.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() =>
                                  handleSectionComplete(section.id)
                                }
                                className={`${
                                  section.completed
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                                }`}
                              >
                                {section.completed ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <Circle className="w-4 h-4 mr-2" />
                                    Mark Complete
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {renderContent(section)}
                          </CardContent>
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
