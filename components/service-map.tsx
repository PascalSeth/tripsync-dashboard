"use client"

import { useEffect, useRef, useState } from "react"

// Mock data for the map
const mockDriverLocations = [
  { id: 1, lat: 40.7128, lng: -74.006, type: "taxi" },
  { id: 2, lat: 40.7148, lng: -74.013, type: "delivery" },
  { id: 3, lat: 40.7218, lng: -74.001, type: "emergency" },
  { id: 4, lat: 40.7098, lng: -74.016, type: "taxi" },
  { id: 5, lat: 40.7158, lng: -73.998, type: "shared_ride" },
]

export default function ServiceMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // This is a placeholder for actual map integration
    // In a real implementation, you would use a library like Google Maps, Mapbox, etc.
    if (mapRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      mapRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a simple map representation
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw some grid lines
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 1

        // Horizontal lines
        for (let i = 0; i < canvas.height; i += 20) {
          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(canvas.width, i)
          ctx.stroke()
        }

        // Vertical lines
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, canvas.height)
          ctx.stroke()
        }

        // Draw some roads
        ctx.strokeStyle = "#d1d5db"
        ctx.lineWidth = 3

        // Main horizontal road
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()

        // Main vertical road
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, 0)
        ctx.lineTo(canvas.width / 2, canvas.height)
        ctx.stroke()

        // Draw some diagonal roads
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(canvas.width, 0)
        ctx.lineTo(0, canvas.height)
        ctx.stroke()

        // Draw driver locations
        mockDriverLocations.forEach((driver) => {
          // Normalize coordinates to canvas
          const x = ((driver.lng + 74.02) * canvas.width) / 0.03
          const y = ((40.725 - driver.lat) * canvas.height) / 0.03

          // Draw driver marker
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, 2 * Math.PI)

          // Different colors for different service types
          switch (driver.type) {
            case "taxi":
              ctx.fillStyle = "#fbbf24" // amber
              break
            case "delivery":
              ctx.fillStyle = "#60a5fa" // blue
              break
            case "emergency":
              ctx.fillStyle = "#ef4444" // red
              break
            case "shared_ride":
              ctx.fillStyle = "#10b981" // green
              break
            default:
              ctx.fillStyle = "#6b7280" // gray
          }

          ctx.fill()
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 2
          ctx.stroke()
        })

        setMapLoaded(true)
      }
    }

    return () => {
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild)
        }
      }
    }
  }, [])

  return (
    <div className="relative">
      <div ref={mapRef} className="h-[350px] w-full rounded-md border" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      )}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <div className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
          <div className="h-3 w-3 rounded-full bg-[#fbbf24]"></div>
          <span>Taxi</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
          <div className="h-3 w-3 rounded-full bg-[#60a5fa]"></div>
          <span>Delivery</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
          <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
          <span>Emergency</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
          <div className="h-3 w-3 rounded-full bg-[#10b981]"></div>
          <span>Shared Ride</span>
        </div>
      </div>
    </div>
  )
}
