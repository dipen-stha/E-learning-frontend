import { NavItem } from "../types/Extras";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  FileBarChart,
  TrendingUp,
  Cog,
  Shield,
  Video,
} from "lucide-react"


export const navigationItems: NavItem[] = [
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
        title: "User",
        href: "/admin/users",
        icon: Users,
      },
    ],
  },
  {
    title: "Course Management",
    icon: BookOpen,
    children: [
      {
        title: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Subject Management",
    icon: FileText,
    children: [
      {
        title: "Subjects",
        href: "/admin/subjects",
        icon: FileText
      }
    ]
  },
  {
    title: "Content Management",
    icon: FileText,
    children: [
      {
        title: "Units",
        href: "/admin/content/units",
        icon: FileText,
      },
      {
        title: "Unit Contents",
        href: "/admin/content/unit-contents",
        icon: Video,
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