"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Building, Mail, Phone, MapPin, User, Edit2, Save, X, Upload, FileSignature } from "lucide-react"

export default function ServiceCenterProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  // Mock service center profile data
  const [profile, setProfile] = useState({
    name: "East Coast Team",
    email: "eastcoast@clienthub.com",
    phone: "(212) 555-1234",
    location: "New York, NY",
    manager: "Sarah Johnson",
    managerEmail: "sarah@clienthub.com",
    managerPhone: "(212) 555-5678",
    regions: "New York, New Jersey, Connecticut, Massachusetts",
    clientCapacity: "15",
    currentClients: "8",
    avatar: "",
    signature: "",
  })

  const [editedProfile, setEditedProfile] = useState({ ...profile })

  // Mock password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
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

  const handlePasswordSave = () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)
    setEditedProfile({ ...editedProfile, avatar: imageUrl })
    setProfile({ ...profile, avatar: imageUrl })

    toast({
      title: "Avatar uploaded",
      description: "Your profile picture has been updated.",
    })
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)
    setEditedProfile({ ...editedProfile, signature: imageUrl })
    setProfile({ ...profile, signature: imageUrl })

    toast({
      title: "Signature uploaded",
      description: "Your digital signature has been updated.",
    })
  }

  return (
    <DashboardLayout role="service-center">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-2">View and manage your service center profile</p>
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

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar || ""} alt={profile.name} />
                <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
              <Button variant="outline" className="mt-4 w-full" onClick={() => avatarInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList>
                <TabsTrigger value="details">Service Center Details</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="signature">Digital Signature</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Center Information</CardTitle>
                    <CardDescription>Your service center details on record with ClientHub</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="text-sm">Service Center Name</span>
                        </div>
                        {isEditing ? (
                          <Input name="name" value={editedProfile.name} onChange={handleInputChange} />
                        ) : (
                          <p className="font-medium">{profile.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm">Email</span>
                        </div>
                        {isEditing ? (
                          <Input name="email" value={editedProfile.email} onChange={handleInputChange} />
                        ) : (
                          <p className="font-medium">{profile.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="text-sm">Phone</span>
                        </div>
                        {isEditing ? (
                          <Input name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                        ) : (
                          <p className="font-medium">{profile.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">Location</span>
                        </div>
                        {isEditing ? (
                          <Input name="location" value={editedProfile.location} onChange={handleInputChange} />
                        ) : (
                          <p className="font-medium">{profile.location}</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Manager Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-sm">Manager Name</span>
                          </div>
                          {isEditing ? (
                            <Input name="manager" value={editedProfile.manager} onChange={handleInputChange} />
                          ) : (
                            <p className="font-medium">{profile.manager}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Mail className="h-4 w-4 mr-2" />
                            <span className="text-sm">Manager Email</span>
                          </div>
                          {isEditing ? (
                            <Input
                              name="managerEmail"
                              value={editedProfile.managerEmail}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="font-medium">{profile.managerEmail}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Phone className="h-4 w-4 mr-2" />
                            <span className="text-sm">Manager Phone</span>
                          </div>
                          {isEditing ? (
                            <Input
                              name="managerPhone"
                              value={editedProfile.managerPhone}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="font-medium">{profile.managerPhone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Coverage & Capacity</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">Regions Covered</span>
                          </div>
                          {isEditing ? (
                            <Input name="regions" value={editedProfile.regions} onChange={handleInputChange} />
                          ) : (
                            <p className="font-medium">{profile.regions}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-sm">Client Capacity</span>
                          </div>
                          {isEditing ? (
                            <Input
                              name="clientCapacity"
                              value={editedProfile.clientCapacity}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="font-medium">{profile.clientCapacity}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-sm">Current Clients</span>
                          </div>
                          <p className="font-medium">{profile.currentClients}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="text-sm font-medium">
                        Current Password
                      </label>
                      <Input
                        id="current-password"
                        name="currentPassword"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input
                        id="new-password"
                        name="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <Button onClick={handlePasswordSave} className="mt-2">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signature">
                <Card>
                  <CardHeader>
                    <CardTitle>Digital Signature</CardTitle>
                    <CardDescription>Upload your digital signature for document approvals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 w-full max-w-md flex flex-col items-center justify-center">
                        {profile.signature ? (
                          <div className="mb-4">
                            <img
                              src={profile.signature || "/placeholder.svg"}
                              alt="Digital Signature"
                              className="max-h-32 max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="text-center text-muted-foreground mb-4">
                            <FileSignature className="h-16 w-16 mx-auto mb-2" />
                            <p>No signature uploaded</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={signatureInputRef}
                          onChange={handleSignatureUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button variant="outline" onClick={() => signatureInputRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          {profile.signature ? "Update Signature" : "Upload Signature"}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upload a clear image of your signature. This will be used for document approvals.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
