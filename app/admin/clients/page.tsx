"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import Link from "next/link"

// Mock client data
const initialClients = [
  {
    id: 1,
    name: "Acme Inc.",
    status: "pending",
    serviceCenter: "East Coast Team",
    lastUpdated: "2 hours ago",
    contactName: "John Smith",
    contactEmail: "john@acmeinc.com",
    stage: "Document Collection",
  },
  {
    id: 2,
    name: "TechStart LLC",
    status: "received",
    serviceCenter: "West Coast Team",
    lastUpdated: "5 hours ago",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@techstart.com",
    stage: "Document Collection",
  },
  {
    id: 3,
    name: "Global Services Co.",
    status: "reviewed",
    serviceCenter: "Central Team",
    lastUpdated: "1 day ago",
    contactName: "Michael Brown",
    contactEmail: "michael@globalservices.com",
    stage: "Review",
  },
  {
    id: 4,
    name: "Innovative Solutions",
    status: "approved",
    serviceCenter: "East Coast Team",
    lastUpdated: "2 days ago",
    contactName: "Emily Davis",
    contactEmail: "emily@innovative.com",
    stage: "Completed",
  },
  {
    id: 5,
    name: "Premier Consulting",
    status: "pending",
    serviceCenter: "West Coast Team",
    lastUpdated: "3 days ago",
    contactName: "David Wilson",
    contactEmail: "david@premier.com",
    stage: "Document Collection",
  },
  {
    id: 6,
    name: "Bright Future Inc.",
    status: "received",
    serviceCenter: "Central Team",
    lastUpdated: "4 days ago",
    contactName: "Jessica Miller",
    contactEmail: "jessica@brightfuture.com",
    stage: "Document Collection",
  },
  {
    id: 7,
    name: "Stellar Group",
    status: "reviewed",
    serviceCenter: "East Coast Team",
    lastUpdated: "5 days ago",
    contactName: "Robert Taylor",
    contactEmail: "robert@stellar.com",
    stage: "Review",
  },
  {
    id: 8,
    name: "Apex Industries",
    status: "approved",
    serviceCenter: "West Coast Team",
    lastUpdated: "1 week ago",
    contactName: "Amanda Clark",
    contactEmail: "amanda@apex.com",
    stage: "Completed",
  },
]

export default function AdminClients() {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")
  const [serviceCenterFilter, setServiceCenterFilter] = useState("all")

  // Filter clients based on search term and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesStage = stageFilter === "all" || client.stage === stageFilter
    const matchesServiceCenter = serviceCenterFilter === "all" || client.serviceCenter === serviceCenterFilter

    return matchesSearch && matchesStatus && matchesStage && matchesServiceCenter
  })

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor all client onboarding processes</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link href="/admin/clients/new">
                <Plus className="h-4 w-4 mr-2" />
                New Client
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Client List</CardTitle>
            <CardDescription>View and manage all clients</CardDescription>
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
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
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

                  <Select value={serviceCenterFilter} onValueChange={setServiceCenterFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Service Center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Service Centers</SelectItem>
                      <SelectItem value="East Coast Team">East Coast Team</SelectItem>
                      <SelectItem value="West Coast Team">West Coast Team</SelectItem>
                      <SelectItem value="Central Team">Central Team</SelectItem>
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
                          Stage
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Service Center
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Contact
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Last Updated
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="font-medium">{client.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={client.status as any} />
                        </td>
                        <td className="py-3 px-4 text-sm">{client.stage}</td>
                        <td className="py-3 px-4 text-sm">{client.serviceCenter}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium">{client.contactName}</div>
                          <div className="text-xs text-muted-foreground">{client.contactEmail}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{client.lastUpdated}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/clients/${client.id}`}>View</Link>
                          </Button>
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
