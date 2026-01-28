"use client"

import { cn } from "@/lib/utils"
import { navItems } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeNav: string
  onNavChange: (id: string) => void
}

export function Sidebar({ isOpen, onToggle, activeNav, onNavChange }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-neutral-800/90 backdrop-blur-xl border-r border-white/5 z-50 transition-all duration-300",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-yellow-500/20 text-neutral-900">
              SL
            </div>
            {isOpen && (
              <span className="text-xl font-semibold tracking-tight text-white">
                Street<span className="text-yellow-400">League</span>
              </span>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="h-[calc(100vh-280px)]">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = activeNav === item.id

                const navButton = (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onNavChange(item.id)}
                    className={cn(
                      "w-full justify-start gap-3 px-4 py-3 h-auto",
                      isActive
                        ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 text-yellow-400 border border-yellow-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5 shrink-0" />}
                    {isOpen && <span className="font-medium">{item.label}</span>}
                  </Button>
                )

                if (!isOpen) {
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  )
                }

                return navButton
              })}
            </nav>
          </ScrollArea>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-1/2 w-6 h-6 bg-neutral-700 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </button>

        {/* Footer Branding */}
        {isOpen && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs text-yellow-400/80 font-medium">Own Your Future</p>
              <p className="text-[10px] text-gray-500 mt-1">Skills & Employment Platform</p>
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
