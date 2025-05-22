"use client"

import { useEffect, useRef } from "react"

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 32500 },
  { month: "Feb", revenue: 36700 },
  { month: "Mar", revenue: 42300 },
  { month: "Apr", revenue: 38900 },
  { month: "May", revenue: 46200 },
  { month: "Jun", revenue: 48300 },
  { month: "Jul", revenue: 51700 },
  { month: "Aug", revenue: 49800 },
  { month: "Sep", revenue: 53400 },
  { month: "Oct", revenue: 47600 },
  { month: "Nov", revenue: 52100 },
  { month: "Dec", revenue: 58900 },
]

export default function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Calculate chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find max revenue for scaling
    const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    const yStep = chartHeight / 5
    for (let i = 1; i <= 5; i++) {
      const y = canvas.height - padding - yStep * i
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)

      // Add Y-axis labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`$${Math.round((maxRevenue * i) / 5).toLocaleString()}`, padding - 5, y + 3)
    }
    ctx.stroke()

    // Draw X-axis labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    const barWidth = chartWidth / revenueData.length
    revenueData.forEach((data, i) => {
      const x = padding + i * barWidth + barWidth / 2
      ctx.fillText(data.month, x, canvas.height - padding + 15)
    })

    // Draw bars
    revenueData.forEach((data, i) => {
      const barHeight = (data.revenue / maxRevenue) * chartHeight
      const x = padding + i * barWidth + barWidth * 0.1
      const y = canvas.height - padding - barHeight
      const width = barWidth * 0.8

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#93c5fd")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, width, barHeight)

      // Add value on top of bars
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`$${Math.round(data.revenue / 1000)}k`, x + width / 2, y - 5)
    })

    // Draw chart title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Monthly Revenue", canvas.width / 2, 20)
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
