"use client"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

export function Logo() {
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "#ffffff" : "#0F172A"
  const src = theme === "dark" ? "/revlens-logo-dark.png" : "/revlens-logo-light.png"

  return (
    <div className="flex items-center gap-2">
      <Image src={src} alt="RevLens" width={36} height={36} className="h-8 w-auto object-contain" priority />
      <span style={{ color: textColor, fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
        RevLens
      </span>
    </div>
  )
}