import DashboardLayout from "@/components/dashboard-layout"
import ServicesManagement from "@/components/services-management"

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
        </div>
        <ServicesManagement />
      </div>
    </DashboardLayout>
  )
}
