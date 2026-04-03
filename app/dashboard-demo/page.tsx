"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, Download, TrendingUp, TrendingDown, Users, DollarSign, Calendar, ShoppingBag, Scissors, Coffee, Store, Utensils, MapPin, Clock, Star, CheckCircle, Zap, BarChart2, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StandardBarChart, StandardHorizontalBarChart, HeatMapChart, LocationMapChart, BubbleChart, RadarChart, CalendarHeatmap, FunnelChart, RevenueTrendChart, CustomerSegmentChart, HourlyBarChart } from "@/components/standardized-charts"

// ─── TYPES ────────────────────────────────────────────────────────
type Category = "cafe" | "retail" | "restaurant" | "salon"
type ChartTab = "overview" | "sales" | "customers"

interface KPI { label: string; current: string; prev: string; delta: string; up: boolean }
interface Win { metric: string; value: string; detail: string; icon: string }
interface Alert { label: string; severity: string; detail: string; action: string }

// ─── CHART COLOR ACCENTS (per chart type for the accent bar) ─────
const ACCENT = {
  primary: "#0EA5E9",
  violet: "#8B5CF6",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
}

// ─── DATA ─────────────────────────────────────────────────────────
const metricsData: Record<Category, { revenue: { value: string; change: string }; customers: { value: string; change: string }; orders: { value: string; change: string }; avgOrder: { value: string; change: string } }> = {
  cafe:       { revenue: { value: "$24,500", change: "+15%" }, customers: { value: "1,250", change: "+8%" }, orders: { value: "3,450", change: "+12%" }, avgOrder: { value: "$32.50", change: "+5%" } },
  retail:     { revenue: { value: "$78,900", change: "+10%" }, customers: { value: "2,780", change: "+12%" }, orders: { value: "4,120", change: "+8%" }, avgOrder: { value: "$45.75", change: "+3%" } },
  restaurant: { revenue: { value: "$52,300", change: "+18%" }, customers: { value: "1,850", change: "+15%" }, orders: { value: "3,920", change: "+20%" }, avgOrder: { value: "$38.25", change: "+7%" } },
  salon:      { revenue: { value: "$31,200", change: "+12%" }, customers: { value: "420", change: "+9%" }, orders: { value: "840", change: "+14%" }, avgOrder: { value: "$75.50", change: "+6%" } },
}

// sparkline data for KPI cards (7-point mini trends)
const sparklines: Record<Category, number[][]> = {
  cafe:       [[18,20,19,22,21,23,24.5], [1.1,1.12,1.15,1.18,1.2,1.22,1.25], [2.8,3.0,3.1,3.2,3.3,3.4,3.45], [28,29,30,30.5,31,31.8,32.5]],
  retail:     [[65,68,70,72,74,76,78.9], [2.2,2.3,2.4,2.5,2.6,2.7,2.78], [3.5,3.6,3.7,3.8,3.9,4.0,4.12], [42,43,43.5,44,44.5,45,45.75]],
  restaurant: [[38,40,42,44,46,49,52.3], [1.5,1.55,1.6,1.65,1.7,1.8,1.85], [3.0,3.2,3.3,3.4,3.6,3.8,3.92], [34,35,35.5,36,37,37.5,38.25]],
  salon:      [[24,25,26,27,28,29.5,31.2], [0.36,0.37,0.38,0.39,0.4,0.41,0.42], [0.7,0.72,0.74,0.76,0.78,0.82,0.84], [68,69,70,71,72,74,75.5]],
}

// Each chart entry now carries an accent color key and a "featured" flag for bento sizing
interface ChartEntry { title: string; description: string; chart: React.ReactNode; accent: string; featured?: boolean }

const categoryCharts: Record<Category, Record<ChartTab, ChartEntry[]>> = {
  cafe: {
    overview: [
      { title: "Peak Hours Analysis",          description: "Customer traffic by hour of day", chart: <HeatMapChart category="cafe" />,            accent: ACCENT.rose,    featured: true },
      { title: "Product Category Performance", description: "Sales by product category",       chart: <StandardBarChart category="cafe" />,         accent: ACCENT.violet },
      { title: "Revenue Trends",               description: "Monthly revenue over time",       chart: <RevenueTrendChart category="cafe" />,        accent: ACCENT.primary, featured: true },
      { title: "Customer Segments",            description: "Distribution by customer type",   chart: <CustomerSegmentChart category="cafe" />,     accent: ACCENT.emerald },
    ],
    sales: [
      { title: "Location Performance", description: "Revenue by location",        chart: <LocationMapChart category="cafe" />,  accent: ACCENT.primary, featured: true },
      { title: "Customer Journey",     description: "From awareness to purchase", chart: <FunnelChart category="cafe" />,       accent: ACCENT.violet },
      { title: "Sales by Time of Day", description: "Hourly sales distribution",  chart: <HourlyBarChart category="cafe" />,    accent: ACCENT.amber },
    ],
    customers: [
      { title: "Customer Segments",   description: "By visit frequency and spend", chart: <BubbleChart category="cafe" />,       accent: ACCENT.primary, featured: true },
      { title: "Loyalty & Retention", description: "Engagement over 6 months",     chart: <CalendarHeatmap category="cafe" />,   accent: ACCENT.emerald },
      { title: "Satisfaction Scores", description: "vs industry benchmark",         chart: <RadarChart category="cafe" />,        accent: ACCENT.violet },
    ],
  },
  retail: {
    overview: [
      { title: "Store Performance Map",  description: "Revenue by location",           chart: <LocationMapChart category="retail" />,     accent: ACCENT.primary, featured: true },
      { title: "Department Performance", description: "Sales by department",            chart: <StandardBarChart category="retail" />,     accent: ACCENT.violet },
      { title: "Revenue Trends",         description: "Monthly revenue over time",     chart: <RevenueTrendChart category="retail" />,    accent: ACCENT.emerald, featured: true },
      { title: "Customer Segments",      description: "Distribution by customer type", chart: <CustomerSegmentChart category="retail" />, accent: ACCENT.amber },
    ],
    sales: [
      { title: "Seasonal Sales Patterns", description: "Monthly activity heatmap", chart: <CalendarHeatmap category="retail" />, accent: ACCENT.rose,    featured: true },
      { title: "Product Performance",     description: "By margin and volume",     chart: <BubbleChart category="retail" />,     accent: ACCENT.primary },
      { title: "Sales by Time of Day",    description: "Hourly distribution",      chart: <HourlyBarChart category="retail" />,  accent: ACCENT.amber },
    ],
    customers: [
      { title: "Customer Acquisition", description: "From prospect to loyal",  chart: <FunnelChart category="retail" />,                accent: ACCENT.violet,  featured: true },
      { title: "Satisfaction Metrics",  description: "vs industry benchmark",   chart: <RadarChart category="retail" />,                 accent: ACCENT.primary },
      { title: "Department Revenue",    description: "By category",             chart: <StandardHorizontalBarChart category="retail" />, accent: ACCENT.emerald },
    ],
  },
  restaurant: {
    overview: [
      { title: "Table Turnover Analysis", description: "Efficiency by day and time",      chart: <HeatMapChart category="restaurant" />,        accent: ACCENT.rose,    featured: true },
      { title: "Menu Item Performance",   description: "By popularity and margin",        chart: <BubbleChart category="restaurant" />,         accent: ACCENT.primary },
      { title: "Revenue Trends",          description: "Monthly revenue over time",       chart: <RevenueTrendChart category="restaurant" />,   accent: ACCENT.emerald, featured: true },
      { title: "Customer Segments",       description: "Distribution by customer type",   chart: <CustomerSegmentChart category="restaurant" />,accent: ACCENT.amber },
    ],
    sales: [
      { title: "Location Comparison",  description: "Performance across locations",   chart: <LocationMapChart category="restaurant" />,    accent: ACCENT.primary, featured: true },
      { title: "Sales by Channel",     description: "Dine-in vs takeout vs delivery", chart: <StandardBarChart category="restaurant" />,    accent: ACCENT.violet },
      { title: "Sales by Time of Day", description: "Hourly distribution",            chart: <HourlyBarChart category="restaurant" />,     accent: ACCENT.amber },
    ],
    customers: [
      { title: "Reservation Patterns", description: "By day and party size",    chart: <CalendarHeatmap category="restaurant" />,             accent: ACCENT.emerald, featured: true },
      { title: "Satisfaction Metrics",  description: "vs industry benchmark",    chart: <RadarChart category="restaurant" />,                  accent: ACCENT.primary },
      { title: "Customer Loyalty",      description: "Return visit frequency",   chart: <StandardHorizontalBarChart category="restaurant" />, accent: ACCENT.violet },
    ],
  },
  salon: {
    overview: [
      { title: "Service Popularity",  description: "By volume and revenue",          chart: <BubbleChart category="salon" />,                accent: ACCENT.primary, featured: true },
      { title: "Stylist Performance", description: "By revenue and satisfaction",    chart: <StandardHorizontalBarChart category="salon" />, accent: ACCENT.violet },
      { title: "Revenue Trends",      description: "Monthly revenue over time",      chart: <RevenueTrendChart category="salon" />,          accent: ACCENT.emerald, featured: true },
      { title: "Customer Segments",   description: "Distribution by customer type", chart: <CustomerSegmentChart category="salon" />,       accent: ACCENT.amber },
    ],
    sales: [
      { title: "Appointment Density",  description: "By day and time slot", chart: <HeatMapChart category="salon" />,       accent: ACCENT.rose,    featured: true },
      { title: "Location Performance", description: "Revenue by location",  chart: <LocationMapChart category="salon" />,   accent: ACCENT.primary },
      { title: "Sales by Time of Day", description: "Hourly distribution",  chart: <HourlyBarChart category="salon" />,     accent: ACCENT.amber },
    ],
    customers: [
      { title: "Customer Retention", description: "Return visit patterns", chart: <CalendarHeatmap category="salon" />, accent: ACCENT.emerald, featured: true },
      { title: "Service to Retail",  description: "Conversion funnel",     chart: <FunnelChart category="salon" />,      accent: ACCENT.violet },
      { title: "Satisfaction Scores", description: "vs industry benchmark", chart: <RadarChart category="salon" />,       accent: ACCENT.primary },
    ],
  },
}

const weeklyReports: Record<Category, {
  period: string; healthScore: number; healthLabel: string; healthColor: string; summary: string;
  wins: Win[]; alerts: Alert[]; kpis: KPI[];
  topAction: { title: string; detail: string; impact: string }
}> = {
  cafe: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 87, healthLabel: "Strong", healthColor: "#16A34A",
    summary: "Your café had a strong week driven by morning rush performance and increased average ticket size. One area needs attention: Wednesday afternoon traffic dropped significantly.",
    wins: [
      { metric: "Friday Revenue",   value: "+28%",         detail: "Best single-day revenue in 6 weeks — driven by the new seasonal latte launch", icon: "💰" },
      { metric: "Avg. Ticket Size", value: "+$4.20",       detail: "Upsell on pastries working — 34% of coffee orders now include a food item",    icon: "🎯" },
      { metric: "Morning Rush",     value: "92% capacity", detail: "8–10am slots consistently full Mon–Fri. Consider extended hours or pre-order option", icon: "⚡" },
    ],
    alerts: [
      { label: "Wednesday Afternoon Drop", severity: "high",   detail: "2–5pm traffic down 31% vs last 4-week average. Third consecutive week of decline.", action: "Consider a mid-week afternoon promotion or loyalty double-points window" },
      { label: "Pastry Waste Up",          severity: "medium", detail: "Croissant waste at 18% this week — ordered 40, sold 33. Adjust Tuesday & Thursday orders.", action: "Reduce Tuesday/Thursday pastry order by 15% for next 2 weeks" },
      { label: "Low Google Reviews Week",  severity: "low",    detail: "Only 2 new reviews this week vs 8 avg. Prompting customers after peak hours could help.", action: "Add QR code to receipt asking for a quick review" },
    ],
    kpis: [
      { label: "Revenue",    current: "$24,500", prev: "$21,300", delta: "+15%", up: true },
      { label: "Customers",  current: "1,250",   prev: "1,157",   delta: "+8%",  up: true },
      { label: "Avg. Order", current: "$32.50",  prev: "$28.30",  delta: "+15%", up: true },
      { label: "Waste Cost", current: "$340",    prev: "$280",    delta: "+21%", up: false },
    ],
    topAction: { title: "Launch a Wednesday Afternoon Special", detail: "Your data shows consistent afternoon drop-off mid-week. A 2-for-1 coffee promotion between 2–4pm on Wednesdays could recover $800–$1,200 in lost weekly revenue based on your average ticket size.", impact: "$1,000 est. weekly recovery" },
  },
  retail: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 82, healthLabel: "Good", healthColor: "#16A34A",
    summary: "Solid week overall with Electronics leading the charge. Inventory levels on seasonal apparel are becoming a cash flow concern — action needed before end of month.",
    wins: [
      { metric: "Electronics Sales", value: "+22%",  detail: "Laptop and accessories category outperformed forecast by $4,200 this week", icon: "💻" },
      { metric: "New Customers",     value: "148",   detail: "Highest new customer acquisition in 8 weeks — Saturday traffic up 30%",     icon: "👥" },
      { metric: "Avg. Transaction",  value: "$45.75",detail: "Bundle promotion on accessories drove 3% uplift in basket size",             icon: "🛒" },
    ],
    alerts: [
      { label: "Seasonal Apparel Overstock", severity: "high",   detail: "Winter jackets at 68% of stock remaining with only 3 weeks of season left. $12,400 tied up.", action: "Mark down 20% immediately — clearing at margin beats holding dead stock" },
      { label: "Friday Evening Understaffed",severity: "medium", detail: "Checkout wait times up 8 mins on Friday 5–7pm. 3 customers abandoned carts.",               action: "Add 1 staff member Friday evenings for next 4 weeks" },
      { label: "Top SKU Stockout Risk",      severity: "low",    detail: "Blue wireless earbuds at 4 units remaining — avg weekly sell rate is 6 units.",               action: "Reorder immediately — 2 week lead time from supplier" },
    ],
    kpis: [
      { label: "Revenue",    current: "$78,900", prev: "$71,700", delta: "+10%", up: true },
      { label: "Customers",  current: "2,780",   prev: "2,482",   delta: "+12%", up: true },
      { label: "Avg. Order", current: "$45.75",  prev: "$44.40",  delta: "+3%",  up: true },
      { label: "Dead Stock", current: "$12,400", prev: "$8,200",  delta: "+51%", up: false },
    ],
    topAction: { title: "Clear Winter Apparel Before Season End", detail: "You have $12,400 in seasonal inventory with 3 weeks left. A 20% markdown now recovers $9,900 in cash vs holding and marking down 50% next month, which returns only $6,200.", impact: "$3,700 more recovered vs waiting" },
  },
  restaurant: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 91, healthLabel: "Excellent", healthColor: "#16A34A",
    summary: "Best week of the quarter. Weekend dinner service hit record capacity and your new prix-fixe menu is outperforming expectations. One labour cost issue to address.",
    wins: [
      { metric: "Weekend Revenue",    value: "+31%", detail: "Saturday dinner service ran at 103% capacity with 18-person waitlist — first time this year", icon: "🍽️" },
      { metric: "Prix-Fixe Adoption", value: "44%",  detail: "Nearly half of Friday/Saturday diners chose the prix-fixe — 68% higher margin than à la carte", icon: "⭐" },
      { metric: "Table Turnover",     value: "2.8x", detail: "Lunch service efficiency improved — average dine time down 12 mins vs last month",             icon: "⚡" },
    ],
    alerts: [
      { label: "Monday Labour Overspend", severity: "high",   detail: "Monday dinner scheduled 6 FOH staff, only needed 3. $420 in unnecessary labour cost.", action: "Reduce Monday dinner FOH to 4 staff — data shows consistent low traffic" },
      { label: "Delivery Margin Dropping", severity: "medium", detail: "Delivery orders up 15% but net margin down to 12% after platform fees. Below threshold.", action: "Raise delivery-only prices by 8% or negotiate platform fee reduction" },
      { label: "Dessert Attachment Low",   severity: "low",    detail: "Only 18% of tables ordered dessert vs 31% industry average. $640 weekly opportunity.",   action: "Brief servers on dessert timing — offer after main course clears, not at order" },
    ],
    kpis: [
      { label: "Revenue",    current: "$52,300", prev: "$44,300", delta: "+18%", up: true },
      { label: "Covers",     current: "1,850",   prev: "1,609",   delta: "+15%", up: true },
      { label: "Avg. Spend", current: "$38.25",  prev: "$35.75",  delta: "+7%",  up: true },
      { label: "Labour %",   current: "34%",     prev: "29%",     delta: "+5pp", up: false },
    ],
    topAction: { title: "Fix Monday Staffing — Immediate $1,600/mo Saving", detail: "Your last 6 Mondays show a consistent pattern — dinner traffic peaks at 40% of Friday levels but you're staffed at 70%. Reducing by 2 FOH staff saves $420/week with zero service impact.", impact: "$1,680/month cost reduction" },
  },
  salon: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 85, healthLabel: "Strong", healthColor: "#16A34A",
    summary: "Strong retention numbers and your colour services are driving excellent margin. Thursday and Sunday booking gaps remain your biggest untapped revenue opportunity.",
    wins: [
      { metric: "Client Retention", value: "78%",   detail: "Highest retention rate in 3 months — Maya's client rebooking rate hit 94% this week", icon: "💇" },
      { metric: "Colour Revenue",   value: "+24%",  detail: "Balayage and highlights bookings up — averaging $185 per service vs $142 last month",  icon: "🎨" },
      { metric: "Retail Sales",     value: "+$640", detail: "Product attachment rate up to 28% — staff training on recommendations paying off",     icon: "🛍️" },
    ],
    alerts: [
      { label: "Thursday Booking Gaps",    severity: "high",   detail: "Thursday average utilization at 52% — 14 empty chair-hours per week at avg $75 = $1,050 lost.", action: "Launch a Thursday loyalty offer — double points or 10% off for existing clients" },
      { label: "New Client Drop-Off",      severity: "medium", detail: "Only 3 new clients this week vs 9 weekly average. Check if Google My Business listing is current.", action: "Post 3 before/after photos this week and respond to all pending reviews" },
      { label: "Treatment Room Underused", severity: "low",    detail: "Scalp treatment bookings at 2/week vs 8-slot capacity. High-margin service sitting idle.",         action: "Feature scalp treatments in next email campaign with intro pricing" },
    ],
    kpis: [
      { label: "Revenue",        current: "$31,200", prev: "$27,900", delta: "+12%", up: true },
      { label: "Clients Served", current: "420",     prev: "385",     delta: "+9%",  up: true },
      { label: "Avg. Service",   current: "$75.50",  prev: "$71.20",  delta: "+6%",  up: true },
      { label: "Empty Slots",    current: "14 hrs",  prev: "9 hrs",   delta: "+56%", up: false },
    ],
    topAction: { title: "Fill Thursday Gaps — $1,050/Week Sitting Idle", detail: "14 empty chair-hours every Thursday at your average $75 service rate = $1,050 weekly in uncaptured revenue. A simple Thursday loyalty text to your client list could fill 60–70% of those slots within 2 weeks.", impact: "$630–$735 weekly recovery" },
  },
}

const businessCategories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "cafe",       label: "Café",          icon: <Coffee className="h-4 w-4" /> },
  { id: "retail",     label: "Retail Store",  icon: <Store className="h-4 w-4" /> },
  { id: "restaurant", label: "Restaurant",    icon: <Utensils className="h-4 w-4" /> },
  { id: "salon",      label: "Beauty Salon",  icon: <Scissors className="h-4 w-4" /> },
]

const severityMap: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  high:   { bg: "rgba(220,38,38,0.05)", border: "rgba(220,38,38,0.18)", dot: "#DC2626", label: "High Priority" },
  medium: { bg: "rgba(234,179,8,0.05)", border: "rgba(234,179,8,0.18)", dot: "#CA8A04", label: "Medium" },
  low:    { bg: "rgba(14,165,233,0.04)", border: "rgba(14,165,233,0.12)", dot: "#0284C7", label: "Low" },
}

const BLUE = "#0284C7"

// ─── SPARKLINE COMPONENT ──────────────────────────────────────────
function Sparkline({ data, color, width = 60, height = 24 }: { data: number[]; color: string; width?: number; height?: number }) {
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1].x + pts[i].x) / 2
    d += ` C ${cpx} ${pts[i - 1].y}, ${cpx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`
  }
  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`spark-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-${color.replace("#","")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── RADIAL HEALTH RING ───────────────────────────────────────────
function HealthRing({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 42, circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(128,128,128,0.08)" strokeWidth="8" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 55 55)" style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        <text x="55" y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill={color}>{score}</text>
        <text x="55" y="66" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{label}</text>
      </svg>
    </div>
  )
}

export default function DashboardDemoPage() {
  const [mainTab, setMainTab] = useState<"dashboard" | "digest">("dashboard")
  const [chartTab, setChartTab] = useState<ChartTab>("overview")
  const [category, setCategory] = useState<Category>("cafe")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const metrics = metricsData[category]
  const charts = categoryCharts[category]
  const report = weeklyReports[category]
  const sparks = sparklines[category]

  const kpiAccents = [ACCENT.primary, ACCENT.violet, ACCENT.amber, ACCENT.emerald]
  const kpiIcons = [
    <DollarSign key="d" className="h-4 w-4" />,
    <Users key="u" className="h-4 w-4" />,
    category === "salon" ? <Calendar key="c" className="h-4 w-4" /> : <ShoppingBag key="s" className="h-4 w-4" />,
    <DollarSign key="d2" className="h-4 w-4" />,
  ]
  const kpiLabels = [
    "Revenue", "Customers",
    category === "salon" ? "Appointments" : "Orders",
    category === "salon" ? "Avg. Service" : "Avg. Order",
  ]
  const kpiData = [
    { value: metrics.revenue.value, change: metrics.revenue.change },
    { value: metrics.customers.value, change: metrics.customers.change },
    { value: metrics.orders.value, change: metrics.orders.change },
    { value: metrics.avgOrder.value, change: metrics.avgOrder.change },
  ]

  return (
    <PageLayout>
      {/* ═══ HERO ═══ */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Live Product Demo
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                This Is What Your <span className="gradient-text">Monday Mornings</span> Look Like
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Real insights. Real actions. Select your business type below and explore the exact dashboard and weekly digest your team would receive — built from your own POS data.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
                {[
                  { icon: <CheckCircle className="h-4 w-4" />, text: "Sample data — see it before you commit" },
                  { icon: <Zap className="h-4 w-4" />, text: "Live in 48 hours" },
                  { icon: <Star className="h-4 w-4" />, text: "No analysts needed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span style={{ color: "#0EA5E9" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <Button className="btn-primary h-11 px-6" onClick={() => window.location.href = "/contact"}>
                  Book a Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="btn-secondary h-11 px-6" onClick={() => window.location.href = "/services"}>
                  View Pricing
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="w-full py-10 md:py-16 section-base">
        <div className="container px-4 md:px-6">

          {/* ── TOP-LEVEL TAB SWITCHER ── */}
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {([
              { id: "dashboard" as const, icon: <BarChart2 className="h-6 w-6" />, title: "Your Dashboard", sub: "Explore your live metrics" },
              { id: "digest" as const, icon: <Brain className="h-6 w-6" />, title: "AI Weekly Digest", sub: "Insights that act for you" },
            ]).map((t) => (
              <motion.button key={t.id} onClick={() => setMainTab(t.id)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="relative rounded-2xl p-5 text-left transition-all duration-300 overflow-hidden"
                style={{
                  background: mainTab === t.id
                    ? "linear-gradient(135deg, #0EA5E9, #0284C7)"
                    : "hsl(var(--card))",
                  border: mainTab === t.id ? "1px solid rgba(14,165,233,0.3)" : "1px solid hsl(var(--border))",
                  boxShadow: mainTab === t.id
                    ? "0 8px 32px rgba(14,165,233,0.3), 0 0 20px rgba(14,165,233,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                <div style={{ color: mainTab === t.id ? "rgba(255,255,255,0.9)" : "#0EA5E9" }} className="mb-3">{t.icon}</div>
                <div className="font-bold text-lg mb-1" style={{ color: mainTab === t.id ? "#ffffff" : "hsl(var(--foreground))" }}>{t.title}</div>
                <div className="text-sm" style={{ color: mainTab === t.id ? "rgba(255,255,255,0.7)" : "hsl(var(--muted-foreground))" }}>{t.sub}</div>
              </motion.button>
            ))}
          </div>

          {/* ── BUSINESS TYPE SELECTOR (segmented control) ── */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Business Type</p>
            <div className="relative inline-flex rounded-xl p-1 gap-1" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
              {businessCategories.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 z-10"
                  style={{
                    color: category === cat.id ? "#ffffff" : "hsl(var(--muted-foreground))",
                  }}>
                  {category === cat.id && (
                    <motion.div layoutId="category-pill" className="absolute inset-0 rounded-lg"
                      style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", boxShadow: "0 2px 12px rgba(14,165,233,0.35)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-2">{cat.icon} {cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════════════════
                YOUR DASHBOARD TAB
               ══════════════════════════════════════════════════════ */}
            {mainTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="relative rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                  }}>

                  {/* Dashboard header with gradient accent */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ background: "linear-gradient(135deg, #0EA5E9 0%, transparent 50%, #8B5CF6 100%)" }} />
                    <div className="relative flex items-center justify-between p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.1))", color: BLUE, border: "1px solid rgba(14,165,233,0.12)" }}>
                          {businessCategories.find(c => c.id === category)?.icon}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">{businessCategories.find(c => c.id === category)?.label} Analytics</h2>
                          <p className="text-xs text-muted-foreground">Sample data — Feb 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.12)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Live Preview
                        </div>
                        <Button variant="outline" size="sm" className="btn-secondary hidden md:flex">
                          <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* ── KPI CARDS with sparklines ── */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                    {kpiLabels.map((label, i) => (
                      <motion.div key={`${category}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="relative rounded-xl p-4 overflow-hidden group transition-all duration-300 hover:shadow-lg"
                        style={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                        }}>
                        {/* gradient overlay */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{ background: `linear-gradient(135deg, ${kpiAccents[i]}, transparent)` }} />
                        {/* top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style={{ background: `linear-gradient(90deg, ${kpiAccents[i]}, ${kpiAccents[(i + 1) % kpiAccents.length]})` }} />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-muted-foreground">{label}</p>
                            <div className="p-1.5 rounded-lg" style={{ background: `linear-gradient(135deg, ${kpiAccents[i]}18, ${kpiAccents[i]}08)`, color: kpiAccents[i] }}>
                              {kpiIcons[i]}
                            </div>
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-2xl font-bold text-foreground tracking-tight">{kpiData[i].value}</p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                                  style={{
                                    background: i === 3 ? "rgba(244,63,94,0.08)" : "rgba(22,163,74,0.08)",
                                    color: i === 3 ? "#F43F5E" : "#16A34A",
                                  }}>
                                  {i === 3 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                  {kpiData[i].change}
                                </span>
                                <span className="text-xs text-muted-foreground">vs last</span>
                              </div>
                            </div>
                            <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                              <Sparkline data={sparks[i]} color={kpiAccents[i]} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* ── Chart sub-tabs (pill style with glow) ── */}
                  <div className="flex gap-1 p-3 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                    {(["overview", "sales", "customers"] as ChartTab[]).map((tab) => (
                      <button key={tab} onClick={() => setChartTab(tab)}
                        className="relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        style={chartTab === tab
                          ? { background: "linear-gradient(135deg, #0EA5E9, #0284C7)", color: "#ffffff", boxShadow: "0 2px 12px rgba(14,165,233,0.35)" }
                          : { color: "hsl(var(--muted-foreground))" }}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* ── CHARTS — bento grid with glass cards ── */}
                  <div className="p-6">
                    {mounted && (
                      <motion.div key={`${category}-${chartTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                        {charts[chartTab].length === 4 ? (
                          /* 4-chart bento: 2/3 + 1/3, then 1/3 + 2/3 */
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {charts[chartTab].map((chart, i) => (
                              <motion.div key={i}
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className={`rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-lg ${
                                  chart.featured ? "md:col-span-2" : "md:col-span-1"
                                }`}
                                style={{
                                  border: "1px solid hsl(var(--border))",
                                  background: "hsl(var(--background))",
                                }}>
                                {/* accent bar + header */}
                                <div className="flex items-stretch">
                                  <div className="w-[3px] rounded-l-2xl flex-shrink-0" style={{ background: chart.accent }} />
                                  <div className="flex-1">
                                    <div className="px-5 pt-4 pb-2 flex items-start justify-between">
                                      <div>
                                        <p className="font-semibold text-sm text-foreground">{chart.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{chart.description}</p>
                                      </div>
                                    </div>
                                    <div className={`w-full px-4 pb-4 pt-1 ${chart.featured ? "h-[300px]" : "h-[260px]"}`}>
                                      {chart.chart}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          /* 3-chart bento: full-width featured, then 1/2 + 1/2 */
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {charts[chartTab].map((chart, i) => (
                              <motion.div key={i}
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className={`rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-lg ${
                                  chart.featured ? "md:col-span-2" : ""
                                }`}
                                style={{
                                  border: "1px solid hsl(var(--border))",
                                  background: "hsl(var(--background))",
                                }}>
                                <div className="flex items-stretch">
                                  <div className="w-[3px] rounded-l-2xl flex-shrink-0" style={{ background: chart.accent }} />
                                  <div className="flex-1">
                                    <div className="px-5 pt-4 pb-2 flex items-start justify-between">
                                      <div>
                                        <p className="font-semibold text-sm text-foreground">{chart.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{chart.description}</p>
                                      </div>
                                    </div>
                                    <div className={`w-full px-4 pb-4 pt-1 ${chart.featured ? "h-[300px]" : "h-[260px]"}`}>
                                      {chart.chart}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Dashboard footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                    <p className="text-xs text-muted-foreground">Demo dashboard — in the full version all charts connect to your real POS data.</p>
                    <Button className="shadow-lg" style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", color: "#ffffff", fontWeight: 600 }}
                      onClick={() => window.location.href = "/contact"}>
                      Book a Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                AI WEEKLY DIGEST TAB
               ══════════════════════════════════════════════════════ */}
            {mainTab === "digest" && (
              <motion.div key="digest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                  }}>

                  {/* Report header with health ring */}
                  <div className="p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="h-5 w-5" style={{ color: BLUE }} />
                          <span className="text-sm font-semibold" style={{ color: BLUE }}>AI Weekly Digest</span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                          {businessCategories.find(c => c.id === category)?.label} — Week of {report.period}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{report.summary}</p>
                      </div>
                      <HealthRing score={report.healthScore} color={report.healthColor} label={report.healthLabel} />
                    </div>
                  </div>

                  <div className="p-6 space-y-8">

                    {/* KPI Delta Row */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>This Week vs Last Week</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {report.kpis.map((kpi: KPI, i: number) => (
                          <div key={i} className="rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md"
                            style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                            <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                            <p className="text-xl font-bold text-foreground">{kpi.current}</p>
                            <p className="text-xs mt-1 font-semibold" style={{ color: kpi.up ? "#16A34A" : "#F43F5E" }}>
                              {kpi.up ? "↑" : "↓"} {kpi.delta}
                            </p>
                            <p className="text-xs text-muted-foreground">prev: {kpi.prev}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Wins */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>Top Wins This Week</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {report.wins.map((win: Win, i: number) => (
                          <div key={i} className="rounded-xl p-4 overflow-hidden transition-all duration-200 hover:shadow-md"
                            style={{ background: "rgba(22,163,74,0.03)", border: "1px solid rgba(22,163,74,0.12)" }}>
                            <div className="flex items-stretch gap-3">
                              <div className="w-[3px] rounded-full flex-shrink-0" style={{ background: "#16A34A" }} />
                              <div>
                                <div className="text-xl mb-2">{win.icon}</div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-sm text-foreground">{win.metric}</span>
                                  <span className="text-sm font-black" style={{ color: "#16A34A" }}>{win.value}</span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{win.detail}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>Alerts & Anomalies</p>
                      <div className="space-y-3">
                        {report.alerts.map((alert: Alert, i: number) => {
                          const colors = severityMap[alert.severity] ?? severityMap.low
                          return (
                            <div key={i} className="rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                              style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                              <div className="flex items-stretch">
                                <div className="w-[3px] flex-shrink-0" style={{ background: colors.dot }} />
                                <div className="flex-1 p-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-foreground">{alert.label}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                      style={{ background: `${colors.dot}15`, color: colors.dot }}>
                                      {colors.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">{alert.detail}</p>
                                  <div className="flex items-start gap-2 text-xs rounded-lg px-3 py-2"
                                    style={{ background: `${colors.dot}08` }}>
                                    <Zap className="h-3 w-3 shrink-0 mt-0.5" style={{ color: colors.dot }} />
                                    <span style={{ color: colors.dot, fontWeight: 600 }}>Suggested: </span>
                                    <span className="text-muted-foreground ml-1">{alert.action}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Top Action */}
                    <div className="rounded-2xl p-6 overflow-hidden"
                      style={{
                        background: "rgba(14,165,233,0.03)",
                        border: "1px solid rgba(14,165,233,0.15)",
                        boxShadow: "0 0 30px rgba(14,165,233,0.05)",
                      }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.1))" }}>
                          <Zap className="h-4 w-4" style={{ color: BLUE }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>#1 Recommended Action This Week</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{report.topAction.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{report.topAction.detail}</p>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <span className="text-sm font-bold" style={{ color: "#16A34A" }}>{report.topAction.impact}</span>
                        <Button className="shadow-lg"
                          style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", color: "#ffffff", fontWeight: 600 }}
                          onClick={() => window.location.href = "/contact"}>
                          Get This For My Business <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                      This is a sample AI digest based on projected data. Your real digest will be generated from your actual POS, inventory, and booking data.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">What Makes RevLens Different</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Not just charts — actionable intelligence delivered every week.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <MapPin className="h-6 w-6" />, title: "Connected to Your Data", desc: "Links directly to your POS, inventory, and booking systems. No manual exports, no spreadsheets." },
              { icon: <Clock className="h-6 w-6" />, title: "Weekly AI Digest", desc: "Every Monday morning, a plain-English summary of what happened, what's wrong, and exactly what to do about it." },
              { icon: <Star className="h-6 w-6" />, title: "Specific, Not Generic", desc: "Recommendations reference your actual numbers — not industry averages or generic best practices." },
            ].map((f, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 text-center">
                  <div className="mx-auto mb-4 p-3 rounded-xl w-fit" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(139,92,246,0.08))", color: BLUE }}>{f.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="w-full py-16 md:py-20" style={{ background: "linear-gradient(135deg, #0284C7, #0EA5E9)" }}>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to See This With Your Real Data?</h2>
              <p className="text-white/80 mb-6 text-lg">Book a free demo and we'll connect RevLens to your actual POS. You'll see your own weekly digest before the call ends.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button style={{ background: "#ffffff", color: BLUE, fontWeight: 600 }} onClick={() => window.location.href = "/contact"}>
                  Book a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }} onClick={() => window.location.href = "/services"}>
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
              <h3 className="text-lg font-bold text-white mb-4">What You Get in Your Demo</h3>
              <ul className="space-y-3">
                {[
                  "Live dashboard connected to your actual POS data",
                  "Your first AI Weekly Digest generated on the call",
                  "3 specific revenue opportunities identified from your data",
                  "Custom pricing based on your business size",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
