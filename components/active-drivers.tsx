"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for active drivers
const activeDrivers = [
  {
    id: 1,
    name: "Michael Smith",
    vehicle: "Toyota Camry",
    licensePlate: "ABC-1234",
    status: "available",
    location: "Downtown",
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Robert Johnson",
    vehicle: "Honda Civic",
    licensePlate: "XYZ-5678",
    status: "on_trip",
    location: "Uptown",
    rating: 4.5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "David Williams",
    vehicle: "Ford Transit",
    licensePlate: "DEF-9012",
    status: "available",
    location: "Midtown",
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "James Davis",
    vehicle: "Chevrolet Silverado",
    licensePlate: "GHI-3456",
    status: "on_trip",
    location: "Westside",
    rating: 4.7,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Thomas Anderson",
    vehicle: "Tesla Model 3",
    licensePlate: "JKL-7890",
    status: "available",
    location: "Eastside",
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    vehicle: "Nissan Leaf",
    licensePlate: "MNO-1234",
    status: "on_trip",
    location: "Northside",
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ActiveDrivers() {
  const [drivers, setDrivers] = useState(activeDrivers)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>
      case "on_trip":
        return <Badge className="bg-blue-500">On Trip</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="flex items-center justify-between rounded-lg border p-3">
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
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{driver.name}</h4>
                  <div className="flex items-center text-sm text-yellow-500">★ {driver.rating}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {driver.vehicle} • {driver.licensePlate}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{driver.location}</span>
                  {getStatusBadge(driver.status)}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
