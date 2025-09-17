import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { CreateQuestion } from "./Create";
import { useEffect, useState } from "react";
import { useQuestionStore } from "@/stores/Assessment/Question/Question";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";
import Preview from "./Preview";

const QuestionPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false); 
  const [previewId, setPreviewId] = useState<number | null>(null);

  const fetchQuestionList = useQuestionStore(
    (state) => state.fetchAllQuestions
  );
  const questionList = useQuestionStore((state) => state.questionsList);

  const onCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmit = async () => {
    setIsCreateModalOpen(false);
    setIsModalEdit(false);
    setEditId(null);
    fetchQuestionList();
  };

  const handleQuestionEdit = (questionId: number) => {
    setIsModalEdit(true);
    setEditId(questionId);
    setIsCreateModalOpen(true);
  };

  const handlePreviewClick = (previewId: number) => {
    setPreviewId(previewId);
    setIsPreviewModalOpen(true)
  }

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsModalEdit(false);
    setEditId(null);
    setIsPreviewModalOpen(false);
    setPreviewId(null);
  };

  useEffect(() => {
    fetchQuestionList();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Assessment Questions
          </h1>
          <p className="text-gray-600 mt-1">
            Create, track, and grade questios of each assessments.
          </p>
        </div>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={onCreate}
        >
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Create Question
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900">92</div>
            <p className="text-xs text-gray-600">+12 created this month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900">92</div>
            <p className="text-xs text-gray-600">+12 created this month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900">92</div>
            <p className="text-xs text-gray-600">+12 created this month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900">92</div>
            <p className="text-xs text-gray-600">+12 created this month</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Questions</CardTitle>
          <CardDescription className="text-gray-600">
            Manage questions, track completions, and monitor studens attempts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4"
              />
              <Input
                type="text"
                placeholder="Search questions..."
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="">Question</TableHead>
                <TableHead className="">Assessment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questionList.map((question) => (
                <TableRow key={question.id} className="border-gray-200">
                  <TableCell>
                    <p className="max-w-xs truncate">{question.question}</p>
                  </TableCell>
                  <TableCell>{question.assessment.title}</TableCell>
                  <TableCell>{question.course.title}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Icon name="MoreHorizontal" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white border-gray-200"
                      >
                        <DropdownMenuLabel className="text-gray-900">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="text-gray-900" onClick={() => handlePreviewClick(question.id)}>
                          <Icon name="FileText" className="mr-2 h-4 w-4" />
                          Preview Question
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-900"
                          onClick={() => handleQuestionEdit(question.id)}
                        >
                          <Icon name="Upload" className="mr-2 h-4 w-4" />
                          Edit Question
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-900">
                          <Icon name="User" className="mr-2 h-4 w-4" />
                          View Submissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="text-red-600">
                          <Icon name="X" className="mr-2 h-4 w-4" />
                          Delete
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
      <CreateQuestion
        isOpen={isCreateModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleModalClose}
        isEdit={isModalEdit}
        editId={editId}
      />
      <Preview isOpen={isPreviewModalOpen} onCancel={handleModalClose}/>
    </div>
  );
};

export default QuestionPage;
