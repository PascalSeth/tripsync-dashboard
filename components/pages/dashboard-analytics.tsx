"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const userGrowth = [
  { month: "Jan", users: 1000, drivers: 200 },
  { month: "Feb", users: 1200, drivers: 250 },
  { month: "Mar", users: 1500, drivers: 300 },
  { month: "Apr", users: 1800, drivers: 350 },
  { month: "May", users: 2200, drivers: 420 },
  { month: "Jun", users: 2800, drivers: 500 },
]

const revenueByService = [
  { service: "Rides", revenue: 45000, bookings: 1200 },
  { service: "Taxi", revenue: 32000, bookings: 800 },
  { service: "Delivery", revenue: 18000, bookings: 600 },
  { service: "Moving", revenue: 12000, bookings: 200 },
  { service: "Emergency", revenue: 8000, bookings: 150 },
]

const hourlyActivity = [
  { hour: "00", rides: 5, deliveries: 2 },
  { hour: "06", rides: 15, deliveries: 8 },
  { hour: "12", rides: 45, deliveries: 25 },
  { hour: "18", rides: 65, deliveries: 35 },
  { hour: "21", rides: 40, deliveries: 20 },
]

export function DashboardAnalytics() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Detailed analytics and insights for your platform</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Trip Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24 min</div>
                <p className="text-xs text-muted-foreground">-3 min from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Driver Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
              <CardDescription>Monthly growth of users and drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--chart-1))",
                  },
                  drivers: {
                    label: "Drivers",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px] lg:h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="drivers"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service Type</CardTitle>
              <CardDescription>Revenue breakdown across different services</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] lg:h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByService}>
                    <XAxis dataKey="service" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Activity Pattern</CardTitle>
              <CardDescription>Activity distribution throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rides: {
                    label: "Rides",
                    color: "hsl(var(--chart-4))",
                  },
                  deliveries: {
                    label: "Deliveries",
                    color: "hsl(var(--chart-5))",
                  },
                }}
                className="h-[300px] lg:h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyActivity}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="rides" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                    <Line type="monotone" dataKey="deliveries" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
