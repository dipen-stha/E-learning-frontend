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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import Create from "./Create";
import { useEffect, useState } from "react";
import { useCourseStore } from "@/stores/Courses/Course";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropDown";

const Categories = () => {
  const fetchCategories = useCourseStore((state) => state.fetchCategoryList);
  const categoriesList = useCourseStore((state) => state.categoryList)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const onHandleCreate = () => {
    setIsCreateModalOpen(true);
    setIsEdit(false);
    setEditId(null);
  };

  const handleEditClick = (categoryId: number) => {

  }

  const onClose = () => {
    setIsCreateModalOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const onSubmit = async () => {
    setIsCreateModalOpen(false);
    setIsEdit(false);
    setEditId(null);
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage Categories</p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={onHandleCreate}
          >
            Create Categories
          </Button>
        </div>
      </div>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage Categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400  h-4 w-4"
              />
              <Input
                placeholder="Search Categories"
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 w-[300px]">
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {categoriesList && categoriesList.map((category) => (
                    <TableRow className="border-gray-200" key={category.id}>
                        <TableCell>
                            {category.title}
                        </TableCell>
                        <TableCell>
                            Active
                        </TableCell>
                        <TableCell className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <Icon name="MoreHorizontal" className="mr-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white border-gray-200">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => handleEditClick(category.id)}>
                                        Edit Category
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
      <Create
        onCancel={onClose}
        onSubmit={onSubmit}
        isOpen={isCreateModalOpen}
        isEdit={isEdit}
        editId={editId}
      />
    </div>
  );
};

export default Categories;
