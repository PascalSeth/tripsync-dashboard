"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Car, CreditCard, Home, Package, Settings, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Drivers",
      icon: Car,
      href: "/drivers",
    },
    {
      title: "Services",
      icon: Package,
      href: "/services",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
    },
    {
      title: "Payments",
      icon: CreditCard,
      href: "/payments",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Car className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">TripSync</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted">
              <img src="/placeholder.svg?height=32&width=32" alt="Admin" className="h-full w-full rounded-full" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@tripsync.com</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
