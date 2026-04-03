"use client"

import React from "react"

/* ────────────────────────────────────────────────────────────────────
   PALETTE  –  multi-hue, dark-mode-aware via CSS custom properties
   Chart wrappers on the dashboard page set these as inline CSS vars.
   Fallbacks here ensure charts render standalone too.
   ──────────────────────────────────────────────────────────────────── */

const C = {
  primary:   "var(--c-primary, #0EA5E9)",
  primaryDk: "var(--c-primary-dk, #0284C7)",
  violet:    "var(--c-violet, #8B5CF6)",
  emerald:   "var(--c-emerald, #10B981)",
  amber:     "var(--c-amber, #F59E0B)",
  rose:      "var(--c-rose, #F43F5E)",
  text:      "var(--c-text, hsl(var(--foreground, 0 0% 100%)))",
  muted:     "var(--c-muted, hsl(var(--muted-foreground, 215 20% 55%)))",
  grid:      "var(--c-grid, hsl(var(--border, 215 20% 20%)))",
  card:      "var(--c-card, hsl(var(--card, 222 47% 11%)))",
}

const PIE_COLORS = [C.primary, C.violet, C.emerald, C.amber]

/* ── shared SVG defs (glow filter + common gradients) ─────────────── */
function ChartDefs({ id, colors }: { id: string; colors?: string[] }) {
  const c1 = colors?.[0] ?? C.primary
  const c2 = colors?.[1] ?? C.violet
  return (
    <defs>
      <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c1} stopOpacity="0.45" />
        <stop offset="70%" stopColor={c2} stopOpacity="0.08" />
        <stop offset="100%" stopColor={c2} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </linearGradient>
      <filter id={`${id}-glow`}>
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-softglow`}>
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}

/* ── legend dot helper ────────────────────────────────────────────── */
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
      <span style={{ width: 8, height: 8, borderRadius: 3, background: color, display: "inline-block", opacity: 0.9 }} />
      <span style={{ color: C.muted }}>{label}</span>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   1.  REVENUE TREND  (area chart with gradient + glow line)
   ═══════════════════════════════════════════════════════════════════ */
const revenuePoints: Record<string, number[]> = {
  cafe:       [18, 22, 28, 24, 30, 27, 35, 32, 38, 34, 42, 45],
  retail:     [32, 38, 35, 42, 48, 44, 52, 55, 50, 58, 62, 68],
  restaurant: [25, 30, 28, 35, 40, 37, 44, 48, 45, 52, 56, 60],
  salon:      [20, 24, 22, 28, 32, 29, 35, 38, 36, 42, 44, 48],
}
const months = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]

export function RevenueTrendChart({ category = "cafe" }: { category?: string }) {
  const raw = revenuePoints[category] || revenuePoints.cafe
  const max = Math.max(...raw), min = Math.min(...raw)
  const W = 380, H = 150, padX = 12, padY = 16
  const uid = `rev-${category}`

  const pts = raw.map((v, i) => ({
    x: padX + (i / (raw.length - 1)) * (W - padX * 2),
    y: padY + (1 - (v - min) / (max - min + 1)) * (H - padY * 2),
  }))

  const smooth = (points: { x: number; y: number }[]) => {
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2
      d += ` C ${cpx} ${points[i - 1].y}, ${cpx} ${points[i].y}, ${points[i].x} ${points[i].y}`
    }
    return d
  }

  const linePath = smooth(pts)
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
  const change = { cafe: "15%", retail: "10%", restaurant: "18%", salon: "12%" }[category] ?? "15%"

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, width: "100%" }} preserveAspectRatio="none">
        <ChartDefs id={uid} colors={[C.primary, C.violet]} />
        {/* grid */}
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
          <line key={i} x1={padX} y1={padY + t * (H - padY * 2)} x2={W - padX} y2={padY + t * (H - padY * 2)}
            style={{ stroke: C.grid }} strokeWidth="0.5" strokeDasharray="4 3" opacity={0.5} />
        ))}
        {/* area fill */}
        <path d={areaPath} fill={`url(#${uid}-grad)`} />
        {/* glow line */}
        <path d={linePath} fill="none" style={{ stroke: C.primary }} strokeWidth="2" opacity={0.3} filter={`url(#${uid}-softglow)`} />
        {/* main line */}
        <path d={linePath} fill="none" stroke={`url(#${uid}-line)`} strokeWidth="2.5" strokeLinecap="round" />
        {/* data dots */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" style={{ fill: C.primary }} opacity={0.15} />
            <circle cx={p.x} cy={p.y} r="3" style={{ fill: C.card }} />
            <circle cx={p.x} cy={p.y} r="2" style={{ fill: C.primary }} />
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 12px 0", fontSize: 9.5, color: C.muted }}>
        {months.map((m, i) => i % 2 === 0 ? <span key={i}>{m}</span> : null)}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 12px 2px", fontSize: 10 }}>
        <LegendDot color={C.primary} label="Revenue" />
        <span style={{ color: C.emerald, fontWeight: 700, fontSize: 11 }}>+{change} this period</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   2.  CUSTOMER SEGMENTS  (multi-color donut)
   ═══════════════════════════════════════════════════════════════════ */
const segmentData: Record<string, { name: string; pct: number }[]> = {
  cafe:       [{ name: "Morning Regulars", pct: 38 }, { name: "Lunch Crowd", pct: 27 }, { name: "Afternoon", pct: 22 }, { name: "Weekend", pct: 13 }],
  retail:     [{ name: "Loyal Shoppers", pct: 32 }, { name: "Seasonal Buyers", pct: 28 }, { name: "Bargain Hunters", pct: 24 }, { name: "New Visitors", pct: 16 }],
  restaurant: [{ name: "Dinner Regulars", pct: 35 }, { name: "Lunch Crowd", pct: 30 }, { name: "Weekend Diners", pct: 22 }, { name: "Special Events", pct: 13 }],
  salon:      [{ name: "Monthly Clients", pct: 42 }, { name: "Bi-Weekly", pct: 28 }, { name: "Occasional", pct: 20 }, { name: "New Clients", pct: 10 }],
}

export function CustomerSegmentChart({ category = "cafe" }: { category?: string }) {
  const data = segmentData[category] || segmentData.cafe
  const cx = 80, cy = 80, R = 64, r = 40
  const toRad = (deg: number) => (deg * Math.PI) / 180
  let angle = -90
  const slices = data.map((d, i) => {
    const sweep = (d.pct / 100) * 356
    const start = angle
    angle += sweep + 1.2
    return { ...d, color: PIE_COLORS[i % PIE_COLORS.length], start, sweep }
  })
  const arcPath = (start: number, sweep: number, outerR: number, innerR: number) => {
    const s1 = { x: cx + outerR * Math.cos(toRad(start)), y: cy + outerR * Math.sin(toRad(start)) }
    const e1 = { x: cx + outerR * Math.cos(toRad(start + sweep)), y: cy + outerR * Math.sin(toRad(start + sweep)) }
    const s2 = { x: cx + innerR * Math.cos(toRad(start + sweep)), y: cy + innerR * Math.sin(toRad(start + sweep)) }
    const e2 = { x: cx + innerR * Math.cos(toRad(start)), y: cy + innerR * Math.sin(toRad(start)) }
    const large = sweep > 180 ? 1 : 0
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y} Z`
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px", gap: 12 }}>
      <svg viewBox="0 0 160 160" style={{ width: 160, flexShrink: 0 }}>
        <defs>
          <filter id={`donut-shadow-${category}`}>
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        {slices.map((s, i) => (
          <path key={i} d={arcPath(s.start, s.sweep, R, r)}
            style={{ fill: s.color }} opacity={0.9} filter={`url(#donut-shadow-${category})`} />
        ))}
        <circle cx={cx} cy={cy} r={r} style={{ fill: C.card }} />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="9" style={{ fill: C.muted }}>Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="18" fontWeight="800" style={{ fill: C.text }}>100%</text>
      </svg>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i], flexShrink: 0, opacity: 0.9 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>{d.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: PIE_COLORS[i] }}>{d.pct}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(128,128,128,0.1)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${d.pct}%`, background: PIE_COLORS[i], borderRadius: 99, opacity: 0.8 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   3.  HOURLY BAR CHART  (gradient bars with peak glow)
   ═══════════════════════════════════════════════════════════════════ */
const hourlyData: Record<string, number[]> = {
  cafe:       [12, 45, 88, 72, 54, 61, 78, 65, 48, 55, 42, 30],
  retail:     [22, 48, 65, 72, 68, 75, 80, 85, 78, 60, 40, 18],
  restaurant: [10, 30, 85, 90, 55, 20, 18, 45, 88, 95, 80, 50],
  salon:      [10, 35, 65, 80, 70, 60, 75, 85, 90, 70, 45, 20],
}
const hourLabels: Record<string, string[]> = {
  cafe:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  retail:     ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  restaurant: ["10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p"],
  salon:      ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
}

export function HourlyBarChart({ category = "cafe" }: { category?: string }) {
  const vals = hourlyData[category] || hourlyData.cafe
  const labels = hourLabels[category] || hourLabels.cafe
  const max = Math.max(...vals)
  const W = 340, H = 130
  const barW = W / vals.length - 4
  const uid = `hbar-${category}`

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, width: "100%" }}>
        <defs>
          <linearGradient id={`${uid}-peak`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.violet} />
          </linearGradient>
          <linearGradient id={`${uid}-mid`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={C.violet} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${uid}-low`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.primary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={C.violet} stopOpacity="0.15" />
          </linearGradient>
          <filter id={`${uid}-glow`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i} x1="0" y1={H * (1 - t) * 0.88} x2={W} y2={H * (1 - t) * 0.88}
            style={{ stroke: C.grid }} strokeWidth="0.5" strokeDasharray="4 3" opacity={0.4} />
        ))}
        {vals.map((v, i) => {
          const barH = (v / max) * (H * 0.82)
          const x = i * (W / vals.length) + 2
          const isPeak = v >= max * 0.78
          const isMid = v >= max * 0.5
          const fillId = isPeak ? `${uid}-peak` : isMid ? `${uid}-mid` : `${uid}-low`
          return (
            <g key={i}>
              <rect x={x} y={H - barH} width={barW} height={barH} rx="5"
                fill={`url(#${fillId})`} filter={isPeak ? `url(#${uid}-glow)` : undefined} />
            </g>
          )
        })}
        {/* average line */}
        {(() => {
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length
          const y = H - (avg / max) * (H * 0.82)
          return <line x1="0" y1={y} x2={W} y2={y} style={{ stroke: C.amber }} strokeWidth="1" strokeDasharray="6 3" opacity={0.6} />
        })()}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 2px 0", fontSize: 9, color: C.muted }}>
        {labels.map((l, i) => i % 2 === 0 ? <span key={i}>{l}</span> : null)}
      </div>
      <div style={{ display: "flex", gap: 12, padding: "6px 0 2px", fontSize: 10 }}>
        <LegendDot color={C.primary} label="Peak" />
        <LegendDot color={C.violet} label="Off-peak" />
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
          <span style={{ width: 12, height: 0, borderTop: `1.5px dashed ${C.amber}`, display: "inline-block" }} />
          <span style={{ color: C.muted }}>Avg</span>
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   4.  HEATMAP  (cool-to-warm color scale)
   ═══════════════════════════════════════════════════════════════════ */
const heatValues: Record<string, number[][]> = {
  cafe: [[2,5,8,7,5,4,6,5,4,4,3,2],[2,4,7,6,4,5,6,5,4,4,3,2],[2,4,8,7,5,5,7,6,5,5,3,2],[2,5,8,7,5,5,7,6,5,6,4,2],[3,6,9,8,6,6,8,7,5,6,4,3],[4,5,7,8,9,8,9,8,7,8,6,5],[3,4,6,7,8,7,8,7,6,6,5,3]],
  retail: [[1,2,4,5,6,6,7,7,6,4,2,1],[1,2,4,5,5,6,6,7,5,3,2,1],[1,3,5,6,6,7,7,8,6,4,3,1],[2,3,5,6,6,7,8,8,6,4,3,2],[3,4,6,7,7,8,9,9,8,6,4,2],[4,6,7,8,8,9,9,9,9,7,5,3],[3,5,6,7,7,8,8,8,7,5,4,2]],
  restaurant: [[1,3,7,8,5,2,2,3,7,8,6,2],[1,3,7,8,4,2,2,3,8,8,6,2],[1,4,8,9,5,3,3,4,8,9,7,3],[2,4,8,9,5,3,4,5,9,9,8,4],[2,5,9,9,6,4,6,7,9,9,9,5],[3,5,8,8,6,5,8,9,9,9,9,6],[3,5,9,9,6,4,6,8,9,9,8,5]],
  salon: [[1,2,5,7,6,5,6,7,8,6,4,1],[1,3,5,6,5,4,5,6,7,5,3,1],[1,3,6,8,7,5,6,7,8,6,4,1],[2,4,7,8,7,5,7,8,9,7,5,2],[3,5,8,9,8,6,7,9,9,8,6,3],[4,6,9,9,9,8,9,9,9,9,7,4],[2,4,5,7,7,6,7,7,8,6,5,2]],
}
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
const heatHours: Record<string, string[]> = {
  cafe:       ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p"],
  retail:     ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
  restaurant: ["10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p"],
  salon:      ["9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"],
}

export function HeatMapChart({ category = "cafe" }: { category?: string }) {
  const vals = heatValues[category] || heatValues.cafe
  const hours = heatHours[category] || heatHours.cafe

  // cool-to-warm scale: transparent -> primary -> violet -> rose
  const getColor = (v: number) => {
    const t = v / 9
    if (t < 0.15) return "rgba(14,165,233,0.06)"
    if (t < 0.3)  return "rgba(14,165,233,0.2)"
    if (t < 0.45) return "rgba(14,165,233,0.4)"
    if (t < 0.6)  return "rgba(139,92,246,0.35)"
    if (t < 0.75) return "rgba(139,92,246,0.55)"
    if (t < 0.88) return "rgba(244,63,94,0.45)"
    return "rgba(244,63,94,0.65)"
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 3, fontSize: 9, color: C.muted, overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `30px repeat(${hours.length}, 1fr)`, gap: 2.5 }}>
        <div />
        {hours.map(h => <div key={h} style={{ textAlign: "center", fontSize: 8.5 }}>{h}</div>)}
      </div>
      {days.map((day, di) => (
        <div key={di} style={{ display: "grid", gridTemplateColumns: `30px repeat(${hours.length}, 1fr)`, gap: 2.5 }}>
          <div style={{ display: "flex", alignItems: "center", fontWeight: 600, fontSize: 9 }}>{day}</div>
          {vals[di].map((v, hi) => (
            <div key={hi} style={{ height: 20, borderRadius: 4, background: getColor(v), transition: "background 0.2s" }} />
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5 }}>
        <span style={{ fontSize: 9 }}>Low</span>
        {["rgba(14,165,233,0.1)", "rgba(14,165,233,0.35)", "rgba(139,92,246,0.4)", "rgba(139,92,246,0.55)", "rgba(244,63,94,0.5)", "rgba(244,63,94,0.65)"].map((c, i) => (
          <div key={i} style={{ width: 14, height: 10, borderRadius: 3, background: c }} />
        ))}
        <span style={{ fontSize: 9 }}>High</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   5.  HORIZONTAL BAR  (gradient bars with value pills)
   ═══════════════════════════════════════════════════════════════════ */
const hbarData: Record<string, { name: string; value: number; pct: number }[]> = {
  cafe:       [{ name: "Sarah M.", value: 8200, pct: 100 }, { name: "James K.", value: 7400, pct: 90 }, { name: "Priya R.", value: 6800, pct: 83 }, { name: "Tom W.", value: 6200, pct: 76 }, { name: "Ana L.", value: 5900, pct: 72 }],
  retail:     [{ name: "Electronics", value: 28000, pct: 100 }, { name: "Apparel", value: 22000, pct: 79 }, { name: "Home Goods", value: 17000, pct: 61 }, { name: "Accessories", value: 11900, pct: 43 }],
  restaurant: [{ name: "Dine-in", value: 31000, pct: 100 }, { name: "Takeout", value: 14000, pct: 45 }, { name: "Delivery", value: 7300, pct: 24 }],
  salon:      [{ name: "Maya J.", value: 9100, pct: 100 }, { name: "Chris B.", value: 8400, pct: 92 }, { name: "Nina P.", value: 7600, pct: 84 }, { name: "Sam T.", value: 6100, pct: 67 }],
}

export function StandardHorizontalBarChart({ category = "cafe" }: { category?: string }) {
  const data = hbarData[category] || hbarData.cafe
  const fmt = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
  const barColors = [C.primary, C.violet, C.emerald, C.amber, C.rose]

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: "6px 10px" }}>
      {data.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 11 }}>
            <span style={{ color: C.text, fontWeight: 500 }}>{d.name}</span>
            <span style={{
              fontWeight: 700, color: barColors[i % barColors.length],
              background: "rgba(128,128,128,0.08)", padding: "1px 8px", borderRadius: 99, fontSize: 10,
            }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 8, background: "rgba(128,128,128,0.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${d.pct}%`, borderRadius: 99,
              background: `linear-gradient(90deg, ${barColors[i % barColors.length]}, ${barColors[(i + 1) % barColors.length]})`,
              opacity: 0.8,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   6.  STANDARD BAR CHART  (vertical, gradient, rounded)
   ═══════════════════════════════════════════════════════════════════ */
const barData: Record<string, { label: string; pct: number }[]> = {
  cafe:       [{ label: "Coffee", pct: 65 }, { label: "Pastries", pct: 45 }, { label: "Sandwiches", pct: 30 }, { label: "Beverages", pct: 25 }, { label: "Extras", pct: 10 }],
  retail:     [{ label: "Electronics", pct: 70 }, { label: "Home", pct: 55 }, { label: "Apparel", pct: 40 }, { label: "Accessories", pct: 30 }],
  restaurant: [{ label: "Entrees", pct: 55 }, { label: "Beverages", pct: 45 }, { label: "Appetizers", pct: 35 }, { label: "Desserts", pct: 25 }],
  salon:      [{ label: "Color", pct: 75 }, { label: "Haircuts", pct: 60 }, { label: "Styling", pct: 40 }, { label: "Products", pct: 25 }],
}

export function StandardBarChart({ category = "cafe" }: { category?: string }) {
  const data = barData[category] || barData.cafe
  const barColors = [C.primary, C.violet, C.emerald, C.amber, C.rose]

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "8px 8px 4px" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 10, justifyContent: "center" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: barColors[i % barColors.length],
              background: "rgba(128,128,128,0.06)", padding: "1px 6px", borderRadius: 99,
            }}>{d.pct}%</span>
            <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%", height: `${d.pct}%`,
                background: `linear-gradient(180deg, ${barColors[i % barColors.length]}, ${barColors[(i + 1) % barColors.length]})`,
                borderRadius: "8px 8px 4px 4px", minHeight: 8, opacity: 0.8,
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", paddingTop: 8 }}>
        {data.map((d, i) => (
          <span key={i} style={{ flex: 1, fontSize: 9, color: C.muted, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   7.  BUBBLE CHART  (colored spheres with radial gradient)
   ═══════════════════════════════════════════════════════════════════ */
const bubbleData: Record<string, { name: string; x: number; y: number; r: number }[]> = {
  cafe:       [{ name: "Espresso", x: 88, y: 72, r: 18 }, { name: "Latte", x: 92, y: 58, r: 26 }, { name: "Croissant", x: 74, y: 65, r: 14 }, { name: "Sandwich", x: 56, y: 48, r: 11 }, { name: "Smoothie", x: 44, y: 62, r: 9 }, { name: "Cold Brew", x: 68, y: 70, r: 16 }],
  retail:     [{ name: "Laptops", x: 72, y: 35, r: 28 }, { name: "Phones", x: 85, y: 28, r: 24 }, { name: "Jackets", x: 65, y: 55, r: 18 }, { name: "Bags", x: 58, y: 62, r: 15 }, { name: "Watches", x: 45, y: 70, r: 14 }, { name: "Shoes", x: 78, y: 48, r: 20 }],
  restaurant: [{ name: "Steak", x: 78, y: 42, r: 22 }, { name: "Pasta", x: 85, y: 68, r: 20 }, { name: "Salad", x: 62, y: 74, r: 12 }, { name: "Burger", x: 90, y: 55, r: 24 }, { name: "Fish", x: 55, y: 48, r: 15 }, { name: "Wine", x: 70, y: 65, r: 18 }],
  salon:      [{ name: "Cut & Style", x: 92, y: 68, r: 24 }, { name: "Color", x: 78, y: 72, r: 28 }, { name: "Highlights", x: 65, y: 65, r: 18 }, { name: "Treatment", x: 52, y: 78, r: 13 }, { name: "Blowout", x: 70, y: 74, r: 15 }],
}
const bubbleColors = ["#0EA5E9", "#8B5CF6", "#10B981", "#F59E0B", "#F43F5E", "#06B6D4"]

export function BubbleChart({ category = "cafe" }: { category?: string }) {
  const data = bubbleData[category] || bubbleData.cafe
  const W = 320, H = 170
  const uid = `bubble-${category}`

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, width: "100%" }}>
        <defs>
          {data.map((_, i) => (
            <radialGradient key={i} id={`${uid}-rg-${i}`} cx="35%" cy="35%">
              <stop offset="0%" stopColor={bubbleColors[i % bubbleColors.length]} stopOpacity="0.5" />
              <stop offset="100%" stopColor={bubbleColors[i % bubbleColors.length]} stopOpacity="0.12" />
            </radialGradient>
          ))}
          <filter id={`${uid}-shadow`}>
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>
        {/* axes */}
        <line x1="32" y1="12" x2="32" y2={H - 22} style={{ stroke: C.grid }} strokeWidth="0.5" opacity={0.5} />
        <line x1="32" y1={H - 22} x2={W - 10} y2={H - 22} style={{ stroke: C.grid }} strokeWidth="0.5" opacity={0.5} />
        <text x="16" y={H / 2} fontSize="8" style={{ fill: C.muted }} textAnchor="middle" transform={`rotate(-90,16,${H / 2})`}>Margin %</text>
        <text x={W / 2} y={H - 5} fontSize="8" style={{ fill: C.muted }} textAnchor="middle">Popularity %</text>
        {data.map((d, i) => {
          const cx = 32 + ((d.x - 30) / 70) * (W - 48)
          const cy = (H - 22) - ((d.y - 20) / 70) * (H - 42)
          const col = bubbleColors[i % bubbleColors.length]
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={d.r} fill={`url(#${uid}-rg-${i})`} stroke={col} strokeWidth={1.5} strokeOpacity={0.5} filter={`url(#${uid}-shadow)`} />
              {d.r > 14 && <text x={cx} y={cy + 3.5} fontSize="8" style={{ fill: col }} textAnchor="middle" fontWeight="600">{d.name}</text>}
            </g>
          )
        })}
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "4px 6px 2px", fontSize: 9 }}>
        {data.filter(d => d.r <= 14).map((d, i) => {
          const idx = data.indexOf(d)
          return <LegendDot key={i} color={bubbleColors[idx % bubbleColors.length]} label={d.name} />
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   8.  RADAR CHART  (gradient fill with halos)
   ═══════════════════════════════════════════════════════════════════ */
const radarData: Record<string, { label: string; you: number; avg: number }[]> = {
  cafe:       [{ label: "Quality", you: 92, avg: 75 }, { label: "Speed", you: 78, avg: 72 }, { label: "Ambiance", you: 85, avg: 70 }, { label: "Value", you: 72, avg: 68 }, { label: "Staff", you: 88, avg: 74 }, { label: "Clean", you: 94, avg: 78 }],
  retail:     [{ label: "Range", you: 82, avg: 72 }, { label: "Pricing", you: 75, avg: 70 }, { label: "Staff", you: 88, avg: 74 }, { label: "Layout", you: 78, avg: 68 }, { label: "Checkout", you: 85, avg: 72 }, { label: "Returns", you: 80, avg: 66 }],
  restaurant: [{ label: "Food", you: 90, avg: 76 }, { label: "Service", you: 85, avg: 72 }, { label: "Ambiance", you: 82, avg: 70 }, { label: "Value", you: 74, avg: 68 }, { label: "Wait", you: 72, avg: 65 }, { label: "Clean", you: 92, avg: 78 }],
  salon:      [{ label: "Skill", you: 94, avg: 78 }, { label: "Timing", you: 82, avg: 72 }, { label: "Ambiance", you: 88, avg: 74 }, { label: "Value", you: 76, avg: 70 }, { label: "Products", you: 80, avg: 68 }, { label: "Booking", you: 85, avg: 72 }],
}

export function RadarChart({ category = "cafe" }: { category?: string }) {
  const data = radarData[category] || radarData.cafe
  const n = data.length
  const cx = 110, cy = 100, maxR = 78
  const uid = `radar-${category}`
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const getPoint = (i: number, pct: number) => ({
    x: cx + maxR * pct * Math.cos(toRad(-90 + (360 / n) * i)),
    y: cy + maxR * pct * Math.sin(toRad(-90 + (360 / n) * i)),
  })
  const rings = [0.25, 0.5, 0.75, 1]
  const ringPath = (pct: number) =>
    Array.from({ length: n }, (_, i) => getPoint(i, pct))
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"
  const youPath = data.map((d, i) => getPoint(i, d.you / 100))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"
  const avgPath = data.map((d, i) => getPoint(i, d.avg / 100))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <svg viewBox="0 0 220 200" style={{ flex: 1, width: "100%" }}>
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.12" />
          </linearGradient>
          <filter id={`${uid}-glow`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {rings.map((r, i) => (
          <path key={i} d={ringPath(r)} fill="none" style={{ stroke: C.grid }} strokeWidth="0.5" opacity={0.4} />
        ))}
        {data.map((_, i) => {
          const p = getPoint(i, 1)
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} style={{ stroke: C.grid }} strokeWidth="0.5" opacity={0.3} />
        })}
        {/* industry average */}
        <path d={avgPath} fill="rgba(128,128,128,0.06)" stroke="rgba(128,128,128,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* your data */}
        <path d={youPath} fill={`url(#${uid}-fill)`} stroke="url(#rev-cafe-line)" strokeWidth="0" />
        <path d={youPath} fill="none" style={{ stroke: C.primary }} strokeWidth="2" filter={`url(#${uid}-glow)`} opacity={0.4} />
        <path d={youPath} fill="none" style={{ stroke: C.primary }} strokeWidth="2" />
        {/* data point halos */}
        {data.map((d, i) => {
          const p = getPoint(i, d.you / 100)
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="6" style={{ fill: C.primary }} opacity={0.12} />
              <circle cx={p.x} cy={p.y} r="3.5" style={{ fill: C.card }} />
              <circle cx={p.x} cy={p.y} r="2.5" style={{ fill: C.primary }} />
            </g>
          )
        })}
        {/* labels */}
        {data.map((d, i) => {
          const p = getPoint(i, 1.2)
          return <text key={i} x={p.x} y={p.y} fontSize="9" style={{ fill: C.muted }} textAnchor="middle" dominantBaseline="middle">{d.label}</text>
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, padding: "0 10px 4px", fontSize: 10 }}>
        <LegendDot color={C.primary} label="You" />
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
          <span style={{ width: 14, height: 0, borderTop: "1.5px dashed rgba(128,128,128,0.5)", display: "inline-block" }} />
          <span style={{ color: C.muted }}>Industry avg</span>
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   9.  CALENDAR HEATMAP  (multi-hue)
   ═══════════════════════════════════════════════════════════════════ */
export function CalendarHeatmap({ category = "cafe" }: { category?: string }) {
  const mnths = ["Sep","Oct","Nov","Dec","Jan","Feb"]
  const weeks = 24
  const seed: Record<string, number> = { cafe: 1.2, retail: 2.4, restaurant: 0.8, salon: 1.8 }
  const s = seed[category] ?? 1
  const getValue = (w: number, d: number) => {
    const v = Math.abs(Math.sin(w * 0.5 + d * 1.3 + s)) * 0.7 + (w / weeks) * 0.3
    return Math.min(1, v)
  }
  const getColor = (v: number) => {
    if (v < 0.15) return "rgba(14,165,233,0.05)"
    if (v < 0.3)  return "rgba(14,165,233,0.18)"
    if (v < 0.45) return "rgba(14,165,233,0.35)"
    if (v < 0.6)  return "rgba(139,92,246,0.3)"
    if (v < 0.75) return "rgba(139,92,246,0.5)"
    return "rgba(244,63,94,0.45)"
  }
  const dLabels = ["M","","W","","F","","S"]

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontSize: 9, color: C.muted }}>
      <div style={{ display: "flex", marginBottom: 4, paddingLeft: 16 }}>
        {mnths.map((m, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 8.5 }}>{m}</div>)}
      </div>
      <div style={{ display: "flex", flex: 1, gap: 2 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", paddingRight: 3 }}>
          {dLabels.map((d, i) => <span key={i} style={{ fontSize: 8.5 }}>{d}</span>)}
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateRows: "repeat(7, 1fr)", gridAutoFlow: "column", gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 2.5 }}>
          {Array.from({ length: weeks * 7 }, (_, idx) => {
            const w = Math.floor(idx / 7), d = idx % 7
            return <div key={idx} style={{ borderRadius: 3, background: getColor(getValue(w, d)) }} />
          })}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6 }}>
        <span style={{ fontSize: 9 }}>Less</span>
        {["rgba(14,165,233,0.08)", "rgba(14,165,233,0.25)", "rgba(14,165,233,0.4)", "rgba(139,92,246,0.4)", "rgba(139,92,246,0.55)", "rgba(244,63,94,0.45)"].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
        ))}
        <span style={{ fontSize: 9 }}>More</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   10. LOCATION MAP  (colored bars with icons)
   ═══════════════════════════════════════════════════════════════════ */
const locationData: Record<string, { name: string; revenue: string; change: string; pct: number }[]> = {
  cafe:       [{ name: "Downtown Café", revenue: "$9.8k", change: "+18%", pct: 40 }, { name: "Midtown Branch", revenue: "$8.2k", change: "+12%", pct: 33 }, { name: "Airport Kiosk", revenue: "$6.5k", change: "+9%", pct: 27 }],
  retail:     [{ name: "Main St. Store", revenue: "$32k", change: "+14%", pct: 41 }, { name: "Mall Location", revenue: "$28k", change: "+10%", pct: 35 }, { name: "Outlet Store", revenue: "$18.9k", change: "+6%", pct: 24 }],
  restaurant: [{ name: "Downtown", revenue: "$24k", change: "+20%", pct: 46 }, { name: "Westside", revenue: "$18.5k", change: "+15%", pct: 35 }, { name: "Uptown", revenue: "$9.8k", change: "+8%", pct: 19 }],
  salon:      [{ name: "Main Studio", revenue: "$18.5k", change: "+15%", pct: 59 }, { name: "Eastside Branch", revenue: "$12.7k", change: "+10%", pct: 41 }],
}
const locColors = ["#0EA5E9", "#8B5CF6", "#10B981"]

export function LocationMapChart({ category = "cafe" }: { category?: string }) {
  const data = locationData[category] || locationData.cafe
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "6px 10px" }}>
      {data.map((loc, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: locColors[i % locColors.length], flexShrink: 0, boxShadow: `0 0 6px ${locColors[i % locColors.length]}50` }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{loc.name}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: C.emerald, fontWeight: 600, background: "rgba(16,185,129,0.08)", padding: "1px 6px", borderRadius: 99 }}>{loc.change}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: locColors[i % locColors.length] }}>{loc.revenue}</span>
            </div>
          </div>
          <div style={{ height: 8, background: "rgba(128,128,128,0.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${loc.pct}%`, borderRadius: 99,
              background: `linear-gradient(90deg, ${locColors[i % locColors.length]}, ${locColors[(i + 1) % locColors.length] || locColors[0]})`,
              opacity: 0.75,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   11. FUNNEL CHART  (gradient stages with depth)
   ═══════════════════════════════════════════════════════════════════ */
const funnelData: Record<string, { stage: string; count: string; pct: number }[]> = {
  cafe:       [{ stage: "Walk-bys", count: "1,200", pct: 100 }, { stage: "Enter Store", count: "840", pct: 70 }, { stage: "Browse Menu", count: "680", pct: 57 }, { stage: "Order", count: "560", pct: 47 }, { stage: "Return Visit", count: "310", pct: 26 }],
  retail:     [{ stage: "Site Visits", count: "8,400", pct: 100 }, { stage: "Product Views", count: "5,200", pct: 62 }, { stage: "Add to Cart", count: "2,100", pct: 25 }, { stage: "Checkout", count: "1,400", pct: 17 }, { stage: "Repeat Buy", count: "640", pct: 8 }],
  restaurant: [{ stage: "Reservations", count: "920", pct: 100 }, { stage: "Confirmed", count: "810", pct: 88 }, { stage: "Seated", count: "760", pct: 83 }, { stage: "Ordered", count: "740", pct: 80 }, { stage: "Returned", count: "420", pct: 46 }],
  salon:      [{ stage: "Inquiries", count: "640", pct: 100 }, { stage: "Booked", count: "480", pct: 75 }, { stage: "Attended", count: "440", pct: 69 }, { stage: "Bought Product", count: "210", pct: 33 }, { stage: "Rebooked", count: "310", pct: 48 }],
}
const funnelColors = ["#0EA5E9", "#6366F1", "#8B5CF6", "#A855F7", "#C084FC"]

export function FunnelChart({ category = "cafe" }: { category?: string }) {
  const data = funnelData[category] || funnelData.cafe
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "6px 10px" }}>
      {data.map((stage, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 80, fontSize: 10, color: C.muted, textAlign: "right", flexShrink: 0 }}>{stage.stage}</div>
          <div style={{ flex: 1, height: 22, background: "rgba(128,128,128,0.06)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${stage.pct}%`,
              background: `linear-gradient(90deg, ${funnelColors[i]}, ${funnelColors[Math.min(i + 1, funnelColors.length - 1)]})`,
              borderRadius: 6, opacity: 0.8,
              display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8,
            }}>
              {stage.pct > 18 && <span style={{ fontSize: 10, color: "white", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{stage.count}</span>}
            </div>
          </div>
          <div style={{ width: 32, fontSize: 10, color: funnelColors[i], fontWeight: 700, textAlign: "right" }}>{stage.pct}%</div>
        </div>
      ))}
    </div>
  )
}
