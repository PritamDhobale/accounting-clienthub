import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Users, Building, FileText, ArrowUpRight, ArrowDownRight, Plus, Download } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const stats = [
    {
      title: "Total Clients",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Onboardings",
      value: "8",
      change: "+3",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Service Centers",
      value: "5",
      change: "0",
      trend: "neutral",
      icon: Building,
    },
    {
      title: "Completed This Month",
      value: "7",
      change: "+40%",
      trend: "up",
      icon: BarChart,
    },
  ]

  const recentClients = [
    { id: 1, name: "Acme Inc.", status: "pending", serviceCenter: "East Coast Team", lastUpdated: "2 hours ago" },
    { id: 2, name: "TechStart LLC", status: "received", serviceCenter: "West Coast Team", lastUpdated: "5 hours ago" },
    { id: 3, name: "Global Services Co.", status: "reviewed", serviceCenter: "Central Team", lastUpdated: "1 day ago" },
    {
      id: 4,
      name: "Innovative Solutions",
      status: "approved",
      serviceCenter: "East Coast Team",
      lastUpdated: "2 days ago",
    },
    {
      id: 5,
      name: "Premier Consulting",
      status: "pending",
      serviceCenter: "West Coast Team",
      lastUpdated: "3 days ago",
    },
  ]

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Overview of all clients and onboarding processes</p>
          </div>
          <div className="flex space-x-2">
            <Button asChild>
              <Link href="/admin/clients/new">
                <Plus className="h-4 w-4 mr-2" />
                New Client
              </Link>
            </Button>
          </div>
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
                <div className="mt-4 flex items-center text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  ) : null}
                  <span
                    className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : ""}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="recent">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="recent">Recent Clients</TabsTrigger>
              <TabsTrigger value="pending">Pending Tasks</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Latest client onboarding activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Client Name</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Service Center</th>
                        <th className="text-left py-3 px-4 font-medium">Last Updated</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentClients.map((client) => (
                        <tr key={client.id} className="border-b last:border-0">
                          <td className="py-3 px-4">
                            <div className="font-medium">{client.name}</div>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={client.status as any} />
                          </td>
                          <td className="py-3 px-4 text-sm">{client.serviceCenter}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{client.lastUpdated}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/clients/${client.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/admin/clients">View All Clients</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Document Review Required</p>
                        <p className="text-sm text-muted-foreground">
                          3 clients have uploaded documents that need review
                        </p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Service Center Assignment</p>
                        <p className="text-sm text-muted-foreground">
                          2 new clients need to be assigned to a service center
                        </p>
                      </div>
                      <Button size="sm">Assign</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Onboarding Follow-up</p>
                        <p className="text-sm text-muted-foreground">
                          4 clients have incomplete onboarding tasks for over 7 days
                        </p>
                      </div>
                      <Button size="sm">Follow Up</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
