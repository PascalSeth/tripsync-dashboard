import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Home, Settings, Users, Calendar } from "lucide-react"
import { AppSidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TripSync Dashboard",
  description: "Admin dashboard for TripSync transportation services platform",
  generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('', inter.className)}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true}>
            <Sidebar>
              <SidebarHeader>
                <h2 className="px-2 text-lg font-semibold">TripSync</h2>
              </SidebarHeader>
              <SidebarContent>
            <AppSidebar/>
              </SidebarContent>
            </Sidebar>
            
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </header>
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}