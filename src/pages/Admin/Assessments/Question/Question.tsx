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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { CreateQuestion } from "./Create";
import { useState } from "react";

const QuestionPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const onCreate = () => {
      setIsCreateModalOpen(true);
  }

  const handleCreate = () => {
    setIsCreateModalOpen(false);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  }

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
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={onCreate}>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CreateQuestion
        isOpen={isCreateModalOpen}
        onSubmit={handleCreate}
        onCancel={handleModalClose}
        isEdit={isModalEdit}
        editId={editId}
      />
    </div>
  );
};

export default QuestionPage;
