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
import { useEffect, useState } from "react";
import { Create } from "./Create";
import { useAchievementsStore } from "@/stores/Gamification/Achievements";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";

export const Achievements = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAllAchievements = useAchievementsStore(
    (state) => state.fetchAchievementList
  );
  const achievementsList = useAchievementsStore(
    (state) => state.achievementList
  );

  const handleSubmit = async () => {
    setIsCreateModalOpen(false);
    await fetchAllAchievements();
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (achievementId: number) => {
    setIsCreateModalOpen(true);
    setEditId(achievementId);
    setIsModalEdit(true);
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setEditId(null);
    setIsModalEdit(false);
  };

  useEffect(() => {
    fetchAllAchievements();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">
            Achievements Management
          </h1>
          <p className="text-gray-600 mt-l">Create and manage achievements</p>
        </div>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={handleCreate}
        >
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Create Achievement
        </Button>
      </div>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Achievements Management</CardTitle>
          <CardDescription>Manage achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4"
              />
              <Input
                placeholder="Search Achievements"
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
                <TableHead>Status</TableHead>
                <TableHead>Expirable</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievementsList &&
                achievementsList.map((achievement, index) => (
                  <TableRow key={index} className="border-gray-200">
                    <TableCell>{achievement.title}</TableCell>
                    <TableCell>
                      <div className="w-[350px]">
                        <div className="truncate">
                          {achievement.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Icon
                          name={`${achievement.icon}`}
                          className="w-4 h-4 mr-2"
                        />
                        <span className="text-xs text-gray-600">
                          {achievement.icon}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{`${
                      achievement.is_active ? "Active" : "Inactive"
                    }`}</TableCell>
                    <TableCell>{`${
                      achievement.is_expirable ? "Expirable" : "Non expirable"
                    }`}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <Icon
                              name="MoreHorizontal"
                              className="w-4 h-4 mr-2"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-gray-200">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEdit(achievement.id)}
                          >
                            <Icon name="Edit" />
                            Edit Achievement
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Icon name="Trash" className="h-4 w-4 mr-2" />
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
      <Create
        isOpen={isCreateModalOpen}
        isEdit={isModalEdit}
        editId={editId}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </div>
  );
};
