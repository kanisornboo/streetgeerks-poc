"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { integrations } from "@/lib/data"
import { Handshake, RefreshCw, Plug } from "lucide-react"

const iconMap = {
  Handshake,
  RefreshCw,
  Plug,
}

export function SettingsView() {
  const [notifications, setNotifications] = useState({
    newParticipants: true,
    weeklyReports: true,
    completionAlerts: false,
  })

  return (
    <div className="px-8 py-8">
      <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>

      <div className="max-w-2xl space-y-6">
        {/* Organisation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Organisation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Organisation Name</label>
              <Input type="text" defaultValue="Street League" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary Contact Email</label>
              <Input type="email" defaultValue="admin@streetleague.co.uk" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Email notifications for new participants</span>
              <Switch
                checked={notifications.newParticipants}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, newParticipants: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Weekly progress reports</span>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, weeklyReports: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Programme completion alerts</span>
              <Switch
                checked={notifications.completionAlerts}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, completionAlerts: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {integrations.map((integration, i) => {
              const Icon = iconMap[integration.icon as keyof typeof iconMap]
              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5 text-gray-400" />}
                    <span className="font-medium text-white">{integration.name}</span>
                  </div>
                  <span
                    className={`text-sm ${
                      integration.status === "Connected" ? "text-emerald-400" : "text-gray-500"
                    }`}
                  >
                    {integration.status}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  )
}
