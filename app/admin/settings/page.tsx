"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Clock, Palette, Shield } from "lucide-react"
import { AppearanceSettings } from "./appearance"

export default function AdminSettings() {
  const { toast } = useToast()

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    documentUploads: true,
    documentReviews: true,
    clientCreation: true,
    taskCompletions: false,
    dailyDigest: true,
    weeklyReport: true,
  })

  // Onboarding settings
  const [onboardingSettings, setOnboardingSettings] = useState({
    documentUploadDeadline: "7",
    reminderFrequency: "3",
    autoCloseInactiveTasks: "30",
    autoAssignServiceCenter: true,
    requireAllDocuments: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    ipRestriction: false,
  })

  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    })
  }

  const handleOnboardingChange = (key: string, value: string | boolean) => {
    setOnboardingSettings({
      ...onboardingSettings,
      [key]: value,
    })
  }

  const handleSecurityChange = (key: string, value: string | boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: value,
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Configure system-wide settings for ClientHub</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Onboarding
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
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
                          Receive notifications when service centers review documents
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
                        <Label htmlFor="client-creation">Client Creation</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when new clients are created
                        </p>
                      </div>
                      <Switch
                        id="client-creation"
                        checked={notificationSettings.clientCreation}
                        onCheckedChange={() => handleNotificationChange("clientCreation")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="task-completions">Task Completions</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when onboarding tasks are completed
                        </p>
                      </div>
                      <Switch
                        id="task-completions"
                        checked={notificationSettings.taskCompletions}
                        onCheckedChange={() => handleNotificationChange("taskCompletions")}
                      />
                    </div>
                  </div>
                </div>

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
                          Receive a weekly summary report of all onboarding progress
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
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Settings</CardTitle>
                <CardDescription>Configure default onboarding rules and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Deadlines and Reminders</h3>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="document-deadline">Document Upload Deadline (days)</Label>
                        <Select
                          value={onboardingSettings.documentUploadDeadline}
                          onValueChange={(value) => handleOnboardingChange("documentUploadDeadline", value)}
                        >
                          <SelectTrigger id="document-deadline">
                            <SelectValue placeholder="Select days" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Default deadline for clients to upload required documents
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reminder-frequency">Reminder Frequency (days)</Label>
                        <Select
                          value={onboardingSettings.reminderFrequency}
                          onValueChange={(value) => handleOnboardingChange("reminderFrequency", value)}
                        >
                          <SelectTrigger id="reminder-frequency">
                            <SelectValue placeholder="Select days" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">2 days</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">How often to send reminders for pending tasks</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="auto-close">Auto-close Inactive Tasks (days)</Label>
                      <Select
                        value={onboardingSettings.autoCloseInactiveTasks}
                        onValueChange={(value) => handleOnboardingChange("autoCloseInactiveTasks", value)}
                      >
                        <SelectTrigger id="auto-close">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Automatically close tasks that have been inactive for the specified period
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Onboarding Rules</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-assign">Auto-assign Service Center</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically assign new clients to service centers based on availability
                        </p>
                      </div>
                      <Switch
                        id="auto-assign"
                        checked={onboardingSettings.autoAssignServiceCenter}
                        onCheckedChange={(checked) => handleOnboardingChange("autoAssignServiceCenter", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-all">Require All Documents</Label>
                        <p className="text-sm text-muted-foreground">
                          Require all documents to be uploaded before completing onboarding
                        </p>
                      </div>
                      <Switch
                        id="require-all"
                        checked={onboardingSettings.requireAllDocuments}
                        onCheckedChange={(checked) => handleOnboardingChange("requireAllDocuments", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all admin users
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                      >
                        <SelectTrigger id="session-timeout">
                          <SelectValue placeholder="Select minutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Automatically log out users after a period of inactivity
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                      <Select
                        value={securitySettings.passwordExpiry}
                        onValueChange={(value) => handleSecurityChange("passwordExpiry", value)}
                      >
                        <SelectTrigger id="password-expiry">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Force password change after the specified period</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ip-restriction">IP Restriction</Label>
                        <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch
                        id="ip-restriction"
                        checked={securitySettings.ipRestriction}
                        onCheckedChange={(checked) => handleSecurityChange("ipRestriction", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
