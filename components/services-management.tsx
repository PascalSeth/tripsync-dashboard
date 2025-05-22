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
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"

// Mock data for services
const servicesData = [
  {
    id: "SRV-1234",
    type: "Taxi",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    driver: {
      name: "Michael Smith",
      id: 1,
    },
    pickup: "123 Main St",
    dropoff: "456 Elm St",
    amount: "$24.50",
    status: "completed",
    date: "2023-05-21T14:30:00",
  },
  {
    id: "SRV-1235",
    type: "Delivery",
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
    },
    driver: {
      name: "Robert Johnson",
      id: 2,
    },
    pickup: "789 Oak Ave",
    dropoff: "321 Pine St",
    amount: "$18.75",
    status: "in_progress",
    date: "2023-05-21T15:15:00",
  },
  {
    id: "SRV-1236",
    type: "Emergency",
    user: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 (555) 345-6789",
    },
    driver: {
      name: "David Williams",
      id: 3,
    },
    pickup: "555 Cedar Rd",
    dropoff: "777 Maple Dr",
    amount: "$45.00",
    status: "completed",
    date: "2023-05-21T13:45:00",
  },
  {
    id: "SRV-1237",
    type: "House Moving",
    user: {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "+1 (555) 456-7890",
    },
    driver: {
      name: "James Davis",
      id: 4,
    },
    pickup: "888 Birch Ln",
    dropoff: "999 Walnut Ct",
    amount: "$120.00",
    status: "scheduled",
    date: "2023-05-22T09:00:00",
  },
  {
    id: "SRV-1238",
    type: "Shared Ride",
    user: {
      name: "Carol White",
      email: "carol.white@example.com",
      phone: "+1 (555) 567-8901",
    },
    driver: {
      name: "Thomas Anderson",
      id: 5,
    },
    pickup: "444 Spruce Ave",
    dropoff: "222 Fir St",
    amount: "$12.25",
    status: "cancelled",
    date: "2023-05-21T16:30:00",
  },
  {
    id: "SRV-1239",
    type: "Day Booking",
    user: {
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "+1 (555) 678-9012",
    },
    driver: {
      name: "Sarah Johnson",
      id: 6,
    },
    pickup: "333 Redwood Rd",
    dropoff: "N/A",
    amount: "$180.00",
    status: "scheduled",
    date: "2023-05-23T08:00:00",
  },
  {
    id: "SRV-1240",
    type: "Taxi",
    user: {
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "+1 (555) 789-0123",
    },
    driver: {
      name: "Jennifer Brown",
      id: 7,
    },
    pickup: "111 Aspen Ct",
    dropoff: "222 Willow Way",
    amount: "$32.75",
    status: "in_progress",
    date: "2023-05-21T17:00:00",
  },
  {
    id: "SRV-1241",
    type: "Delivery",
    user: {
      name: "Frank Taylor",
      email: "frank.taylor@example.com",
      phone: "+1 (555) 890-1234",
    },
    driver: {
      name: "Christopher Lee",
      id: 8,
    },
    pickup: "555 Dogwood Dr",
    dropoff: "666 Elm St",
    amount: "$15.50",
    status: "completed",
    date: "2023-05-21T12:30:00",
  },
]

export default function ServicesManagement() {
  const [services, setServices] = useState(servicesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.driver.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && service.status === "completed"
    if (activeTab === "in_progress") return matchesSearch && service.status === "in_progress"
    if (activeTab === "scheduled") return matchesSearch && service.status === "scheduled"
    if (activeTab === "cancelled") return matchesSearch && service.status === "cancelled"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "scheduled":
        return <Badge className="bg-yellow-500">Scheduled</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleViewService = (service: any) => {
    setSelectedService(service)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
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
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
                <DialogDescription>Enter the details for the new service request.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="service-type" className="text-sm font-medium">
                      Service Type
                    </label>
                    <Input id="service-type" placeholder="Taxi" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="user" className="text-sm font-medium">
                      User
                    </label>
                    <Input id="user" placeholder="Select user" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="pickup" className="text-sm font-medium">
                      Pickup Location
                    </label>
                    <Input id="pickup" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dropoff" className="text-sm font-medium">
                      Dropoff Location
                    </label>
                    <Input id="dropoff" placeholder="456 Elm St" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date & Time
                    </label>
                    <Input id="date" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="driver" className="text-sm font-medium">
                      Assign Driver
                    </label>
                    <Input id="driver" placeholder="Select driver" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Services</CardTitle>
          <CardDescription>Manage all service requests and bookings.</CardDescription>
        </CardHeader>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.id}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.user.name}</TableCell>
                      <TableCell>{service.driver.name}</TableCell>
                      <TableCell>{service.amount}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell>{formatDate(service.date)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewService(service)}>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit service</DropdownMenuItem>
                            <DropdownMenuItem>Contact driver</DropdownMenuItem>
                            <DropdownMenuItem>Contact user</DropdownMenuItem>
                            {service.status === "scheduled" && (
                              <DropdownMenuItem className="text-red-500">Cancel service</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          <TabsContent value="in_progress" className="mt-0">
            {/* Same table structure as "all" but filtered for in_progress */}
          </TabsContent>
          <TabsContent value="scheduled" className="mt-0">
            {/* Same table structure as "all" but filtered for scheduled */}
          </TabsContent>
          <TabsContent value="completed" className="mt-0">
            {/* Same table structure as "all" but filtered for completed */}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-0">
            {/* Same table structure as "all" but filtered for cancelled */}
          </TabsContent>
        </Tabs>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredServices.length} of {services.length} services
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

      {selectedService && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Service Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="route">Route</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedService.id}</h3>
                    <div className="text-sm text-muted-foreground">{formatDate(selectedService.date)}</div>
                  </div>
                  <div>{getStatusBadge(selectedService.status)}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Service Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Type:</div>
                        <div className="col-span-2 text-sm">{selectedService.type}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Pickup:</div>
                        <div className="col-span-2 text-sm">{selectedService.pickup}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Dropoff:</div>
                        <div className="col-span-2 text-sm">{selectedService.dropoff}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Amount:</div>
                        <div className="col-span-2 text-sm">{selectedService.amount}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">User Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">Name:</div>
                          <div className="col-span-2 text-sm">{selectedService.user.name}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">Email:</div>
                          <div className="col-span-2 text-sm">{selectedService.user.email}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">Phone:</div>
                          <div className="col-span-2 text-sm">{selectedService.user.phone}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Driver Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">Name:</div>
                          <div className="col-span-2 text-sm">{selectedService.driver.name}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">ID:</div>
                          <div className="col-span-2 text-sm">{selectedService.driver.id}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Contact User</Button>
                  <Button variant="outline">Contact Driver</Button>
                  {selectedService.status === "scheduled" && <Button variant="destructive">Cancel Service</Button>}
                  <Button>Edit Service</Button>
                </div>
              </TabsContent>

              <TabsContent value="route" className="pt-4">
                <div className="h-[300px] rounded-md border bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Route map will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="pt-4">
                <div className="text-center">
                  <p>Payment details will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
