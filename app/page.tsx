import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, check if user is authenticated
  // If authenticated, redirect to dashboard
  // If not, redirect to login
  redirect("/login")
}
