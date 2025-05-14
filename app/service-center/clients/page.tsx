"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, ArrowUpDown, FileText, Calendar } from "lucide-react"
import Link from "next/link"

// Mock client data
const initialClients = [
  {
    id: "1",
    name: "Acme Inc.",
    status: "pending",
    uploadCompletion: 40,
    assignedDate: "May 1, 2025",
    contactName: "John Smith",
    contactEmail: "john@acmeinc.com",
    stage: "Document Collection",
  },
  {
    id: "2",
    name: "TechStart LLC",
    status: "reviewed",
    uploadCompletion: 75,
    assignedDate: "April 28, 2025",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@techstart.com",
    stage: "Review",
  },
  {
    id: "3",
    name: "Global Services Co.",
    status: "completed",
    uploadCompletion: 100,
    assignedDate: "April 15, 2025",
    contactName: "Michael Brown",
    contactEmail: "michael@globalservices.com",
    stage: "Completed",
  },
  {
    id: "4",
    name: "Innovative Solutions",
    status: "pending",
    uploadCompletion: 25,
    assignedDate: "May 5, 2025",
    contactName: "Emily Davis",
    contactEmail: "emily@innovative.com",
    stage: "Document Collection",
  },
  {
    id: "5",
    name: "Premier Consulting",
    status: "reviewed",
    uploadCompletion: 80,
    assignedDate: "April 22, 2025",
    contactName: "David Wilson",
    contactEmail: "david@premier.com",
    stage: "Review",
  },
  {
    id: "6",
    name: "Bright Future Inc.",
    status: "pending",
    uploadCompletion: 10,
    assignedDate: "May 8, 2025",
    contactName: "Jessica Miller",
    contactEmail: "jessica@brightfuture.com",
    stage: "Document Collection",
  },
]

export default function ServiceCenterClients() {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")

  // Filter clients based on search term and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesStage = stageFilter === "all" || client.stage === stageFilter

    return matchesSearch && matchesStatus && matchesStage
  })

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "reviewed":
        return "bg-blue-500/20 text-blue-500"
      case "completed":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <DashboardLayout role="service-center">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Clients</h1>
          <p className="text-muted-foreground mt-2">View and manage clients assigned to your service center</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Client List</CardTitle>
            <CardDescription>All clients assigned to your service center</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="Document Collection">Document Collection</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Client Name
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Upload Completion
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Assigned Date
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Contact</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground">{client.stage}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              client.status,
                            )}`}
                          >
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={client.uploadCompletion} className="h-2 w-24" />
                            <span className="text-sm">{client.uploadCompletion}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            {client.assignedDate}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium">{client.contactName}</div>
                          <div className="text-xs text-muted-foreground">{client.contactEmail}</div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/service-center/clients/${client.id}`}>View Details</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link
                                href={{
                                  pathname: "/service-center/documents",
                                  query: { client: client.name },
                                }}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Documents
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredClients.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No clients found matching your filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
