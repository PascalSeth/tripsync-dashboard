"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import RevenueChart from "@/components/revenue-chart"
import ServiceTypeChart from "@/components/service-type-chart"

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            Print Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,294</div>
                <p className="text-xs text-muted-foreground">+7.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,492</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">+4.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceTypeChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Areas</CardTitle>
                <CardDescription>Regions with highest service usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Downtown", percentage: 28, value: 348 },
                    { name: "Uptown", percentage: 21, value: 261 },
                    { name: "Midtown", percentage: 18, value: 224 },
                    { name: "Westside", percentage: 15, value: 187 },
                    { name: "Eastside", percentage: 12, value: 149 },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.value} services</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{item.percentage}%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
                <CardDescription>Busiest times of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "7:00 - 9:00 AM", percentage: 24, value: 299 },
                    { time: "11:00 AM - 1:00 PM", percentage: 18, value: 224 },
                    { time: "4:00 - 6:00 PM", percentage: 32, value: 399 },
                    { time: "8:00 - 10:00 PM", percentage: 16, value: 199 },
                    { time: "12:00 - 2:00 AM", percentage: 10, value: 125 },
                  ].map((item) => (
                    <div key={item.time} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.time}</p>
                        <p className="text-sm text-muted-foreground">{item.value} services</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{item.percentage}%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">User acquisition chart will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed revenue breakdown and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md border bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Detailed revenue analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>Detailed service usage and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md border bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Detailed service analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>User behavior and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md border bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">User analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Analytics</CardTitle>
              <CardDescription>Driver performance and activity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md border bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Driver analytics will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
