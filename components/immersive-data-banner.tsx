"use client"

import { useState, useEffect } from "react"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Line chart visualization
const LineChartVisualization = ({ isHovered }: { isHovered: boolean }) => {
  // Sample data points for visualization
  const dataPoints = [
    { x: 0, y: 80 },
    { x: 20, y: 60 },
    { x: 40, y: 80 },
    { x: 60, y: 40 },
    { x: 80, y: 20 },
    { x: 100, y: 40 },
  ]

  // Create the path for the line chart
  const linePath = dataPoints
    .map((point, i) => (i === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(" ")

  // Create the area under the line
  const areaPath = `${linePath} L100,100 L0,100 Z`

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-[#1F4E79]/5 transition-all duration-500"
            style={{
              left: `${(i / 6) * 100}%`,
              opacity: isHovered ? 0.15 : 0.1,
            }}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-[#1F4E79]/5 transition-all duration-500"
            style={{
              top: `${(i / 6) * 100}%`,
              opacity: isHovered ? 0.15 : 0.1,
            }}
          />
        ))}
      </div>

      {/* Background data visualization */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          className="transition-all duration-500"
          style={{ opacity: isHovered ? 0.15 : 0.08 }}
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#1F4E79"
          strokeWidth={isHovered ? "1.5" : "1"}
          className="transition-all duration-500"
          style={{ opacity: isHovered ? 0.4 : 0.3 }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={isHovered ? 2 : 1.5}
            fill="#1F4E79"
            className="transition-all duration-500"
            style={{ opacity: isHovered ? 0.5 : 0.3 }}
          />
        ))}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F4E79" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1F4E79" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Bar chart visualization
const BarChartVisualization = ({ isHovered }: { isHovered: boolean }) => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Bar chart */}
        <rect
          x="10"
          y={animated ? "70" : "100"}
          width="10"
          height="30"
          fill="#1F4E79"
          opacity={isHovered ? 0.9 : 0.7}
          className="transition-all duration-1000"
        />
        <rect
          x="30"
          y={animated ? "50" : "100"}
          width="10"
          height="50"
          fill="#1F4E79"
          opacity={isHovered ? 0.9 : 0.7}
          className="transition-all duration-1000 delay-100"
        />
        <rect
          x="50"
          y={animated ? "30" : "100"}
          width="10"
          height="70"
          fill="#1F4E79"
          opacity={isHovered ? 0.9 : 0.7}
          className="transition-all duration-1000 delay-200"
        />
        <rect
          x="70"
          y={animated ? "40" : "100"}
          width="10"
          height="60"
          fill="#E76F51"
          opacity={isHovered ? 0.9 : 0.7}
          className="transition-all duration-1000 delay-300"
        />

        {/* Horizontal grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="#1F4E79" strokeWidth="0.5" opacity="0.1" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#1F4E79" strokeWidth="0.5" opacity="0.1" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#1F4E79" strokeWidth="0.5" opacity="0.1" />
      </svg>
    </div>
  )
}

// Pie chart visualization
const PieChartVisualization = ({ isHovered }: { isHovered: boolean }) => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[150px] max-h-[150px] opacity-30" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#1F4E79"
          strokeWidth="20"
          strokeDasharray={animated ? "62.8 251.2" : "0 251.2"}
          className="transition-all duration-1000"
          style={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#6A8AA6"
          strokeWidth="20"
          strokeDasharray={animated ? "62.8 251.2" : "0 251.2"}
          strokeDashoffset="-62.8"
          className="transition-all duration-1000 delay-200"
          style={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#E76F51"
          strokeWidth="20"
          strokeDasharray={animated ? "62.8 251.2" : "0 251.2"}
          strokeDashoffset="-125.6"
          className="transition-all duration-1000 delay-400"
          style={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#F5F6FA"
          strokeWidth="20"
          strokeDasharray={animated ? "62.8 251.2" : "0 251.2"}
          strokeDashoffset="-188.4"
          className="transition-all duration-1000 delay-600"
          style={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
      </svg>
    </div>
  )
}

// Data card component
const DataCard = ({
  title,
  value,
  trend,
  isHovered,
}: { title: string; value: string; trend: string; isHovered: boolean }) => {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-[#1F4E79]/10 transition-all duration-500"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        opacity: isHovered ? 1 : 0.9,
      }}
    >
      <div className="text-sm text-[#6A8AA6]">{title}</div>
      <div className="flex items-center">
        <div className="text-2xl font-bold text-[#1F4E79]">{value}</div>
        {trend === "up" && <TrendingUp className="ml-1 h-4 w-4 text-[#E76F51]" />}
        {trend === "down" && <TrendingUp className="ml-1 h-4 w-4 -rotate-180 text-[#E76F51]" />}
      </div>
    </div>
  )
}

export function ImmersiveDataBanner() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeViz, setActiveViz] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViz((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F6FA] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background data visualization - faded into background */}
      <LineChartVisualization isHovered={isHovered} />

      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left column: Text content */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#1F4E79]">
                Grow Your Business with Data-Driven Insights
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Helping local stores and restaurants make smarter decisions to increase revenue and reduce waste.
              </p>
              <p className="max-w-[600px] text-[#6A8AA6] font-medium">
                Turning complex data into simple growth strategies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:shadow-md"
                style={{ backgroundColor: "#1F4E79", color: "white" }}
              >
                Book Your Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="inline-flex items-center gap-2 border-[#F4B400] text-[#1F4E79] hover:bg-[#F4B400] hover:text-[#1F1F1F] transition-all duration-300"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Right column: Interactive data visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative h-[400px] md:h-[450px]"
          >
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-4">
              {/* Multiple visualizations */}
              <div className="relative col-span-2 row-span-1 bg-white/30 rounded-lg p-4 backdrop-blur-sm">
                {activeViz === 0 && <BarChartVisualization isHovered={isHovered} />}
                {activeViz === 1 && <LineChartVisualization isHovered={isHovered} />}
                {activeViz === 2 && <PieChartVisualization isHovered={isHovered} />}

                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeViz === i ? "bg-[#E76F51] w-4" : "bg-[#6A8AA6]/50"
                      }`}
                      onClick={() => setActiveViz(i)}
                      aria-label={`Visualization ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Data cards */}
              <DataCard title="Revenue Growth" value="+28%" trend="up" isHovered={isHovered} />
              <DataCard title="Waste Reduction" value="-22%" trend="down" isHovered={isHovered} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
