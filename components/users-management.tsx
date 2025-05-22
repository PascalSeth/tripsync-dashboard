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
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    rides: 42,
    joinDate: "2022-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Credit Card",
    totalSpent: "$1,245.50",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    rides: 28,
    joinDate: "2022-02-22",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "PayPal",
    totalSpent: "$876.25",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    rides: 15,
    joinDate: "2022-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Credit Card",
    totalSpent: "$532.75",
    address: "789 Oak Ave, Nowhere, USA",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    rides: 8,
    joinDate: "2022-04-05",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Apple Pay",
    totalSpent: "$215.00",
    address: "321 Pine St, Elsewhere, USA",
  },
  {
    id: 5,
    name: "Carol White",
    email: "carol.white@example.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    rides: 36,
    joinDate: "2022-01-30",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Credit Card",
    totalSpent: "$1,087.50",
    address: "555 Cedar Rd, Anyplace, USA",
  },
  {
    id: 6,
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    rides: 22,
    joinDate: "2022-05-18",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Google Pay",
    totalSpent: "$745.25",
    address: "777 Maple Dr, Somewhere, USA",
  },
  {
    id: 7,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    phone: "+1 (555) 789-0123",
    status: "active",
    rides: 17,
    joinDate: "2022-06-12",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "Credit Card",
    totalSpent: "$632.00",
    address: "888 Birch Ln, Nowhere, USA",
  },
  {
    id: 8,
    name: "Frank Taylor",
    email: "frank.taylor@example.com",
    phone: "+1 (555) 890-1234",
    status: "suspended",
    rides: 5,
    joinDate: "2022-07-08",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentMethod: "PayPal",
    totalSpent: "$187.50",
    address: "999 Walnut Ct, Elsewhere, USA",
  },
]

export default function UsersManagement() {
  const [users, setUsers] = useState(usersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
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

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
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
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Enter the details of the new user.</DialogDescription>
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
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <Input id="address" placeholder="123 Main St, Anytown, USA" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="payment" className="text-sm font-medium">
                      Payment Method
                    </label>
                    <Input id="payment" placeholder="Credit Card" />
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
                <Button>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your user accounts and their information.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rides</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.rides}</TableCell>
                  <TableCell>{user.totalSpent}</TableCell>
                  <TableCell>{user.paymentMethod}</TableCell>
                  <TableCell>{formatDate(user.joinDate)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuItem>Contact user</DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem className="text-red-500">Suspend user</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-500">Activate user</DropdownMenuItem>
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
            Showing {filteredUsers.length} of {users.length} users
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

      {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rides">Ride History</TabsTrigger>
                <TabsTrigger value="payments">Payment History</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback className="text-2xl">
                      {selectedUser.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <div>{selectedUser.rides} total rides</div>
                      <div>Joined {formatDate(selectedUser.joinDate)}</div>
                    </div>
                    <div>{getStatusBadge(selectedUser.status)}</div>
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
                        <div className="col-span-2 text-sm">{selectedUser.email}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Phone:</div>
                        <div className="col-span-2 text-sm">{selectedUser.phone}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Address:</div>
                        <div className="col-span-2 text-sm">{selectedUser.address}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Method:</div>
                        <div className="col-span-2 text-sm">{selectedUser.paymentMethod}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Total Spent:</div>
                        <div className="col-span-2 text-sm">{selectedUser.totalSpent}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Contact User</Button>
                  <Button>Edit Profile</Button>
                </div>
              </TabsContent>

              <TabsContent value="rides" className="pt-4">
                <div className="text-center">
                  <p>Ride history will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="pt-4">
                <div className="text-center">
                  <p>Payment history will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
