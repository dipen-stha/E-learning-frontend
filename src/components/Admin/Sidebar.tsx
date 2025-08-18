

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserPlus,
  BookOpenCheck,
  PlusCircle,
  FileBarChart,
  TrendingUp,
  Cog,
  Shield,
  Menu,
  X,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      {
        title: "All Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Active Users",
        href: "/admin/users/active",
        icon: UserCheck,
      },
      {
        title: "Add User",
        href: "/admin/users/add",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Course Management",
    icon: BookOpen,
    children: [
      {
        title: "All Courses",
        href: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Published Courses",
        href: "/admin/courses/published",
        icon: BookOpenCheck,
      },
      {
        title: "Create Course",
        href: "/admin/courses/create",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "Content Management",
    icon: FileText,
    children: [
      {
        title: "Lessons",
        href: "/admin/content/lessons",
        icon: FileText,
      },
      {
        title: "Assignments",
        href: "/admin/content/assignments",
        icon: FileBarChart,
      },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: BarChart3,
    children: [
      {
        title: "Overview",
        href: "/admin/analytics",
        icon: BarChart3,
      },
      {
        title: "User Progress",
        href: "/admin/analytics/progress",
        icon: TrendingUp,
      },
      {
        title: "Course Performance",
        href: "/admin/analytics/courses",
        icon: FileBarChart,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "General",
        href: "/admin/settings",
        icon: Cog,
      },
      {
        title: "Security",
        href: "/admin/settings/security",
        icon: Shield,
      },
    ],
  },
]

interface AdminSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  isMobileOpen?: boolean
  onMobileToggle?: () => void
}

export function AdminSidebar({
  isCollapsed = false,
  onToggle,
  isMobileOpen = false,
  onMobileToggle,
}: AdminSidebarProps) {
  const pathname = useLocation().pathname
  const [openItems, setOpenItems] = useState<string[]>(["User Management"])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isOpen = openItems.includes(item.title)
    const isActive = item.href === pathname
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group",
                level > 0 && "pl-8",
                isCollapsed && level === 0 && "justify-center px-2",
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className={cn("h-4 w-4 flex-shrink-0", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.title}</span>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent className="space-y-1 animate-in slide-in-from-top-1 duration-200 bg-gray-100 rounded-md">
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      )
    }

    return (
      <Link key={item.title} to={item.href || "#"}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group",
            level > 0 && "pl-8",
            isCollapsed && level === 0 && "justify-center px-2",
            isActive && "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white shadow-sm",
          )}
          title={isCollapsed ? item.title : undefined}
        >
          <item.icon className={cn("h-4 w-4 flex-shrink-0", isCollapsed ? "" : "mr-3")} />
          {!isCollapsed && <span className="truncate">{item.title}</span>}
        </Button>
      </Link>
    )
  }

  const sidebarContent = (
    <>
      <div className="px-6 py-4 border-b border-gray-200 h-[73px] flex items-center">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "space-x-2")}>
          <div className="bg-cyan-600 p-2 rounded-lg flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 truncate">EduAdmin</h2>
              <p className="text-xs text-gray-600 truncate">Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">{navigationItems.map((item) => renderNavItem(item))}</nav>
      </ScrollArea>

      <div className="px-4 py-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="text-xs text-gray-600 text-center">
            <p>© 2024 EduAdmin</p>
            <p>Version 1.0.0</p>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onMobileToggle}
        />
      )}

      <div
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {sidebarContent}
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={onMobileToggle} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {sidebarContent}
      </div>
    </>
  )
}

export function SidebarToggle({
  isCollapsed,
  onToggle,
  onMobileToggle,
}: {
  isCollapsed?: boolean
  onToggle?: () => void
  onMobileToggle?: () => void
}) {
  return (
    <>
      {/* Desktop toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="hidden lg:flex"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile toggle */}
      <Button variant="ghost" size="sm" onClick={onMobileToggle} className="lg:hidden" title="Open sidebar">
        <Menu className="h-4 w-4" />
      </Button>
    </>
  )
}
