"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Search, UserPlus, Download, Car } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const driverPerformance = [
  { month: "Jan", earnings: 2400, trips: 120 },
  { month: "Feb", earnings: 2800, trips: 140 },
  { month: "Mar", earnings: 3200, trips: 160 },
  { month: "Apr", earnings: 2900, trips: 145 },
  { month: "May", earnings: 3500, trips: 175 },
  { month: "Jun", earnings: 3800, trips: 190 },
]

const ratingDistribution = [
  { rating: "5.0", count: 450 },
  { rating: "4.5-4.9", count: 320 },
  { rating: "4.0-4.4", count: 180 },
  { rating: "3.5-3.9", count: 90 },
  { rating: "Below 3.5", count: 45 },
]

const driversData = [
  {
    id: "DR001",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 234-567-8901",
    vehicle: "Toyota Camry 2020",
    totalTrips: 234,
    earnings: "$4,567.50",
    status: "active",
    rating: 4.8,
    joinDate: "2023-03-15",
    location: "Downtown",
  },
  {
    id: "DR002",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 234-567-8902",
    vehicle: "Honda Civic 2021",
    totalTrips: 189,
    earnings: "$3,234.25",
    status: "active",
    rating: 4.9,
    joinDate: "2023-05-22",
    location: "Airport Area",
  },
  {
    id: "DR003",
    name: "Tom Davis",
    email: "tom.davis@email.com",
    phone: "+1 234-567-8903",
    vehicle: "Ford Focus 2019",
    totalTrips: 156,
    earnings: "$2,890.75",
    status: "offline",
    rating: 4.7,
    joinDate: "2023-02-10",
    location: "Mall District",
  },
  {
    id: "DR004",
    name: "Alex Turner",
    email: "alex.turner@email.com",
    phone: "+1 234-567-8904",
    vehicle: "Nissan Altima 2022",
    totalTrips: 298,
    earnings: "$5,234.00",
    status: "active",
    rating: 5.0,
    joinDate: "2022-12-05",
    location: "Business Center",
  },
]

export function Drivers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDrivers = driversData.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Drivers</h1>
          <p className="text-muted-foreground">Manage and monitor driver accounts and performance</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,089</div>
            <p className="text-xs text-muted-foreground">87.3% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">+0.1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,456</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Driver Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Performance</CardTitle>
            <CardDescription>Monthly earnings and trip trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "hsl(var(--chart-1))",
                },
                trips: {
                  label: "Trips",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] lg:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driverPerformance}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trips"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Driver ratings breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Drivers",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] lg:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingDistribution}>
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Driver Management */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Management</CardTitle>
          <CardDescription>Search and filter driver accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Driver</TableHead>
                  <TableHead className="min-w-[200px]">Contact</TableHead>
                  <TableHead className="min-w-[150px]">Vehicle</TableHead>
                  <TableHead>Total Trips</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[120px]">Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${driver.name.charAt(0)}`} />
                          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{driver.name}</div>
                          <div className="text-sm text-muted-foreground">{driver.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm min-w-0">
                        <div className="truncate">{driver.email}</div>
                        <div className="text-muted-foreground">{driver.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{driver.vehicle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{driver.totalTrips}</TableCell>
                    <TableCell className="font-medium">{driver.earnings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{driver.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          driver.status === "active"
                            ? "secondary"
                            : driver.status === "offline"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {driver.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{driver.location}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
