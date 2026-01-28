export interface NavItem {
  id: string
  label: string
  icon: string
}

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  stats: Record<string, string | number>
  color: string
  category: "core" | "admin" | "ai" | "integration"
}

export interface Participant {
  id: number
  name: string
  programme: string
  status: "Active" | "Completed" | "Pending" | "Inactive"
  progress: number
}

export interface Programme {
  id: number
  name: string
  participants: number
  completion: number
  status: "Active" | "Inactive"
}

export interface Stat {
  label: string
  value: string
  change: string
  up: boolean
}

export interface Integration {
  name: string
  status: "Connected" | "Not configured"
  icon: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Staff" | "User"
  status: "Active" | "Invited" | "Suspended"
}
