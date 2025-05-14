"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter, ArrowUpDown, FileText, Eye, CheckCircle, XCircle } from "lucide-react"

// Mock document data
const initialDocuments = [
  {
    id: 1,
    client: "Acme Inc.",
    documentType: "Bank Statements",
    uploadDate: "May 11, 2025",
    status: "pending",
    fileName: "acme_bank_statements_q1_2025.pdf",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    client: "TechStart LLC",
    documentType: "Credit Card Statements",
    uploadDate: "May 10, 2025",
    status: "pending",
    fileName: "techstart_cc_statements_q1_2025.pdf",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    client: "Global Services Co.",
    documentType: "Tax Returns",
    uploadDate: "May 9, 2025",
    status: "pending",
    fileName: "global_tax_returns_2024.pdf",
    fileSize: "3.2 MB",
  },
  {
    id: 4,
    client: "Innovative Solutions",
    documentType: "Payroll Reports",
    uploadDate: "May 8, 2025",
    status: "reviewed",
    fileName: "innovative_payroll_q1_2025.xlsx",
    fileSize: "1.5 MB",
  },
  {
    id: 5,
    client: "Premier Consulting",
    documentType: "Asset List",
    uploadDate: "May 7, 2025",
    status: "reviewed",
    fileName: "premier_asset_list_2025.xlsx",
    fileSize: "0.9 MB",
  },
  {
    id: 6,
    client: "Bright Future Inc.",
    documentType: "QuickBooks Access",
    uploadDate: "May 6, 2025",
    status: "approved",
    fileName: "bright_qb_access_confirmation.pdf",
    fileSize: "0.5 MB",
  },
  {
    id: 7,
    client: "Stellar Group",
    documentType: "Loan Statements",
    uploadDate: "May 5, 2025",
    status: "approved",
    fileName: "stellar_loan_statements_q1_2025.pdf",
    fileSize: "1.2 MB",
  },
  {
    id: 8,
    client: "Apex Industries",
    documentType: "Bank Statements",
    uploadDate: "May 4, 2025",
    status: "rejected",
    fileName: "apex_bank_statements_q1_2025.pdf",
    fileSize: "2.1 MB",
  },
]

export default function ServiceCenterDocuments() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all")

  // Filter documents based on search term and filters
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesDocumentType = documentTypeFilter === "all" || doc.documentType === documentTypeFilter

    return matchesSearch && matchesStatus && matchesDocumentType
  })

  // Handle document status change
  const handleStatusChange = (documentId: number, newStatus: string) => {
    setDocuments(documents.map((doc) => (doc.id === documentId ? { ...doc, status: newStatus } : doc)))
  }

  return (
    <DashboardLayout role="service-center">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-2">Review and manage client documents</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Document List</CardTitle>
            <CardDescription>View and review client documents</CardDescription>
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
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
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
                      <SelectItem value="QuickBooks Access">QuickBooks Access</SelectItem>
                      <SelectItem value="Loan Statements">Loan Statements</SelectItem>
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
                          Client
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Document Type
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          File
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Upload Date
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm">
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((document) => (
                      <tr key={document.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="font-medium">{document.client}</div>
                        </td>
                        <td className="py-3 px-4 text-sm">{document.documentType}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm font-medium truncate max-w-[200px]">{document.fileName}</div>
                              <div className="text-xs text-muted-foreground">{document.fileSize}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{document.uploadDate}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={document.status as any} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" title="View Document">
                              <Eye className="h-4 w-4" />
                            </Button>

                            {document.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-500 hover:text-green-600"
                                  title="Mark as Reviewed"
                                  onClick={() => handleStatusChange(document.id, "reviewed")}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  title="Reject Document"
                                  onClick={() => handleStatusChange(document.id, "rejected")}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}

                            {document.status === "reviewed" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500 hover:text-green-600"
                                title="Mark as Approved"
                                onClick={() => handleStatusChange(document.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}

                            <Button variant="ghost" size="icon" title="Download Document">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
