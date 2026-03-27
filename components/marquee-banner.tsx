"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { CreditCard, BookOpen, ShoppingCart } from "lucide-react"

const integrationGroups = [
  { category: "POS", icon: <CreditCard className="h-3 w-3" />, items: ["Square", "Toast", "Lightspeed", "Clover"] },
  { category: "Accounting", icon: <BookOpen className="h-3 w-3" />, items: ["QuickBooks", "Sage", "Xero"] },
  { category: "eCommerce", icon: <ShoppingCart className="h-3 w-3" />, items: ["Shopify", "HubSpot", "WooCommerce"] },
]

// Flatten and duplicate for seamless loop
const allItems = [
  ...integrationGroups.flatMap(g => g.items.map(item => ({ name: item, category: g.category, icon: g.icon }))),
  ...integrationGroups.flatMap(g => g.items.map(item => ({ name: item, category: g.category, icon: g.icon }))),
]

export function MarqueeBanner() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const pillBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(14, 165, 233, 0.06)"
  const pillBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(14, 165, 233, 0.12)"
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.55)"
  const fadeMask = "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)"

  return (
    <div className="w-full py-5 relative overflow-hidden"
      style={{
        background: isDark ? "rgba(6, 12, 26, 0.5)" : "rgba(14, 165, 233, 0.02)",
        borderTop: `1px solid ${isDark ? "rgba(14,165,233,0.08)" : "rgba(14,165,233,0.08)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(14,165,233,0.08)" : "rgba(14,165,233,0.08)"}`,
      }}>

      {/* Heading */}
      <div className="text-center mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.3)" }}>
          Trusted Integrations
        </span>
      </div>

      {/* Fade edges */}
      <div className="relative" style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}>
        <motion.div
          className="flex gap-3 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
          {allItems.map((item, i) => (
            <span key={i}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full flex-shrink-0"
              style={{
                background: pillBg,
                border: `1px solid ${pillBorder}`,
                color: textColor,
              }}>
              <span style={{ color: "#0EA5E9" }}>{item.icon}</span>
              {item.name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
