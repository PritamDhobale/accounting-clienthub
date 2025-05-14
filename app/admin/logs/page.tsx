"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  CalendarIcon,
  Download,
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock activity log data
const initialLogs = [
  {
    id: 1,
    type: "document_upload",
    timestamp: "2025-05-11T14:32:00",
    user: { name: "John Smith", role: "client" },
    client: "Acme Inc.",
    details: "Uploaded Bank Statements Q1 2025",
    icon: Upload,
  },
  {
    id: 2,
    type: "document_review",
    timestamp: "2025-05-11T15:45:00",
    user: { name: "Sarah Johnson", role: "service_center" },
    client: "Acme Inc.",
    details: "Reviewed Bank Statements Q1 2025",
    icon: Eye,
  },
  {
    id: 3,
    type: "document_approved",
    timestamp: "2025-05-11T16:20:00",
    user: { name: "Sarah Johnson", role: "service_center" },
    client: "Acme Inc.",
    details: "Approved Bank Statements Q1 2025",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "document_upload",
    timestamp: "2025-05-10T10:15:00",
    user: { name: "Emily Davis", role: "client" },
    client: "TechStart LLC",
    details: "Uploaded Credit Card Statements Q1 2025",
    icon: Upload,
  },
  {
    id: 5,
    type: "document_rejected",
    timestamp: "2025-05-10T11:30:00",
    user: { name: "Michael Chen", role: "service_center" },
    client: "TechStart LLC",
    details: "Rejected Credit Card Statements Q1 2025 - Missing transactions",
    icon: AlertCircle,
  },
  {
    id: 6,
    type: "client_created",
    timestamp: "2025-05-09T09:45:00",
    user: { name: "Admin User", role: "admin" },
    client: "Global Services Co.",
    details: "Created new client profile",
    icon: User,
  },
  {
    id: 7,
    type: "service_center_assigned",
    timestamp: "2025-05-09T10:00:00",
    user: { name: "Admin User", role: "admin" },
    client: "Global Services Co.",
    details: "Assigned to Central Team",
    icon: User,
  },
  {
    id: 8,
    type: "document_upload",
    timestamp: "2025-05-08T14:20:00",
    user: { name: "Michael Brown", role: "client" },
    client: "Global Services Co.",
    details: "Uploaded Tax Returns 2024",
    icon: Upload,
  },
  {
    id: 9,
    type: "document_review",
    timestamp: "2025-05-08T16:45:00",
    user: { name: "David Wilson", role: "service_center" },
    client: "Global Services Co.",
    details: "Reviewed Tax Returns 2024",
    icon: Eye,
  },
  {
    id: 10,
    type: "document_approved",
    timestamp: "2025-05-08T17:10:00",
    user: { name: "David Wilson", role: "service_center" },
    client: "Global Services Co.",
    details: "Approved Tax Returns 2024",
    icon: CheckCircle,
  },
  {
    id: 11,
    type: "document_upload",
    timestamp: "2025-05-07T11:30:00",
    user: { name: "Emily Davis", role: "client" },
    client: "Innovative Solutions",
    details: "Uploaded Payroll Reports Q1 2025",
    icon: Upload,
  },
  {
    id: 12,
    type: "document_review",
    timestamp: "2025-05-07T13:15:00",
    user: { name: "Sarah Johnson", role: "service_center" },
    client: "Innovative Solutions",
    details: "Reviewed Payroll Reports Q1 2025",
    icon: Eye,
  },
  {
    id: 13,
    type: "document_approved",
    timestamp: "2025-05-07T14:00:00",
    user: { name: "Sarah Johnson", role: "service_center" },
    client: "Innovative Solutions",
    details: "Approved Payroll Reports Q1 2025",
    icon: CheckCircle,
  },
  {
    id: 14,
    type: "client_created",
    timestamp: "2025-05-06T10:20:00",
    user: { name: "Admin User", role: "admin" },
    client: "Premier Consulting",
    details: "Created new client profile",
    icon: User,
  },
  {
    id: 15,
    type: "service_center_assigned",
    timestamp: "2025-05-06T10:35:00",
    user: { name: "Admin User", role: "admin" },
    client: "Premier Consulting",
    details: "Assigned to West Coast Team",
    icon: User,
  },
]

export default function AdminLogs() {
  const [logs, setLogs] = useState(initialLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [userRoleFilter, setUserRoleFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || log.type === typeFilter
    const matchesUserRole = userRoleFilter === "all" || log.user.role === userRoleFilter
    const matchesClient = clientFilter === "all" || log.client === clientFilter
    const matchesDate = !date || format(new Date(log.timestamp), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesType && matchesUserRole && matchesClient && matchesDate
  })

  // Get unique clients for filter
  const uniqueClients = Array.from(new Set(logs.map((log) => log.client)))

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get icon and color based on log type
  const getLogTypeStyles = (type: string) => {
    switch (type) {
      case "document_upload":
        return { color: "text-blue-500", bgColor: "bg-blue-500/10" }
      case "document_review":
        return { color: "text-purple-500", bgColor: "bg-purple-500/10" }
      case "document_approved":
        return { color: "text-green-500", bgColor: "bg-green-500/10" }
      case "document_rejected":
        return { color: "text-red-500", bgColor: "bg-red-500/10" }
      case "client_created":
        return { color: "text-orange-500", bgColor: "bg-orange-500/10" }
      case "service_center_assigned":
        return { color: "text-yellow-500", bgColor: "bg-yellow-500/10" }
      default:
        return { color: "text-gray-500", bgColor: "bg-gray-500/10" }
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return format(date, "MMM d, yyyy h:mm a")
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
            <p className="text-muted-foreground mt-2">Track all activities across clients and service centers</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>View and filter all system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Activity Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="document_upload">Document Upload</SelectItem>
                      <SelectItem value="document_review">Document Review</SelectItem>
                      <SelectItem value="document_approved">Document Approved</SelectItem>
                      <SelectItem value="document_rejected">Document Rejected</SelectItem>
                      <SelectItem value="client_created">Client Created</SelectItem>
                      <SelectItem value="service_center_assigned">Service Center Assigned</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="User Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="service_center">Service Center</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      {uniqueClients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[180px] justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Filter by date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>

                  {(date || typeFilter !== "all" || userRoleFilter !== "all" || clientFilter !== "all") && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setDate(undefined)
                        setTypeFilter("all")
                        setUserRoleFilter("all")
                        setClientFilter("all")
                      }}
                      className="h-10"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Timestamp
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Activity
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          User
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Client
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLogs.map((log) => {
                      const { color, bgColor } = getLogTypeStyles(log.type)
                      return (
                        <tr key={log.id} className="border-t">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <span className="text-sm">{formatTimestamp(log.timestamp)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className={`p-1.5 rounded-full ${bgColor} ${color} mr-3`}>
                                <log.icon className="h-4 w-4" />
                              </div>
                              <span>{log.details}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-muted-foreground mr-2" />
                              <div>
                                <div className="font-medium">{log.user.name}</div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {log.user.role.replace("_", " ")}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                              {log.client}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No logs found matching your filters.</p>
                </div>
              )}

              {filteredLogs.length > 0 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
