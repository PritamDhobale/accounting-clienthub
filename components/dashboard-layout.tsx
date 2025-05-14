import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "client" | "admin" | "service-center"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar role={role} />
      <SidebarInset className="overflow-auto">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </SidebarInset>
    </div>
  )
}
