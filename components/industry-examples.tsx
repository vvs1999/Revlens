"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store, UtensilsCrossed, ShoppingBag, Scissors, Coffee, Twitter, Linkedin, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

type Industry = {
  id: string
  name: string
  icon: React.ReactNode
  challenge: string
  solution: string
  result: string
  metrics: { before: number; after: number; unit: string; label: string }[]
}

const industries: Industry[] = [
  {
    id: "restaurant", name: "Restaurants", icon: <UtensilsCrossed className="h-5 w-5" />,
    challenge: "High food waste and difficulty predicting busy periods",
    solution: "Inventory optimization and customer flow analysis",
    result: "Reduced waste and better staff scheduling",
    metrics: [
      { before: 22, after: 5, unit: "%", label: "Food Waste" },
      { before: 65, after: 85, unit: "%", label: "Inventory Utilization" },
      { before: 10000, after: 13500, unit: "$", label: "Monthly Revenue" },
    ],
  },
  {
    id: "retail", name: "Retail Stores", icon: <ShoppingBag className="h-5 w-5" />,
    challenge: "Excess inventory and unclear product performance",
    solution: "Product performance tracking and seasonal trend analysis",
    result: "Optimized inventory and increased sales of high-margin items",
    metrics: [
      { before: 45, after: 75, unit: "%", label: "Inventory Turnover" },
      { before: 15, after: 28, unit: "%", label: "Profit Margin" },
      { before: 8500, after: 12000, unit: "$", label: "Weekly Sales" },
    ],
  },
  {
    id: "cafe", name: "Cafés", icon: <Coffee className="h-5 w-5" />,
    challenge: "Inconsistent sales and difficulty with menu optimization",
    solution: "Sales pattern analysis and menu performance tracking",
    result: "Streamlined menu and better peak-hour preparation",
    metrics: [
      { before: 4.5, after: 8.2, unit: "$", label: "Avg. Transaction Value" },
      { before: 120, after: 185, unit: "", label: "Daily Customers" },
      { before: 18, after: 12, unit: "", label: "Menu Items" },
    ],
  },
  {
    id: "salon", name: "Beauty Salons", icon: <Scissors className="h-5 w-5" />,
    challenge: "Appointment scheduling gaps and service popularity uncertainty",
    solution: "Appointment analytics and service performance tracking",
    result: "Optimized scheduling and focus on high-profit services",
    metrics: [
      { before: 65, after: 92, unit: "%", label: "Booking Rate" },
      { before: 25, after: 45, unit: "%", label: "Repeat Customers" },
      { before: 7500, after: 11200, unit: "$", label: "Monthly Revenue" },
    ],
  },
  {
    id: "convenience", name: "Convenience Stores", icon: <Store className="h-5 w-5" />,
    challenge: "Inefficient product placement and stock management",
    solution: "Customer flow analysis and inventory optimization",
    result: "Better product placement and reduced stockouts",
    metrics: [
      { before: 12, after: 3, unit: "%", label: "Stockout Rate" },
      { before: 2.8, after: 4.2, unit: "$", label: "Avg. Transaction Value" },
      { before: 15000, after: 19500, unit: "$", label: "Monthly Revenue" },
    ],
  },
]

export function IndustryExamples() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id)
  const current = industries.find((i) => i.id === activeIndustry) || industries[0]
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const inactiveBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,165,233,0.05)"
  const inactiveBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(14,165,233,0.15)"
  const inactiveColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.55)"
  const cardBg = isDark ? "rgba(14,165,233,0.03)" : "rgba(14,165,233,0.03)"
  const cardBorder = isDark ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.12)"
  const metricBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(14,165,233,0.04)"
  const metricBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.12)"
  const barBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,165,233,0.08)"
  const barBefore = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"
  const labelColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)"
  const textColor = isDark ? "rgba(255,255,255,0.75)" : "rgba(15,23,42,0.75)"
  const noteColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.35)"

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative" style={{ background: "hsl(var(--background))" }}>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
            By Industry
          </span>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl" style={{ color: "hsl(var(--foreground))" }}>
            Solutions for Every Business Type
          </h2>
          <p className="max-w-[900px] md:text-xl/relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            See how RevLens analytics help different types of local businesses overcome their data challenges.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {industries.map((ind) => (
            <button key={ind.id} onClick={() => setActiveIndustry(ind.id)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeIndustry === ind.id ? "shadow-md scale-105" : "hover:scale-105")}
              style={activeIndustry === ind.id
                ? { background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)", color: "#ffffff" }
                : { background: inactiveBg, border: `1px solid ${inactiveBorder}`, color: inactiveColor }}>
              {ind.icon}
              <span>{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-10 rounded-2xl p-6 md:p-8" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndustry}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-8">

              {/* Left */}
              <div className="space-y-6">
                {[
                  { label: "The Challenge", value: current.challenge },
                  { label: "Our Solution", value: current.solution },
                  { label: "The Result", value: current.result },
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0EA5E9" }}>
                      {item.label}
                    </h3>
                    <p style={{ color: textColor }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Right */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#0EA5E9" }}>
                  Projected Impact
                </h3>
                {current.metrics.map((metric, index) => (
                  <div key={index} className="rounded-xl p-4" style={{ background: metricBg, border: `1px solid ${metricBorder}` }}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>{metric.label}</div>
                      <div className="text-sm font-bold" style={{ color: "#0EA5E9" }}>
                        {metric.label === "Menu Items" || metric.label === "Stockout Rate"
                          ? `-${Math.round(((metric.before - metric.after) / metric.before) * 100)}% Reduction`
                          : `+${Math.round(((metric.after - metric.before) / metric.before) * 100)}% Improvement`}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-10" style={{ color: labelColor }}>Before</span>
                        <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: barBg }}>
                          <motion.div className="h-full rounded-md flex items-center justify-end px-2"
                            style={{ background: barBefore }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(metric.before / Math.max(metric.before, metric.after)) * 100}%` }}
                            transition={{ duration: 0.8 }}>
                            <span className="text-xs font-medium whitespace-nowrap" style={{ color: "hsl(var(--foreground))" }}>
                              {metric.before}{metric.unit}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-10" style={{ color: labelColor }}>After</span>
                        <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: barBg }}>
                          <motion.div className="h-full rounded-md flex items-center justify-end px-2"
                            style={{ background: "linear-gradient(90deg, #0EA5E9, #38BDF8)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(metric.after / Math.max(metric.before, metric.after)) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}>
                            <span className="text-xs text-white font-medium whitespace-nowrap">
                              {metric.after}{metric.unit}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-xs mt-2" style={{ color: noteColor }}>
                  * Projections based on industry benchmarks. Individual results vary.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}