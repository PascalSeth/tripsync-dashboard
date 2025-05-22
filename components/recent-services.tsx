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
import { MoreHorizontal } from "lucide-react"

// Mock data for recent services
const recentServices = [
  {
    id: "SRV-1234",
    type: "Taxi",
    user: "John Doe",
    driver: "Michael Smith",
    pickup: "123 Main St",
    dropoff: "456 Elm St",
    amount: "$24.50",
    status: "completed",
    date: "2023-05-21T14:30:00",
  },
  {
    id: "SRV-1235",
    type: "Delivery",
    user: "Jane Smith",
    driver: "Robert Johnson",
    pickup: "789 Oak Ave",
    dropoff: "321 Pine St",
    amount: "$18.75",
    status: "in_progress",
    date: "2023-05-21T15:15:00",
  },
  {
    id: "SRV-1236",
    type: "Emergency",
    user: "Alice Johnson",
    driver: "David Williams",
    pickup: "555 Cedar Rd",
    dropoff: "777 Maple Dr",
    amount: "$45.00",
    status: "completed",
    date: "2023-05-21T13:45:00",
  },
  {
    id: "SRV-1237",
    type: "House Moving",
    user: "Bob Brown",
    driver: "James Davis",
    pickup: "888 Birch Ln",
    dropoff: "999 Walnut Ct",
    amount: "$120.00",
    status: "scheduled",
    date: "2023-05-22T09:00:00",
  },
  {
    id: "SRV-1238",
    type: "Shared Ride",
    user: "Carol White",
    driver: "Thomas Anderson",
    pickup: "444 Spruce Ave",
    dropoff: "222 Fir St",
    amount: "$12.25",
    status: "cancelled",
    date: "2023-05-21T16:30:00",
  },
]

export default function RecentServices() {
  const [services, setServices] = useState(recentServices)

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

  return (
    <div className="rounded-md border">
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
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.id}</TableCell>
              <TableCell>{service.type}</TableCell>
              <TableCell>{service.user}</TableCell>
              <TableCell>{service.driver}</TableCell>
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
                    <DropdownMenuItem>View details</DropdownMenuItem>
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
    </div>
  )
}
