"use client"

import { Button } from "@/components/ui/button"
import { ProgrammeCard } from "@/components/dashboard"
import { programmes } from "@/lib/data"
import { Plus } from "lucide-react"

export function ProgrammesView() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">All Programmes</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Programme
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {programmes.map((programme) => (
          <ProgrammeCard key={programme.id} programme={programme} />
        ))}
      </div>
    </div>
  )
}
