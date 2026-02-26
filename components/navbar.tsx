"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur transition-all duration-300 ${
        scrolled ? "bg-background/95 border-border shadow-sm" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/services"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/services" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Services
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/services" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/case-studies"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/case-studies" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Case Studies
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/case-studies" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/blog" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Blog
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/blog" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/dashboard-demo"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/dashboard-demo" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard Demo
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/dashboard-demo" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About Us
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary relative group ${
              pathname === "/contact" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Contact
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button className="bg-accent text-primary hover:bg-accent/90 transition-all duration-300 hover:shadow-md">
            Book Consultation
          </Button>
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Mobile menu with animations */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden border-t bg-background"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-3 flex flex-col space-y-3">
            <Link
              href="/"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Home
            </Link>
            <Link
              href="/services"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/services" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Services
            </Link>
            <Link
              href="/case-studies"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/case-studies" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Case Studies
            </Link>
            <Link
              href="/blog"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/blog" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Blog
            </Link>
            <Link
              href="/dashboard-demo"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/dashboard-demo" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Dashboard Demo
            </Link>
            <Link
              href="/about"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              About Us
            </Link>
            <Link
              href="/contact"
              className={`py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/contact" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronRight className="h-4 w-4 mr-2 text-accent" />
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}
