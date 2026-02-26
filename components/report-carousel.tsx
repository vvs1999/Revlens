"use client"

import { useEffect, useState } from "react"
import { ChartPreview } from "./chart-preview"
import { ArrowRight, TrendingUp } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Monthly Sales Trends",
    description: "March 2024",
    chart: <ChartPreview type="line" />,
    metric: "+15% vs. Last Month",
    trend: "up",
  },
  {
    id: 2,
    title: "Top-Selling Products",
    description: "Current Quarter",
    chart: <ChartPreview type="bar" />,
    metric: "5 Products = 68% of Revenue",
    trend: "up",
  },
  {
    id: 3,
    title: "Inventory Waste Analysis",
    description: "Last 30 Days",
    chart: <ChartPreview type="pie" />,
    metric: "Waste Reduced by 22%",
    trend: "down",
  },
  {
    id: 4,
    title: "Revenue Growth",
    description: "Year over Year",
    chart: <ChartPreview type="area" />,
    metric: "+28%",
    trend: "up",
  },
]

export function ReportCarousel({ className = "" }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % reports.length)
        setIsTransitioning(false)
      }, 500) // Fade out duration
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const activeReport = reports[activeIndex]

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-sm ${className}`}
      style={{
        boxShadow: "0 0 25px rgba(31, 78, 121, 0.15), 0 4px 12px rgba(31, 78, 121, 0.1)",
      }}
    >
      <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
        <div
          className="h-full bg-[#1F4E79] transition-all duration-300 ease-linear"
          style={{
            width: `${(activeIndex / (reports.length - 1)) * 100}%`,
            transition: "width 5s linear",
          }}
        />
      </div>

      <div className={`p-6 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{activeReport.title}</h3>
            <p className="text-sm text-muted-foreground">{activeReport.description}</p>
          </div>
          <div className="flex items-center text-sm font-medium">
            <span className={activeReport.trend === "up" ? "text-[#F4B400]" : "text-[#FF8C42]"}>
              {activeReport.metric}
            </span>
            {activeReport.trend === "up" ? (
              <TrendingUp className="ml-1 h-3 w-3 text-[#F4B400]" />
            ) : (
              <ArrowRight className="ml-1 h-3 w-3 -rotate-45 text-[#FF8C42]" />
            )}
          </div>
        </div>

        <div className="h-48 w-full">{activeReport.chart}</div>

        <div className="flex justify-center mt-4 gap-1.5">
          {reports.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setActiveIndex(index)
                  setIsTransitioning(false)
                }, 500)
              }}
              className={`h-2 w-2 rounded-full transition-all ${
                index === activeIndex ? "bg-[#1F4E79] w-4" : "bg-[#6A8AA6]/50"
              }`}
              aria-label={`View report ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
