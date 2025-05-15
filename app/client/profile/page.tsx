"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Building, Mail, Phone, MapPin, User, Edit2, Save, X } from "lucide-react"

export default function ClientProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock client profile data
  const [profile, setProfile] = useState({
    businessName: "Acme Inc.",
    businessEmail: "info@acmeinc.com",
    businessPhone: "(555) 123-4567",
    businessAddress: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://www.acmeinc.com",
    federalEIN: "12-3456789",
    stateTaxID: "CA-987654321",
    primaryContactName: "John Smith",
    primaryContactTitle: "CEO",
    primaryContactEmail: "john@acmeinc.com",
    primaryContactPhone: "(555) 987-6543",
    entityType: "LLC",
    stateOfIncorporation: "California",
    fiscalYearEnd: "December",
  })

  const [editedProfile, setEditedProfile] = useState({ ...profile })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-2">View and manage your business profile information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="business" className="space-y-4">
          <TabsList>
            <TabsTrigger value="business">Business Information</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Your business information on record with ClientHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm">Business Name</span>
                    </div>
                    {isEditing ? (
                      <Input name="businessName" value={editedProfile.businessName} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.businessName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">Business Email</span>
                    </div>
                    {isEditing ? (
                      <Input name="businessEmail" value={editedProfile.businessEmail} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.businessEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">Business Phone</span>
                    </div>
                    {isEditing ? (
                      <Input name="businessPhone" value={editedProfile.businessPhone} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.businessPhone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">Business Address</span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="businessAddress"
                        value={editedProfile.businessAddress}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.businessAddress}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Website</Label>
                    {isEditing ? (
                      <Input name="website" value={editedProfile.website} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.website}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Federal EIN</Label>
                    {isEditing ? (
                      <Input name="federalEIN" value={editedProfile.federalEIN} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.federalEIN}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">State Tax ID</Label>
                    {isEditing ? (
                      <Input name="stateTaxID" value={editedProfile.stateTaxID} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.stateTaxID}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Entity Type</Label>
                    {isEditing ? (
                      <Input name="entityType" value={editedProfile.entityType} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.entityType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">State of Incorporation</Label>
                    {isEditing ? (
                      <Input
                        name="stateOfIncorporation"
                        value={editedProfile.stateOfIncorporation}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.stateOfIncorporation}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Fiscal Year End</Label>
                    {isEditing ? (
                      <Input name="fiscalYearEnd" value={editedProfile.fiscalYearEnd} onChange={handleInputChange} />
                    ) : (
                      <p className="font-medium">{profile.fiscalYearEnd}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Primary Contact</CardTitle>
                <CardDescription>Your primary contact information on record with ClientHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">Contact Name</span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="primaryContactName"
                        value={editedProfile.primaryContactName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.primaryContactName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm">Title</span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="primaryContactTitle"
                        value={editedProfile.primaryContactTitle}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.primaryContactTitle}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">Email</span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="primaryContactEmail"
                        value={editedProfile.primaryContactEmail}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.primaryContactEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">Phone</span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="primaryContactPhone"
                        value={editedProfile.primaryContactPhone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium">{profile.primaryContactPhone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  This information is used for all communications regarding your account and onboarding process.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
