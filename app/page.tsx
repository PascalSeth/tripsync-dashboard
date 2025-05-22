import DashboardLayout from "@/components/dashboard-layout"
import DashboardOverview from "@/components/dashboard-overview"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <DashboardOverview />
      </div>
    </DashboardLayout>
  )
}
