import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Stat } from "@/types"

interface StatsCardProps {
  stat: Stat
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <Card className="p-5 hover:border-yellow-500/20 transition-colors group">
      <p className="text-gray-500 text-sm">{stat.label}</p>
      <div className="flex items-end gap-3 mt-2">
        <span className="text-3xl font-semibold tracking-tight group-hover:text-yellow-400 transition-colors">
          {stat.value}
        </span>
        <span
          className={cn(
            "text-sm mb-1",
            stat.up ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {stat.change}
        </span>
      </div>
    </Card>
  )
}
