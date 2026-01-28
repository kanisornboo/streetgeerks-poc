import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getInitials, getStatusColor } from "@/lib/utils"
import type { Participant } from "@/types"

interface ParticipantsTableProps {
  participants: Participant[]
}

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Name</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Programme</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Progress</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr
              key={participant.id}
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(participant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{participant.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-400">{participant.programme}</td>
              <td className="px-6 py-4">
                <Badge
                  variant={participant.status === "Active" ? "success" : "default"}
                >
                  {participant.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Progress value={participant.progress} className="w-24" />
                  <span className="text-sm text-gray-400">{participant.progress}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Button variant="link" className="p-0 h-auto">
                  View Profile →
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
