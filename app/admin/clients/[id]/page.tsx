"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Building,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Calendar,
  Clock,
  Download,
  Edit,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock service centers
const serviceCenters = [
  { id: 1, name: "East Coast Team" },
  { id: 2, name: "West Coast Team" },
  { id: 3, name: "Central Team" },
  { id: 4, name: "Southern Team" },
  { id: 5, name: "International Team" },
]

// Mock client data - we'll use this to simulate dynamic data based on ID
const mockClients = [
  {
    id: "1",
    name: "Acme Inc.",
    status: "active",
    serviceCenter: "East Coast Team",
    lastUpdated: "2 hours ago",
    contactName: "John Smith",
    contactEmail: "john@acmeinc.com",
    contactPhone: "(555) 123-4567",
    businessEmail: "info@acmeinc.com",
    businessPhone: "(555) 987-6543",
    businessAddress: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://www.acmeinc.com",
    federalEIN: "12-3456789",
    entityType: "LLC",
    stateOfIncorporation: "California",
    fiscalYearEnd: "December",
    onboardingProgress: 60,
  },
  {
    id: "2",
    name: "TechStart LLC",
    status: "active",
    serviceCenter: "West Coast Team",
    lastUpdated: "5 hours ago",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@techstart.com",
    contactPhone: "(555) 234-5678",
    businessEmail: "info@techstart.com",
    businessPhone: "(555) 876-5432",
    businessAddress: "456 Tech Blvd, Suite 200, Austin, TX 78701",
    website: "https://www.techstart.com",
    federalEIN: "23-4567890",
    entityType: "S-Corp",
    stateOfIncorporation: "Texas",
    fiscalYearEnd: "June",
    onboardingProgress: 75,
  },
  {
    id: "3",
    name: "Global Services Co.",
    status: "active",
    serviceCenter: "Central Team",
    lastUpdated: "1 day ago",
    contactName: "Michael Brown",
    contactEmail: "michael@globalservices.com",
    contactPhone: "(555) 345-6789",
    businessEmail: "info@globalservices.com",
    businessPhone: "(555) 765-4321",
    businessAddress: "789 Global Way, Chicago, IL 60601",
    website: "https://www.globalservices.com",
    federalEIN: "34-5678901",
    entityType: "C-Corp",
    stateOfIncorporation: "Illinois",
    fiscalYearEnd: "September",
    onboardingProgress: 100,
  },
  {
    id: "4",
    name: "Innovative Solutions",
    status: "active",
    serviceCenter: "East Coast Team",
    lastUpdated: "2 days ago",
    contactName: "Emily Davis",
    contactEmail: "emily@innovative.com",
    contactPhone: "(555) 456-7890",
    businessEmail: "info@innovative.com",
    businessPhone: "(555) 654-3210",
    businessAddress: "101 Innovation Dr, Boston, MA 02110",
    website: "https://www.innovative.com",
    federalEIN: "45-6789012",
    entityType: "LLC",
    stateOfIncorporation: "Massachusetts",
    fiscalYearEnd: "March",
    onboardingProgress: 25,
  },
  {
    id: "5",
    name: "Premier Consulting",
    status: "active",
    serviceCenter: "West Coast Team",
    lastUpdated: "3 days ago",
    contactName: "David Wilson",
    contactEmail: "david@premier.com",
    contactPhone: "(555) 567-8901",
    businessEmail: "info@premier.com",
    businessPhone: "(555) 543-2109",
    businessAddress: "202 Premier Ave, Seattle, WA 98101",
    website: "https://www.premier.com",
    federalEIN: "56-7890123",
    entityType: "S-Corp",
    stateOfIncorporation: "Washington",
    fiscalYearEnd: "December",
    onboardingProgress: 80,
  },
]

// Mock documents data
const mockDocuments = [
  {
    id: 1,
    clientId: "1",
    name: "Bank Statements Q1 2025",
    type: "Bank Statements",
    uploadDate: "May 9, 2025",
    status: "approved",
    fileName: "acme_bank_statements_q1_2025.pdf",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    clientId: "1",
    name: "Credit Card Statements Q1 2025",
    type: "Credit Card Statements",
    uploadDate: "May 10, 2025",
    status: "received",
    fileName: "acme_cc_statements_q1_2025.pdf",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    clientId: "1",
    name: "QuickBooks Access Confirmation",
    type: "QuickBooks Online Access",
    uploadDate: "May 9, 2025",
    status: "approved",
    fileName: "acme_qb_access_confirmation.pdf",
    fileSize: "0.5 MB",
  },
  {
    id: 4,
    clientId: "2",
    name: "Bank Statements Q1 2025",
    type: "Bank Statements",
    uploadDate: "April 28, 2025",
    status: "approved",
    fileName: "techstart_bank_statements_q1_2025.pdf",
    fileSize: "3.1 MB",
  },
  {
    id: 5,
    clientId: "2",
    name: "Tax Returns 2024",
    type: "Tax Returns",
    uploadDate: "April 30, 2025",
    status: "received",
    fileName: "techstart_tax_returns_2024.pdf",
    fileSize: "4.2 MB",
  },
  {
    id: 6,
    clientId: "3",
    name: "Bank Statements Q1 2025",
    type: "Bank Statements",
    uploadDate: "April 10, 2025",
    status: "approved",
    fileName: "global_bank_statements_q1_2025.pdf",
    fileSize: "2.8 MB",
  },
]

// Mock tasks data
const mockTasks = [
  {
    id: "quickbooks",
    clientId: "1",
    title: "QuickBooks Online Access",
    description: "Provide access to your QuickBooks Online account",
    status: "approved",
    uploadDate: "May 9, 2025",
    reviewDate: "May 10, 2025",
  },
  {
    id: "bank-statements",
    clientId: "1",
    title: "Bank Statements",
    description: "All business bank account statements for the current year",
    status: "approved",
    uploadDate: "May 9, 2025",
    reviewDate: "May 10, 2025",
  },
  {
    id: "credit-card",
    clientId: "1",
    title: "Credit Card Statements",
    description: "Card statements for the current year",
    status: "received",
    uploadDate: "May 10, 2025",
    reviewDate: null,
  },
  {
    id: "tax-return",
    clientId: "1",
    title: "Most Recent Tax Return",
    description: "Complete copy of the most recent business tax return filed",
    status: "pending",
    uploadDate: null,
    reviewDate: null,
  },
  {
    id: "payroll",
    clientId: "1",
    title: "Payroll Reports",
    description: "Access to payroll platform or exported payroll reports",
    status: "pending",
    uploadDate: null,
    reviewDate: null,
  },
  // Tasks for client 2
  {
    id: "quickbooks-2",
    clientId: "2",
    title: "QuickBooks Online Access",
    description: "Provide access to your QuickBooks Online account",
    status: "approved",
    uploadDate: "April 25, 2025",
    reviewDate: "April 26, 2025",
  },
  {
    id: "bank-statements-2",
    clientId: "2",
    title: "Bank Statements",
    description: "All business bank account statements for the current year",
    status: "approved",
    uploadDate: "April 28, 2025",
    reviewDate: "April 29, 2025",
  },
]

// Mock activity log data
const mockActivityLogs = [
  {
    id: 1,
    clientId: "1",
    action: "Document Uploaded",
    timestamp: "May 10, 2025 - 10:15 AM",
    user: "John Smith (Client)",
    details: "Uploaded Credit Card Statements Q1 2025",
  },
  {
    id: 2,
    clientId: "1",
    action: "Document Approved",
    timestamp: "May 10, 2025 - 09:30 AM",
    user: "Sarah Johnson (Service Center)",
    details: "Approved Bank Statements Q1 2025",
  },
  {
    id: 3,
    clientId: "1",
    action: "Document Uploaded",
    timestamp: "May 9, 2025 - 03:45 PM",
    user: "John Smith (Client)",
    details: "Uploaded Bank Statements Q1 2025",
  },
  {
    id: 4,
    clientId: "1",
    action: "Document Uploaded",
    timestamp: "May 9, 2025 - 02:30 PM",
    user: "John Smith (Client)",
    details: "Uploaded QuickBooks Access Confirmation",
  },
  {
    id: 5,
    clientId: "1",
    action: "Client Created",
    timestamp: "May 8, 2025 - 11:20 AM",
    user: "Admin User (Admin)",
    details: "Created client profile",
  },
  // Activity logs for client 2
  {
    id: 6,
    clientId: "2",
    action: "Document Uploaded",
    timestamp: "April 30, 2025 - 09:15 AM",
    user: "Sarah Johnson (Client)",
    details: "Uploaded Tax Returns 2024",
  },
  {
    id: 7,
    clientId: "2",
    action: "Document Approved",
    timestamp: "April 29, 2025 - 02:30 PM",
    user: "Michael Chen (Service Center)",
    details: "Approved Bank Statements Q1 2025",
  },
]

export default function ClientDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const clientId = params.id

  const [client, setClient] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [activityLog, setActivityLog] = useState<any[]>([])

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState("")
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null)
  const [newStatus, setNewStatus] = useState("")

  // Service center change dialog
  const [isServiceCenterDialogOpen, setIsServiceCenterDialogOpen] = useState(false)
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("")

  useEffect(() => {
    // Find client by ID
    const foundClient = mockClients.find((c) => c.id === clientId)
    if (foundClient) {
      setClient(foundClient)
      setSelectedServiceCenter(foundClient.serviceCenter)
    }

    // Filter documents by client ID
    const clientDocuments = mockDocuments.filter((doc) => doc.clientId === clientId)
    setDocuments(clientDocuments)

    // Filter tasks by client ID
    const clientTasks = mockTasks.filter((task) => task.clientId === clientId)
    setTasks(clientTasks)

    // Filter activity logs by client ID
    const clientActivityLogs = mockActivityLogs.filter((log) => log.clientId === clientId)
    setActivityLog(clientActivityLogs)
  }, [clientId])

  const handleUploadComplete = (file: File) => {
    if (!selectedTask) return

    // Find the task
    const task = tasks.find((t) => t.id === selectedTask)
    if (!task) return

    // Update the task status
    setTasks(
      tasks.map((t) =>
        t.id === selectedTask
          ? {
              ...t,
              status: "received",
              uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            }
          : t,
      ),
    )

    // Add a new document
    const newDocument = {
      id: documents.length + 1,
      clientId,
      name: task.title,
      type: task.title,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "received",
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }

    setDocuments([newDocument, ...documents])

    // Add to activity log
    const newActivity = {
      id: activityLog.length + 1,
      clientId,
      action: "Document Uploaded",
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      user: "Admin User (Admin)",
      details: `Uploaded ${task.title}`,
    }

    setActivityLog([newActivity, ...activityLog])

    setIsUploadDialogOpen(false)
    setSelectedTask("")

    toast({
      title: "Document uploaded",
      description: "Document has been uploaded on behalf of the client.",
    })
  }

  const handleStatusChange = () => {
    if (!selectedDocument || !newStatus) return

    // Update the document status
    setDocuments(
      documents.map((doc) =>
        doc.id === selectedDocument
          ? {
              ...doc,
              status: newStatus,
            }
          : doc,
      ),
    )

    // Find the document
    const document = documents.find((doc) => doc.id === selectedDocument)
    if (!document) return

    // Find the corresponding task
    const taskToUpdate = tasks.find((task) => task.title === document.type)
    if (taskToUpdate) {
      setTasks(
        tasks.map((task) =>
          task.title === document.type
            ? {
                ...task,
                status: newStatus,
                reviewDate:
                  newStatus !== "pending"
                    ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : null,
              }
            : task,
        ),
      )
    }

    // Add to activity log
    const statusAction =
      newStatus === "approved"
        ? "Document Approved"
        : newStatus === "rejected"
          ? "Document Rejected"
          : "Document Status Updated"
    const newActivity = {
      id: activityLog.length + 1,
      clientId,
      action: statusAction,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      user: "Admin User (Admin)",
      details: `${statusAction}: ${document.name}`,
    }

    setActivityLog([newActivity, ...activityLog])

    setIsStatusDialogOpen(false)
    setSelectedDocument(null)
    setNewStatus("")

    toast({
      title: "Status updated",
      description: `Document status has been updated to ${newStatus}.`,
    })

    // Update client onboarding progress
    const completedTasks = tasks.filter((task) => task.status === "approved" || task.status === "reviewed").length
    const totalTasks = tasks.length
    const progress = Math.round((completedTasks / totalTasks) * 100)
    setClient({ ...client, onboardingProgress: progress })
  }

  const handleServiceCenterChange = () => {
    if (!selectedServiceCenter) return

    // Update client's service center
    setClient({ ...client, serviceCenter: selectedServiceCenter })

    // Add to activity log
    const newActivity = {
      id: activityLog.length + 1,
      clientId,
      action: "Service Center Changed",
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      user: "Admin User (Admin)",
      details: `Changed service center to ${selectedServiceCenter}`,
    }

    setActivityLog([newActivity, ...activityLog])

    setIsServiceCenterDialogOpen(false)

    // Show mock email notification
    toast({
      title: "Service Center Changed",
      description: `${client.name} has been assigned to ${selectedServiceCenter}. Email notification sent.`,
    })

    // Show mock email notification UI
    setTimeout(() => {
      toast({
        title: "✉️ Email Notification Sent",
        description: `To: ${selectedServiceCenter} - New client ${client.name} has been assigned to your team.`,
        variant: "default",
      })
    }, 1000)
  }

  const handleExportProfile = () => {
    toast({
      title: "Profile Exported",
      description: "Client profile has been exported to PDF.",
    })
  }

  const handleEditProfile = () => {
    toast({
      title: "Edit Mode",
      description: "You can now edit the client profile.",
    })
  }

  if (!client) {
    return (
      <DashboardLayout role="admin">
        <div className="flex items-center justify-center h-full">
          <p>Client not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <p className="text-muted-foreground mt-2">
              Client ID: {client.id} • Last updated: {client.lastUpdated}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>Current status of client onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {tasks.filter((task) => task.status === "approved" || task.status === "reviewed").length} of{" "}
                    {tasks.length} tasks completed
                  </span>
                  <span className="text-sm font-medium">{client.onboardingProgress}%</span>
                </div>
                <Progress value={client.onboardingProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Service Center</CardTitle>
              <CardDescription>Assigned service center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Building className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">{client.serviceCenter}</span>
              </div>
              <Dialog open={isServiceCenterDialogOpen} onOpenChange={setIsServiceCenterDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Change Service Center
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Service Center</DialogTitle>
                    <DialogDescription>
                      Assign this client to a different service center. This will notify the new service center.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="service-center" className="col-span-4">
                        Select Service Center
                      </Label>
                      <Select
                        value={selectedServiceCenter}
                        onValueChange={setSelectedServiceCenter}
                        className="col-span-4"
                      >
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
                    <Button variant="outline" onClick={() => setIsServiceCenterDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleServiceCenterChange}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Client Profile</CardTitle>
                <CardDescription>Business and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="text-sm">Business Name</span>
                        </div>
                        <p className="font-medium">{client.name}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm">Business Email</span>
                        </div>
                        <p className="font-medium">{client.businessEmail}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="text-sm">Business Phone</span>
                        </div>
                        <p className="font-medium">{client.businessPhone}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">Business Address</span>
                        </div>
                        <p className="font-medium">{client.businessAddress}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="text-sm">Federal EIN</span>
                        </div>
                        <p className="font-medium">{client.federalEIN}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="text-sm">Entity Type</span>
                        </div>
                        <p className="font-medium">{client.entityType}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Primary Contact</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">Contact Name</span>
                        </div>
                        <p className="font-medium">{client.contactName}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm">Contact Email</span>
                        </div>
                        <p className="font-medium">{client.contactEmail}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="text-sm">Contact Phone</span>
                        </div>
                        <p className="font-medium">{client.contactPhone}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mt-6 mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="text-sm">State of Incorporation</span>
                        </div>
                        <p className="font-medium">{client.stateOfIncorporation}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">Fiscal Year End</span>
                        </div>
                        <p className="font-medium">{client.fiscalYearEnd}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-end">
                <Button variant="outline" className="mr-2" onClick={handleExportProfile}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Profile
                </Button>
                <Button onClick={handleEditProfile}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Onboarding Tasks</CardTitle>
                  <CardDescription>Required tasks for client onboarding</CardDescription>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload on Behalf
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>Upload a document on behalf of the client.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="task">Select Task</Label>
                        <Select value={selectedTask} onValueChange={setSelectedTask}>
                          <SelectTrigger id="task">
                            <SelectValue placeholder="Select task" />
                          </SelectTrigger>
                          <SelectContent>
                            {tasks
                              .filter((task) => task.status === "pending")
                              .map((task) => (
                                <SelectItem key={task.id} value={task.id}>
                                  {task.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FileUpload onUploadComplete={handleUploadComplete} disabled={!selectedTask} />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {task.status === "approved" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                          ) : task.status === "rejected" ? (
                            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center mr-3">
                              {task.status === "received" || task.status === "reviewed" ? (
                                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                              ) : null}
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <StatusBadge status={task.status as any} />
                      </div>

                      {(task.uploadDate || task.reviewDate) && (
                        <div className="mt-4 pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {task.uploadDate && (
                            <div className="flex items-center text-muted-foreground">
                              <Upload className="h-4 w-4 mr-2" />
                              <span>Uploaded: {task.uploadDate}</span>
                            </div>
                          )}
                          {task.reviewDate && (
                            <div className="flex items-center text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              <span>Reviewed: {task.reviewDate}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>All documents uploaded by the client</CardDescription>
                </div>
                <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Update Document Status</DialogTitle>
                      <DialogDescription>Change the status of the selected document.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Select Status</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleStatusChange}>Update Status</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium text-sm">Document Name</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Upload Date</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((document) => (
                        <tr key={document.id} className="border-t">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                              <div>
                                <div className="font-medium">{document.name}</div>
                                <div className="text-xs text-muted-foreground">{document.fileName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{document.type}</td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                              {document.uploadDate}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={document.status as any} />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDocument(document.id)
                                  setNewStatus("")
                                  setIsStatusDialogOpen(true)
                                }}
                              >
                                Change Status
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {documents.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No documents have been uploaded yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent activity for this client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 border-b pb-4 last:border-0 last:pb-0">
                      <div className="mt-0.5">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-sm text-muted-foreground ml-2">• {activity.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">By {activity.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-end">
                <Button variant="outline" onClick={() => toast({ title: "Activity log exported" })}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Activity Log
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
