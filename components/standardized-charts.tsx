"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts"

const BLUE = "#0284C7"
const BLUE_LIGHT = "#38BDF8"
const BLUE_PALE = "rgba(2,132,199,0.08)"
const BLUE_MED = "rgba(2,132,199,0.18)"
const TEXT = "#64748B"
const BORDER = "rgba(2,132,199,0.12)"

const COLORS = {
  primary: "#0EA5E9",
  secondary: "#0284C7",
  light: "#38BDF8",
  gray: "#94A3B8",
  gridLight: "rgba(148,163,184,0.12)",
  white: "#FFFFFF",
}

// ─── REVENUE TREND (SVG Area Chart) ──────────────────────────────
const revenuePoints: Record<string, number[]> = {
  cafe:         [18, 22, 28, 24, 30, 27, 35, 32, 38, 34, 42, 45],
  retail:       [32, 38, 35, 42, 48, 44, 52, 55, 50, 58, 62, 68],
  restaurant:   [25, 30, 28, 35, 40, 37, 44, 48, 45, 52, 56, 60],
  salon:        [20, 24, 22, 28, 32, 29, 35, 38, 36, 42, 44, 48],
  saas:         [28, 30, 32, 34, 36, 38, 40, 42, 43, 44, 45, 46],
  ecommerce:    [38, 42, 40, 46, 50, 47, 52, 54, 51, 56, 60, 56],
  agency:       [55, 60, 58, 65, 70, 68, 74, 78, 75, 82, 86, 88],
}
const months = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]

export function RevenueTrendChart({ category = "cafe" }: { category?: string }) {
  const raw = revenuePoints[category] || revenuePoints.cafe
  const max = Math.max(...raw)
  const min = Math.min(...raw)
  const W = 340, H = 130, padX = 8, padY = 12

  // Build smooth cubic bezier curve through points
  const pts = raw.map((v, i) => ({
    x: padX + (i / (raw.length - 1)) * (W - padX * 2),
    y: padY + (1 - (v - min) / (max - min + 1)) * (H - padY * 2),
  }))

  const smooth = (points: { x: number; y: number }[]): string => {
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx = (prev.x + curr.x) / 2
      d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
    }
    return d
  }

  const linePath = smooth(pts)
  const areaPath = `${linePath} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`
  const change = category === "retail" ? "10%" : category === "restaurant" ? "18%" : category === "salon" ? "12%" : category === "saas" ? "28%" : category === "ecommerce" ? "14%" : category === "agency" ? "16%" : "15%"

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, width: "100%" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`rg-${category}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
            <stop offset="75%" stopColor={BLUE} stopOpacity="0.05" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
          <line key={i} x1={padX} y1={padY + t*(H-padY*2)} x2={W-padX} y2={padY + t*(H-padY*2)}
            stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`url(#rg-${category})`} />
        <path d={linePath} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px 0", fontSize: 9, color: TEXT }}>
        {months.map((m, i) => i % 2 === 0 && <span key={i}>{m}</span>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "5px 10px 0", fontSize: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, color: TEXT }}>
          <span style={{ width: 20, height: 2.5, background: BLUE, display: "inline-block", borderRadius: 2 }} />
          Revenue
        </span>
        <span style={{ color: "#16A34A", fontWeight: 700 }}>↑ {change} this period</span>
      </div>
    </div>
  )
}

// ─── CUSTOMER SEGMENTS (Donut) ────────────────────────────────────
const segmentData: Record<string, { name: string; pct: number }[]> = {
  cafe: [
    { name: "Morning Regulars", pct: 38 },
    { name: "Lunch Crowd", pct: 27 },
    { name: "Afternoon", pct: 22 },
    { name: "Weekend", pct: 13 },
  ],
  retail: [
    { name: "Loyal Shoppers", pct: 32 },
    { name: "Seasonal Buyers", pct: 28 },
    { name: "Bargain Hunters", pct: 24 },
    { name: "New Visitors", pct: 16 },
  ],
  restaurant: [
    { name: "Dinner Regulars", pct: 35 },
    { name: "Lunch Crowd", pct: 30 },
    { name: "Weekend Diners", pct: 22 },
    { name: "Special Events", pct: 13 },
  ],
  salon: [
    { name: "Monthly Clients", pct: 42 },
    { name: "Bi-Weekly", pct: 28 },
    { name: "Occasional", pct: 20 },
    { name: "New Clients", pct: 10 },
  ],
  saas: [
    { name: "Enterprise", pct: 38 },
    { name: "Growth Plan", pct: 30 },
    { name: "Starter", pct: 22 },
    { name: "Trial", pct: 10 },
  ],
  ecommerce: [
    { name: "Repeat Buyers", pct: 38 },
    { name: "One-time", pct: 28 },
    { name: "Seasonal", pct: 20 },
    { name: "New Visitors", pct: 14 },
  ],
  agency: [
    { name: "Retainer Clients", pct: 45 },
    { name: "Project-based", pct: 28 },
    { name: "Ad-hoc", pct: 17 },
    { name: "New Clients", pct: 10 },
  ],
}
const SEG_COLORS = ["#0EA5E9", "#0284C7", "#10B981", "#38BDF8", "#06B6D4", "#8B5CF6"]

export function CustomerSegmentChart({ category = "cafe" }: { category?: string }) {
  const data = segmentData[category] || segmentData.cafe
  const total = data.reduce((s, d) => s + d.pct, 0)

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 16px", gap: 14 }}>
      {/* Stacked bar */}
      <div style={{ width: "100%", height: 32, borderRadius: 8, overflow: "hidden", display: "flex", background: "#F1F5F9" }}>
        {data.map((d, i) => {
          const widthPct = (d.pct / total) * 100
          return (
            <div key={i} style={{
              width: `${widthPct}%`, height: "100%",
              backgroundColor: SEG_COLORS[i % SEG_COLORS.length],
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {widthPct > 12 && <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{Math.round(widthPct)}%</span>}
            </div>
          )
        })}
      </div>
      {/* Breakdown rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d, i) => {
          const pct = Math.round((d.pct / total) * 100)
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: SEG_COLORS[i % SEG_COLORS.length], flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "#334155" }}>{d.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>{pct}%</span>
                <span style={{ fontSize: 11, color: COLORS.gray }}>{d.pct * 12} customers</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── HOURLY BAR CHART (SVG) ───────────────────────────────────────
const hourlyData: Record<string, number[]> = {
  cafe:       [12, 45, 88, 72, 54, 61, 78, 65, 48, 55, 42, 30],
  retail:     [22, 48, 65, 72, 68, 75, 80, 85, 78, 60, 40, 18],
  restaurant: [10, 30, 85, 90, 55, 20, 18, 45, 88, 95, 80, 50],
  salon:      [10, 35, 65, 80, 70, 60, 75, 85, 90, 70, 45, 20],
  saas:       [5,  10, 40, 70, 88, 92, 85, 90, 88, 72, 55, 30],
  ecommerce:  [15, 25, 45, 60, 72, 68, 80, 88, 85, 78, 65, 40],
  agency:     [5,  8,  55, 88, 92, 85, 60, 80, 90, 72, 45, 15],
}
const hourLabels: Record<string, string[]> = {
  cafe:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  retail:     ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  restaurant: ["10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p"],
  salon:      ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  saas:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  ecommerce:  ["7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p"],
  agency:     ["7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p"],
}

export function HourlyBarChart({ category = "cafe" }: { category?: string }) {
  const vals = hourlyData[category] || hourlyData.cafe
  const labels = hourLabels[category] || hourLabels.cafe
  const max = Math.max(...vals)
  const W = 320, H = 120, barW = W / vals.length - 3

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, width: "100%" }}>
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1="0" y1={H * (1-t) * 0.9} x2={W} y2={H * (1-t) * 0.9}
            stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
        ))}
        {vals.map((v, i) => {
          const barH = (v / max) * (H * 0.85)
          const x = i * (W / vals.length) + 1.5
          const isPeak = v >= max * 0.78
          return (
            <rect key={i} x={x} y={H - barH} width={barW} height={barH} rx="3"
              fill={isPeak ? BLUE : v >= max * 0.5 ? "#0EA5E9" : BLUE_LIGHT} opacity={0.85} />
          )
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 1px 0", fontSize: 9, color: TEXT }}>
        {labels.map((l, i) => i % 2 === 0 && <span key={i}>{l}</span>)}
      </div>
      <div style={{ display: "flex", gap: 10, padding: "5px 0 0", fontSize: 10, color: TEXT }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: BLUE, display: "inline-block" }} /> Peak
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: BLUE_LIGHT, display: "inline-block" }} /> Off-peak
        </span>
      </div>
    </div>
  )
}

// ─── HEATMAP ──────────────────────────────────────────────────────
const heatValues: Record<string, number[][]> = {
  cafe: [
    [2,5,8,7,5,4,6,5,4,4,3,2],
    [2,4,7,6,4,5,6,5,4,4,3,2],
    [2,4,8,7,5,5,7,6,5,5,3,2],
    [2,5,8,7,5,5,7,6,5,6,4,2],
    [3,6,9,8,6,6,8,7,5,6,4,3],
    [4,5,7,8,9,8,9,8,7,8,6,5],
    [3,4,6,7,8,7,8,7,6,6,5,3],
  ],
  retail: [
    [1,2,4,5,6,6,7,7,6,4,2,1],
    [1,2,4,5,5,6,6,7,5,3,2,1],
    [1,3,5,6,6,7,7,8,6,4,3,1],
    [2,3,5,6,6,7,8,8,6,4,3,2],
    [3,4,6,7,7,8,9,9,8,6,4,2],
    [4,6,7,8,8,9,9,9,9,7,5,3],
    [3,5,6,7,7,8,8,8,7,5,4,2],
  ],
  restaurant: [
    [1,3,7,8,5,2,2,3,7,8,6,2],
    [1,3,7,8,4,2,2,3,8,8,6,2],
    [1,4,8,9,5,3,3,4,8,9,7,3],
    [2,4,8,9,5,3,4,5,9,9,8,4],
    [2,5,9,9,6,4,6,7,9,9,9,5],
    [3,5,8,8,6,5,8,9,9,9,9,6],
    [3,5,9,9,6,4,6,8,9,9,8,5],
  ],
  salon: [
    [1,2,5,7,6,5,6,7,8,6,4,1],
    [1,3,5,6,5,4,5,6,7,5,3,1],
    [1,3,6,8,7,5,6,7,8,6,4,1],
    [2,4,7,8,7,5,7,8,9,7,5,2],
    [3,5,8,9,8,6,7,9,9,8,6,3],
    [4,6,9,9,9,8,9,9,9,9,7,4],
    [2,4,5,7,7,6,7,7,8,6,5,2],
  ],
  saas: [
    [1,2,6,8,9,9,8,9,8,7,5,2],
    [1,2,6,8,9,9,8,9,8,7,5,2],
    [1,2,7,9,9,9,8,9,9,8,6,2],
    [1,2,7,9,9,9,8,9,9,8,6,2],
    [1,2,6,8,9,9,7,8,8,7,5,2],
    [1,1,2,3,3,3,2,3,3,2,2,1],
    [1,1,1,2,2,2,1,2,2,2,1,1],
  ],
  ecommerce: [
    [2,3,5,7,7,7,8,8,7,7,5,3],
    [2,3,5,7,7,7,8,8,7,7,5,3],
    [2,3,5,7,7,7,8,9,8,7,6,3],
    [2,3,6,7,8,8,8,9,8,8,6,3],
    [3,4,6,8,8,8,9,9,9,8,6,4],
    [4,5,7,8,8,9,9,9,9,8,7,5],
    [3,4,6,7,7,8,8,8,8,7,6,4],
  ],
  agency: [
    [1,1,5,8,9,9,7,8,8,7,4,1],
    [1,1,5,8,9,9,7,8,8,7,4,1],
    [1,1,6,9,9,9,7,9,9,8,5,1],
    [1,2,6,9,9,9,7,9,9,8,5,1],
    [1,1,5,8,8,8,6,7,8,6,4,1],
    [1,1,1,2,2,2,1,2,2,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ],
}
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
const heatHours: Record<string, string[]> = {
  cafe:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  retail:     ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  restaurant: ["10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p"],
  salon:      ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  saas:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  ecommerce:  ["7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p"],
  agency:     ["7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p"],
}

export function HeatMapChart({ category = "cafe" }: { category?: string }) {
  const vals = heatValues[category] || heatValues.cafe
  const hours = heatHours[category] || heatHours.cafe
  const getColor = (v: number) => `rgba(2,132,199,${(0.07 + (v/9)*0.88).toFixed(2)})`

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 3, fontSize: 9, color: TEXT, overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `28px repeat(${hours.length}, 1fr)`, gap: 2 }}>
        <div />
        {hours.map(h => <div key={h} style={{ textAlign: "center" }}>{h}</div>)}
      </div>
      {days.map((day, di) => (
        <div key={di} style={{ display: "grid", gridTemplateColumns: `28px repeat(${hours.length}, 1fr)`, gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", fontWeight: 600 }}>{day}</div>
          {vals[di].map((v, hi) => (
            <div key={hi} style={{ height: 18, borderRadius: 3, background: getColor(v) }} />
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
        <span>Low</span>
        {[0.07,0.25,0.45,0.65,0.88].map((o,i) => (
          <div key={i} style={{ width: 14, height: 10, borderRadius: 2, background: `rgba(2,132,199,${o})` }} />
        ))}
        <span>High</span>
      </div>
    </div>
  )
}

// ─── HORIZONTAL BAR ───────────────────────────────────────────────
const hbarData: Record<string, { name: string; value: number; pct: number }[]> = {
  cafe: [
    { name: "Sarah M.", value: 8200, pct: 100 },
    { name: "James K.", value: 7400, pct: 90 },
    { name: "Priya R.", value: 6800, pct: 83 },
    { name: "Tom W.", value: 6200, pct: 76 },
    { name: "Ana L.", value: 5900, pct: 72 },
  ],
  retail: [
    { name: "Electronics", value: 28000, pct: 100 },
    { name: "Apparel", value: 22000, pct: 79 },
    { name: "Home Goods", value: 17000, pct: 61 },
    { name: "Accessories", value: 11900, pct: 43 },
  ],
  restaurant: [
    { name: "Dine-in", value: 31000, pct: 100 },
    { name: "Takeout", value: 14000, pct: 45 },
    { name: "Delivery", value: 7300, pct: 24 },
  ],
  salon: [
    { name: "Maya J.", value: 9100, pct: 100 },
    { name: "Chris B.", value: 8400, pct: 92 },
    { name: "Nina P.", value: 7600, pct: 84 },
    { name: "Sam T.", value: 6100, pct: 67 },
  ],
  saas: [
    { name: "Enterprise Plan", value: 18200, pct: 100 },
    { name: "Growth Plan",     value: 14600, pct: 80 },
    { name: "Starter Plan",    value: 8400,  pct: 46 },
    { name: "Add-ons",         value: 5300,  pct: 29 },
  ],
  ecommerce: [
    { name: "Organic Search", value: 22400, pct: 100 },
    { name: "Paid Social",    value: 16800, pct: 75 },
    { name: "Email",          value: 11200, pct: 50 },
    { name: "Direct",         value: 5600,  pct: 25 },
  ],
  agency: [
    { name: "Tech Clients",    value: 34000, pct: 100 },
    { name: "E-commerce",      value: 26000, pct: 76 },
    { name: "Finance",         value: 18500, pct: 54 },
    { name: "Healthcare",      value: 9700,  pct: 29 },
  ],
}

export function StandardHorizontalBarChart({ category = "cafe" }: { category?: string }) {
  const data = hbarData[category] || hbarData.cafe
  const fmt = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v}`
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, padding: "4px 8px" }}>
      {data.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
            <span style={{ color: "#0F172A", fontWeight: 500 }}>{d.name}</span>
            <span style={{ fontWeight: 700, color: BLUE }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 8, background: BLUE_MED, borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${d.pct}%`, background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`, borderRadius: 99 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── STANDARD BAR CHART ───────────────────────────────────────────
const barData: Record<string, { label: string; pct: number }[]> = {
  cafe: [
    { label: "Coffee", pct: 65 },
    { label: "Pastries", pct: 45 },
    { label: "Sandwiches", pct: 30 },
    { label: "Beverages", pct: 25 },
    { label: "Extras", pct: 10 },
  ],
  retail: [
    { label: "Electronics", pct: 70 },
    { label: "Home", pct: 55 },
    { label: "Apparel", pct: 40 },
    { label: "Accessories", pct: 30 },
  ],
  restaurant: [
    { label: "Entrees", pct: 55 },
    { label: "Beverages", pct: 45 },
    { label: "Appetizers", pct: 35 },
    { label: "Desserts", pct: 25 },
  ],
  salon: [
    { label: "Color", pct: 75 },
    { label: "Haircuts", pct: 60 },
    { label: "Styling", pct: 40 },
    { label: "Products", pct: 25 },
  ],
  saas: [
    { label: "Enterprise", pct: 80 },
    { label: "Growth", pct: 60 },
    { label: "Starter", pct: 40 },
    { label: "Add-ons", pct: 25 },
  ],
  ecommerce: [
    { label: "Organic", pct: 75 },
    { label: "Paid", pct: 55 },
    { label: "Email", pct: 45 },
    { label: "Direct", pct: 30 },
    { label: "Referral", pct: 15 },
  ],
  agency: [
    { label: "Tech", pct: 80 },
    { label: "E-comm", pct: 65 },
    { label: "Finance", pct: 48 },
    { label: "Health", pct: 30 },
  ],
}

export function StandardBarChart({ category = "cafe" }: { category?: string }) {
  const data = barData[category] || barData.cafe
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "8px 4px 4px" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 8, justifyContent: "center" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: BLUE }}>{d.pct}%</span>
            <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%", height: `${d.pct}%`,
                background: `linear-gradient(180deg, ${BLUE} 0%, ${BLUE_LIGHT} 100%)`,
                borderRadius: "6px 6px 0 0", minHeight: 8, opacity: 0.85,
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", paddingTop: 6 }}>
        {data.map((d, i) => (
          <span key={i} style={{ flex: 1, fontSize: 9, color: TEXT, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── BUBBLE CHART (SVG scatter) ───────────────────────────────────
const bubbleData: Record<string, { name: string; x: number; y: number; r: number }[]> = {
  cafe: [
    { name: "Espresso", x: 88, y: 72, r: 18 },
    { name: "Latte", x: 92, y: 58, r: 26 },
    { name: "Croissant", x: 74, y: 65, r: 14 },
    { name: "Sandwich", x: 56, y: 48, r: 11 },
    { name: "Smoothie", x: 44, y: 62, r: 9 },
    { name: "Cold Brew", x: 68, y: 70, r: 16 },
  ],
  retail: [
    { name: "Laptops", x: 72, y: 35, r: 28 },
    { name: "Phones", x: 85, y: 28, r: 24 },
    { name: "Jackets", x: 65, y: 55, r: 18 },
    { name: "Bags", x: 58, y: 62, r: 15 },
    { name: "Watches", x: 45, y: 70, r: 14 },
    { name: "Shoes", x: 78, y: 48, r: 20 },
  ],
  restaurant: [
    { name: "Steak", x: 78, y: 42, r: 22 },
    { name: "Pasta", x: 85, y: 68, r: 20 },
    { name: "Salad", x: 62, y: 74, r: 12 },
    { name: "Burger", x: 90, y: 55, r: 24 },
    { name: "Fish", x: 55, y: 48, r: 15 },
    { name: "Wine", x: 70, y: 65, r: 18 },
  ],
  salon: [
    { name: "Cut & Style", x: 92, y: 68, r: 24 },
    { name: "Color", x: 78, y: 72, r: 28 },
    { name: "Highlights", x: 65, y: 65, r: 18 },
    { name: "Treatment", x: 52, y: 78, r: 13 },
    { name: "Blowout", x: 70, y: 74, r: 15 },
  ],
  saas: [
    { name: "Enterprise", x: 88, y: 72, r: 30 },
    { name: "Growth Plan", x: 80, y: 65, r: 22 },
    { name: "Starter",    x: 65, y: 58, r: 16 },
    { name: "Trial",      x: 50, y: 45, r: 10 },
    { name: "Add-ons",    x: 72, y: 80, r: 14 },
  ],
  ecommerce: [
    { name: "Repeat Buyers",   x: 90, y: 75, r: 28 },
    { name: "High AOV",        x: 75, y: 60, r: 22 },
    { name: "One-time",        x: 60, y: 50, r: 18 },
    { name: "Seasonal",        x: 50, y: 68, r: 14 },
    { name: "Referral",        x: 82, y: 82, r: 16 },
  ],
  agency: [
    { name: "Enterprise Ret.", x: 92, y: 80, r: 30 },
    { name: "Mid-market",      x: 78, y: 68, r: 22 },
    { name: "SMB Retainer",    x: 65, y: 55, r: 16 },
    { name: "Project-based",   x: 55, y: 48, r: 12 },
    { name: "Ad-hoc",          x: 42, y: 40, r: 8  },
  ],
}

export function BubbleChart({ category = "cafe" }: { category?: string }) {
  const raw = bubbleData[category] || bubbleData.cafe
  const sorted = [...raw].sort((a, b) => b.r - a.r)
  const maxR = Math.max(...sorted.map(d => d.r))
  const volColors = ["#0EA5E9", "#0284C7", "#38BDF8", "#10B981", "#06B6D4", "#8B5CF6"]
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "8px 12px", gap: 7 }}>
      {sorted.map((item, idx) => {
        const pct = Math.round((item.r / sorted.reduce((s, d) => s + d.r, 0)) * 100)
        const barWidth = (item.r / maxR) * 100
        const color = volColors[idx % volColors.length]
        return (
          <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 78, textAlign: "right", fontSize: 11, fontWeight: 500, color: "#475569", flexShrink: 0 }}>{item.name}</div>
            <div style={{ flex: 1, position: "relative", height: 30, borderRadius: 6, overflow: "hidden", background: "#F1F5F9" }}>
              <div style={{
                position: "absolute", inset: "0 auto 0 0", width: `${barWidth}%`,
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                borderRadius: 6, display: "flex", alignItems: "center", minWidth: 48,
              }}>
                <span style={{ color: "white", fontSize: 11, fontWeight: 600, paddingLeft: 10, whiteSpace: "nowrap" }}>{item.r * 4} · {pct}%</span>
              </div>
            </div>
          </div>
        )
      })}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, paddingTop: 4, borderTop: `1px solid ${COLORS.gridLight}` }}>
        <span style={{ fontSize: 10, color: COLORS.gray }}>Sorted by volume</span>
      </div>
    </div>
  )
}

// ─── RADAR CHART → SATISFACTION SCORES vs BENCHMARK ──────────────
const satisfactionData: Record<string, Array<{ metric: string; score: number; benchmark: number }>> = {
  cafe:       [{ metric: "Quality", score: 88, benchmark: 82 }, { metric: "Service", score: 82, benchmark: 79 }, { metric: "Ambiance", score: 75, benchmark: 74 }, { metric: "Value", score: 80, benchmark: 76 }, { metric: "Speed", score: 85, benchmark: 78 }, { metric: "Cleanliness", score: 90, benchmark: 84 }],
  retail:     [{ metric: "Selection", score: 88, benchmark: 80 }, { metric: "Price", score: 82, benchmark: 78 }, { metric: "Service", score: 80, benchmark: 76 }, { metric: "Online", score: 85, benchmark: 82 }, { metric: "Returns", score: 90, benchmark: 84 }, { metric: "Shipping", score: 80, benchmark: 79 }],
  restaurant: [{ metric: "Quality", score: 92, benchmark: 85 }, { metric: "Service", score: 88, benchmark: 82 }, { metric: "Ambiance", score: 85, benchmark: 78 }, { metric: "Value", score: 78, benchmark: 75 }, { metric: "Speed", score: 75, benchmark: 72 }, { metric: "Cleanliness", score: 95, benchmark: 88 }],
  salon:      [{ metric: "Skill", score: 95, benchmark: 88 }, { metric: "Cleanliness", score: 98, benchmark: 90 }, { metric: "Service", score: 92, benchmark: 85 }, { metric: "Ambiance", score: 88, benchmark: 80 }, { metric: "Value", score: 85, benchmark: 78 }, { metric: "Booking", score: 90, benchmark: 82 }],
  saas:       [{ metric: "Onboarding", score: 86, benchmark: 78 }, { metric: "Support", score: 90, benchmark: 82 }, { metric: "Reliability", score: 99, benchmark: 95 }, { metric: "Features", score: 82, benchmark: 80 }, { metric: "Value", score: 84, benchmark: 79 }, { metric: "UI/UX", score: 88, benchmark: 82 }],
  ecommerce:  [{ metric: "Delivery", score: 91, benchmark: 84 }, { metric: "Product", score: 88, benchmark: 82 }, { metric: "Returns", score: 85, benchmark: 79 }, { metric: "Support", score: 82, benchmark: 78 }, { metric: "Value", score: 86, benchmark: 81 }, { metric: "Checkout", score: 93, benchmark: 88 }],
  agency:     [{ metric: "Quality", score: 94, benchmark: 85 }, { metric: "Delivery", score: 88, benchmark: 80 }, { metric: "Comms", score: 90, benchmark: 82 }, { metric: "Strategy", score: 86, benchmark: 78 }, { metric: "Value", score: 82, benchmark: 76 }, { metric: "Reporting", score: 89, benchmark: 81 }],
}

export function RadarChart({ category = "cafe" }: { category?: string }) {
  const data = satisfactionData[category] || satisfactionData.cafe

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 40, bottom: 8, left: 72 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLight} horizontal={false} />
        <XAxis type="number" domain={[0, 100]} stroke={COLORS.gray} style={{ fontSize: "11px" }} />
        <YAxis dataKey="metric" type="category" stroke={COLORS.gray} style={{ fontSize: "11px" }} width={68} />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: `1px solid ${COLORS.gridLight}`, borderRadius: "8px", fontSize: "12px" }}
          formatter={(value: number, name: string) => [`${value}`, name === "score" ? "Your Score" : "Industry Avg"]}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
        <Bar dataKey="benchmark" name="Industry Avg" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={8} isAnimationActive={false} />
        <Bar dataKey="score" name="Your Score" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={8} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ─── CALENDAR HEATMAP → COHORT RETENTION TABLE ───────────────────
type RetentionEntry = { cohorts: string[]; columns: string[]; values: number[][] }

const retentionData: Record<string, RetentionEntry> = {
  cafe: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [120, 68, 52, 45, 38],
      [135, 72, 58, 48, 41],
      [108, 65, 50, 42, 36],
      [142, 80, 62, 54, 47],
      [119, 70, 54, 46, 39],
    ],
  },
  retail: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [340, 72, 55, 44, 36],
      [290, 68, 50, 40, 32],
      [380, 75, 58, 47, 39],
      [310, 70, 53, 43, 35],
      [355, 74, 56, 45, 38],
    ],
  },
  restaurant: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [95, 60, 44, 36, 28],
      [110, 65, 48, 38, 30],
      [88, 58, 42, 33, 26],
      [120, 68, 50, 40, 32],
      [102, 62, 46, 37, 29],
    ],
  },
  salon: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [82, 75, 62, 55, 48],
      [90, 78, 65, 58, 52],
      [76, 72, 60, 52, 45],
      [95, 80, 68, 60, 54],
      [85, 76, 63, 56, 49],
    ],
  },
  saas: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [240, 88, 76, 68, 62],
      [215, 85, 73, 65, 59],
      [268, 90, 78, 70, 64],
      [198, 83, 71, 63, 57],
      [252, 87, 75, 67, 61],
    ],
  },
  ecommerce: {
    cohorts: ["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"],
    columns: ["Users", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    values: [
      [520, 58, 42, 34, 28],
      [480, 55, 39, 31, 25],
      [560, 61, 45, 36, 30],
      [495, 57, 41, 33, 27],
      [535, 59, 43, 35, 29],
    ],
  },
  agency: {
    cohorts: ["Q1 Clients", "Q2 Clients", "Q3 Clients", "Q4 Clients", "Q1 New"],
    columns: ["Clients", "Mo 1", "Mo 2", "Mo 3", "Mo 4"],
    values: [
      [18, 94, 89, 83, 78],
      [20, 95, 90, 85, 80],
      [16, 93, 87, 81, 76],
      [22, 96, 91, 86, 82],
      [19, 94, 89, 84, 79],
    ],
  },
}

export function CalendarHeatmap({ category = "cafe" }: { category?: string }) {
  const d = retentionData[category] || retentionData.cafe
  const getRetentionColor = (colIdx: number, value: number, users: number) => {
    if (colIdx === 0) return BLUE
    const pct = (value / users) * 100
    if (pct >= 80) return "rgba(2,132,199,0.90)"
    if (pct >= 60) return "rgba(2,132,199,0.65)"
    if (pct >= 40) return "rgba(2,132,199,0.42)"
    if (pct >= 25) return "rgba(2,132,199,0.24)"
    return "rgba(2,132,199,0.10)"
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontSize: 11, overflow: "auto" }}>
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: `100px repeat(${d.columns.length}, 1fr)`, gap: 4, marginBottom: 6 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray, padding: "2px 4px" }}>Cohort</div>
        {d.columns.map((col, i) => (
          <div key={i} style={{ fontSize: 10, fontWeight: 600, color: COLORS.gray, textAlign: "center", padding: "2px 0" }}>{col}</div>
        ))}
      </div>
      {/* Data rows */}
      {d.cohorts.map((cohort, rowIdx) => (
        <div key={rowIdx} style={{ display: "grid", gridTemplateColumns: `100px repeat(${d.columns.length}, 1fr)`, gap: 4, marginBottom: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#334155", padding: "4px 4px", display: "flex", alignItems: "center" }}>{cohort}</div>
          {d.values[rowIdx].map((val, colIdx) => {
            const users = d.values[rowIdx][0]
            const pct = colIdx === 0 ? null : Math.round((val / users) * 100)
            const bg = getRetentionColor(colIdx, val, users)
            return (
              <div key={colIdx} style={{
                background: bg, borderRadius: 6, padding: "5px 4px", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                  {colIdx === 0 ? val : `${pct}%`}
                </span>
              </div>
            )
          })}
        </div>
      ))}
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: COLORS.gray }}>
        <span>Retention:</span>
        {[["Low (<25%)", "rgba(2,132,199,0.10)"], ["25–40%", "rgba(2,132,199,0.24)"], ["40–60%", "rgba(2,132,199,0.42)"], ["60–80%", "rgba(2,132,199,0.65)"], ["80%+", "rgba(2,132,199,0.90)"]].map(([label, color], i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: color as string, display: "inline-block" }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── LOCATION MAP ─────────────────────────────────────────────────
const locationData: Record<string, { name: string; revenue: string; change: string; pct: number }[]> = {
  cafe: [
    { name: "Downtown Café", revenue: "$9.8k", change: "+18%", pct: 40 },
    { name: "Midtown Branch", revenue: "$8.2k", change: "+12%", pct: 33 },
    { name: "Airport Kiosk", revenue: "$6.5k", change: "+9%", pct: 27 },
  ],
  retail: [
    { name: "Main St. Store", revenue: "$32k", change: "+14%", pct: 41 },
    { name: "Mall Location", revenue: "$28k", change: "+10%", pct: 35 },
    { name: "Outlet Store", revenue: "$18.9k", change: "+6%", pct: 24 },
  ],
  restaurant: [
    { name: "Downtown", revenue: "$24k", change: "+20%", pct: 46 },
    { name: "Westside", revenue: "$18.5k", change: "+15%", pct: 35 },
    { name: "Uptown", revenue: "$9.8k", change: "+8%", pct: 19 },
  ],
  salon: [
    { name: "Main Studio", revenue: "$18.5k", change: "+15%", pct: 59 },
    { name: "Eastside Branch", revenue: "$12.7k", change: "+10%", pct: 41 },
  ],
  saas: [
    { name: "North America", revenue: "$28k", change: "+32%", pct: 46 },
    { name: "Europe",        revenue: "$18.5k", change: "+24%", pct: 30 },
    { name: "APAC",          revenue: "$14.8k", change: "+18%", pct: 24 },
  ],
  ecommerce: [
    { name: "United States", revenue: "$34k", change: "+18%", pct: 44 },
    { name: "Canada",        revenue: "$14.5k", change: "+12%", pct: 19 },
    { name: "UK & Europe",   revenue: "$18.2k", change: "+22%", pct: 24 },
    { name: "Rest of World", revenue: "$10.1k", change: "+14%", pct: 13 },
  ],
  agency: [
    { name: "Tech Vertical",    revenue: "$38k", change: "+28%", pct: 43 },
    { name: "E-comm Vertical",  revenue: "$26k", change: "+16%", pct: 30 },
    { name: "Finance Vertical", revenue: "$18k", change: "+12%", pct: 20 },
    { name: "Other",            revenue: "$6.2k", change: "+8%",  pct: 7 },
  ],
}

export function LocationMapChart({ category = "cafe" }: { category?: string }) {
  const data = locationData[category] || locationData.cafe
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: "4px 8px" }}>
      {data.map((loc, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{loc.name}</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 600 }}>{loc.change}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>{loc.revenue}</span>
            </div>
          </div>
          <div style={{ height: 8, background: BLUE_MED, borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${loc.pct}%`, background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`, borderRadius: 99 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── FUNNEL CHART → TAPERED FUNNEL WITH CONVERSION RATES ─────────
const funnelData: Record<string, { stage: string; value: number; count: string }[]> = {
  cafe: [
    { stage: "Walk-bys",    value: 1200, count: "1,200" },
    { stage: "Enter Store", value: 840,  count: "840"   },
    { stage: "Browse Menu", value: 680,  count: "680"   },
    { stage: "Order",       value: 560,  count: "560"   },
    { stage: "Return Visit",value: 310,  count: "310"   },
  ],
  retail: [
    { stage: "Site Visits",   value: 8400, count: "8,400" },
    { stage: "Product Views", value: 5200, count: "5,200" },
    { stage: "Add to Cart",   value: 2100, count: "2,100" },
    { stage: "Checkout",      value: 1400, count: "1,400" },
    { stage: "Repeat Buy",    value: 640,  count: "640"   },
  ],
  restaurant: [
    { stage: "Reservations", value: 920, count: "920" },
    { stage: "Confirmed",    value: 810, count: "810" },
    { stage: "Seated",       value: 760, count: "760" },
    { stage: "Ordered",      value: 740, count: "740" },
    { stage: "Returned",     value: 420, count: "420" },
  ],
  salon: [
    { stage: "Inquiries",     value: 640, count: "640" },
    { stage: "Booked",        value: 480, count: "480" },
    { stage: "Attended",      value: 440, count: "440" },
    { stage: "Bought Product",value: 210, count: "210" },
    { stage: "Rebooked",      value: 310, count: "310" },
  ],
  saas: [
    { stage: "Signups",       value: 1800, count: "1,800" },
    { stage: "Active Trial",  value: 1080, count: "1,080" },
    { stage: "Feature Used",  value: 720,  count: "720"   },
    { stage: "Converted",     value: 612,  count: "612"   },
    { stage: "Retained 90d",  value: 520,  count: "520"   },
  ],
  ecommerce: [
    { stage: "Sessions",      value: 12400, count: "12,400" },
    { stage: "Product Views", value: 7440,  count: "7,440"  },
    { stage: "Add to Cart",   value: 2976,  count: "2,976"  },
    { stage: "Checkout",      value: 1984,  count: "1,984"  },
    { stage: "Repeat Order",  value: 754,   count: "754"    },
  ],
  agency: [
    { stage: "Leads",         value: 80, count: "80" },
    { stage: "Qualified",     value: 52, count: "52" },
    { stage: "Proposal Sent", value: 36, count: "36" },
    { stage: "Negotiating",   value: 24, count: "24" },
    { stage: "Closed Won",    value: 20, count: "20" },
  ],
}

export function FunnelChart({ category = "cafe" }: { category?: string }) {
  const data = funnelData[category] || funnelData.cafe
  const maxVal = data[0].value

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0, padding: "8px 12px" }}>
      {data.map((stage, i) => {
        const widthPct = 40 + (stage.value / maxVal) * 60
        const convRate = i > 0 ? Math.round((stage.value / data[i - 1].value) * 100) : null
        const opacity = 0.55 + (stage.value / maxVal) * 0.45

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {convRate !== null && (
              <div style={{ fontSize: 9, color: COLORS.gray, margin: "2px 0", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: convRate >= 70 ? "#16A34A" : convRate >= 40 ? BLUE : "#F59E0B", fontWeight: 700 }}>{convRate}%</span>
                <span>conversion</span>
              </div>
            )}
            <div style={{
              width: `${widthPct}%`,
              height: 32,
              background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`,
              opacity,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>{stage.stage}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>{stage.count}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── REVENUE COMBO CHART (Bar + Line overlay) ─────────────────────
const comboData: Record<string, { month: string; revenue: number; growth: number }[]> = {
  cafe: [
    { month: "Feb", revenue: 18, growth: 4 },
    { month: "Mar", revenue: 22, growth: 8 },
    { month: "Apr", revenue: 28, growth: 12 },
    { month: "May", revenue: 24, growth: 6 },
    { month: "Jun", revenue: 30, growth: 14 },
    { month: "Jul", revenue: 27, growth: 9 },
    { month: "Aug", revenue: 35, growth: 18 },
    { month: "Sep", revenue: 32, growth: 15 },
    { month: "Oct", revenue: 38, growth: 20 },
    { month: "Nov", revenue: 34, growth: 13 },
    { month: "Dec", revenue: 42, growth: 24 },
    { month: "Jan", revenue: 45, growth: 28 },
  ],
  retail: [
    { month: "Feb", revenue: 32, growth: 3 },
    { month: "Mar", revenue: 38, growth: 7 },
    { month: "Apr", revenue: 35, growth: 5 },
    { month: "May", revenue: 42, growth: 10 },
    { month: "Jun", revenue: 48, growth: 14 },
    { month: "Jul", revenue: 44, growth: 12 },
    { month: "Aug", revenue: 52, growth: 18 },
    { month: "Sep", revenue: 55, growth: 22 },
    { month: "Oct", revenue: 50, growth: 16 },
    { month: "Nov", revenue: 58, growth: 25 },
    { month: "Dec", revenue: 62, growth: 30 },
    { month: "Jan", revenue: 68, growth: 35 },
  ],
  restaurant: [
    { month: "Feb", revenue: 25, growth: 5 },
    { month: "Mar", revenue: 30, growth: 10 },
    { month: "Apr", revenue: 28, growth: 8 },
    { month: "May", revenue: 35, growth: 14 },
    { month: "Jun", revenue: 40, growth: 18 },
    { month: "Jul", revenue: 37, growth: 15 },
    { month: "Aug", revenue: 44, growth: 22 },
    { month: "Sep", revenue: 48, growth: 26 },
    { month: "Oct", revenue: 45, growth: 22 },
    { month: "Nov", revenue: 52, growth: 30 },
    { month: "Dec", revenue: 56, growth: 34 },
    { month: "Jan", revenue: 60, growth: 38 },
  ],
  salon: [
    { month: "Feb", revenue: 20, growth: 4 },
    { month: "Mar", revenue: 24, growth: 8 },
    { month: "Apr", revenue: 22, growth: 6 },
    { month: "May", revenue: 28, growth: 12 },
    { month: "Jun", revenue: 32, growth: 16 },
    { month: "Jul", revenue: 29, growth: 13 },
    { month: "Aug", revenue: 35, growth: 20 },
    { month: "Sep", revenue: 38, growth: 24 },
    { month: "Oct", revenue: 36, growth: 21 },
    { month: "Nov", revenue: 42, growth: 28 },
    { month: "Dec", revenue: 44, growth: 30 },
    { month: "Jan", revenue: 48, growth: 35 },
  ],
  saas: [
    { month: "Feb", revenue: 28, growth: 8  },
    { month: "Mar", revenue: 30, growth: 12 },
    { month: "Apr", revenue: 32, growth: 16 },
    { month: "May", revenue: 34, growth: 13 },
    { month: "Jun", revenue: 36, growth: 18 },
    { month: "Jul", revenue: 38, growth: 22 },
    { month: "Aug", revenue: 40, growth: 26 },
    { month: "Sep", revenue: 42, growth: 22 },
    { month: "Oct", revenue: 43, growth: 25 },
    { month: "Nov", revenue: 44, growth: 27 },
    { month: "Dec", revenue: 45, growth: 24 },
    { month: "Jan", revenue: 46, growth: 28 },
  ],
  ecommerce: [
    { month: "Feb", revenue: 38, growth: 6  },
    { month: "Mar", revenue: 42, growth: 14 },
    { month: "Apr", revenue: 40, growth: 18 },
    { month: "May", revenue: 46, growth: 22 },
    { month: "Jun", revenue: 50, growth: 18 },
    { month: "Jul", revenue: 47, growth: 10 },
    { month: "Aug", revenue: 52, growth: 20 },
    { month: "Sep", revenue: 54, growth: 28 },
    { month: "Oct", revenue: 51, growth: 14 },
    { month: "Nov", revenue: 56, growth: 30 },
    { month: "Dec", revenue: 60, growth: 36 },
    { month: "Jan", revenue: 56, growth: 14 },
  ],
  agency: [
    { month: "Feb", revenue: 55, growth: 5  },
    { month: "Mar", revenue: 60, growth: 9  },
    { month: "Apr", revenue: 58, growth: 7  },
    { month: "May", revenue: 65, growth: 14 },
    { month: "Jun", revenue: 70, growth: 20 },
    { month: "Jul", revenue: 68, growth: 16 },
    { month: "Aug", revenue: 74, growth: 22 },
    { month: "Sep", revenue: 78, growth: 28 },
    { month: "Oct", revenue: 75, growth: 18 },
    { month: "Nov", revenue: 82, growth: 26 },
    { month: "Dec", revenue: 86, growth: 30 },
    { month: "Jan", revenue: 88, growth: 32 },
  ],
}

export function RevenueComboChart({ category = "cafe" }: { category?: string }) {
  const data = comboData[category] || comboData.cafe

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }} barCategoryGap="18%">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis
          dataKey="month" axisLine={false} tickLine={false}
          tick={{ fill: "#64748B", fontSize: 11 }}
        />
        <YAxis
          axisLine={false} tickLine={false}
          tick={{ fill: "#64748B", fontSize: 10 }}
          tickFormatter={(v: number) => `${v}k`}
          width={32}
        />
        <Tooltip
          contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
          formatter={(value: number) => [`${value}k`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill={BLUE} opacity={0.82} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ─── METRICS TABLE ────────────────────────────────────────────────
const metricsTableData: Record<string, { metric: string; current: string; previous: string; change: string; up: boolean }[]> = {
  cafe: [
    { metric: "Revenue",         current: "$24,500", previous: "$21,300", change: "+15%", up: true  },
    { metric: "Avg. Ticket",     current: "$32.50",  previous: "$30.95",  change: "+5%",  up: true  },
    { metric: "Daily Customers", current: "180",     previous: "167",     change: "+8%",  up: true  },
    { metric: "Waste Rate",      current: "5%",      previous: "8%",      change: "-38%", up: true  },
    { metric: "Avg. Wait Time",  current: "8 min",   previous: "6 min",   change: "+33%", up: false },
  ],
  retail: [
    { metric: "Revenue",         current: "$78,900", previous: "$71,700", change: "+10%", up: true  },
    { metric: "Avg. Order",      current: "$45.75",  previous: "$44.40",  change: "+3%",  up: true  },
    { metric: "Customers",       current: "2,780",   previous: "2,482",   change: "+12%", up: true  },
    { metric: "Inventory Turn",  current: "75%",     previous: "62%",     change: "+21%", up: true  },
    { metric: "Returns Rate",    current: "4.8%",    previous: "3.2%",    change: "+50%", up: false },
  ],
  restaurant: [
    { metric: "Revenue",         current: "$52,300", previous: "$44,300", change: "+18%", up: true  },
    { metric: "Avg. Check",      current: "$38.25",  previous: "$35.75",  change: "+7%",  up: true  },
    { metric: "Covers",          current: "1,850",   previous: "1,609",   change: "+15%", up: true  },
    { metric: "Table Turnover",  current: "3.2×",    previous: "2.8×",    change: "+14%", up: true  },
    { metric: "No-show Rate",    current: "14%",     previous: "9%",      change: "+56%", up: false },
  ],
  salon: [
    { metric: "Revenue",         current: "$31,200", previous: "$27,900", change: "+12%", up: true  },
    { metric: "Avg. Ticket",     current: "$75.50",  previous: "$71.25",  change: "+6%",  up: true  },
    { metric: "Bookings",        current: "420",     previous: "385",     change: "+9%",  up: true  },
    { metric: "Booking Rate",    current: "92%",     previous: "81%",     change: "+14%", up: true  },
    { metric: "Cancellation %",  current: "18%",     previous: "11%",     change: "+64%", up: false },
  ],
  saas: [
    { metric: "MRR",              current: "$46,500", previous: "$36,300", change: "+28%", up: true  },
    { metric: "Churn Rate",       current: "3%",      previous: "5.2%",    change: "-42%", up: true  },
    { metric: "Trial Conv. Rate", current: "34%",     previous: "22%",     change: "+55%", up: true  },
    { metric: "Customer LTV",     current: "$3,800",  previous: "$2,900",  change: "+31%", up: true  },
    { metric: "Avg. Resolution",  current: "8h",      previous: "5h",      change: "+60%", up: false },
  ],
  ecommerce: [
    { metric: "GMV",              current: "$55,600", previous: "$48,700", change: "+14%", up: true  },
    { metric: "Avg. Order",       current: "$68.40",  previous: "$64.50",  change: "+6%",  up: true  },
    { metric: "Orders",           current: "5,240",   previous: "4,441",   change: "+18%", up: true  },
    { metric: "Repeat Rate",      current: "38%",     previous: "26%",     change: "+46%", up: true  },
    { metric: "Cart Abandon",     current: "72%",     previous: "65%",     change: "+11%", up: false },
  ],
  agency: [
    { metric: "Revenue",          current: "$88,200", previous: "$76,000", change: "+16%", up: true  },
    { metric: "Billable Util.",   current: "81%",     previous: "68%",     change: "+19%", up: true  },
    { metric: "Active Clients",   current: "20",      previous: "18",      change: "+11%", up: true  },
    { metric: "Avg. Retainer",    current: "$4,120",  previous: "$3,800",  change: "+8%",  up: true  },
    { metric: "Scope Creep %",    current: "28%",     previous: "18%",     change: "+56%", up: false },
  ],
}

export function MetricsTable({ category = "cafe" }: { category?: string }) {
  const rows = metricsTableData[category] || metricsTableData.cafe
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            {["Metric", "Current", "Previous", "Change"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: h === "Metric" ? "left" : "right", fontSize: 11, fontWeight: 600, color: "hsl(var(--muted-foreground))", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <td style={{ padding: "9px 10px", fontWeight: 600, color: "hsl(var(--foreground))", whiteSpace: "nowrap" }}>{row.metric}</td>
              <td style={{ padding: "9px 10px", textAlign: "right", fontWeight: 700, color: BLUE, whiteSpace: "nowrap" }}>{row.current}</td>
              <td style={{ padding: "9px 10px", textAlign: "right", color: "hsl(var(--muted-foreground))", whiteSpace: "nowrap" }}>{row.previous}</td>
              <td style={{ padding: "9px 10px", textAlign: "right", whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 700, color: row.up ? "#16A34A" : "#DC2626", fontSize: 11 }}>{row.change}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
