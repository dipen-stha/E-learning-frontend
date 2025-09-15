import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import CreateAssignmentType from "./Create";
import { useEffect, useState } from "react";
import { useAssessmentTypeStore } from "@/stores/Setup/AssessmentType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";

const AssessmentType = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModal, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAllAssesmentTypes = useAssessmentTypeStore(
    (state) => state.fetchAssessmentTypeList
  );
  const assessmentTypeList = useAssessmentTypeStore(
    (state) => state.assessmentTypeDetails
  );
  const isListLoading = useAssessmentTypeStore((state) => state.isListLoading);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmit = async () => {
    setIsCreateModalOpen(false);
    await fetchAllAssesmentTypes();
  };

  const handleTypeEdit = (id: number) => {
    setIsModalEdit(true);
    setEditId(id)
    setIsCreateModalOpen(true);
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    fetchAllAssesmentTypes();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Assignment Type Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create, track, and grade assignments across all courses.
          </p>
        </div>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={handleCreate}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment Type
        </Button>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="">All Assessment Types</CardTitle>
          <CardDescription>Manage assessment types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
              <Input
                placeholder="Search assignment type"
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody loading={isListLoading} rows={5} columns={4}>
              {assessmentTypeList.map((type) => (
                <TableRow key={type.id} className="border-gray-200">
                  <TableCell>{type.title}</TableCell>
                  <TableCell>
                    <div className="w-[350px]">
                      <p className="truncate">{type.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{type.icon}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-gray-200"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Type
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTypeEdit(type.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Type
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Type
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
      <CreateAssignmentType
        isOpen={isCreateModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        isEdit={isEditModal}
        editId={editId}
      />
    </div>
  );
};

export default AssessmentType;
