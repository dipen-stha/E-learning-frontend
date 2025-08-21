

import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown"
import { Bell, Search, Settings, LogOut, User } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { SidebarToggle } from "./Sidebar"
import { useAuthStore } from "@/stores/User/Auth"
import { useNavigate } from "react-router-dom"

interface AdminHeaderProps {
  isCollapsed?: boolean
  onToggle?: () => void
  onMobileToggle?: () => void
}

export function AdminHeader({ isCollapsed, onToggle, onMobileToggle }: AdminHeaderProps) {

const navigate = useNavigate();
const logout = useAuthStore(state => state.logout)

const handleLogout = () => {
  logout();
  navigate("/admin/login");
}

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between text-gray-600">
        {/* Sidebar Toggle Button */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggle} onMobileToggle={onMobileToggle} />

          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
            <Input placeholder="Search courses, users, reports..." className="pl-10 bg-white border-gray-200" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.png" alt="Admin" />
                  <AvatarFallback className="bg-cyan-600 text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-gray-200 bg-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-600">Admin User</p>
                  <p className="text-xs leading-none text-gray-600">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-600">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-600">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleLogout}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
