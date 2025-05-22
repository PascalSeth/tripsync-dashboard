"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, MoreHorizontal, Plus, Search, Star } from "lucide-react"

// Mock data for drivers
const driversData = [
  {
    id: 1,
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1 (555) 123-4567",
    vehicle: "Toyota Camry",
    licensePlate: "ABC-1234",
    status: "active",
    rating: 4.8,
    completedTrips: 342,
    joinDate: "2022-03-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 234-5678",
    vehicle: "Honda Civic",
    licensePlate: "XYZ-5678",
    status: "active",
    rating: 4.5,
    completedTrips: 218,
    joinDate: "2022-05-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "David Williams",
    email: "david.williams@example.com",
    phone: "+1 (555) 345-6789",
    vehicle: "Ford Transit",
    licensePlate: "DEF-9012",
    status: "active",
    rating: 4.9,
    completedTrips: 456,
    joinDate: "2021-11-08",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "James Davis",
    email: "james.davis@example.com",
    phone: "+1 (555) 456-7890",
    vehicle: "Chevrolet Silverado",
    licensePlate: "GHI-3456",
    status: "inactive",
    rating: 4.7,
    completedTrips: 287,
    joinDate: "2022-01-30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    phone: "+1 (555) 567-8901",
    vehicle: "Tesla Model 3",
    licensePlate: "JKL-7890",
    status: "active",
    rating: 4.6,
    completedTrips: 175,
    joinDate: "2022-07-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 678-9012",
    vehicle: "Nissan Leaf",
    licensePlate: "MNO-1234",
    status: "pending",
    rating: 0,
    completedTrips: 0,
    joinDate: "2023-05-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Jennifer Brown",
    email: "jennifer.brown@example.com",
    phone: "+1 (555) 789-0123",
    vehicle: "Hyundai Sonata",
    licensePlate: "PQR-5678",
    status: "active",
    rating: 4.4,
    completedTrips: 132,
    joinDate: "2022-09-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Christopher Lee",
    email: "christopher.lee@example.com",
    phone: "+1 (555) 890-1234",
    vehicle: "Kia Optima",
    licensePlate: "STU-9012",
    status: "suspended",
    rating: 3.9,
    completedTrips: 98,
    joinDate: "2022-08-17",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function DriversManagement() {
  const [drivers, setDrivers] = useState(driversData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleViewDriver = (driver: any) => {
    setSelectedDriver(driver)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drivers..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Enter the details of the new driver.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="vehicle" className="text-sm font-medium">
                      Vehicle Model
                    </label>
                    <Input id="vehicle" placeholder="Toyota Camry" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="license" className="text-sm font-medium">
                      License Plate
                    </label>
                    <Input id="license" placeholder="ABC-1234" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Input id="status" placeholder="Active" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Drivers</CardTitle>
          <CardDescription>Manage your driver fleet and their information.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">{driver.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{driver.vehicle}</div>
                      <div className="text-sm text-muted-foreground">{driver.licensePlate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500" />
                      <span>{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.completedTrips}</TableCell>
                  <TableCell>{formatDate(driver.joinDate)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDriver(driver)}>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit driver</DropdownMenuItem>
                        <DropdownMenuItem>Contact driver</DropdownMenuItem>
                        {driver.status === "active" ? (
                          <DropdownMenuItem className="text-red-500">Deactivate driver</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-500">Activate driver</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDrivers.length} of {drivers.length} drivers
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {selectedDriver && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Driver Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trips">Trip History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedDriver.avatar || "/placeholder.svg"} alt={selectedDriver.name} />
                    <AvatarFallback className="text-2xl">
                      {selectedDriver.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center justify-center gap-1 sm:justify-start">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{selectedDriver.rating} rating</span>
                      </div>
                      <div>{selectedDriver.completedTrips} trips completed</div>
                      <div>Joined {formatDate(selectedDriver.joinDate)}</div>
                    </div>
                    <div>{getStatusBadge(selectedDriver.status)}</div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Email:</div>
                        <div className="col-span-2 text-sm">{selectedDriver.email}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Phone:</div>
                        <div className="col-span-2 text-sm">{selectedDriver.phone}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Vehicle Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Vehicle:</div>
                        <div className="col-span-2 text-sm">{selectedDriver.vehicle}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">License Plate:</div>
                        <div className="col-span-2 text-sm">{selectedDriver.licensePlate}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Contact Driver</Button>
                  <Button>Edit Profile</Button>
                </div>
              </TabsContent>

              <TabsContent value="trips" className="pt-4">
                <div className="text-center">
                  <p>Trip history will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="pt-4">
                <div className="text-center">
                  <p>Driver documents and verification information will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
