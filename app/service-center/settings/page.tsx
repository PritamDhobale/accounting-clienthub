"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Building, Mail, Phone, MapPin, User, Edit2, Save, X, Upload, Bell, Shield } from "lucide-react"

export default function ServiceCenterSettings() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock service center profile data
  const [profile, setProfile] = useState({
    name: "East Coast Team",
    email: "eastcoast@clienthub.com",
    phone: "(212) 555-1234",
    region: "Northeast",
    avatar: "",
    signature: "",
  })

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    documentUploads: true,
    documentReviews: true,
    clientAssignments: true,
    dailyDigest: false,
    weeklyReport: true,
  })

  // Mock password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [editedProfile, setEditedProfile] = useState({ ...profile })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    })
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

  const handleNotificationSave = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  return (
    <DashboardLayout role="service-center">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your service center settings and preferences</p>
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

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
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
                  <Button variant="outline" className="mt-4 w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Service Center Information</CardTitle>
                  <CardDescription>Update your service center details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Service Center Name</Label>
                      {isEditing ? (
                        <Input id="name" name="name" value={editedProfile.name} onChange={handleInputChange} />
                      ) : (
                        <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                          <Building className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{profile.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input id="email" name="email" value={editedProfile.email} onChange={handleInputChange} />
                      ) : (
                        <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Phone</Label>
                      {isEditing ? (
                        <Input id="phone" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                      ) : (
                        <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Assigned Region</Label>
                      {isEditing ? (
                        <Select
                          value={editedProfile.region}
                          onValueChange={(value) => setEditedProfile({ ...editedProfile, region: value })}
                        >
                          <SelectTrigger id="region">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Northeast">Northeast</SelectItem>
                            <SelectItem value="Southeast">Southeast</SelectItem>
                            <SelectItem value="Midwest">Midwest</SelectItem>
                            <SelectItem value="Southwest">Southwest</SelectItem>
                            <SelectItem value="West">West</SelectItem>
                            <SelectItem value="International">International</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{profile.region}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Digital Signature</Label>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                      {profile.signature ? (
                        <div className="w-64 h-24 bg-muted/50 rounded-md flex items-center justify-center">
                          <img
                            src={profile.signature || "/placeholder.svg"}
                            alt="Digital Signature"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-64 h-24 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
                          No signature uploaded
                        </div>
                      )}
                      <Button variant="outline" className="mt-4">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Signature
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="document-uploads">Document Uploads</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when clients upload new documents
                        </p>
                      </div>
                      <Switch
                        id="document-uploads"
                        checked={notificationSettings.documentUploads}
                        onCheckedChange={() => handleNotificationChange("documentUploads")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="document-reviews">Document Reviews</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when documents are reviewed by others
                        </p>
                      </div>
                      <Switch
                        id="document-reviews"
                        checked={notificationSettings.documentReviews}
                        onCheckedChange={() => handleNotificationChange("documentReviews")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="client-assignments">Client Assignments</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when new clients are assigned to you
                        </p>
                      </div>
                      <Switch
                        id="client-assignments"
                        checked={notificationSettings.clientAssignments}
                        onCheckedChange={() => handleNotificationChange("clientAssignments")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Summary Reports</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="daily-digest">Daily Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive a daily summary of all activities</p>
                      </div>
                      <Switch
                        id="daily-digest"
                        checked={notificationSettings.dailyDigest}
                        onCheckedChange={() => handleNotificationChange("dailyDigest")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-report">Weekly Report</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary report of all client progress
                        </p>
                      </div>
                      <Switch
                        id="weekly-report"
                        checked={notificationSettings.weeklyReport}
                        onCheckedChange={() => handleNotificationChange("weeklyReport")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardFooter>
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
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePasswordSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
