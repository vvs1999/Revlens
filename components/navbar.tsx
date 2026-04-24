"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, LayoutGrid, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

interface NavLink {
  href: string
  label: string
  subLinks?: { href: string; label: string; desc: string; icon: React.ReactNode }[]
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    subLinks: [
      { href: "/services",       label: "What We Offer",       desc: "Our two products explained",    icon: <LayoutGrid  className="h-4 w-4" /> },
      { href: "/dashboard-demo", label: "See It in Action",    desc: "Interactive platform demo",     icon: <PlayCircle  className="h-4 w-4" /> },
    ],
  },
  { href: "/pricing",       label: "Pricing"      },
  { href: "/case-studies",  label: "Case Studies" },
  { href: "/blog",          label: "Blog"         },
  { href: "/about",         label: "About Us"     },
  { href: "/contact",       label: "Contact"      },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled]         = useState(false)
  const dropdownRef                     = useRef<HTMLDivElement>(null)
  const pathname                        = usePathname()
  const { theme }                       = useTheme()
  const isDark                          = theme === "dark"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Close dropdown on route change
  useEffect(() => { setOpenDropdown(null); setIsMenuOpen(false) }, [pathname])

  const inactiveColor   = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.6)"
  const inactiveHover   = isDark ? "rgba(255,255,255,0.9)"  : "rgba(15,23,42,0.9)"
  const inactiveBgHover = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,165,233,0.06)"
  const activeBg        = "rgba(14, 165, 233, 0.1)"
  const mobileMenuBg    = isDark ? "hsl(var(--background))" : "#ffffff"
  const mobileBorder    = isDark ? "rgba(14,165,233,0.12)"  : "rgba(14,165,233,0.15)"
  const dropdownBg      = isDark ? "rgba(6,12,26,0.98)"     : "#ffffff"
  const dropdownBorder  = isDark ? "rgba(14,165,233,0.15)"  : "rgba(14,165,233,0.15)"

  const isServicesActive = pathname === "/services" || pathname === "/dashboard-demo"

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? "border-b backdrop-blur shadow-sm" : "border-transparent"
    }`}
    style={{
      background: scrolled
        ? isDark ? "rgba(6,12,26,0.95)" : "rgba(255,255,255,0.95)"
        : "transparent",
      borderColor: scrolled ? isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.12)" : "transparent",
    }}>
      <div className="container flex h-16 items-center" ref={dropdownRef}>
        <Link href="/" aria-label="RevLens Home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-8">
          {navLinks.map((link) => {
            const isActive = link.subLinks ? isServicesActive : pathname === link.href
            const isOpen   = openDropdown === link.label

            if (!link.subLinks) {
              return (
                <Link key={link.href} href={link.href}
                  className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                  style={{ color: isActive ? "#0EA5E9" : inactiveColor, background: isActive ? activeBg : "transparent" }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = inactiveHover; e.currentTarget.style.background = inactiveBgHover } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = inactiveColor; e.currentTarget.style.background = "transparent" } }}>
                  {link.label}
                </Link>
              )
            }

            // Dropdown item
            return (
              <div key={link.href} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                  style={{ color: isActive || isOpen ? "#0EA5E9" : inactiveColor, background: isActive || isOpen ? activeBg : "transparent" }}>
                  {link.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden z-50"
                      style={{ background: dropdownBg, border: `1px solid ${dropdownBorder}`, boxShadow: "0 16px 40px rgba(0,0,0,0.15)" }}>
                      {link.subLinks!.map((sub, i) => {
                        const isSubActive = pathname === sub.href
                        return (
                          <Link key={sub.href} href={sub.href}
                            className="flex items-start gap-3 px-4 py-3.5 transition-colors"
                            style={{
                              background: isSubActive ? "rgba(14,165,233,0.08)" : "transparent",
                              borderBottom: i < link.subLinks!.length - 1 ? `1px solid ${dropdownBorder}` : "none",
                            }}
                            onMouseEnter={(e) => { if (!isSubActive) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(14,165,233,0.04)" }}
                            onMouseLeave={(e) => { if (!isSubActive) e.currentTarget.style.background = "transparent" }}>
                            <span className="mt-0.5 shrink-0" style={{ color: "#0EA5E9" }}>{sub.icon}</span>
                            <div>
                              <div className="text-sm font-semibold" style={{ color: isSubActive ? "#0EA5E9" : isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.85)" }}>
                                {sub.label}
                              </div>
                              <div className="text-xs mt-0.5" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.45)" }}>
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <Button className="hidden md:flex btn-primary"
            onClick={() => (window.location.href = "/contact")}>
            Book a Demo
          </Button>
          <button className="md:hidden p-2 rounded-md"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.7)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="md:hidden border-t"
            style={{ background: mobileMenuBg, borderColor: mobileBorder }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.subLinks ? isServicesActive : pathname === link.href

                if (!link.subLinks) {
                  return (
                    <Link key={link.href} href={link.href}
                      className="px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                      style={{ color: isActive ? "#0EA5E9" : isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.65)", background: isActive ? "rgba(14,165,233,0.1)" : "transparent" }}
                      onClick={() => setIsMenuOpen(false)}>
                      {link.label}
                    </Link>
                  )
                }

                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                      style={{ color: isActive ? "#0EA5E9" : isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.65)", background: isActive ? "rgba(14,165,233,0.1)" : "transparent" }}>
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden">
                          {link.subLinks!.map((sub) => {
                            const isSubActive = pathname === sub.href
                            return (
                              <Link key={sub.href} href={sub.href}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                                style={{ color: isSubActive ? "#0EA5E9" : isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.6)", background: isSubActive ? "rgba(14,165,233,0.08)" : "transparent" }}
                                onClick={() => setIsMenuOpen(false)}>
                                <span style={{ color: "#0EA5E9" }}>{sub.icon}</span>
                                {sub.label}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
              <div className="pt-3 mt-2 border-t" style={{ borderColor: mobileBorder }}>
                <Button className="w-full btn-primary"
                  onClick={() => { setIsMenuOpen(false); window.location.href = "/contact" }}>
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
