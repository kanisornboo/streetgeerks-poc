"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface BarChartProps {
  data: number[]
  labels: string[]
  title: string
}

export function BarChart({ data, labels, title }: BarChartProps) {
  const maxValue = Math.max(...data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end gap-3">
          {data.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-yellow-500 to-amber-400 rounded-t-lg transition-all hover:from-yellow-400 hover:to-amber-300"
                style={{ height: `${(value / maxValue) * 200}px` }}
              />
              <span className="text-xs text-gray-500">{labels[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
