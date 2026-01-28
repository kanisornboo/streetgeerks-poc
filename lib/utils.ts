import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-GB").format(num)
}

export function formatPercentage(num: number): string {
  return `${num}%`
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-500/20 text-emerald-400"
    case "completed":
      return "bg-yellow-500/20 text-yellow-400"
    case "pending":
      return "bg-amber-500/20 text-amber-400"
    case "inactive":
      return "bg-gray-500/20 text-gray-400"
    default:
      return "bg-gray-500/20 text-gray-400"
  }
}
