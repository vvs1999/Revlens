"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PremiumGraphCarousel } from "./premium-graph-carousel"

export function PremiumBanner() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F6FA] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>

        {/* Grid pattern */}
        <div className="grid grid-cols-6 h-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-r border-gray-500 h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-6 w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-500 w-full"></div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue gradient blob */}
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#1F4E79]/10 to-transparent blur-3xl"></div>

        {/* Accent gradient blob */}
        <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-[#E76F51]/10 to-transparent blur-3xl"></div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-[15%] w-16 h-16 rounded-full bg-[#E76F51]/10"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-[10%] w-12 h-12 rounded-full bg-[#1F4E79]/10"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Data points decoration */}
        <div className="absolute top-1/2 left-[5%] w-1 h-1 rounded-full bg-[#1F4E79]"></div>
        <div className="absolute top-[40%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#1F4E79]"></div>
        <div className="absolute top-[60%] left-[12%] w-1 h-1 rounded-full bg-[#1F4E79]"></div>
        <div className="absolute top-[30%] right-[8%] w-1 h-1 rounded-full bg-[#E76F51]"></div>
        <div className="absolute top-[70%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#E76F51]"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left column: Text content */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#1F4E79]">
                Grow Your Business with Data-Driven Insights
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Helping local stores and restaurants make smarter decisions to increase revenue and reduce waste.
              </p>
              <p className="max-w-[600px] text-[#6A8AA6] font-medium">
                Turning complex data into simple growth strategies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:shadow-md"
                style={{ backgroundColor: "#1F4E79", color: "white" }}
              >
                Book Your Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="inline-flex items-center gap-2 border-[#F4B400] text-[#1F4E79] hover:bg-[#F4B400] hover:text-[#1F1F1F] transition-all duration-300"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Right column: Premium Graph Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[450px] w-full max-w-[600px] mx-auto"
          >
            <PremiumGraphCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
