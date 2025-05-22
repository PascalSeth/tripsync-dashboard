import DashboardLayout from "@/components/dashboard-layout"
import SettingsPanel from "@/components/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}
