"use client"

import { useEffect, useState } from "react"

interface ChartPreviewProps {
  type: "line" | "bar" | "pie" | "area"
  className?: string
}

// Define our color palette
const colors = {
  primary: "#1F4E79", // Deep Navy
  secondary: "#6A8AA6", // Muted Blue-Gray
  accent: "#F4B400", // Mustard Yellow
  accentAlt: "#FF8C42", // Muted Orange
  background: "#F5F6FA", // Light Gray
  muted: "rgba(31, 78, 121, 0.2)",
}

export function ChartPreview({ type, className }: ChartPreviewProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  if (type === "line") {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <svg viewBox="0 0 100 40" className="h-full w-full">
          {/* Grid lines */}
          <g className="text-muted-foreground/20">
            <line x1="0" y1="10" x2="100" y2="10" strokeWidth="0.5" stroke="currentColor" />
            <line x1="0" y1="20" x2="100" y2="20" strokeWidth="0.5" stroke="currentColor" />
            <line x1="0" y1="30" x2="100" y2="30" strokeWidth="0.5" stroke="currentColor" />
          </g>

          {/* Animated line */}
          <path
            d="M0,35 Q10,30 20,32 T40,25 T60,15 T80,10 T100,5"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1.5"
            className="animate-draw"
            style={{
              strokeDasharray: 150,
              strokeDashoffset: 150,
              animation: "draw 2s ease-in-out forwards",
            }}
          />

          {/* Data points */}
          <circle cx="0" cy="35" r="1.5" fill={colors.primary} />
          <circle cx="20" cy="32" r="1.5" fill={colors.primary} />
          <circle cx="40" cy="25" r="1.5" fill={colors.primary} />
          <circle cx="60" cy="15" r="1.5" fill={colors.primary} />
          <circle cx="80" cy="10" r="1.5" fill={colors.primary} />
          <circle cx="100" cy="5" r="1.5" fill={colors.primary} />
        </svg>
      </div>
    )
  }

  if (type === "bar") {
    return (
      <div className={`relative h-full w-full ${className}`}>
        {/* Grid lines */}
        <div className="absolute inset-0">
          <div className="border-t border-muted-foreground/10 absolute top-1/4 w-full"></div>
          <div className="border-t border-muted-foreground/10 absolute top-1/2 w-full"></div>
          <div className="border-t border-muted-foreground/10 absolute top-3/4 w-full"></div>
        </div>

        {/* Bars */}
        <div
          className="absolute bottom-0 left-[5%] h-[0%] w-[10%] rounded-t-sm animate-grow-1"
          style={{ backgroundColor: `${colors.primary}CC` }}
        ></div>
        <div
          className="absolute bottom-0 left-[20%] h-[0%] w-[10%] rounded-t-sm animate-grow-2"
          style={{ backgroundColor: `${colors.primary}E6` }}
        ></div>
        <div
          className="absolute bottom-0 left-[35%] h-[0%] w-[10%] rounded-t-sm animate-grow-3"
          style={{ backgroundColor: colors.primary }}
        ></div>
        <div
          className="absolute bottom-0 left-[50%] h-[0%] w-[10%] rounded-t-sm animate-grow-4"
          style={{ backgroundColor: `${colors.secondary}E6` }}
        ></div>
        <div
          className="absolute bottom-0 left-[65%] h-[0%] w-[10%] rounded-t-sm animate-grow-5"
          style={{ backgroundColor: `${colors.secondary}CC` }}
        ></div>
        <div
          className="absolute bottom-0 left-[80%] h-[0%] w-[10%] rounded-t-sm animate-grow-6"
          style={{ backgroundColor: `${colors.accent}B3` }}
        ></div>
      </div>
    )
  }

  if (type === "pie") {
    return (
      <div className={`relative h-full w-full flex items-center justify-center ${className}`}>
        <div className="relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={colors.primary}
              strokeWidth="20"
              strokeDasharray="0 251.2"
              className="animate-pie-1"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="20"
              strokeDasharray="0 251.2"
              strokeDashoffset="-62.8"
              className="animate-pie-2"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={colors.accent}
              strokeWidth="20"
              strokeDasharray="0 251.2"
              strokeDashoffset="-125.6"
              className="animate-pie-3"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={colors.accentAlt}
              strokeWidth="20"
              strokeDasharray="0 251.2"
              strokeDashoffset="-188.4"
              className="animate-pie-4"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg viewBox="0 0 100 40" className="h-full w-full">
        {/* Grid lines */}
        <g className="text-muted-foreground/20">
          <line x1="0" y1="10" x2="100" y2="10" strokeWidth="0.5" stroke="currentColor" />
          <line x1="0" y1="20" x2="100" y2="20" strokeWidth="0.5" stroke="currentColor" />
          <line x1="0" y1="30" x2="100" y2="30" strokeWidth="0.5" stroke="currentColor" />
        </g>

        {/* Animated area */}
        <path
          d="M0,35 Q10,30 20,32 T40,25 T60,15 T80,10 T100,5"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1"
          className="animate-draw"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "draw 2s ease-in-out forwards",
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,35 Q10,30 20,32 T40,25 T60,15 T80,10 T100,5 V40 H0 Z"
          fill="url(#gradient)"
          className="animate-fill"
          style={{
            opacity: 0,
            animation: "fill 1.5s ease-in-out 0.5s forwards",
          }}
        />
      </svg>
    </div>
  )
}
