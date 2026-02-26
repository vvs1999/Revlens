"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store, UtensilsCrossed, ShoppingBag, Scissors, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

type Industry = {
  id: string
  name: string
  icon: React.ReactNode
  challenge: string
  solution: string
  result: string
  metrics: {
    before: number
    after: number
    unit: string
    label: string
  }[]
}

const industries: Industry[] = [
  {
    id: "restaurant",
    name: "Restaurants",
    icon: <UtensilsCrossed className="h-6 w-6" />,
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
    id: "retail",
    name: "Retail Stores",
    icon: <ShoppingBag className="h-6 w-6" />,
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
    id: "cafe",
    name: "Cafés",
    icon: <Coffee className="h-6 w-6" />,
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
    id: "salon",
    name: "Beauty Salons",
    icon: <Scissors className="h-6 w-6" />,
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
    id: "convenience",
    name: "Convenience Stores",
    icon: <Store className="h-6 w-6" />,
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

  const currentIndustry = industries.find((ind) => ind.id === activeIndustry) || industries[0]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#1F4E79]">
              Solutions for Every Local Business
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how our data analytics solutions help different types of local businesses overcome their unique
              challenges.
            </p>
          </div>
        </div>

        {/* Industry tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveIndustry(industry.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                activeIndustry === industry.id
                  ? "bg-[#1F4E79] text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105",
              )}
            >
              {industry.icon}
              <span>{industry.name}</span>
            </button>
          ))}
        </div>

        {/* Industry content */}
        <div className="mt-12 bg-[#F5F6FA] rounded-xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Left column: Challenge and solution */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-2">The Challenge</h3>
                  <p className="text-gray-700">{currentIndustry.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-2">Our Solution</h3>
                  <p className="text-gray-700">{currentIndustry.solution}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-2">The Result</h3>
                  <p className="text-gray-700">{currentIndustry.result}</p>
                </div>
              </div>

              {/* Right column: Metrics with Bar Charts */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#1F4E79] mb-4">Impact Metrics</h3>
                <div className="space-y-6">
                  {currentIndustry.metrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-semibold text-[#1F4E79]">{metric.label}</div>
                        <div className="flex items-center gap-4">
                          <div className="text-gray-500 text-sm">Before</div>
                          <div className="text-gray-500 text-sm">After</div>
                        </div>
                      </div>

                      {/* Bar chart comparison */}
                      <div className="relative h-16 mt-2">
                        {/* "Before" bar */}
                        <div className="absolute top-0 left-0 h-6 bg-[#1F4E79]/90 rounded-md flex items-center justify-end pr-2">
                          <span className="text-white font-medium">
                            {metric.before}
                            {metric.unit}
                          </span>
                        </div>

                        {/* "After" bar with animation */}
                        <motion.div
                          className="absolute top-8 left-0 h-6 bg-[#E76F51] rounded-md flex items-center justify-end pr-2"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(metric.after / Math.max(metric.before, metric.after)) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        >
                          <span className="text-white font-medium">
                            {metric.after}
                            {metric.unit}
                          </span>
                        </motion.div>

                        {/* "Before" bar with animation */}
                        <motion.div
                          className="absolute top-0 left-0 h-6 bg-[#1F4E79]/90 rounded-md flex items-center justify-end pr-2"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(metric.before / Math.max(metric.before, metric.after)) * 100}%`,
                          }}
                          transition={{ duration: 1 }}
                        >
                          <span className="text-white font-medium">
                            {metric.before}
                            {metric.unit}
                          </span>
                        </motion.div>
                      </div>

                      {/* Percentage improvement */}
                      <div className="mt-4 text-right">
                        <span className="text-[#E76F51] font-semibold">
                          {metric.label === "Menu Items" || metric.label === "Stockout Rate"
                            ? `-${Math.round(((metric.before - metric.after) / metric.before) * 100)}%`
                            : `+${Math.round(((metric.after - metric.before) / metric.before) * 100)}%`}
                          {metric.label === "Menu Items" || metric.label === "Stockout Rate"
                            ? " Reduction"
                            : " Improvement"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
