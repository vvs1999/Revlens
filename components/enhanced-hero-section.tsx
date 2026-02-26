"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportCarousel } from "@/components/report-carousel"
import { motion, useScroll, useTransform } from "framer-motion"

export function EnhancedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax effect values
  const y1 = useTransform(scrollY, [0, 500], [0, -50])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with enhanced gradient and noise texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F8FAFC] z-0"></div>
      <div className="noise-overlay"></div>

      {/* Data-themed background accents with enhanced animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-px bg-navy/5"
              style={{
                left: `${(i / 6) * 100}%`,
                opacity: i % 2 === 0 ? 0.7 : 0.4,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-px bg-navy/5"
              style={{
                top: `${(i / 6) * 100}%`,
                opacity: i % 2 === 0 ? 0.7 : 0.4,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Animated abstract data lines with enhanced styling */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,70 Q20,60 40,80 T80,60 T100,70"
            stroke="#1E3246"
            fill="none"
            strokeWidth="0.7"
            className="animate-wave-slow"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.path
            d="M0,50 Q30,30 50,50 T100,40"
            stroke="#4A6B8A"
            fill="none"
            strokeWidth="0.7"
            className="animate-wave-medium"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M0,30 Q10,50 30,20 T70,40 T100,20"
            stroke="#F0B429"
            fill="none"
            strokeWidth="0.7"
            className="animate-wave-fast"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10" ref={containerRef}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column: Text content with enhanced animations */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ y: y1 }}
          >
            <div className="space-y-3">
              <motion.span
                className="inline-block text-sm font-semibold text-gold px-3 py-1 rounded-full bg-gold/10 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Data-Driven Growth
              </motion.span>
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-navy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Grow Your Business with <span className="gradient-text">Data-Driven Insights</span>
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-secondary md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Helping local stores and restaurants make smarter decisions to increase revenue and reduce waste.
              </motion.p>
              <motion.p
                className="max-w-[600px] text-navy-light font-medium mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Turning complex data into simple growth strategies.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="btn-primary group"
                style={{ backgroundColor: "#1E3246", color: "white" }}
                onClick={() => (window.location.href = "/contact")}
              >
                Book Your Free Consultation
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-secondary group"
                onClick={() => {
                  const section = document.getElementById("how-it-works")
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" })
                  } else {
                    window.location.href = "/services"
                  }
                }}
              >
                See How It Works
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* New: Client logos section */}
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-4">Trusted by local businesses:</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-navy/40 font-semibold">Riverside Café</div>
                <div className="text-navy/40 font-semibold">Urban Convenience</div>
                <div className="text-navy/40 font-semibold">Sunset Restaurant</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Enhanced Report Visualization */}
          <motion.div
            className="relative h-[400px] md:h-[450px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            style={{ y: y2 }}
          >
            {/* Enhanced background with gradient and glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-secondary/5 rounded-xl"></div>
            <div className="absolute inset-0 glass-effect rounded-xl"></div>

            {/* Enhanced floating data elements */}
            <motion.div
              className="absolute top-[10%] right-[15%] w-16 h-16 bg-navy/10 rounded-full animate-float-slow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.div
              className="absolute bottom-[20%] left-[10%] w-12 h-12 bg-secondary/10 rounded-full animate-float-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-[30%] left-[20%] w-8 h-8 bg-gold/10 rounded-full animate-float-fast"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Main report carousel with enhanced styling */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <ReportCarousel className="w-full max-w-xl mx-auto max-h-[350px] shadow-soft-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
