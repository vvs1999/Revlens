"use client"
import { motion } from "framer-motion"

// Update the colors object to use the project's color scheme
const colors = {
  primary: "#1E3246", // Navy - primary color
  secondary: "#4A6B8A", // Navy light
  accent: "#E76F51", // Coral
  highlight: "#F0B429", // Gold
  navy: {
    DEFAULT: "#1E3246",
    light: "#4A6B8A",
    lighter: "#8DA9C4",
    dark: "#0F1A24",
  },
  gold: {
    DEFAULT: "#F0B429",
    light: "#F7D070",
    dark: "#D49A12",
  },
  coral: {
    DEFAULT: "#E76F51",
    light: "#F4A491",
    dark: "#C24D32",
  },
}

// Category-specific color schemes using the project's colors
const categoryColors = {
  cafe: [colors.navy.DEFAULT, colors.navy.light, colors.navy.lighter, colors.gold.DEFAULT],
  retail: [colors.gold.DEFAULT, colors.gold.light, colors.gold.dark, colors.navy.light],
  restaurant: [colors.coral.DEFAULT, colors.coral.light, colors.coral.dark, colors.navy.lighter],
  salon: [colors.navy.DEFAULT, colors.coral.DEFAULT, colors.gold.DEFAULT, colors.navy.lighter],
}

// Standardized Bar Chart with responsive dimensions
export function StandardBarChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  const barData = {
    cafe: [
      { label: "Coffee", value: 65, color: colorScheme[0] },
      { label: "Pastries", value: 45, color: colorScheme[1] },
      { label: "Sandwiches", value: 30, color: colorScheme[2] },
      { label: "Beverages", value: 25, color: colorScheme[3] },
    ],
    retail: [
      { label: "Apparel", value: 40, color: colorScheme[0] },
      { label: "Electronics", value: 70, color: colorScheme[1] },
      { label: "Home Goods", value: 55, color: colorScheme[2] },
      { label: "Accessories", value: 35, color: colorScheme[3] },
    ],
    restaurant: [
      { label: "Entrees", value: 55, color: colorScheme[0] },
      { label: "Appetizers", value: 35, color: colorScheme[1] },
      { label: "Desserts", value: 25, color: colorScheme[2] },
      { label: "Beverages", value: 45, color: colorScheme[3] },
    ],
    salon: [
      { label: "Haircuts", value: 60, color: colorScheme[0] },
      { label: "Color", value: 75, color: colorScheme[1] },
      { label: "Styling", value: 40, color: colorScheme[2] },
      { label: "Products", value: 25, color: colorScheme[3] },
    ],
  }

  const data = barData[category] || barData.cafe

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative">
        {/* Fixed height container for the chart */}
        <div className="absolute inset-0 flex items-end justify-around px-4">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="border-t border-gray-100 w-full"></div>
            <div className="border-t border-gray-100 w-full"></div>
            <div className="border-t border-gray-100 w-full"></div>
            <div className="border-t border-gray-100 w-full"></div>
          </div>

          {/* Bars */}
          {data.map((bar, i) => (
            <div key={i} className="flex flex-col items-center relative z-10 w-1/6">
              <motion.div
                className="w-full rounded-t-sm"
                style={{ backgroundColor: bar.color }}
                initial={{ height: 0 }}
                animate={{ height: isActive ? `${bar.value}%` : 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
              <div className="mt-2 text-center">
                <div className="font-medium text-sm">{bar.value}%</div>
                <div className="text-xs text-gray-500">{bar.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Standardized Horizontal Bar Chart with responsive dimensions
export function StandardHorizontalBarChart({
  category = "cafe",
  isActive = true,
}: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  const horizontalBarData = {
    cafe: [
      { label: "Barista A", value: 85, color: colorScheme[0] },
      { label: "Barista B", value: 65, color: colorScheme[1] },
      { label: "Barista C", value: 45, color: colorScheme[2] },
      { label: "Barista D", value: 30, color: colorScheme[3] },
    ],
    retail: [
      { label: "Associate A", value: 75, color: colorScheme[0] },
      { label: "Associate B", value: 60, color: colorScheme[1] },
      { label: "Associate C", value: 80, color: colorScheme[2] },
      { label: "Associate D", value: 45, color: colorScheme[3] },
    ],
    restaurant: [
      { label: "Server A", value: 70, color: colorScheme[0] },
      { label: "Server B", value: 85, color: colorScheme[1] },
      { label: "Server C", value: 55, color: colorScheme[2] },
      { label: "Server D", value: 65, color: colorScheme[3] },
    ],
    salon: [
      { label: "Stylist A", value: 90, color: colorScheme[0] },
      { label: "Stylist B", value: 75, color: colorScheme[1] },
      { label: "Stylist C", value: 85, color: colorScheme[2] },
      { label: "Stylist D", value: 60, color: colorScheme[3] },
    ],
  }

  const data = horizontalBarData[category] || horizontalBarData.cafe

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col justify-center space-y-6 px-4">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: isActive ? `${item.value}%` : 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Heat Map Chart
export function HeatMapChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe
  const baseColor = colorScheme[0]

  // Different data for each category
  const heatMapData = {
    cafe: [
      ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"],
      ["Mon", [10, 25, 80, 70, 50, 85, 90, 70, 40, 30, 45, 60, 70, 50, 20]],
      ["Tue", [15, 30, 75, 65, 45, 80, 85, 65, 35, 25, 40, 55, 65, 45, 15]],
      ["Wed", [20, 35, 85, 75, 55, 90, 95, 75, 45, 35, 50, 65, 75, 55, 25]],
      ["Thu", [15, 30, 80, 70, 50, 85, 90, 70, 40, 30, 45, 60, 70, 50, 20]],
      ["Fri", [25, 40, 90, 80, 60, 95, 100, 80, 50, 40, 55, 70, 80, 60, 30]],
      ["Sat", [40, 60, 95, 85, 70, 90, 85, 95, 80, 70, 75, 85, 90, 75, 45]],
      ["Sun", [30, 50, 85, 75, 60, 80, 75, 85, 70, 60, 65, 75, 80, 65, 35]],
    ],
    retail: [
      ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm"],
      ["Mon", [20, 30, 45, 60, 55, 50, 65, 80, 70, 60, 40, 20]],
      ["Tue", [15, 25, 40, 55, 50, 45, 60, 75, 65, 55, 35, 15]],
      ["Wed", [25, 35, 50, 65, 60, 55, 70, 85, 75, 65, 45, 25]],
      ["Thu", [20, 30, 45, 60, 55, 50, 65, 80, 70, 60, 40, 20]],
      ["Fri", [30, 40, 55, 70, 65, 60, 75, 90, 80, 70, 50, 30]],
      ["Sat", [50, 60, 75, 90, 85, 80, 95, 100, 90, 80, 60, 40]],
      ["Sun", [40, 50, 65, 80, 75, 70, 85, 95, 85, 75, 55, 35]],
    ],
    restaurant: [
      ["11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"],
      ["Mon", [10, 30, 60, 40, 20, 30, 70, 90, 80, 60, 30, 10]],
      ["Tue", [15, 35, 65, 45, 25, 35, 75, 85, 75, 55, 25, 5]],
      ["Wed", [20, 40, 70, 50, 30, 40, 80, 95, 85, 65, 35, 15]],
      ["Thu", [25, 45, 75, 55, 35, 45, 85, 100, 90, 70, 40, 20]],
      ["Fri", [30, 50, 80, 60, 40, 50, 90, 100, 95, 80, 60, 40]],
      ["Sat", [35, 55, 85, 65, 45, 55, 95, 100, 100, 90, 70, 50]],
      ["Sun", [25, 45, 75, 55, 35, 45, 85, 95, 90, 75, 50, 30]],
    ],
    salon: [
      ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"],
      ["Mon", [30, 50, 70, 60, 80, 70, 90, 80, 60, 40, 20]],
      ["Tue", [40, 60, 80, 70, 90, 80, 95, 85, 65, 45, 25]],
      ["Wed", [20, 40, 60, 50, 70, 60, 80, 70, 50, 30, 10]],
      ["Thu", [50, 70, 90, 80, 95, 85, 100, 90, 70, 50, 30]],
      ["Fri", [60, 80, 95, 85, 100, 90, 100, 95, 80, 60, 40]],
      ["Sat", [70, 90, 100, 90, 100, 95, 100, 100, 90, 70, 50]],
      ["Sun", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], // Closed
    ],
  }

  const data = heatMapData[category] || heatMapData.cafe
  const hours = data[0]
  const days = data.slice(1)

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hours header */}
          <div className="flex">
            <div className="w-12 flex-shrink-0"></div>
            {hours.map((hour, i) => (
              <div key={i} className="flex-1 text-xs text-center text-gray-500 pb-1">
                {hour}
              </div>
            ))}
          </div>

          {/* Days and heat cells */}
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex items-center">
              <div className="w-12 text-xs font-medium pr-2 text-right">{day[0]}</div>
              <div className="flex-1 flex">
                {day[1].map((value, hourIndex) => (
                  <motion.div
                    key={hourIndex}
                    className="flex-1 h-8 m-0.5 rounded"
                    style={{
                      backgroundColor: `rgba(${Number.parseInt(baseColor.slice(1, 3), 16)}, ${Number.parseInt(baseColor.slice(3, 5), 16)}, ${Number.parseInt(baseColor.slice(5, 7), 16)}, ${value / 100})`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: dayIndex * 0.1 + hourIndex * 0.01 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Location Map Chart
export function LocationMapChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  // Different data for each category
  const locationData = {
    cafe: [
      { id: 1, name: "Downtown", x: 30, y: 40, value: 85, radius: 15 },
      { id: 2, name: "Westside", x: 15, y: 60, value: 65, radius: 12 },
      { id: 3, name: "Northside", x: 50, y: 20, value: 75, radius: 13 },
      { id: 4, name: "Eastside", x: 70, y: 50, value: 55, radius: 10 },
      { id: 5, name: "Southside", x: 40, y: 75, value: 45, radius: 9 },
    ],
    retail: [
      { id: 1, name: "Mall Location", x: 50, y: 50, value: 90, radius: 16 },
      { id: 2, name: "Downtown", x: 30, y: 30, value: 75, radius: 13 },
      { id: 3, name: "Outlet Center", x: 70, y: 70, value: 80, radius: 14 },
      { id: 4, name: "Strip Mall", x: 20, y: 60, value: 60, radius: 11 },
      { id: 5, name: "Airport", x: 80, y: 40, value: 50, radius: 10 },
    ],
    restaurant: [
      { id: 1, name: "Downtown", x: 40, y: 30, value: 85, radius: 15 },
      { id: 2, name: "Waterfront", x: 60, y: 20, value: 90, radius: 16 },
      { id: 3, name: "University", x: 25, y: 50, value: 70, radius: 13 },
      { id: 4, name: "Suburbs", x: 75, y: 60, value: 65, radius: 12 },
      { id: 5, name: "Mall", x: 50, y: 75, value: 60, radius: 11 },
    ],
    salon: [
      { id: 1, name: "Downtown", x: 35, y: 45, value: 90, radius: 16 },
      { id: 2, name: "Uptown", x: 65, y: 35, value: 85, radius: 15 },
      { id: 3, name: "West End", x: 20, y: 65, value: 75, radius: 13 },
      { id: 4, name: "East Side", x: 80, y: 55, value: 70, radius: 12 },
    ],
  }

  const locations = locationData[category] || locationData.cafe

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative">
        {/* Map background */}
        <div className="absolute inset-0 bg-gray-50 rounded-lg">
          {/* Grid lines */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="opacity-30">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>

          {/* Location bubbles */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            {locations.map((location, i) => (
              <g key={i}>
                <motion.circle
                  cx={location.x}
                  cy={location.y}
                  r={location.radius}
                  fill={`${colorScheme[i % colorScheme.length]}80`}
                  initial={{ r: 0 }}
                  animate={{ r: isActive ? location.radius : 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                />
                <motion.circle
                  cx={location.x}
                  cy={location.y}
                  r={3}
                  fill={colorScheme[i % colorScheme.length]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                />
                <motion.text
                  x={location.x}
                  y={location.y + location.radius + 5}
                  textAnchor="middle"
                  fontSize="3"
                  fontWeight="bold"
                  fill="#333"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.5 }}
                >
                  {location.name}
                </motion.text>
                <motion.text
                  x={location.x}
                  y={location.y}
                  textAnchor="middle"
                  fontSize="4"
                  fontWeight="bold"
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.5 }}
                >
                  {location.value}%
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

// Bubble Chart
export function BubbleChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  // Different data for each category
  const bubbleData = {
    cafe: [
      { name: "Espresso", x: 30, y: 70, size: 20, color: colorScheme[0] },
      { name: "Latte", x: 60, y: 80, size: 25, color: colorScheme[1] },
      { name: "Cappuccino", x: 45, y: 60, size: 18, color: colorScheme[2] },
      { name: "Cold Brew", x: 75, y: 40, size: 22, color: colorScheme[3] },
      { name: "Pastries", x: 25, y: 30, size: 15, color: colorScheme[0] },
      { name: "Sandwiches", x: 55, y: 20, size: 17, color: colorScheme[1] },
    ],
    retail: [
      { name: "T-Shirts", x: 20, y: 60, size: 18, color: colorScheme[0] },
      { name: "Jeans", x: 40, y: 75, size: 22, color: colorScheme[1] },
      { name: "Shoes", x: 65, y: 85, size: 25, color: colorScheme[2] },
      { name: "Accessories", x: 30, y: 30, size: 15, color: colorScheme[3] },
      { name: "Outerwear", x: 70, y: 40, size: 20, color: colorScheme[0] },
      { name: "Dresses", x: 50, y: 20, size: 17, color: colorScheme[1] },
    ],
    restaurant: [
      { name: "Steaks", x: 70, y: 80, size: 25, color: colorScheme[0] },
      { name: "Pasta", x: 40, y: 65, size: 20, color: colorScheme[1] },
      { name: "Salads", x: 25, y: 40, size: 15, color: colorScheme[2] },
      { name: "Desserts", x: 55, y: 30, size: 18, color: colorScheme[3] },
      { name: "Appetizers", x: 30, y: 70, size: 17, color: colorScheme[0] },
      { name: "Seafood", x: 60, y: 50, size: 22, color: colorScheme[1] },
    ],
    salon: [
      { name: "Haircuts", x: 30, y: 60, size: 20, color: colorScheme[0] },
      { name: "Color", x: 60, y: 75, size: 25, color: colorScheme[1] },
      { name: "Styling", x: 45, y: 40, size: 18, color: colorScheme[2] },
      { name: "Treatments", x: 25, y: 30, size: 15, color: colorScheme[3] },
      { name: "Extensions", x: 70, y: 50, size: 17, color: colorScheme[0] },
      { name: "Products", x: 50, y: 20, size: 12, color: colorScheme[1] },
    ],
  }

  const bubbles = bubbleData[category] || bubbleData.cafe

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative">
        {/* Chart background */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* X and Y axes */}
            <line x1="10" y1="90" x2="90" y2="90" stroke="#ccc" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="10" y2="90" stroke="#ccc" strokeWidth="0.5" />

            {/* Axis labels */}
            <text x="50" y="98" textAnchor="middle" fontSize="3" fill="#666">
              {category === "cafe" || category === "restaurant" ? "Popularity" : "Sales Volume"}
            </text>
            <text x="3" y="50" textAnchor="middle" fontSize="3" fill="#666" transform="rotate(-90, 3, 50)">
              {category === "cafe" || category === "restaurant" ? "Profit Margin" : "Profit Margin"}
            </text>

            {/* Bubbles */}
            {bubbles.map((bubble, i) => (
              <g key={i}>
                <motion.circle
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.size / 3}
                  fill={`${bubble.color}80`}
                  initial={{ r: 0 }}
                  animate={{ r: isActive ? bubble.size / 3 : 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                />
                <motion.text
                  x={bubble.x}
                  y={bubble.y}
                  textAnchor="middle"
                  fontSize="2.5"
                  fontWeight="bold"
                  fill="#333"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                >
                  {bubble.name}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

// Radar Chart
export function RadarChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  // Different data for each category
  const radarData = {
    cafe: [
      { axis: "Quality", value: 85 },
      { axis: "Service", value: 75 },
      { axis: "Ambiance", value: 80 },
      { axis: "Price", value: 65 },
      { axis: "Location", value: 90 },
      { axis: "Selection", value: 70 },
    ],
    retail: [
      { axis: "Selection", value: 90 },
      { axis: "Price", value: 70 },
      { axis: "Quality", value: 85 },
      { axis: "Service", value: 75 },
      { axis: "Location", value: 80 },
      { axis: "Experience", value: 85 },
    ],
    restaurant: [
      { axis: "Food Quality", value: 90 },
      { axis: "Service", value: 80 },
      { axis: "Ambiance", value: 85 },
      { axis: "Price", value: 70 },
      { axis: "Menu Variety", value: 75 },
      { axis: "Cleanliness", value: 95 },
    ],
    salon: [
      { axis: "Skill", value: 95 },
      { axis: "Service", value: 90 },
      { axis: "Price", value: 75 },
      { axis: "Ambiance", value: 85 },
      { axis: "Products", value: 80 },
      { axis: "Booking Ease", value: 70 },
    ],
  }

  const data = radarData[category] || radarData.cafe
  const centerX = 50
  const centerY = 50
  const radius = 40

  // Calculate points on the radar
  const angleStep = (Math.PI * 2) / data.length
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2 // Start from top
    const value = d.value / 100
    return {
      x: centerX + radius * value * Math.cos(angle),
      y: centerY + radius * value * Math.sin(angle),
      label: d.axis,
      labelX: centerX + (radius + 10) * Math.cos(angle),
      labelY: centerY + (radius + 10) * Math.sin(angle),
      value: d.value,
    }
  })

  // Create the polygon path
  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Background circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
              <motion.circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={radius * level}
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}

            {/* Axis lines */}
            {points.map((point, i) => (
              <motion.line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={centerX + radius * Math.cos(i * angleStep - Math.PI / 2)}
                y2={centerY + radius * Math.sin(i * angleStep - Math.PI / 2)}
                stroke="#e5e5e5"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              />
            ))}

            {/* Data polygon */}
            <motion.polygon
              points={polygonPath}
              fill={`${colorScheme[0]}40`}
              stroke={colorScheme[0]}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{ transformOrigin: "center" }}
            />

            {/* Data points */}
            {points.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill={colorScheme[0]}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              />
            ))}

            {/* Axis labels */}
            {points.map((point, i) => (
              <motion.text
                key={i}
                x={point.labelX}
                y={point.labelY}
                textAnchor={point.labelX < centerX - 5 ? "end" : point.labelX > centerX + 5 ? "start" : "middle"}
                dominantBaseline={
                  point.labelY < centerY - 5 ? "auto" : point.labelY > centerY + 5 ? "hanging" : "middle"
                }
                fontSize="3"
                fontWeight="bold"
                fill="#333"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
              >
                {point.label}
              </motion.text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

// Calendar Heatmap
export function CalendarHeatmap({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe
  const baseColor = colorScheme[0]

  // Generate calendar data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weeks = [1, 2, 3, 4]

  // Different patterns for each category
  const patterns = {
    cafe: [
      [30, 40, 45, 50], // Jan
      [35, 45, 50, 55], // Feb
      [40, 50, 55, 60], // Mar
      [45, 55, 60, 65], // Apr
      [50, 60, 65, 70], // May
      [60, 70, 75, 80], // Jun
      [70, 80, 85, 90], // Jul
      [75, 85, 90, 95], // Aug
      [65, 75, 80, 85], // Sep
      [55, 65, 70, 75], // Oct
      [45, 55, 60, 65], // Nov
      [40, 50, 55, 60], // Dec
    ],
    retail: [
      [50, 45, 40, 60], // Jan
      [40, 35, 30, 45], // Feb
      [35, 30, 25, 40], // Mar
      [40, 35, 30, 45], // Apr
      [45, 40, 35, 50], // May
      [50, 45, 40, 55], // Jun
      [55, 50, 45, 60], // Jul
      [60, 55, 50, 65], // Aug
      [70, 65, 60, 75], // Sep
      [80, 75, 70, 85], // Oct
      [95, 90, 85, 100], // Nov
      [90, 85, 80, 95], // Dec
    ],
    restaurant: [
      [60, 65, 70, 75], // Jan
      [65, 70, 75, 80], // Feb
      [70, 75, 80, 85], // Mar
      [75, 80, 85, 90], // Apr
      [80, 85, 90, 95], // May
      [75, 80, 85, 90], // Jun
      [70, 75, 80, 85], // Jul
      [75, 80, 85, 90], // Aug
      [80, 85, 90, 95], // Sep
      [85, 90, 95, 100], // Oct
      [80, 85, 90, 95], // Nov
      [85, 90, 95, 100], // Dec
    ],
    salon: [
      [40, 60, 50, 70], // Jan
      [45, 65, 55, 75], // Feb
      [50, 70, 60, 80], // Mar
      [55, 75, 65, 85], // Apr
      [60, 80, 70, 90], // May
      [65, 85, 75, 95], // Jun
      [60, 80, 70, 90], // Jul
      [55, 75, 65, 85], // Aug
      [60, 80, 70, 90], // Sep
      [65, 85, 75, 95], // Oct
      [70, 90, 80, 100], // Nov
      [65, 85, 75, 95], // Dec
    ],
  }

  const data = patterns[category] || patterns.cafe

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex">
            <div className="w-12 flex-shrink-0"></div>
            {months.map((month, i) => (
              <div key={i} className="flex-1 text-xs text-center text-gray-500 pb-1">
                {month}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex items-center">
              <div className="w-12 text-xs font-medium pr-2 text-right">Week {week}</div>
              <div className="flex-1 flex">
                {months.map((_, monthIndex) => (
                  <motion.div
                    key={monthIndex}
                    className="flex-1 h-8 m-0.5 rounded"
                    style={{
                      backgroundColor: `rgba(${Number.parseInt(baseColor.slice(1, 3), 16)}, ${Number.parseInt(baseColor.slice(3, 5), 16)}, ${Number.parseInt(baseColor.slice(5, 7), 16)}, ${data[monthIndex][weekIndex] / 100})`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: weekIndex * 0.1 + monthIndex * 0.02 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Funnel Chart
export function FunnelChart({ category = "cafe", isActive = true }: { category?: string; isActive?: boolean }) {
  const colorScheme = categoryColors[category] || categoryColors.cafe

  // Different data for each category
  const funnelData = {
    cafe: [
      { stage: "Awareness", value: 100, color: colorScheme[0] },
      { stage: "Interest", value: 70, color: colorScheme[1] },
      { stage: "Visit", value: 50, color: colorScheme[2] },
      { stage: "Purchase", value: 30, color: colorScheme[3] },
      { stage: "Return Visit", value: 15, color: colorScheme[0] },
    ],
    retail: [
      { stage: "Website Visit", value: 100, color: colorScheme[0] },
      { stage: "Product View", value: 65, color: colorScheme[1] },
      { stage: "Add to Cart", value: 40, color: colorScheme[2] },
      { stage: "Purchase", value: 25, color: colorScheme[3] },
      { stage: "Repeat Purchase", value: 10, color: colorScheme[0] },
    ],
    restaurant: [
      { stage: "Reservation", value: 100, color: colorScheme[0] },
      { stage: "Arrival", value: 85, color: colorScheme[1] },
      { stage: "Ordering", value: 80, color: colorScheme[2] },
      { stage: "Dessert/Drinks", value: 50, color: colorScheme[3] },
      { stage: "Return Visit", value: 30, color: colorScheme[0] },
    ],
    salon: [
      { stage: "Booking", value: 100, color: colorScheme[0] },
      { stage: "Arrival", value: 90, color: colorScheme[1] },
      { stage: "Service", value: 85, color: colorScheme[2] },
      { stage: "Product Purchase", value: 40, color: colorScheme[3] },
      { stage: "Rebooking", value: 60, color: colorScheme[0] },
    ],
  }

  const data = funnelData[category] || funnelData.cafe

  // Calculate heights and positions
  const totalHeight = 80 // Percentage of SVG height
  const startY = 10
  const maxWidth = 80 // Percentage of SVG width
  const minWidth = 30 // Minimum width for the smallest stage

  const stages = data.map((item, i) => {
    const heightPercentage = totalHeight / data.length
    const widthPercentage = maxWidth - ((maxWidth - minWidth) * i) / (data.length - 1)
    const y = startY + i * heightPercentage

    return {
      ...item,
      y,
      height: heightPercentage,
      width: widthPercentage,
      x: (100 - widthPercentage) / 2,
    }
  })

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {stages.map((stage, i) => (
              <g key={i}>
                <motion.rect
                  x={stage.x}
                  y={stage.y}
                  width={stage.width}
                  height={stage.height}
                  fill={stage.color}
                  initial={{ width: 0, x: 50 }}
                  animate={{ width: isActive ? stage.width : 0, x: isActive ? stage.x : 50 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                />
                <motion.text
                  x="50"
                  y={stage.y + stage.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="3"
                  fontWeight="bold"
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                >
                  {stage.stage}: {stage.value}%
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
