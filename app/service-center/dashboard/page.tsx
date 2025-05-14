import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Users, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ServiceCenterDashboard() {
  // Mock data for service center dashboard
  const stats = [
    {
      title: "Assigned Clients",
      value: "12",
      icon: Users,
    },
    {
      title: "Pending Reviews",
      value: "5",
      icon: FileText,
    },
    {
      title: "Completed Reviews",
      value: "28",
      icon: CheckCircle2,
    },
    {
      title: "New Uploads",
      value: "7",
      icon: Bell,
    },
  ]

  const recentUploads = [
    {
      id: 1,
      client: "Acme Inc.",
      clientId: "1",
      document: "Bank Statements",
      uploadTime: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      client: "TechStart LLC",
      clientId: "2",
      document: "Credit Card Statements",
      uploadTime: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      client: "Global Services Co.",
      clientId: "3",
      document: "Tax Returns",
      uploadTime: "1 day ago",
      status: "pending",
    },
    {
      id: 4,
      client: "Innovative Solutions",
      clientId: "4",
      document: "Payroll Reports",
      uploadTime: "2 days ago",
      status: "reviewed",
    },
    {
      id: 5,
      client: "Premier Consulting",
      clientId: "5",
      document: "Asset List",
      uploadTime: "3 days ago",
      status: "reviewed",
    },
  ]

  const assignedClients = [
    { id: 1, name: "Acme Inc.", progress: 60, pendingTasks: 2, completedTasks: 3 },
    { id: 2, name: "TechStart LLC", progress: 40, pendingTasks: 3, completedTasks: 2 },
    { id: 3, name: "Global Services Co.", progress: 80, pendingTasks: 1, completedTasks: 4 },
    { id: 4, name: "Innovative Solutions", progress: 100, pendingTasks: 0, completedTasks: 5 },
  ]

  return (
    <DashboardLayout role="service-center">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Center Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor assigned clients and review uploaded documents</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div className="rounded-full bg-muted p-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="uploads">
          <TabsList>
            <TabsTrigger value="uploads">Recent Uploads</TabsTrigger>
            <TabsTrigger value="clients">Assigned Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="uploads" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Document Uploads</CardTitle>
                <CardDescription>Documents that need your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Client</th>
                        <th className="text-left py-3 px-4 font-medium">Document</th>
                        <th className="text-left py-3 px-4 font-medium">Upload Time</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUploads.map((upload) => (
                        <tr key={upload.id} className="border-b last:border-0">
                          <td className="py-3 px-4">
                            <div className="font-medium">{upload.client}</div>
                          </td>
                          <td className="py-3 px-4">{upload.document}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{upload.uploadTime}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={upload.status as any} />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/service-center/documents/${upload.id}`}>Review</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/service-center/documents">View All Documents</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Assigned Clients</CardTitle>
                <CardDescription>Clients assigned to your service center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assignedClients.map((client) => (
                    <div key={client.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {client.completedTasks} of {client.completedTasks + client.pendingTasks} tasks completed
                            </span>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/service-center/clients/${client.id}`}>View</Link>
                        </Button>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${client.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>{client.progress}% Complete</span>
                        {client.pendingTasks > 0 ? (
                          <span className="text-yellow-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {client.pendingTasks} pending tasks
                          </span>
                        ) : (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            All tasks complete
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/service-center/clients">View All Clients</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
