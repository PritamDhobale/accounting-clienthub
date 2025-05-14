"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Search, Filter, Plus, Calendar, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock document data
const initialDocuments = [
  {
    id: 1,
    name: "Bank Statements Q1 2025",
    type: "Bank Statements",
    uploadDate: "May 11, 2025",
    status: "approved",
    fileName: "bank_statements_q1_2025.pdf",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    name: "Credit Card Statements Q1 2025",
    type: "Credit Card Statements",
    uploadDate: "May 10, 2025",
    status: "received",
    fileName: "cc_statements_q1_2025.pdf",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    name: "Tax Returns 2024",
    type: "Tax Returns",
    uploadDate: "May 9, 2025",
    status: "pending",
    fileName: "tax_returns_2024.pdf",
    fileSize: "3.2 MB",
  },
  {
    id: 4,
    name: "Payroll Reports Q1 2025",
    type: "Payroll Reports",
    uploadDate: "May 8, 2025",
    status: "rejected",
    fileName: "payroll_q1_2025.xlsx",
    fileSize: "1.5 MB",
    rejectionReason: "Missing employee details. Please include complete payroll information.",
  },
  {
    id: 5,
    name: "Asset List 2025",
    type: "Asset List",
    uploadDate: "May 7, 2025",
    status: "approved",
    fileName: "asset_list_2025.xlsx",
    fileSize: "0.9 MB",
  },
]

export default function ClientDocuments() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [newDocumentType, setNewDocumentType] = useState("")
  const { toast } = useToast()

  // Filter documents based on search term and filters
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleUploadComplete = (file: File) => {
    if (!newDocumentType) return

    // Create a new document entry
    const newDocument = {
      id: documents.length + 1,
      name: file.name.split(".")[0].replace(/_/g, " "),
      type: newDocumentType,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "pending",
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }

    setDocuments([newDocument, ...documents])
    setIsUploadDialogOpen(false)
    setNewDocumentType("")

    toast({
      title: "Document uploaded",
      description: "Your document has been uploaded and is pending review.",
    })
  }

  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-2">View and manage your uploaded documents</p>
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Upload a document for your onboarding process.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="document-type" className="text-sm font-medium">
                    Document Type
                  </label>
                  <Select value={newDocumentType} onValueChange={setNewDocumentType}>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Statements">Bank Statements</SelectItem>
                      <SelectItem value="Credit Card Statements">Credit Card Statements</SelectItem>
                      <SelectItem value="Tax Returns">Tax Returns</SelectItem>
                      <SelectItem value="Payroll Reports">Payroll Reports</SelectItem>
                      <SelectItem value="Asset List">Asset List</SelectItem>
                      <SelectItem value="Loan Statements">Loan Statements</SelectItem>
                      <SelectItem value="W-9 Forms">W-9 Forms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FileUpload onUploadComplete={handleUploadComplete} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Document Library</CardTitle>
            <CardDescription>All documents you've uploaded for your onboarding process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
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
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Bank Statements">Bank Statements</SelectItem>
                      <SelectItem value="Credit Card Statements">Credit Card Statements</SelectItem>
                      <SelectItem value="Tax Returns">Tax Returns</SelectItem>
                      <SelectItem value="Payroll Reports">Payroll Reports</SelectItem>
                      <SelectItem value="Asset List">Asset List</SelectItem>
                      <SelectItem value="Loan Statements">Loan Statements</SelectItem>
                      <SelectItem value="W-9 Forms">W-9 Forms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
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
                        {filteredDocuments.map((document) => (
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
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="grid">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((document) => (
                      <Card key={document.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-primary mr-3" />
                              <div>
                                <h3 className="font-medium">{document.name}</h3>
                                <p className="text-xs text-muted-foreground">{document.fileName}</p>
                              </div>
                            </div>
                            <StatusBadge status={document.status as any} />
                          </div>
                          <div className="mt-4 flex items-center justify-between text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {document.uploadDate}
                            </div>
                            <div className="text-muted-foreground">{document.fileSize}</div>
                          </div>
                          {document.status === "rejected" && document.rejectionReason && (
                            <div className="mt-3 text-sm text-red-500 bg-red-500/10 p-2 rounded-md">
                              {document.rejectionReason}
                            </div>
                          )}
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No documents found matching your filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
