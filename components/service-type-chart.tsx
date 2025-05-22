"use client"

import { useEffect, useRef } from "react"

// Mock data for service type distribution
const serviceTypeData = [
  { type: "Taxi", count: 450, color: "#fbbf24" },
  { type: "Shared Ride", count: 320, color: "#10b981" },
  { type: "Delivery", count: 280, color: "#60a5fa" },
  { type: "Day Booking", count: 150, color: "#8b5cf6" },
  { type: "Emergency", count: 48, color: "#ef4444" },
  { type: "House Moving", count: 35, color: "#f97316" },
]

export default function ServiceTypeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Calculate total count
    const total = serviceTypeData.reduce((sum, data) => sum + data.count, 0)

    // Calculate chart dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw pie chart
    let startAngle = 0
    serviceTypeData.forEach((data) => {
      const sliceAngle = (data.count / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.fillStyle = data.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Calculate position for labels
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Draw percentage labels
      const percentage = Math.round((data.count / total) * 100)
      if (percentage > 5) {
        // Only show label if slice is big enough
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${percentage}%`, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = 10
    let legendY = canvas.height - serviceTypeData.length * 20 - 10

    serviceTypeData.forEach((data) => {
      // Draw color box
      ctx.fillStyle = data.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Draw label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${data.type} (${data.count})`, legendX + 20, legendY + 7.5)

      legendY += 20
    })
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
