"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, Building, MapPin, Users, ArrowUpDown, Edit, Trash2 } from "lucide-react"

// Mock service center data
const initialServiceCenters = [
  {
    id: 1,
    name: "East Coast Team",
    location: "New York, NY",
    clientsAssigned: 8,
    manager: "Sarah Johnson",
    email: "eastcoast@clienthub.com",
    phone: "(212) 555-1234",
  },
  {
    id: 2,
    name: "West Coast Team",
    location: "San Francisco, CA",
    clientsAssigned: 10,
    manager: "Michael Chen",
    email: "westcoast@clienthub.com",
    phone: "(415) 555-6789",
  },
  {
    id: 3,
    name: "Central Team",
    location: "Chicago, IL",
    clientsAssigned: 6,
    manager: "David Wilson",
    email: "central@clienthub.com",
    phone: "(312) 555-4321",
  },
  {
    id: 4,
    name: "Southern Team",
    location: "Austin, TX",
    clientsAssigned: 5,
    manager: "Emily Rodriguez",
    email: "southern@clienthub.com",
    phone: "(512) 555-8765",
  },
  {
    id: 5,
    name: "International Team",
    location: "Remote",
    clientsAssigned: 3,
    manager: "James Lee",
    email: "international@clienthub.com",
    phone: "(888) 555-9876",
  },
]

// Mock client data for reassignment
const clients = [
  { id: 1, name: "Acme Inc.", currentServiceCenter: "East Coast Team" },
  { id: 2, name: "TechStart LLC", currentServiceCenter: "West Coast Team" },
  { id: 3, name: "Global Services Co.", currentServiceCenter: "Central Team" },
  { id: 4, name: "Innovative Solutions", currentServiceCenter: "East Coast Team" },
  { id: 5, name: "Premier Consulting", currentServiceCenter: "West Coast Team" },
  { id: 6, name: "Bright Future Inc.", currentServiceCenter: "Central Team" },
  { id: 7, name: "Stellar Group", currentServiceCenter: "East Coast Team" },
  { id: 8, name: "Apex Industries", currentServiceCenter: "West Coast Team" },
]

export default function AdminServiceCenters() {
  const [serviceCenters, setServiceCenters] = useState(initialServiceCenters)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewCenterDialogOpen, setIsNewCenterDialogOpen] = useState(false)
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")
  const [targetServiceCenter, setTargetServiceCenter] = useState("")
  const { toast } = useToast()

  // New service center form state
  const [newServiceCenter, setNewServiceCenter] = useState({
    name: "",
    location: "",
    manager: "",
    email: "",
    phone: "",
  })

  // Filter service centers based on search term
  const filteredServiceCenters = serviceCenters.filter(
    (center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewServiceCenter((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateServiceCenter = () => {
    const newCenter = {
      id: serviceCenters.length + 1,
      ...newServiceCenter,
      clientsAssigned: 0,
    }

    setServiceCenters([...serviceCenters, newCenter])
    setIsNewCenterDialogOpen(false)
    setNewServiceCenter({
      name: "",
      location: "",
      manager: "",
      email: "",
      phone: "",
    })

    toast({
      title: "Service center created",
      description: `${newCenter.name} has been added to your service centers.`,
    })
  }

  const handleReassignClient = () => {
    if (!selectedClient || !targetServiceCenter) return

    toast({
      title: "Client reassigned",
      description: `Client has been reassigned to ${targetServiceCenter}.`,
    })

    setIsReassignDialogOpen(false)
    setSelectedClient("")
    setTargetServiceCenter("")
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Centers</h1>
            <p className="text-muted-foreground mt-2">Manage service centers and client assignments</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isReassignDialogOpen} onOpenChange={setIsReassignDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Reassign Client</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Reassign Client</DialogTitle>
                  <DialogDescription>Move a client to a different service center.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Select Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name} ({client.currentServiceCenter})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-center">Target Service Center</Label>
                    <Select value={targetServiceCenter} onValueChange={setTargetServiceCenter}>
                      <SelectTrigger id="service-center">
                        <SelectValue placeholder="Select service center" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCenters.map((center) => (
                          <SelectItem key={center.id} value={center.name}>
                            {center.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReassignDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReassignClient}>Reassign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isNewCenterDialogOpen} onOpenChange={setIsNewCenterDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service Center
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Service Center</DialogTitle>
                  <DialogDescription>Create a new service center to assign clients to.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Service Center Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newServiceCenter.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Northeast Team"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newServiceCenter.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Boston, MA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      name="manager"
                      value={newServiceCenter.manager}
                      onChange={handleInputChange}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newServiceCenter.email}
                        onChange={handleInputChange}
                        placeholder="e.g., northeast@clienthub.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={newServiceCenter.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewCenterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateServiceCenter}>Create Service Center</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Service Center List</CardTitle>
            <CardDescription>View and manage all service centers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search service centers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Service Center
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Location
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Manager
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Clients Assigned
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServiceCenters.map((center) => (
                      <tr key={center.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 text-primary mr-2" />
                            <div>
                              <div className="font-medium">{center.name}</div>
                              <div className="text-xs text-muted-foreground">{center.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            {center.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">{center.manager}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            {center.clientsAssigned}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" title="Edit Service Center">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              title="Delete Service Center"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredServiceCenters.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No service centers found matching your search.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
