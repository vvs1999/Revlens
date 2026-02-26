"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Calculator, DollarSign, TrendingUp, BarChart } from "lucide-react"

export function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(10000)
  const [inventoryWaste, setInventoryWaste] = useState<number>(15)
  const [staffEfficiency, setStaffEfficiency] = useState<number>(70)
  const [showResults, setShowResults] = useState<boolean>(false)

  // Calculate ROI
  const calculateROI = () => {
    // Estimated improvements based on our service
    const revenueIncrease = monthlyRevenue * 0.25 // 25% increase in revenue
    const wasteReduction = (inventoryWaste / 100) * monthlyRevenue * 0.6 // 60% reduction in waste
    const efficiencyGain = ((100 - staffEfficiency) / 100) * monthlyRevenue * 0.3 // 30% gain in efficiency from current inefficiency

    const totalMonthlyBenefit = revenueIncrease + wasteReduction + efficiencyGain
    const annualBenefit = totalMonthlyBenefit * 12
    const investmentCost = 5000 // Example fixed cost of our service

    const roi = ((annualBenefit - investmentCost) / investmentCost) * 100

    return {
      monthlyBenefit: totalMonthlyBenefit,
      annualBenefit,
      roi: Math.round(roi),
      paybackPeriod: investmentCost / totalMonthlyBenefit,
    }
  }

  const results = calculateROI()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-primary/10 shadow-lg">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">ROI Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your potential return on investment with our data analytics services
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="monthly-revenue">Monthly Revenue</Label>
                  <span className="text-sm font-medium">{formatCurrency(monthlyRevenue)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    id="monthly-revenue"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={[monthlyRevenue]}
                    onValueChange={(value) => setMonthlyRevenue(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="inventory-waste">Current Inventory Waste (%)</Label>
                  <span className="text-sm font-medium">{inventoryWaste}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    id="inventory-waste"
                    min={0}
                    max={50}
                    step={1}
                    value={[inventoryWaste]}
                    onValueChange={(value) => setInventoryWaste(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="staff-efficiency">Current Staff Efficiency (%)</Label>
                  <span className="text-sm font-medium">{staffEfficiency}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    id="staff-efficiency"
                    min={10}
                    max={95}
                    step={1}
                    value={[staffEfficiency]}
                    onValueChange={(value) => setStaffEfficiency(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button className="w-full mt-4" onClick={() => setShowResults(true)} size="lg">
                Calculate ROI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-primary/5 rounded-lg p-6 space-y-6"
                >
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Your Estimated Results
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="text-sm text-muted-foreground">Monthly Benefit</div>
                      <div className="text-2xl font-bold text-primary">{formatCurrency(results.monthlyBenefit)}</div>
                    </div>

                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="text-sm text-muted-foreground">Annual Benefit</div>
                      <div className="text-2xl font-bold text-primary">{formatCurrency(results.annualBenefit)}</div>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                      <div className="text-sm text-muted-foreground">Return on Investment</div>
                      <div className="text-2xl font-bold text-accent">{results.roi}%</div>
                    </div>

                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="text-sm text-muted-foreground">Payback Period</div>
                      <div className="text-2xl font-bold text-primary">{results.paybackPeriod.toFixed(1)} months</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground italic">
                    Note: These calculations are estimates based on typical results. Your actual results may vary.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 bg-primary/5 border-t border-primary/10">
          <p className="text-sm text-muted-foreground">
            Want a more detailed analysis? Book a free consultation with our data experts.
          </p>
          <Button variant="outline" className="w-full sm:w-auto">
            Book Free Consultation
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
