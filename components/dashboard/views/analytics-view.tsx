"use client"

import { Card } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard"
import { analyticsStats, chartData, chartLabels } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Target, Clock, TrendingUp } from "lucide-react"

const iconMap = {
  "Total Placements": Target,
  "Avg. Time to Employment": Clock,
  "Retention Rate (6mo)": TrendingUp,
}

export function AnalyticsView() {
  return (
    <div className="px-8 py-8">
      <h2 className="text-lg font-semibold text-white mb-6">Analytics & Reports</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {analyticsStats.map((stat) => {
          const Icon = iconMap[stat.label as keyof typeof iconMap]
          return (
            <Card key={stat.label} className="p-6 hover:border-yellow-500/20 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                {Icon && <Icon className="h-6 w-6 text-yellow-400" />}
                <span
                  className={cn(
                    "text-sm font-medium",
                    stat.up ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-semibold mt-1 group-hover:text-yellow-400 transition-colors">
                {stat.value}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Chart */}
      <BarChart
        data={chartData}
        labels={chartLabels}
        title="Employment Outcomes by Month"
      />
    </div>
  )
}
