"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Define our color palette with emphasis on the blue
const colors = {
  primary: "#1F4E79", // Deep Navy Blue (main color)
  primaryLight: "#3A6EA5", // Lighter blue for hover states
  primaryLighter: "#D0E1F9", // Very light blue for backgrounds
  secondary: "#6A8AA6", // Muted Blue-Gray
  accent: "#E76F51", // Coral for contrast
  highlight: "#F4B400", // Yellow for highlights
  background: "#F5F6FA", // Light Gray background
  text: "#333333", // Dark text
  textLight: "#666666", // Light text
}

// Premium Bar Chart Component
const PremiumBarChart = ({ isActive }: { isActive: boolean }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const data = [
    { label: "Q1", value: 65, color: colors.primary },
    { label: "Q2", value: 85, color: colors.primary },
    { label: "Q3", value: 50, color: colors.secondary },
    { label: "Q4", value: 75, color: colors.accent },
  ]

  return (
    <div className="h-full w-full flex flex-col" ref={chartRef} onMouseLeave={() => setHovered(null)}>
      <div className="flex-1 flex items-end justify-around px-8 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between text-right pr-2 text-xs text-gray-500 pointer-events-none">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-x-8 inset-y-0 flex flex-col justify-between pointer-events-none">
          <div className="border-t border-gray-200 w-full"></div>
          <div className="border-t border-gray-200 w-full"></div>
          <div className="border-t border-gray-200 w-full"></div>
          <div className="border-t border-gray-200 w-full"></div>
          <div className="border-t border-gray-200 w-full"></div>
        </div>

        {/* Bars */}
        {data.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center"
            style={{ width: `${100 / data.length - 10}%` }}
            onMouseEnter={() => setHovered(i)}
          >
            <motion.div
              className="w-full rounded-t-md transition-colors duration-300"
              style={{
                backgroundColor: hovered === i ? colors.primaryLight : item.color,
                boxShadow: hovered === i ? "0 4px 12px rgba(31, 78, 121, 0.2)" : "none",
              }}
              initial={{ height: 0 }}
              animate={{
                height: isActive ? `${item.value}%` : 0,
                opacity: hovered === i ? 1 : 0.9,
              }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            />

            {/* Tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-center z-10 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hovered === i && isActive ? 1 : 0,
                y: hovered === i && isActive ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-bold text-[#1F4E79]">{item.value}%</div>
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="h-8 flex justify-around px-8">
        {data.map((item, i) => (
          <div key={i} className="text-sm font-medium text-center" style={{ width: `${100 / data.length - 10}%` }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// Premium Line Chart Component
const PremiumLineChart = ({ isActive }: { isActive: boolean }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const data = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 50 },
    { month: "Apr", value: 70 },
    { month: "May", value: 90 },
    { month: "Jun", value: 75 },
  ]

  // Create points for the SVG path
  const points = data.map((point, index) => ({
    x: 10 + (index * 80) / (data.length - 1),
    y: 90 - point.value * 0.8,
    ...point,
  }))

  // Create the SVG path
  const linePath = points.map((point, i) => `${i === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ")
  const areaPath = `${linePath} L${points[points.length - 1].x},100 L${points[0].x},100 Z`

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between text-right pr-2 text-xs text-gray-500 pointer-events-none">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <g>
            <line x1="10" y1="20" x2="100" y2="20" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="10" y1="40" x2="100" y2="40" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="10" y1="60" x2="100" y2="60" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="10" y1="80" x2="100" y2="80" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="10" y1="100" x2="100" y2="100" stroke="#f0f0f0" strokeWidth="1" />
          </g>

          {/* Area under the line */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d={areaPath}
            fill="url(#lineGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1 }}
          />

          {/* The line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === i ? 5 : 3.5}
                fill={hoveredPoint === i ? colors.primaryLight : colors.primary}
                stroke={hoveredPoint === i ? "white" : "none"}
                strokeWidth={hoveredPoint === i ? 2 : 0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0,
                  r: hoveredPoint === i ? 5 : 3.5,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.5 + i * 0.1,
                  scale: { type: "spring", stiffness: 300 },
                }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: "pointer" }}
              />

              {/* Tooltip */}
              {hoveredPoint === i && (
                <motion.g
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={point.x - 25}
                    y={point.y - 35}
                    width="50"
                    height="25"
                    rx="4"
                    fill="white"
                    stroke={colors.primaryLighter}
                    strokeWidth="1"
                  />
                  <text
                    x={point.x}
                    y={point.y - 20}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill={colors.primary}
                  >
                    {point.value}%
                  </text>
                  <text x={point.x} y={point.y - 10} textAnchor="middle" fontSize="8" fill={colors.textLight}>
                    {point.month}
                  </text>
                  <path
                    d={`M${point.x - 4} ${point.y - 10} L${point.x} ${point.y - 5} L${point.x + 4} ${point.y - 10}`}
                    fill="white"
                  />
                </motion.g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="h-8 flex justify-between px-10">
        {data.map((item, i) => (
          <div key={i} className="text-sm font-medium">
            {item.month}
          </div>
        ))}
      </div>
    </div>
  )
}

// Premium Pie Chart Component
const PremiumPieChart = ({ isActive }: { isActive: boolean }) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const data = [
    { label: "Product A", value: 35, color: colors.primary },
    { label: "Product B", value: 25, color: colors.secondary },
    { label: "Product C", value: 20, color: colors.accent },
    { label: "Other", value: 20, color: colors.primaryLighter },
  ]

  // Calculate stroke-dashoffset for each segment
  const circumference = 2 * Math.PI * 40 // 2πr
  let currentOffset = 0
  const segmentsWithOffsets = data.map((segment, i) => {
    const segmentLength = (segment.value / 100) * circumference
    const segmentOffset = currentOffset
    currentOffset -= segmentLength
    return {
      ...segment,
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: segmentOffset,
      index: i,
    }
  })

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="white" stroke="#f0f0f0" strokeWidth="1" />

            {/* Segments */}
            {segmentsWithOffsets.map((segment, i) => (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={hoveredSegment === i ? colors.primaryLight : segment.color}
                strokeWidth="20"
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.dashOffset}
                transform="rotate(-90 50 50)"
                initial={{ strokeDasharray: "0 251.2" }}
                animate={{
                  strokeDasharray: isActive ? segment.dashArray : "0 251.2",
                  strokeWidth: hoveredSegment === i ? "22" : "20",
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  strokeWidth: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredSegment(i)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* Center circle */}
            <circle cx="50" cy="50" r="30" fill="white" />

            {/* Center text */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <text x="50" y="48" textAnchor="middle" fontSize="10" fill={colors.textLight}>
                Total
              </text>
              <text x="50" y="58" textAnchor="middle" fontSize="14" fontWeight="bold" fill={colors.primary}>
                100%
              </text>
            </motion.g>

            {/* Tooltip */}
            {hoveredSegment !== null && (
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <rect
                  x="25"
                  y="15"
                  width="50"
                  height="25"
                  rx="4"
                  fill="white"
                  stroke={colors.primaryLighter}
                  strokeWidth="1"
                  filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                />
                <text x="50" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill={colors.primary}>
                  {data[hoveredSegment].label}
                </text>
                <text x="50" y="38" textAnchor="middle" fontSize="10" fill={colors.textLight}>
                  {data[hoveredSegment].value}%
                </text>
              </motion.g>
            )}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="h-8 flex justify-center gap-4">
        {data.map((segment, i) => (
          <div
            key={i}
            className="flex items-center gap-2 transition-all duration-200"
            style={{
              transform: hoveredSegment === i ? "scale(1.05)" : "scale(1)",
              fontWeight: hoveredSegment === i ? "bold" : "normal",
            }}
            onMouseEnter={() => setHoveredSegment(i)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
            <div className="text-sm">{segment.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Premium Horizontal Bar Chart Component
const PremiumHorizontalBarChart = ({ isActive }: { isActive: boolean }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const data = [
    { label: "Product A", value: 85, color: colors.primary },
    { label: "Product B", value: 65, color: colors.secondary },
    { label: "Product C", value: 45, color: colors.accent },
    { label: "Product D", value: 30, color: colors.primaryLighter },
  ]

  return (
    <div className="h-full w-full flex flex-col justify-center px-8 py-4 space-y-6">
      {data.map((item, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setHoveredBar(i)}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-sm font-medium">{item.value}%</span>
          </div>
          <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
            <motion.div
              className="h-full rounded-md transition-colors duration-300"
              style={{
                backgroundColor: hoveredBar === i ? colors.primaryLight : item.color,
                boxShadow: hoveredBar === i ? "0 2px 8px rgba(31, 78, 121, 0.2)" : "none",
              }}
              initial={{ width: 0 }}
              animate={{
                width: isActive ? `${item.value}%` : 0,
                opacity: hoveredBar === i ? 1 : 0.9,
              }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
          </div>

          {/* Value indicator */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold text-[#1F4E79] pointer-events-none"
            style={{
              left: `calc(${item.value}% - 15px)`,
              opacity: hoveredBar === i ? 1 : 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredBar === i && isActive ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.value}%
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// Main Premium Graph Carousel Component
export function PremiumGraphCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const charts = [
    {
      type: "bar",
      title: "Quarterly Sales Performance",
      subtitle: "Revenue by Quarter",
      component: PremiumBarChart,
    },
    {
      type: "line",
      title: "Growth Trend Analysis",
      subtitle: "Monthly Performance",
      component: PremiumLineChart,
    },
    {
      type: "pie",
      title: "Revenue Distribution",
      subtitle: "By Product Category",
      component: PremiumPieChart,
    },
    {
      type: "horizontal-bar",
      title: "Product Performance",
      subtitle: "By Category",
      component: PremiumHorizontalBarChart,
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % charts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [charts.length, isPaused])

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % charts.length)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + charts.length) % charts.length)
  }

  return (
    <div
      className="relative w-full h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gray-100 w-full">
        <motion.div
          className="h-full bg-[#1F4E79]"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${(activeIndex / (charts.length - 1)) * 100}%` : "100%" }}
          transition={{
            duration: isPaused ? 0 : 5,
            ease: "linear",
          }}
        />
      </div>

      <div className="p-6 h-full flex flex-col">
        {/* Chart title */}
        <div className="mb-4 flex justify-between items-center">
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

          {/* Navigation controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Previous chart"
            >
              <ArrowLeft className="h-4 w-4 text-[#1F4E79]" />
            </button>
            <button
              onClick={goToNext}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Next chart"
            >
              <ArrowRight className="h-4 w-4 text-[#1F4E79]" />
            </button>
          </div>
        </div>

        {/* Chart display area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Render the active chart component */}
              {React.createElement(charts[activeIndex].component, { isActive: true })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-4 gap-2">
          {charts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#1F4E79] w-8 shadow-sm" : "bg-[#6A8AA6]/30 w-2 hover:bg-[#6A8AA6]/50"
              }`}
              aria-label={`View chart ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
