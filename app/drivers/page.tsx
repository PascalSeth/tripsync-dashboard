import DashboardLayout from "@/components/dashboard-layout"
import DriversManagement from "@/components/drivers-management"

export default function DriversPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
        </div>
        <DriversManagement />
      </div>
    </DashboardLayout>
  )
}
