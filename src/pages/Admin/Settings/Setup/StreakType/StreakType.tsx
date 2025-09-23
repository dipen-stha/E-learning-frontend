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
import { CreateStreakType } from "./Create";
import { useEffect, useState } from "react";
import { useStreakTypeStore } from "@/stores/Gamification/StreakType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";

export const StreakTypePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchStreakTypeList = useStreakTypeStore(
    (state) => state.fetchStreakTypeList
  );
  const isListLoading = useStreakTypeStore((state) => state.isListLoading);
  const streakTypeList = useStreakTypeStore((state) => state.streakTypeList);

  const onClose = () => {
    setIsCreateModalOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const onSubmit = async () => {
    setIsCreateModalOpen(false);
    setIsEdit(false);
    setEditId(null);
    await fetchStreakTypeList();
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (typeId: number) => {
    setIsCreateModalOpen(true);
    setEditId(typeId);
    setIsEdit(true);
  };

  const handleDeleteClick = (typeId: number) => {

  }

  useEffect(() => {
    fetchStreakTypeList();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Streak Types</h1>
          <p className="text-gray-600 mt-1">Manage streak types.</p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={handleCreateClick}
          >
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Create Streak Type
          </Button>
        </div>
      </div>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Streak Types</CardTitle>
          <CardDescription>Manage Streak Types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <Input
                placeholder="Search Units..."
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 w-[300px]">
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody loading={isListLoading} rows={5} columns={4}>
              {streakTypeList &&
                streakTypeList.map((type) => (
                  <TableRow className="border-gray-200" key={type.id}>
                    <TableCell>{type.title}</TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>
                      <div>
                        {type.is_active ? (
                          <Icon
                            name="CircleCheck"
                            className="text-green-400 h-4 w-4 mr-2"
                          />
                        ) : (
                          <Icon name="Circle" className="w-4 h-4 mr-2" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <Icon
                              name="MoreHorizontal"
                              className="mr-2 h-4 w-4"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white border-gray-200"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleEditClick(type.id)}
                          >
                            <Icon name="Edit" className="mr-2 h-4 w-4" />
                            Edit Streak Type
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(type.id)} className="text-rose-500">
                            <Icon name="Trash" className="mr-2 h-4 w-4 text-rose-500"/>
                            Delete Streak Type
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
      <CreateStreakType
        isOpen={isCreateModalOpen}
        isEdit={isEdit}
        editId={editId}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};
