"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  CheckSquare, FileText, Home, LogOut, Settings,
  Users, FileUp, Clock, Building, User
} from "lucide-react"

interface AppSidebarProps {
  role: "client" | "admin" | "service-center"
}

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard", icon: Home },
          { href: "/admin/clients", label: "Clients", icon: Users },
          { href: "/admin/service-centers", label: "Service Centers", icon: Building },
          { href: "/admin/logs", label: "Activity Logs", icon: Clock },
          { href: "/admin/settings", label: "Settings", icon: Settings },
        ]
      case "service-center":
        return [
          { href: "/service-center/dashboard", label: "Dashboard", icon: Home },
          { href: "/service-center/clients", label: "Assigned Clients", icon: Users },
          { href: "/service-center/documents", label: "Documents", icon: FileText },
          { href: "/service-center/profile", label: "Profile", icon: User },
          { href: "/service-center/settings", label: "Settings", icon: Settings },
        ]
      case "client":
      default:
        return [
          { href: "/client/dashboard", label: "Dashboard", icon: Home },
          { href: "/client/tasks", label: "Onboarding Tasks", icon: CheckSquare },
          { href: "/client/documents", label: "Documents", icon: FileUp },
          { href: "/client/profile", label: "Profile", icon: User },
        ]
    }
  }

  const navItems = getNavItems()

  return (
    <aside className="w-48 min-h-screen flex flex-col border-r border-border bg-[#f9f9f9]">
      <div className="py-4 px-4 border-b border-border">
        <img
          src="/images/clienthub.png"
          alt="MySAGE Logo"
          className="h-9 w-full object-contain"
        />
      </div>

      <nav className="flex-1 pt-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-[15px] transition-colors ${
                  pathname === item.href
                    ? "bg-[#8bc53d1a] text-[#8bc53d] font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <Link
          href="/login"
          className="flex items-center text-sm text-muted-foreground hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Link>
      </div>
    </aside>
  )
}
