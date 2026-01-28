"use client"

import { Button } from "@/components/ui/button"
import { ParticipantsTable } from "@/components/dashboard"
import { participants } from "@/lib/data"
import { Plus } from "lucide-react"

export function ParticipantsView() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">All Participants</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>
      <ParticipantsTable participants={participants} />
    </div>
  )
}
