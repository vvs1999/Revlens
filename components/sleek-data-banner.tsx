"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useInView } from "framer-motion"

// Animated number counter
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = value
      const totalFrames = Math.round(duration * 60)
      const increment = end / totalFrames

      const counter = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(counter)
    }
  }, [inView, value, duration])

  return <span ref={ref}>{count}</span>
}

// Animated line chart
const AnimatedLineChart = () => {
  const chartRef = useRef(null)
  const inView = useInView(chartRef, { once: true })
  const [isHovered, setIsHovered] = useState(false)

  // Data points for the chart
  const dataPoints = [
    { x: 0, y: 85 },
    { x: 20, y: 60 },
    { x: 40, y: 70 },
    { x: 60, y: 40 },
    { x: 80, y: 30 },
    { x: 100, y: 20 },
  ]

  // Create the path for the line chart
  const linePath = dataPoints
    .map((point, i) => (i === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(" ")

  return (
    <div
      ref={chartRef}
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <g className="text-gray-200">
          <line x1="0" y1="25" x2="100" y2="25" strokeWidth="0.5" stroke="currentColor" />
          <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.5" stroke="currentColor" />
          <line x1="0" y1="75" x2="100" y2="75" strokeWidth="0.5" stroke="currentColor" />
        </g>

        {/* Area under the line */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F4E79" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1F4E79" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${linePath} L100,100 L0,100 Z`}
          fill="url(#areaGradient)"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#1F4E79"
          strokeWidth={isHovered ? "2" : "1.5"}
          strokeDasharray="200"
          strokeDashoffset={inView ? "0" : "200"}
          style={{
            transition: "stroke-dashoffset 2s ease-out, stroke-width 0.3s ease",
          }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={isHovered ? "2.5" : "2"}
            fill="#1F4E79"
            style={{
              opacity: inView ? 1 : 0,
              transform: `scale(${isHovered ? 1.2 : 1})`,
              transition: `opacity 1.5s ease-in-out ${i * 0.1}s, transform 0.3s ease`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Animated bar chart
const AnimatedBarChart = () => {
  const chartRef = useRef(null)
  const inView = useInView(chartRef, { once: true })
  const [isHovered, setIsHovered] = useState(false)

  // Data for the bars
  const barData = [
    { value: 65, color: "#1F4E79" },
    { value: 85, color: "#1F4E79" },
    { value: 50, color: "#6A8AA6" },
    { value: 75, color: "#E76F51" },
  ]

  return (
    <div
      ref={chartRef}
      className="relative h-full w-full flex items-end justify-around px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {barData.map((bar, i) => (
        <div
          key={i}
          className="relative w-1/6 rounded-t-sm transition-all duration-300"
          style={{
            height: inView ? `${bar.value}%` : "0%",
            backgroundColor: bar.color,
            opacity: isHovered ? 1 : 0.85,
            transform: isHovered ? "scaleY(1.03)" : "scaleY(1)",
            transformOrigin: "bottom",
            transition: `height 1.5s ease-out ${i * 0.2}s, opacity 0.3s ease, transform 0.3s ease`,
          }}
        >
          {isHovered && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium">
              {bar.value}%
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Metric card component
const MetricCard = ({
  icon,
  value,
  label,
  trend,
  color = "#1F4E79",
}: {
  icon: React.ReactNode
  value: string
  label: string
  trend?: "up" | "down"
  color?: string
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500 text-sm">{label}</div>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex items-center">
        <div className="text-2xl font-bold" style={{ color }}>
          {value}
        </div>
        {trend && (
          <div
            className={`ml-2 flex items-center text-xs font-medium ${
              trend === "up" ? "text-[#E76F51]" : "text-green-500"
            }`}
          >
            {trend === "up" ? (
              <>
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                <span>+12%</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="h-3 w-3 mr-0.5 transform rotate-180" />
                <span>-8%</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function SleekDataBanner() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-28 bg-gradient-to-b from-white to-[#F5F6FA]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>

        {/* Grid pattern */}
        <div className="grid grid-cols-6 h-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-r border-gray-500 h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-6 w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-500 w-full"></div>
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left column: Text content */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <MetricCard
                icon={<ArrowUpRight className="h-5 w-5" />}
                value={<AnimatedCounter value={28} /> + "%"}
                label="Average Revenue Growth"
                trend="up"
              />
              <MetricCard
                icon={<ArrowUpRight className="h-5 w-5 transform rotate-180" />}
                value={<AnimatedCounter value={22} /> + "%"}
                label="Waste Reduction"
                trend="down"
                color="#E76F51"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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

          {/* Right column: Data visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[450px] rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-xl"></div>

            <div className="absolute inset-0 grid grid-rows-2 gap-6 p-6">
              {/* Top chart */}
              <div className="relative rounded-lg overflow-hidden bg-white/80 shadow-sm p-4">
                <div className="absolute top-4 left-4">
                  <h3 className="font-medium text-[#1F4E79]">Revenue Trends</h3>
                  <p className="text-xs text-gray-500">Last 6 months</p>
                </div>
                <div className="h-full pt-10">
                  <AnimatedLineChart />
                </div>
              </div>

              {/* Bottom chart */}
              <div className="relative rounded-lg overflow-hidden bg-white/80 shadow-sm p-4">
                <div className="absolute top-4 left-4">
                  <h3 className="font-medium text-[#1F4E79]">Product Performance</h3>
                  <p className="text-xs text-gray-500">By category</p>
                </div>
                <div className="h-full pt-10">
                  <AnimatedBarChart />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-8 w-16 h-16 bg-[#E76F51]/10 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-1/3 left-8 w-12 h-12 bg-[#1F4E79]/10 rounded-full animate-float-medium"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
