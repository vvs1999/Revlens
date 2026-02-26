"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define metrics for different business types
const businessMetrics = [
  {
    type: "Restaurant",
    metrics: [
      { label: "Food Waste Reduction", value: 25, unit: "%" },
      { label: "Staff Efficiency", value: 18, unit: "%" },
      { label: "Revenue Increase", value: 22, unit: "%" },
    ],
  },
  {
    type: "Retail",
    metrics: [
      { label: "Inventory Turnover", value: 35, unit: "%" },
      { label: "Customer Retention", value: 28, unit: "%" },
      { label: "Profit Margin", value: 15, unit: "%" },
    ],
  },
  {
    type: "Café",
    metrics: [
      { label: "Average Order Value", value: 32, unit: "%" },
      { label: "Customer Flow", value: 24, unit: "%" },
      { label: "Menu Optimization", value: 40, unit: "%" },
    ],
  },
]

export function BusinessMetricsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeBusiness = businessMetrics[activeIndex]

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#1F4E79]">
              Real Results for Local Businesses
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our clients see measurable improvements across key business metrics
            </p>
          </div>
        </div>

        {/* Business type selector */}
        <div className="flex justify-center gap-4 mb-12">
          {businessMetrics.map((business, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeIndex === index
                  ? "bg-[#1F4E79] text-white font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {business.type}
            </button>
          ))}
        </div>

        {/* Metrics display with bar charts */}
        <div className="grid md:grid-cols-3 gap-6">
          {activeBusiness.metrics.map((metric, index) => (
            <div key={index} className="bg-[#F5F6FA] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-[#1F4E79] mb-4">{metric.label}</h3>

              {/* Circular progress indicator */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="10" />

                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E76F51"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="282.7"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{
                      strokeDashoffset: 282.7 - (282.7 * metric.value) / 100,
                    }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    transform="rotate(-90 50 50)"
                  />

                  {/* Percentage text */}
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    fill="#1F4E79"
                  >
                    {metric.value}
                    {metric.unit}
                  </text>
                </svg>
              </div>

              <p className="text-center text-gray-600">
                Average improvement for our {activeBusiness.type.toLowerCase()} clients
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90 text-white" size="lg">
            See More Success Stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
