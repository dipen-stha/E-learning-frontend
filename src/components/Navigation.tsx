"use client"

import { useState } from "react"
import { User, BookOpen, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useUserStore } from "@/stores/User/User"
import { useAuthStore } from "@/stores/User/Auth"
import { useNavigate } from "react-router-dom"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { userDetail, setUserUnauthenticated } = useUserStore();
  const {logout} = useAuthStore();
  const navigate = useNavigate();
  const userName = userDetail?.profile.name // This would come from auth context
  const userEmail = userDetail?.email // This would come from auth context

  console.log("name", userName, "email", userEmail)
  const handleLogout = () => {
    // Handle logout logic here
    logout();
    setUserUnauthenticated();
    navigate("/login");
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-violet-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
              LearnHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-gray-700 hover:text-violet-600 hover:bg-violet-50">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-violet-200">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
                    <AvatarFallback className="bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700">
                      {/* {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")} */}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border-violet-200" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-violet-200" />
                <DropdownMenuItem className="hover:bg-violet-50 focus:bg-violet-50">
                  <User className="mr-2 h-4 w-4 text-violet-600" />
                  <span className="text-violet-600">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-violet-50 focus:bg-violet-50">
                  <BookOpen className="mr-2 h-4 w-4 text-violet-600" />
                  <span className="text-violet-600">My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-violet-200" />
                <DropdownMenuItem className="hover:bg-red-50 focus:bg-red-50 text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="text-red-400">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-violet-600 hover:bg-violet-50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-violet-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center px-3 py-2 border-b border-violet-100">
                <Avatar className="h-8 w-8 border border-violet-200">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700 text-sm">
                    {/* {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")} */}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-violet-600 hover:bg-violet-50"
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Courses
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-violet-600 hover:bg-violet-50"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
