import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Programme } from "@/types"
import { BookOpen } from "lucide-react"

interface ProgrammeCardProps {
  programme: Programme
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  return (
    <Card className="group p-6 hover:border-yellow-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">
            {programme.name}
          </h3>
          <Badge variant="success" className="mt-2">
            {programme.status}
          </Badge>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-neutral-900" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-xs text-gray-500">Participants</p>
          <p className="text-xl font-semibold mt-1">{programme.participants}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Completion Rate</p>
          <p className="text-xl font-semibold mt-1 text-emerald-400">{programme.completion}%</p>
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full mt-4"
      >
        View Details
      </Button>
    </Card>
  )
}
