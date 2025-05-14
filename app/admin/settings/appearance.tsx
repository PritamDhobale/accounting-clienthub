"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"
import { useTheme } from "next-themes"

export function AppearanceSettings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState({
    theme: theme || "light",
    accentColor: "blue",
    compactMode: false,
    showWelcomeMessage: true,
  })

  const handleThemeChange = (value: string) => {
    setSettings({ ...settings, theme: value })
    setTheme(value)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>Customize the look and feel of the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Color Theme</Label>
              <Select value={settings.theme} onValueChange={handleThemeChange}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose the color theme for the application</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <Select value={settings.accentColor} onValueChange={(value) => handleSettingChange("accentColor", value)}>
                <SelectTrigger id="accent-color">
                  <SelectValue placeholder="Select accent color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose the accent color for buttons and highlights</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Layout</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-mode">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Use a more compact layout with less whitespace</p>
              </div>
              <Switch
                id="compact-mode"
                checked={settings.compactMode}
                onCheckedChange={(checked) => handleSettingChange("compactMode", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="welcome-message">Show Welcome Message</Label>
                <p className="text-sm text-muted-foreground">Show a welcome message on the dashboard</p>
              </div>
              <Switch
                id="welcome-message"
                checked={settings.showWelcomeMessage}
                onCheckedChange={(checked) => handleSettingChange("showWelcomeMessage", checked)}
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
  )
}
