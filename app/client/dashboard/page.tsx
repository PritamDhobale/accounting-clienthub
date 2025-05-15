import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, FileDown, Clock } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  // Mock data for client dashboard
  const completedTasks = 3
  const totalTasks = 7
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  const recentActivity = [
    { id: 1, task: "Bank Statements", status: "approved", date: "May 11, 2025" },
    { id: 2, task: "Credit Card Statements", status: "received", date: "May 10, 2025" },
    { id: 3, task: "QuickBooks Access", status: "approved", date: "May 9, 2025" },
  ]

  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to ClientHub</h1>
          <p className="text-muted-foreground mt-2">Track your onboarding progress and complete required tasks</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>Your current onboarding status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {completedTasks} of {totalTasks} tasks completed
                  </span>
                  <span className="text-sm font-medium">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/client/tasks">Continue Onboarding</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Documents</CardTitle>
              <CardDescription>Your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploaded</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-sm font-medium">4</span>
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/client/documents">View Documents</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Engagement Agreement</CardTitle>
              <CardDescription>Your contract with ClientHub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span>Agreement signed on May 8, 2025</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download Agreement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">{activity.task}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <StatusBadge status={activity.status as any} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Important updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 border-b pb-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tax Returns Required</p>
                    <p className="text-xs text-muted-foreground">
                      Please upload your most recent tax returns to continue the onboarding process.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Link href="/client/tasks">Upload Now</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Bank Statements Approved</p>
                    <p className="text-xs text-muted-foreground">
                      Your bank statements have been reviewed and approved by the service center.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
