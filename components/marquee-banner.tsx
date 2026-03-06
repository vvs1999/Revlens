"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

const items = [
  "Square", "Toast", "Lightspeed", "Shopify POS", "QuickBooks", "Sage", "Xero",
  "HubSpot", "Clover", "WooCommerce", "Square", "Toast", "Lightspeed", "Shopify POS",
  "QuickBooks", "Sage", "Xero", "HubSpot", "Clover", "WooCommerce",
]

export function MarqueeBanner() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full overflow-hidden py-3"
      style={{
        background: isDark ? "rgba(14, 165, 233, 0.04)" : "rgba(14, 165, 233, 0.04)",
        borderTop: `1px solid ${isDark ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.12)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.12)"}`,
      }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.4)" }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#0EA5E9" }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}