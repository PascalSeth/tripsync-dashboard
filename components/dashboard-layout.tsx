"use client"

import type React from "react"

import { AppSidebar } from "@/components/sidebar"
import Header from "@/components/header"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />
      <SidebarInset>
             <div className="flex-1 overflow-y-auto p-4">
         <div className=" flex items-center w-full">
            <SidebarTrigger className="-ml-1" />
          <Header />
         </div>
                {children}
              </div>
      </SidebarInset>
    </div>
  )
}
