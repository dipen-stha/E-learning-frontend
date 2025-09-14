
import type React from "react"

import { useState } from "react"
import { AdminSidebar } from "@/components/Admin/Sidebar";
import { AdminHeader } from "@/components/Admin/Header";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleToggle = () => setIsCollapsed(!isCollapsed)
  const handleMobileToggle = () => setIsMobileOpen(!isMobileOpen)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <AdminSidebar
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
          isMobileOpen={isMobileOpen}
          onMobileToggle={handleMobileToggle}
        />

        <div className={cn("flex-1 flex overflow-auto flex-col min-h-screen transition-all duration-300 ease-in-out", isCollapsed ? "ml-16" : "ml-64")}>
          <AdminHeader isCollapsed={isCollapsed} onToggle={handleToggle} onMobileToggle={handleMobileToggle} />
          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-100/50">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
