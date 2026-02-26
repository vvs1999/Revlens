"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Download,
  BarChart,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Clock,
  ShoppingBag,
  Scissors,
  Coffee,
  Store,
  Utensils,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  StandardBarChart,
  StandardHorizontalBarChart,
  HeatMapChart,
  LocationMapChart,
  BubbleChart,
  RadarChart,
  CalendarHeatmap,
  FunnelChart,
} from "@/components/standardized-charts"

export default function DashboardDemoPage() {
  const [timeframe, setTimeframe] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")
  const [category, setCategory] = useState("cafe")
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample metrics data for different business types
  const metricsData = {
    cafe: {
      revenue: { value: "$24,500", change: "+15%", trend: "up" },
      customers: { value: "1,250", change: "+8%", trend: "up" },
      orders: { value: "3,450", change: "+12%", trend: "up" },
      avgOrder: { value: "$32.50", change: "+5%", trend: "up" },
    },
    retail: {
      revenue: { value: "$78,900", change: "+10%", trend: "up" },
      customers: { value: "2,780", change: "+12%", trend: "up" },
      orders: { value: "4,120", change: "+8%", trend: "up" },
      avgOrder: { value: "$45.75", change: "+3%", trend: "up" },
    },
    restaurant: {
      revenue: { value: "$52,300", change: "+18%", trend: "up" },
      customers: { value: "1,850", change: "+15%", trend: "up" },
      orders: { value: "3,920", change: "+20%", trend: "up" },
      avgOrder: { value: "$38.25", change: "+7%", trend: "up" },
    },
    salon: {
      revenue: { value: "$31,200", change: "+12%", trend: "up" },
      customers: { value: "420", change: "+9%", trend: "up" },
      orders: { value: "840", change: "+14%", trend: "up" },
      avgOrder: { value: "$75.50", change: "+6%", trend: "up" },
    },
  }

  // Get current metrics based on selected category
  const metrics = metricsData[category]

  // Category-specific recommendations
  const recommendations = {
    cafe: [
      {
        icon: <TrendingUp className="h-5 w-5 text-navy" />,
        title: "Optimize Menu Pricing",
        description:
          "Consider increasing prices for your specialty drinks by 5-8% based on competitive analysis and demand patterns.",
        impact: "+12% Revenue",
      },
      {
        icon: <Users className="h-5 w-5 text-navy" />,
        title: "Target Loyalty Program",
        description:
          "Launch a targeted loyalty program for your morning customers who visit 2-3 times per week to increase visit frequency.",
        impact: "+20% Frequency",
      },
      {
        icon: <BarChart className="h-5 w-5 text-navy" />,
        title: "Reduce Inventory Waste",
        description:
          "Adjust your pastry ordering schedule based on day-of-week demand patterns to reduce waste by up to 30%.",
        impact: "-15% Costs",
      },
    ],
    retail: [
      {
        icon: <TrendingUp className="h-5 w-5 text-gold-dark" />,
        title: "Optimize Store Layout",
        description: "Rearrange your high-margin products to be more visible based on customer flow analysis.",
        impact: "+18% Sales",
      },
      {
        icon: <Users className="h-5 w-5 text-gold-dark" />,
        title: "Personalized Promotions",
        description: "Implement targeted promotions based on purchase history to increase repeat purchases.",
        impact: "+25% Repeat Sales",
      },
      {
        icon: <BarChart className="h-5 w-5 text-gold-dark" />,
        title: "Inventory Optimization",
        description: "Adjust reorder points for seasonal items based on historical sales data to reduce overstock.",
        impact: "-20% Holding Costs",
      },
    ],
    restaurant: [
      {
        icon: <TrendingUp className="h-5 w-5 text-coral" />,
        title: "Menu Engineering",
        description:
          "Redesign your menu to highlight high-margin items based on popularity and profitability analysis.",
        impact: "+15% Profit Margin",
      },
      {
        icon: <Users className="h-5 w-5 text-coral" />,
        title: "Reservation Optimization",
        description: "Adjust your table turnover strategy during peak hours based on dining duration analysis.",
        impact: "+22% Capacity",
      },
      {
        icon: <BarChart className="h-5 w-5 text-coral" />,
        title: "Staff Scheduling",
        description:
          "Optimize staff schedules based on hourly customer traffic patterns to improve service and reduce costs.",
        impact: "-10% Labor Costs",
      },
    ],
    salon: [
      {
        icon: <TrendingUp className="h-5 w-5 text-navy" />,
        title: "Service Bundling",
        description:
          "Create service packages based on common customer combinations to increase average transaction value.",
        impact: "+20% Avg. Transaction",
      },
      {
        icon: <Users className="h-5 w-5 text-navy" />,
        title: "Appointment Optimization",
        description: "Adjust appointment durations based on service type and stylist to reduce gaps in the schedule.",
        impact: "+15% Bookings",
      },
      {
        icon: <BarChart className="h-5 w-5 text-navy" />,
        title: "Product Recommendations",
        description: "Train staff to recommend retail products based on services performed to increase retail sales.",
        impact: "+30% Retail Revenue",
      },
    ],
  }

  // Category-specific chart configurations
  const categoryCharts = {
    cafe: {
      overview: [
        {
          title: "Peak Hours Analysis",
          description: "Customer traffic by hour of day",
          chart: <HeatMapChart category="cafe" />,
        },
        {
          title: "Product Category Performance",
          description: "Sales by product category",
          chart: <StandardBarChart category="cafe" />,
        },
        {
          title: "Revenue Trends",
          description: "Monthly revenue over time",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <LineChart className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
        {
          title: "Customer Segments",
          description: "Distribution by customer type",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <PieChart className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      sales: [
        {
          title: "Location Performance",
          description: "Sales by location",
          chart: <LocationMapChart category="cafe" />,
        },
        {
          title: "Customer Journey",
          description: "From awareness to purchase",
          chart: <FunnelChart category="cafe" />,
        },
        {
          title: "Sales by Time of Day",
          description: "Hourly sales distribution",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <Activity className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      customers: [
        {
          title: "Customer Segments",
          description: "Analysis by visit frequency and spend",
          chart: <BubbleChart category="cafe" />,
        },
        {
          title: "Loyalty Program Performance",
          description: "Engagement metrics over time",
          chart: <CalendarHeatmap category="cafe" />,
        },
        {
          title: "Customer Satisfaction",
          description: "Rating distribution by service area",
          chart: <RadarChart category="cafe" />,
        },
      ],
    },
    retail: {
      overview: [
        {
          title: "Store Performance Map",
          description: "Sales by location",
          chart: <LocationMapChart category="retail" />,
        },
        {
          title: "Department Performance",
          description: "Sales by department",
          chart: <StandardBarChart category="retail" />,
        },
        {
          title: "Revenue Trends",
          description: "Monthly revenue over time",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <LineChart className="h-40 w-40 text-gold-dark opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
        {
          title: "Customer Segments",
          description: "Distribution by customer type",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <PieChart className="h-40 w-40 text-gold-dark opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      sales: [
        {
          title: "Seasonal Sales Patterns",
          description: "Monthly sales performance",
          chart: <CalendarHeatmap category="retail" />,
        },
        {
          title: "Product Performance Analysis",
          description: "By margin and volume",
          chart: <BubbleChart category="retail" />,
        },
        {
          title: "Sales by Time of Day",
          description: "Hourly sales distribution",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <Activity className="h-40 w-40 text-gold-dark opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      customers: [
        {
          title: "Customer Acquisition Funnel",
          description: "From prospect to loyal customer",
          chart: <FunnelChart category="retail" />,
        },
        {
          title: "Customer Segment Performance",
          description: "By lifetime value and frequency",
          chart: <RadarChart category="retail" />,
        },
        {
          title: "Customer Satisfaction",
          description: "Rating distribution by service area",
          chart: <StandardHorizontalBarChart category="retail" />,
        },
      ],
    },
    restaurant: {
      overview: [
        {
          title: "Table Turnover Analysis",
          description: "Efficiency by day and time",
          chart: <HeatMapChart category="restaurant" />,
        },
        {
          title: "Menu Item Performance",
          description: "By popularity and profit margin",
          chart: <BubbleChart category="restaurant" />,
        },
        {
          title: "Revenue Trends",
          description: "Monthly revenue over time",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <LineChart className="h-40 w-40 text-coral opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
        {
          title: "Customer Segments",
          description: "Distribution by customer type",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <PieChart className="h-40 w-40 text-coral opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      sales: [
        {
          title: "Location Comparison",
          description: "Performance across locations",
          chart: <LocationMapChart category="restaurant" />,
        },
        {
          title: "Sales by Service Type",
          description: "Dine-in vs takeout vs delivery",
          chart: <StandardBarChart category="restaurant" />,
        },
        {
          title: "Sales by Time of Day",
          description: "Hourly sales distribution",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <Activity className="h-40 w-40 text-coral opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      customers: [
        {
          title: "Reservation Patterns",
          description: "By day and party size",
          chart: <CalendarHeatmap category="restaurant" />,
        },
        {
          title: "Customer Satisfaction Metrics",
          description: "Across key performance areas",
          chart: <RadarChart category="restaurant" />,
        },
        {
          title: "Customer Loyalty",
          description: "Return visit frequency",
          chart: <StandardHorizontalBarChart category="restaurant" />,
        },
      ],
    },
    salon: {
      overview: [
        {
          title: "Service Popularity",
          description: "By appointment volume and revenue",
          chart: <BubbleChart category="salon" />,
        },
        {
          title: "Stylist Performance",
          description: "By revenue and customer satisfaction",
          chart: <StandardHorizontalBarChart category="salon" />,
        },
        {
          title: "Revenue Trends",
          description: "Monthly revenue over time",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <LineChart className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
        {
          title: "Customer Segments",
          description: "Distribution by customer type",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <PieChart className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      sales: [
        {
          title: "Appointment Density",
          description: "By day and time slot",
          chart: <HeatMapChart category="salon" />,
        },
        {
          title: "Location Performance",
          description: "Revenue by location",
          chart: <LocationMapChart category="salon" />,
        },
        {
          title: "Sales by Time of Day",
          description: "Hourly sales distribution",
          chart: (
            <div className="w-full h-full flex items-center justify-center">
              <Activity className="h-40 w-40 text-navy opacity-20" strokeWidth={1.5} />
            </div>
          ),
        },
      ],
      customers: [
        {
          title: "Customer Retention",
          description: "Return visit patterns",
          chart: <CalendarHeatmap category="salon" />,
        },
        {
          title: "Service to Retail Conversion",
          description: "From appointment to product purchase",
          chart: <FunnelChart category="salon" />,
        },
        {
          title: "Customer Satisfaction",
          description: "Rating distribution by service area",
          chart: <RadarChart category="salon" />,
        },
      ],
    },
  }

  // Get current recommendations based on selected category
  const currentRecommendations = recommendations[category]
  const currentCharts = categoryCharts[category]

  // Category icons and titles
  const categoryInfo = {
    cafe: {
      icon: <Coffee className="h-4 w-4" />,
      title: "Café",
      color: "bg-navy-lighter text-navy-dark",
      activeColor: "bg-navy text-white",
      hoverColor: "hover:bg-navy-lighter/50",
    },
    retail: {
      icon: <Store className="h-4 w-4" />,
      title: "Retail Store",
      color: "bg-gold-light text-gold-dark",
      activeColor: "bg-gold text-navy",
      hoverColor: "hover:bg-gold-light/50",
    },
    restaurant: {
      icon: <Utensils className="h-4 w-4" />,
      title: "Restaurant",
      color: "bg-coral-light text-coral-dark",
      activeColor: "bg-coral text-white",
      hoverColor: "hover:bg-coral-light/50",
    },
    salon: {
      icon: <Scissors className="h-4 w-4" />,
      title: "Beauty Salon",
      color: "bg-navy-lighter text-navy-dark",
      activeColor: "bg-navy text-white",
      hoverColor: "hover:bg-navy-lighter/50",
    },
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Interactive Dashboard Demo
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Experience the power of our data analytics platform with this interactive demo
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="bg-navy text-white hover:bg-navy-dark">
                Book a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Our Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Demo Section */}
      <section className="w-full py-8 md:py-12 bg-gradient-to-br from-background via-background to-navy-lighter/10">
        <div className="container px-4 md:px-6">
          {/* Business Type Tabs - Redesigned for a more modern look */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-navy">Select Business Type</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(categoryInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    category === key
                      ? `${info.activeColor} shadow-md`
                      : `bg-white border border-gray-200 ${info.hoverColor}`
                  }`}
                >
                  <span
                    className={`rounded-full p-1 ${
                      category === key ? "bg-white/20" : info.color
                    } flex items-center justify-center`}
                  >
                    {info.icon}
                  </span>
                  <span className="font-medium">{info.title}</span>
                  {category === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Card className="border-2 border-primary/10 shadow-xl bg-gradient-to-br from-white to-navy-lighter/5 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${categoryInfo[category].color} flex items-center justify-center`}
                  >
                    {categoryInfo[category].icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{categoryInfo[category].title} Analytics Dashboard</CardTitle>
                    <CardDescription>
                      Sample data for a {category === "cafe" ? "café" : category} business
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white/60 backdrop-blur-sm">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={`revenue-${category}`}
                >
                  <Card className="border border-border bg-white shadow-soft-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <h3 className="text-2xl font-bold">{metrics.revenue.value}</h3>
                          <p
                            className={`text-xs flex items-center ${
                              metrics.revenue.trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {metrics.revenue.change}
                            <TrendingUp
                              className={`h-3 w-3 ml-1 ${metrics.revenue.trend === "up" ? "" : "transform rotate-180"}`}
                            />
                          </p>
                        </div>
                        <div className="bg-navy-lighter p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-navy" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  key={`customers-${category}`}
                >
                  <Card className="border border-border bg-white shadow-soft-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Customers</p>
                          <h3 className="text-2xl font-bold">{metrics.customers.value}</h3>
                          <p
                            className={`text-xs flex items-center ${
                              metrics.customers.trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {metrics.customers.change}
                            <TrendingUp
                              className={`h-3 w-3 ml-1 ${
                                metrics.customers.trend === "up" ? "" : "transform rotate-180"
                              }`}
                            />
                          </p>
                        </div>
                        <div className="bg-navy-lighter p-2 rounded-full">
                          <Users className="h-5 w-5 text-navy" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  key={`orders-${category}`}
                >
                  <Card className="border border-border bg-white shadow-soft-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {category === "salon" ? "Appointments" : "Orders"}
                          </p>
                          <h3 className="text-2xl font-bold">{metrics.orders.value}</h3>
                          <p
                            className={`text-xs flex items-center ${
                              metrics.orders.trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {metrics.orders.change}
                            <TrendingUp
                              className={`h-3 w-3 ml-1 ${metrics.orders.trend === "up" ? "" : "transform rotate-180"}`}
                            />
                          </p>
                        </div>
                        <div className="bg-navy-lighter p-2 rounded-full">
                          {category === "salon" ? (
                            <Calendar className="h-5 w-5 text-navy" />
                          ) : (
                            <ShoppingBag className="h-5 w-5 text-navy" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  key={`avg-${category}`}
                >
                  <Card className="border border-border bg-white shadow-soft-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {category === "salon" ? "Avg. Service" : "Avg. Order"}
                          </p>
                          <h3 className="text-2xl font-bold">{metrics.avgOrder.value}</h3>
                          <p
                            className={`text-xs flex items-center ${
                              metrics.avgOrder.trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {metrics.avgOrder.change}
                            <TrendingUp
                              className={`h-3 w-3 ml-1 ${
                                metrics.avgOrder.trend === "up" ? "" : "transform rotate-180"
                              }`}
                            />
                          </p>
                        </div>
                        <div className="bg-navy-lighter p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-navy" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Charts Section - Improved tabs */}
              <div className="mb-6">
                <div className="flex border-b">
                  {["overview", "sales", "customers"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-6 py-3 font-medium transition-colors ${
                        activeTab === tab ? "text-navy" : "text-gray-500 hover:text-navy hover:bg-gray-50"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart content */}
              {mounted && (
                <motion.div
                  key={`${category}-${activeTab}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {currentCharts[activeTab].map((chart, index) => (
                      <Card
                        key={`${category}-${activeTab}-${index}`}
                        className="border border-border bg-white shadow-soft-md"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{chart.title}</CardTitle>
                          <CardDescription>{chart.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="w-full h-[250px] flex items-center justify-center">
                            <div className="w-full h-full p-4">{chart.chart}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recommendations Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">AI-Powered Recommendations</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentRecommendations.map((rec, index) => (
                    <Card key={`${category}-rec-${index}`} className="border border-border bg-white shadow-soft-md">
                      <CardContent className="p-4">
                        <div className="flex flex-col h-full">
                          <div className="bg-navy-lighter p-2 rounded-full w-fit mb-3">{rec.icon}</div>
                          <h4 className="text-lg font-medium mb-2">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground flex-grow">{rec.description}</p>
                          <div className="mt-4 pt-4 border-t text-sm">
                            <div className="flex justify-between">
                              <span>Potential Impact:</span>
                              <span className="font-medium text-green-600">{rec.impact}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-white/80 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <p className="text-sm text-muted-foreground">
                This is a demo dashboard. In the full version, all charts are interactive and customizable.
              </p>
              <Button className="bg-navy hover:bg-navy-dark">
                Book a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-navy-lighter/10 via-background to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy">Dashboard Features</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our interactive dashboards provide powerful insights tailored to your business
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-navy/10 bg-white shadow-soft-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-navy-lighter p-3 rounded-full">
                    <MapPin className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold">Location Analytics</h3>
                  <p className="text-muted-foreground">
                    Compare performance across multiple locations with interactive maps and location-specific insights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold/10 bg-white shadow-soft-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-gold-light p-3 rounded-full">
                    <Clock className="h-8 w-8 text-gold-dark" />
                  </div>
                  <h3 className="text-xl font-bold">Time Pattern Analysis</h3>
                  <p className="text-muted-foreground">
                    Identify peak hours, seasonal trends, and optimal staffing times with advanced temporal analytics.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-coral/10 bg-white shadow-soft-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-coral-light p-3 rounded-full">
                    <Star className="h-8 w-8 text-coral-dark" />
                  </div>
                  <h3 className="text-xl font-bold">Predictive Insights</h3>
                  <p className="text-muted-foreground">
                    AI-powered recommendations and forecasts to help you make data-driven decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-navy text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Transform Your Business with Data?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl mb-6">
                Book a personalized demo to see how our dashboard can be customized for your specific business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gold text-navy hover:bg-gold-light">
                  Book a Personalized Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">What You'll Get in Your Demo</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-gold/20 text-gold rounded-full p-1 flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Personalized walkthrough of features relevant to your business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gold/20 text-gold rounded-full p-1 flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Sample reports using data from businesses similar to yours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gold/20 text-gold rounded-full p-1 flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Q&A session with a data expert to address your specific challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gold/20 text-gold rounded-full p-1 flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Custom pricing proposal based on your business size and needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
