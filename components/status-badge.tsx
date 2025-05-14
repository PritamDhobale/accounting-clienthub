import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "pending" | "received" | "reviewed" | "approved" | "rejected"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
      case "received":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"
      case "reviewed":
        return "bg-purple-500/20 text-purple-500 hover:bg-purple-500/20"
      case "approved":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/20"
      case "rejected":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
      default:
        return ""
    }
  }

  const getStatusLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Badge className={cn(getStatusStyles(), className)} variant="outline">
      {getStatusLabel()}
    </Badge>
  )
}
