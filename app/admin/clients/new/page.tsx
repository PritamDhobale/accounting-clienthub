"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewClient() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessStartDate: "",
    businessAddressMailing: "",
    businessAddressPhysical: "",
    businessPhone: "",
    businessEmail: "",
    website: "",
    federalEIN: "",
    stateTaxID: "",

    // Contact Information
    primaryContactName: "",
    primaryContactTitle: "",
    primaryContactPhone: "",
    primaryContactEmail: "",
    additionalContacts: "",

    // Ownership & Structure
    entityType: "",
    stateOfIncorporation: "",
    ownersList: "",
    foreignOwners: "no",

    // Accounting & Bookkeeping
    accountingSoftware: "",
    currentBookkeeper: "no",
    historicalBookkeeping: "no",
    fiscalYearEnd: "",

    // Financial Operations
    bankAccounts: "",
    separateCreditCard: "no",
    employeeCount: "",
    payrollSystem: "",
    salesTax: "no",
    onlineSales: "",

    // Other
    notes: "",

    // Assignment
    serviceCenter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the data to an API
    toast({
      title: "Client created successfully",
      description: `${formData.businessName} has been added to your client list.`,
    })

    // Redirect to clients page
    router.push("/admin/clients")
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Client</h1>
            <p className="text-muted-foreground mt-2">Add a new client to begin the onboarding process</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="business" className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-[800px]">
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="ownership">Ownership</TabsTrigger>
              <TabsTrigger value="accounting">Accounting</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="assignment">Assignment</TabsTrigger>
            </TabsList>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Enter the basic information about the business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Legal Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessStartDate">Business Start Date</Label>
                      <Input
                        id="businessStartDate"
                        name="businessStartDate"
                        type="date"
                        value={formData.businessStartDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddressMailing">Business Address (Mailing) *</Label>
                    <Input
                      id="businessAddressMailing"
                      name="businessAddressMailing"
                      value={formData.businessAddressMailing}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddressPhysical">Business Address (Physical, if different)</Label>
                    <Input
                      id="businessAddressPhysical"
                      name="businessAddressPhysical"
                      value={formData.businessAddressPhysical}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessPhone">Business Phone Number *</Label>
                      <Input
                        id="businessPhone"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessEmail">Business Email Address *</Label>
                      <Input
                        id="businessEmail"
                        name="businessEmail"
                        type="email"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (if applicable)</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="federalEIN">Federal EIN *</Label>
                      <Input
                        id="federalEIN"
                        name="federalEIN"
                        value={formData.federalEIN}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stateTaxID">State Tax ID Number (if applicable)</Label>
                    <Input id="stateTaxID" name="stateTaxID" value={formData.stateTaxID} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Enter the primary contact details for this client</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
                      <Input
                        id="primaryContactName"
                        name="primaryContactName"
                        value={formData.primaryContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactTitle">Primary Contact Title</Label>
                      <Input
                        id="primaryContactTitle"
                        name="primaryContactTitle"
                        value={formData.primaryContactTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactPhone">Primary Contact Phone *</Label>
                      <Input
                        id="primaryContactPhone"
                        name="primaryContactPhone"
                        value={formData.primaryContactPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactEmail">Primary Contact Email *</Label>
                      <Input
                        id="primaryContactEmail"
                        name="primaryContactEmail"
                        type="email"
                        value={formData.primaryContactEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalContacts">Additional Contact(s)</Label>
                    <Textarea
                      id="additionalContacts"
                      name="additionalContacts"
                      placeholder="Name, Role, Email, Phone (one per line)"
                      value={formData.additionalContacts}
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ownership">
              <Card>
                <CardHeader>
                  <CardTitle>Ownership & Structure</CardTitle>
                  <CardDescription>Enter information about the business structure and ownership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entityType">Business Entity Type *</Label>
                      <Select
                        value={formData.entityType}
                        onValueChange={(value) => handleSelectChange("entityType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="c-corp">C-Corporation</SelectItem>
                          <SelectItem value="s-corp">S-Corporation</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="non-profit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stateOfIncorporation">State of Incorporation/Formation</Label>
                      <Input
                        id="stateOfIncorporation"
                        name="stateOfIncorporation"
                        value={formData.stateOfIncorporation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownersList">List of Owners/Shareholders and Ownership Percentages</Label>
                    <Textarea
                      id="ownersList"
                      name="ownersList"
                      placeholder="Name, Percentage (one per line)"
                      value={formData.ownersList}
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foreignOwners">Are there any foreign owners?</Label>
                    <Select
                      value={formData.foreignOwners}
                      onValueChange={(value) => handleSelectChange("foreignOwners", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accounting">
              <Card>
                <CardHeader>
                  <CardTitle>Accounting & Bookkeeping</CardTitle>
                  <CardDescription>Enter information about the client's accounting practices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountingSoftware">Current accounting software used (if any)</Label>
                    <Select
                      value={formData.accountingSoftware}
                      onValueChange={(value) => handleSelectChange("accountingSoftware", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select software" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quickbooks-online">QuickBooks Online</SelectItem>
                        <SelectItem value="quickbooks-desktop">QuickBooks Desktop</SelectItem>
                        <SelectItem value="xero">Xero</SelectItem>
                        <SelectItem value="freshbooks">FreshBooks</SelectItem>
                        <SelectItem value="sage">Sage</SelectItem>
                        <SelectItem value="wave">Wave</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentBookkeeper">Do you have a current bookkeeper or accountant?</Label>
                    <Select
                      value={formData.currentBookkeeper}
                      onValueChange={(value) => handleSelectChange("currentBookkeeper", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="historicalBookkeeping">Do you need us to take over historical bookkeeping?</Label>
                    <Select
                      value={formData.historicalBookkeeping}
                      onValueChange={(value) => handleSelectChange("historicalBookkeeping", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fiscalYearEnd">Fiscal year end (month)</Label>
                    <Select
                      value={formData.fiscalYearEnd}
                      onValueChange={(value) => handleSelectChange("fiscalYearEnd", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="november">November</SelectItem>
                        <SelectItem value="december">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Operations</CardTitle>
                  <CardDescription>Enter information about the client's financial operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankAccounts">Number of bank accounts used for the business</Label>
                    <Input
                      id="bankAccounts"
                      name="bankAccounts"
                      type="number"
                      min="0"
                      value={formData.bankAccounts}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="separateCreditCard">Do you use a separate credit card for business expenses?</Label>
                    <Select
                      value={formData.separateCreditCard}
                      onValueChange={(value) => handleSelectChange("separateCreditCard", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Number of employees or contractors (approx.)</Label>
                    <Input
                      id="employeeCount"
                      name="employeeCount"
                      type="number"
                      min="0"
                      value={formData.employeeCount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payrollSystem">Payroll system used (if any)</Label>
                    <Input
                      id="payrollSystem"
                      name="payrollSystem"
                      value={formData.payrollSystem}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salesTax">Do you charge sales tax?</Label>
                    <Select value={formData.salesTax} onValueChange={(value) => handleSelectChange("salesTax", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="onlineSales">
                      Do you sell products/services online? If so, through which platforms?
                    </Label>
                    <Input id="onlineSales" name="onlineSales" value={formData.onlineSales} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Other Notes or Special Considerations</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Please let us know anything else we should be aware of – unique operations, concerns, goals, etc."
                      value={formData.notes}
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignment">
              <Card>
                <CardHeader>
                  <CardTitle>Service Center Assignment</CardTitle>
                  <CardDescription>Assign this client to a service center</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceCenter">Assign to Service Center *</Label>
                    <Select
                      value={formData.serviceCenter}
                      onValueChange={(value) => handleSelectChange("serviceCenter", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="east-coast">East Coast Team</SelectItem>
                        <SelectItem value="west-coast">West Coast Team</SelectItem>
                        <SelectItem value="central">Central Team</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-6">
                    <Button type="submit" className="mr-2">
                      <Save className="h-4 w-4 mr-2" />
                      Create Client
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/admin/clients">Cancel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </DashboardLayout>
  )
}
