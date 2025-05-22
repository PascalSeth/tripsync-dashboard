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

// Mock data for payments
const paymentsData = [
  {
    id: "PAY-1234",
    serviceId: "SRV-1234",
    userId: 1,
    userName: "John Doe",
    driverId: 1,
    driverName: "Michael Smith",
    amount: "$24.50",
    method: "Credit Card",
    status: "completed",
    date: "2023-05-21T14:35:00",
    serviceType: "Taxi",
  },
  {
    id: "PAY-1235",
    serviceId: "SRV-1235",
    userId: 2,
    userName: "Jane Smith",
    driverId: 2,
    driverName: "Robert Johnson",
    amount: "$18.75",
    method: "PayPal",
    status: "completed",
    date: "2023-05-21T15:20:00",
    serviceType: "Delivery",
  },
  {
    id: "PAY-1236",
    serviceId: "SRV-1236",
    userId: 3,
    userName: "Alice Johnson",
    driverId: 3,
    driverName: "David Williams",
    amount: "$45.00",
    method: "Credit Card",
    status: "completed",
    date: "2023-05-21T13:50:00",
    serviceType: "Emergency",
  },
  {
    id: "PAY-1237",
    serviceId: "SRV-1237",
    userId: 4,
    userName: "Bob Brown",
    driverId: 4,
    driverName: "James Davis",
    amount: "$120.00",
    method: "Apple Pay",
    status: "pending",
    date: "2023-05-22T09:00:00",
    serviceType: "House Moving",
  },
  {
    id: "PAY-1238",
    serviceId: "SRV-1238",
    userId: 5,
    userName: "Carol White",
    driverId: 5,
    driverName: "Thomas Anderson",
    amount: "$12.25",
    method: "Credit Card",
    status: "refunded",
    date: "2023-05-21T16:35:00",
    serviceType: "Shared Ride",
  },
  {
    id: "PAY-1239",
    serviceId: "SRV-1239",
    userId: 6,
    userName: "David Miller",
    driverId: 6,
    driverName: "Sarah Johnson",
    amount: "$180.00",
    method: "Google Pay",
    status: "pending",
    date: "2023-05-23T08:00:00",
    serviceType: "Day Booking",
  },
  {
    id: "PAY-1240",
    serviceId: "SRV-1240",
    userId: 7,
    userName: "Emily Wilson",
    driverId: 7,
    driverName: "Jennifer Brown",
    amount: "$32.75",
    method: "Credit Card",
    status: "completed",
    date: "2023-05-21T17:05:00",
    serviceType: "Taxi",
  },
  {
    id: "PAY-1241",
    serviceId: "SRV-1241",
    userId: 8,
    userName: "Frank Taylor",
    driverId: 8,
    driverName: "Christopher Lee",
    amount: "$15.50",
    method: "PayPal",
    status: "completed",
    date: "2023-05-21T12:35:00",
    serviceType: "Delivery",
  },
]

export default function PaymentsManagement() {
  const [payments, setPayments] = useState(paymentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.serviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.driverName.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && payment.status === "completed"
    if (activeTab === "pending") return matchesSearch && payment.status === "pending"
    if (activeTab === "refunded") return matchesSearch && payment.status === "refunded"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "refunded":
        return <Badge className="bg-red-500">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
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
                Add Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>Enter the details for the new payment.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="service-id" className="text-sm font-medium">
                      Service ID
                    </label>
                    <Input id="service-id" placeholder="SRV-1234" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount
                    </label>
                    <Input id="amount" placeholder="$0.00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="user" className="text-sm font-medium">
                      User
                    </label>
                    <Input id="user" placeholder="Select user" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="driver" className="text-sm font-medium">
                      Driver
                    </label>
                    <Input id="driver" placeholder="Select driver" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="method" className="text-sm font-medium">
                      Payment Method
                    </label>
                    <Input id="method" placeholder="Credit Card" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Input id="status" placeholder="Completed" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Record Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Payments</CardTitle>
          <CardDescription>Manage all payment transactions.</CardDescription>
        </CardHeader>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.serviceId}</TableCell>
                      <TableCell>{payment.userName}</TableCell>
                      <TableCell>{payment.driverName}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewPayment(payment)}>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit payment</DropdownMenuItem>
                            {payment.status === "pending" && <DropdownMenuItem>Mark as completed</DropdownMenuItem>}
                            {payment.status === "completed" && (
                              <DropdownMenuItem className="text-red-500">Process refund</DropdownMenuItem>
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
          <TabsContent value="completed" className="mt-0">
            {/* Same table structure as "all" but filtered for completed */}
          </TabsContent>
          <TabsContent value="pending" className="mt-0">
            {/* Same table structure as "all" but filtered for pending */}
          </TabsContent>
          <TabsContent value="refunded" className="mt-0">
            {/* Same table structure as "all" but filtered for refunded */}
          </TabsContent>
        </Tabs>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPayments.length} of {payments.length} payments
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

      {selectedPayment && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="receipt">Receipt</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedPayment.id}</h3>
                    <div className="text-sm text-muted-foreground">{formatDate(selectedPayment.date)}</div>
                  </div>
                  <div>{getStatusBadge(selectedPayment.status)}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Service ID:</div>
                        <div className="col-span-2 text-sm">{selectedPayment.serviceId}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Service Type:</div>
                        <div className="col-span-2 text-sm">{selectedPayment.serviceType}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Amount:</div>
                        <div className="col-span-2 text-sm">{selectedPayment.amount}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Method:</div>
                        <div className="col-span-2 text-sm">{selectedPayment.method}</div>
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
                          <div className="col-span-2 text-sm">{selectedPayment.userName}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">ID:</div>
                          <div className="col-span-2 text-sm">{selectedPayment.userId}</div>
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
                          <div className="col-span-2 text-sm">{selectedPayment.driverName}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-sm font-medium">ID:</div>
                          <div className="col-span-2 text-sm">{selectedPayment.driverId}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  {selectedPayment.status === "pending" && <Button variant="outline">Mark as Completed</Button>}
                  {selectedPayment.status === "completed" && <Button variant="destructive">Process Refund</Button>}
                  <Button>Download Receipt</Button>
                </div>
              </TabsContent>

              <TabsContent value="receipt" className="pt-4">
                <div className="h-[400px] rounded-md border bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Receipt preview will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
