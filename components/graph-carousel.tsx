"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define our color palette
const colors = {
  primary: "#1F4E79", // Deep Navy
  secondary: "#6A8AA6", // Muted Blue-Gray
  accent: "#E76F51", // Coral
  background: "#F5F6FA", // Light Gray
}

// Bar Chart Component - Simplified and improved
const BarChart = ({ isActive }: { isActive: boolean }) => {
  // Data for the bars
  const barData = [
    { value: 65, color: colors.primary, label: "Q1" },
    { value: 85, color: colors.primary, label: "Q2" },
    { value: 50, color: colors.secondary, label: "Q3" },
    { value: 75, color: colors.accent, label: "Q4" },
  ]

  return (
    <div className="h-full w-full flex items-end justify-around px-4 pt-10">
      {/* Grid lines */}
      <div className="absolute inset-0 pt-10">
        <div className="border-t border-gray-200 absolute top-1/4 w-full"></div>
        <div className="border-t border-gray-200 absolute top-1/2 w-full"></div>
        <div className="border-t border-gray-200 absolute top-3/4 w-full"></div>
      </div>

      {/* Bars */}
      {barData.map((bar, i) => (
        <div key={i} className="relative flex flex-col items-center w-1/6">
          <motion.div
            className="w-full rounded-t-sm"
            style={{ backgroundColor: bar.color }}
            initial={{ height: 0 }}
            animate={{ height: isActive ? `${bar.value}%` : 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          />
          <div className="text-xs mt-2 text-gray-500">{bar.label}</div>

          {/* Value label on top of bar */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
          >
            {bar.value}%
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// Line Chart Component - Simplified
const LineChart = ({ isActive }: { isActive: boolean }) => {
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
  const areaPath = `${linePath} L ${dataPoints[dataPoints.length - 1].x} 100 L ${dataPoints[0].x} 100 Z`

  return (
    <div className="h-full w-full">
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
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data points - simplified, no hover effects */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="2.5"
            fill={colors.primary}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  )
}

// Pie Chart Component
const PieChart = ({ isActive }: { isActive: boolean }) => {
  const segments = [
    { color: colors.primary, value: 35, label: "Product A" },
    { color: colors.secondary, value: 25, label: "Product B" },
    { color: colors.accent, value: 20, label: "Product C" },
    { color: "#F5F6FA", value: 20, label: "Other" },
  ]

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {segments.map((segment, i) => (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDashoffset={i === 0 ? "0" : `-${i * 62.8}`}
              initial={{ strokeDasharray: "0 251.2" }}
              animate={{ strokeDasharray: isActive ? `${segment.value * 2.51} 251.2` : "0 251.2" }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          ))}
        </svg>

        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="text-sm font-medium text-gray-500">Total</div>
          <div className="text-2xl font-bold text-[#1F4E79]">100%</div>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
            <div className="text-xs">{segment.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Horizontal Bar Chart Component - NEW!
const HorizontalBarChart = ({ isActive }: { isActive: boolean }) => {
  const data = [
    { label: "Product A", value: 85, color: colors.primary },
    { label: "Product B", value: 65, color: colors.secondary },
    { label: "Product C", value: 45, color: colors.accent },
    { label: "Product D", value: 30, color: "#8884d8" },
  ]

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 py-6 space-y-4">
      {data.map((item, i) => (
        <div key={i} className="relative">
          <div className="text-xs font-medium mb-1 flex justify-between">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: isActive ? `${item.value}%` : 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Main Carousel Component
export function GraphCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const charts = [
    { type: "bar", title: "Quarterly Sales", subtitle: "By Quarter" },
    { type: "horizontal-bar", title: "Product Performance", subtitle: "By Category" },
    { type: "pie", title: "Revenue Distribution", subtitle: "By Product Category" },
    { type: "line", title: "Growth Trend", subtitle: "Last 12 Months" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % charts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [charts.length])

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
        <motion.div
          className="h-full bg-[#1F4E79]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
      </div>

      <div className="p-6 h-full">
        {/* Chart title */}
        <div className="mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <h3 className="font-medium text-lg text-[#1F4E79]">{charts[activeIndex].title}</h3>
              <p className="text-sm text-gray-500">{charts[activeIndex].subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chart display area */}
        <div className="h-[300px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {charts[activeIndex].type === "bar" && <BarChart isActive={activeIndex === 0} />}
              {charts[activeIndex].type === "horizontal-bar" && <HorizontalBarChart isActive={activeIndex === 1} />}
              {charts[activeIndex].type === "pie" && <PieChart isActive={activeIndex === 2} />}
              {charts[activeIndex].type === "line" && <LineChart isActive={activeIndex === 3} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-4 gap-1.5">
          {charts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "bg-[#1F4E79] w-4" : "bg-[#6A8AA6]/50 w-2"
              }`}
              aria-label={`View chart ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
