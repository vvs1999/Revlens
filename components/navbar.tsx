"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard-demo", label: "Dashboard Demo" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const inactiveColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.6)"
  const inactiveHover = isDark ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.9)"
  const inactiveBgHover = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,165,233,0.06)"
  const activeBg = "rgba(14, 165, 233, 0.1)"
  const mobileMenuBg = isDark ? "hsl(var(--background))" : "#ffffff"
  const mobileBorder = isDark ? "rgba(14,165,233,0.12)" : "rgba(14,165,233,0.15)"

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? "border-b backdrop-blur shadow-sm" : "border-transparent"
    }`}
    style={{
      background: scrolled
        ? isDark ? "rgba(6,12,26,0.95)" : "rgba(255,255,255,0.95)"
        : isDark ? "transparent" : "transparent",
      borderColor: scrolled ? isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.12)" : "transparent",
    }}>
      <div className="container flex h-16 items-center">
        <Link href="/" aria-label="RevLens Home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? "#0EA5E9" : inactiveColor,
                  background: isActive ? activeBg : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = inactiveHover
                    e.currentTarget.style.background = inactiveBgHover
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = inactiveColor
                    e.currentTarget.style.background = "transparent"
                  }
                }}>
                {link.label}
              </Link>
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
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className="px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
                    style={{
                      color: isActive ? "#0EA5E9" : isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.65)",
                      background: isActive ? "rgba(14, 165, 233, 0.1)" : "transparent",
                    }}
                    onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
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