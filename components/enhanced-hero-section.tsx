"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, TrendingUp, Package, Users, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

function MeshBackground({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 1.5 + 0.5 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14, 165, 233, ${dark ? 0.5 : 0.25})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(14, 165, 233, ${(dark ? 0.15 : 0.07) * (1 - dist / 140)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize) }
  }, [dark])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`)
  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut", delay: 0.5 })
    return controls.stop
  }, [])
  return <motion.span>{rounded}</motion.span>
}

function LiveLineChart() {
  const data = [28, 35, 30, 42, 38, 52, 48, 61, 55, 70, 65, 82]
  const w = 260, h = 70
  const min = Math.min(...data), max = Math.max(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * (h - 10) - 5
    return `${x},${y}`
  })
  const linePath = `M ${pts.join(" L ")}`
  const areaPath = `M 0,${h} L ${pts.join(" L ")} L ${w},${h} Z`

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={areaPath} fill="url(#areaGrad)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} />
      <motion.path d={linePath} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w
        const y = h - ((v - min) / (max - min)) * (h - 10) - 5
        return i === data.length - 1 ? (
          <motion.circle key={i} cx={x} cy={y} r="3" fill="#0EA5E9"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
        ) : null
      })}
    </svg>
  )
}

function MockDashboard() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const kpis = [
    { label: "Monthly Revenue", value: 48200, prefix: "$", suffix: "", change: "+18%", icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { label: "Inventory Health", value: 94, prefix: "", suffix: "%", change: "+12%", icon: <Package className="h-3.5 w-3.5" /> },
    { label: "Customer Retention", value: 78, prefix: "", suffix: "%", change: "+6%", icon: <Users className="h-3.5 w-3.5" /> },
    { label: "Waste Reduction", value: 64, prefix: "−", suffix: "%", change: "vs last month", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  ]

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: "rgba(8, 12, 24, 0.98)", border: "1px solid rgba(14, 165, 233, 0.2)", boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(14, 165, 233, 0.08)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-3.5 w-3.5" style={{ color: "#0EA5E9" }} />
          <span className="text-xs font-semibold text-white">RevLens Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(14, 165, 233, 0.15)", color: "#0EA5E9" }}>Live</span>
          </div>
          <div className="flex gap-1">{["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />)}</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-2">
          {kpis.map((kpi, i) => (
            <div key={i} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "9px" }}>{kpi.label}</span>
                <span style={{ color: "#0EA5E9" }}>{kpi.icon}</span>
              </div>
              <div className="text-base font-bold text-white">
                <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
              </div>
              <div style={{ color: "#34D399", fontSize: "10px" }} className="mt-0.5">{kpi.change}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-3">
          {/* Revenue trend with animated line chart */}
          <div className="col-span-7 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-semibold text-white">Revenue Trend</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>12-month overview</div>
              </div>
              <div className="text-xs px-2 py-0.5 rounded-lg" style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9" }}>+23% YoY</div>
            </div>
            <LiveLineChart />
            <div className="flex justify-between mt-1">
              {months.filter((_, i) => i % 3 === 0).map((m, i) => (
                <div key={i} style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)" }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Top items */}
          <div className="col-span-5 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="text-xs font-semibold text-white mb-2.5">Top Menu Items</div>
            {[{ name: "Grilled Salmon", pct: 92 },{ name: "Caesar Salad", pct: 78 },{ name: "Ribeye Steak", pct: 65 },{ name: "Pasta Primavera", pct: 54 }].map((item, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between mb-0.5" style={{ fontSize: "10px" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
                  <motion.span style={{ color: "#0EA5E9" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15 }}>
                    {item.pct}%
                  </motion.span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0EA5E9, #38BDF8)" }}
                    initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl p-2.5" style={{ background: "rgba(14, 165, 233, 0.05)", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
          <div className="flex items-center gap-6">
            {[
              { icon: <AlertCircle className="h-3 w-3" style={{ color: "#FBBF24" }} />, text: "Tomatoes below par level" },
              { icon: <CheckCircle2 className="h-3 w-3" style={{ color: "#34D399" }} />, text: "Friday staffing optimized" },
              { icon: <TrendingUp className="h-3 w-3" style={{ color: "#0EA5E9" }} />, text: "Weekend forecast ready" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-1.5" style={{ fontSize: "10px" }}>
                {a.icon}<span style={{ color: "rgba(255,255,255,0.45)" }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const integrations = ["Square", "Toast", "Lightspeed", "Shopify POS", "QuickBooks"]

export function EnhancedHeroSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const bg = isDark ? "#060C1A" : "#F0F7FF"
  const headingColor = isDark ? "#ffffff" : "#0F172A"
  const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.6)"
  const pillBg = "rgba(14,165,233,0.1)"
  const pillBorder = isDark ? "rgba(14,165,233,0.25)" : "rgba(14,165,233,0.3)"
  const intBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(14,165,233,0.06)"
  const intColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.5)"
  const intBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.15)"
  const worksColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.35)"

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-36" style={{ background: bg }}>
      <MeshBackground dark={isDark} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, rgba(14, 165, 233, ${isDark ? 0.12 : 0.07}) 0%, transparent 65%)` }} />

      <div className="relative z-10 container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div className="flex flex-col space-y-6"
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>

            <motion.span className="inline-flex w-fit items-center text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: pillBg, color: "#0EA5E9", border: `1px solid ${pillBorder}` }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Analytics Built for Restaurants & Food Businesses
            </motion.span>

            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ color: headingColor }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Your Data.{" "}
              <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Our Lens.
              </span>
            </motion.h1>

            <motion.p className="text-lg leading-relaxed max-w-lg" style={{ color: subColor }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Connect your POS, CRM, or ERP and turn raw numbers into decisions that grow revenue, cut waste, and optimize labour.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button size="lg" className="btn-primary group h-12 px-7 text-base"
                onClick={() => (window.location.href = "/contact")}>
                Book a Free Demo
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="btn-secondary h-12 px-7 text-base"
                onClick={() => (window.location.href = "/services")}>
                See How It Works
              </Button>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-2 pt-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <span className="text-xs uppercase tracking-widest mr-1" style={{ color: worksColor }}>Works with</span>
              {integrations.map((name, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: intBg, color: intColor, border: `1px solid ${intBorder}` }}>
                  {name}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative"
            initial={{ opacity: 0, x: 24, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
            <div className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 70%)" }} />
            <MockDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}