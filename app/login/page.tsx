"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import "./login.css" // ✅ Add custom MySAGE CSS

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("client")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Login successful",
      description: `Logged in as ${role}`,
    })

    if (role === "admin") {
      router.push("/admin/dashboard")
    } else if (role === "service-center") {
      router.push("/service-center/dashboard")
    } else {
      router.push("/client/dashboard")
    }
  }

  return (
    <div className="login-page">
      {/* Logo at top */}
      <div className="logo-wrapper">
        <img src="/images/sage_healthy_rcm_logo.png" alt="mySAGE Logo" className="mysage-logo" />
      </div>

      {/* Green login box */}
      <div className="login-box">
        <img src="/images/clienthublogin.png" alt="ClientHub" className="login-logo-img" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="role">Role</label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="admin">ClientHub Admin</SelectItem>
              <SelectItem value="service-center">Service Center</SelectItem>
            </SelectContent>
          </Select>

          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
      </div>

      {/* Footer info */}
      <div className="powered-by-text">POWERED BY HUBONE SYSTEMS</div>
      <p className="footer-text">© 2014–2025 HubOne Systems Inc. – All Rights Reserved</p>
    </div>
  )
}
