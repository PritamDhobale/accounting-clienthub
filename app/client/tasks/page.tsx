"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUpload } from "@/components/file-upload"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileDown, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock task data
const initialTasks = [
  {
    id: "quickbooks",
    title: "QuickBooks Online Access",
    description: "Provide access to your QuickBooks Online account",
    status: "approved",
    instructions: [
      "Log in to your QuickBooks Online account",
      "Go to Settings > Manage Users",
      "Click 'Add User' and select 'Accountant'",
      "Enter the email address provided by ClientHub",
      "Set the appropriate permissions",
      "Click 'Save' to send the invitation",
    ],
  },
  {
    id: "bank-statements",
    title: "Bank Statements",
    description: "All business bank account statements for the current year starting from January 1st to date",
    status: "approved",
    instructions: [],
  },
  {
    id: "credit-card",
    title: "Credit Card Statements",
    description: "Card statements for the current year starting from January 1st to date",
    status: "received",
    instructions: [],
  },
  {
    id: "tax-return",
    title: "Most Recent Tax Return",
    description:
      "Complete copy of the most recent business tax return filed including Profit & Loss Account and Balance Sheet",
    status: "pending",
    instructions: [],
  },
  {
    id: "payroll",
    title: "Payroll Reports",
    description: "Access to payroll platform or exported payroll reports or journals",
    status: "pending",
    instructions: [],
  },
  {
    id: "loan-statements",
    title: "Loan Statements",
    description: "For all active business loans, including opening balance, payment schedule, and interest",
    status: "pending",
    instructions: [],
  },
  {
    id: "asset-list",
    title: "Asset List",
    description: "Current list of fixed assets with description, date acquired, value and purchase invoice",
    status: "pending",
    instructions: [],
  },
]

export default function ClientTasks() {
  const [tasks, setTasks] = useState(initialTasks)

  const completedTasks = tasks.filter(
    (task) => task.status === "approved" || task.status === "reviewed" || task.status === "received",
  ).length

  const totalTasks = tasks.length
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  const handleUploadComplete = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "received" } : task)))
  }

  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Onboarding Tasks</h1>
          <p className="text-muted-foreground mt-2">Complete the following tasks to finish your onboarding process</p>
        </div>

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
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please complete all tasks to proceed with your onboarding. If you have any questions, contact your ClientHub
            representative.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Accordion type="multiple" className="space-y-4">
            {tasks.map((task) => (
              <AccordionItem key={task.id} value={task.id} className="border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    {task.status === "approved" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : task.status === "rejected" ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                        {task.status === "received" || task.status === "reviewed" ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        ) : null}
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <StatusBadge status={task.status as any} />
                    <AccordionTrigger className="h-4 w-4 p-0" />
                  </div>
                </div>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4">
                    {task.instructions.length > 0 && (
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {task.instructions.map((instruction, index) => (
                            <li key={index} className="text-sm">
                              {instruction}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {task.status !== "approved" && (
                      <div>
                        <h4 className="font-medium mb-2">Upload Document:</h4>
                        <FileUpload
                          onUploadComplete={() => handleUploadComplete(task.id)}
                          disabled={task.status === "received" || task.status === "reviewed"}
                        />
                      </div>
                    )}

                    {task.status === "rejected" && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Document Rejected</AlertTitle>
                        <AlertDescription>
                          Your document was rejected. Please upload a new version that meets the requirements.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-between">
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              Download Engagement Agreement
            </Button>

            <Button disabled={completionPercentage < 100}>Complete Onboarding</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
