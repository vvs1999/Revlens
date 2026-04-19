"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, Download, TrendingUp, Users, DollarSign, Calendar, ShoppingBag, Scissors, Coffee, Store, Utensils, MapPin, Clock, Star, CheckCircle, Zap, BarChart2, Brain, Code2, ShoppingCart, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StandardBarChart, StandardHorizontalBarChart, HeatMapChart, LocationMapChart, BubbleChart, RadarChart, CalendarHeatmap, FunnelChart, RevenueTrendChart, CustomerSegmentChart, HourlyBarChart, RevenueComboChart, MetricsTable } from "@/components/standardized-charts"

// ─── TYPES ────────────────────────────────────────────────────────
type Category = "cafe" | "retail" | "restaurant" | "salon" | "saas" | "ecommerce" | "agency"
type ChartTab = "overview" | "sales" | "customers"

interface KPI { label: string; current: string; prev: string; delta: string; up: boolean }
interface Win { metric: string; value: string; detail: string; icon: string }
interface Alert { label: string; severity: string; detail: string; action: string }

// ─── DATA ─────────────────────────────────────────────────────────
const metricsData: Record<Category, { revenue: {value:string;change:string}; customers: {value:string;change:string}; orders: {value:string;change:string}; avgOrder: {value:string;change:string} }> = {
  cafe:       { revenue: { value: "$24,500", change: "+15%" }, customers: { value: "1,250",  change: "+8%"  }, orders: { value: "3,450", change: "+12%" }, avgOrder: { value: "$32.50", change: "+5%"  } },
  retail:     { revenue: { value: "$78,900", change: "+10%" }, customers: { value: "2,780",  change: "+12%" }, orders: { value: "4,120", change: "+8%"  }, avgOrder: { value: "$45.75", change: "+3%"  } },
  restaurant: { revenue: { value: "$52,300", change: "+18%" }, customers: { value: "1,850",  change: "+15%" }, orders: { value: "3,920", change: "+20%" }, avgOrder: { value: "$38.25", change: "+7%"  } },
  salon:      { revenue: { value: "$31,200", change: "+12%" }, customers: { value: "420",    change: "+9%"  }, orders: { value: "840",   change: "+14%" }, avgOrder: { value: "$75.50", change: "+6%"  } },
  saas:       { revenue: { value: "$46,500", change: "+28%" }, customers: { value: "208",    change: "+18%" }, orders: { value: "1,840", change: "+24%" }, avgOrder: { value: "$223",   change: "+8%"  } },
  ecommerce:  { revenue: { value: "$55,600", change: "+14%" }, customers: { value: "3,890",  change: "+21%" }, orders: { value: "5,240", change: "+18%" }, avgOrder: { value: "$68.40", change: "+6%"  } },
  agency:     { revenue: { value: "$88,200", change: "+16%" }, customers: { value: "20",     change: "+12%" }, orders: { value: "48",    change: "+14%" }, avgOrder: { value: "$4,120", change: "+8%"  } },
}

const categoryCharts: Record<Category, Record<ChartTab, { title: string; description: string; chart: React.ReactNode }[]>> = {
  cafe: {
    overview: [
      { title: "Peak Hours Analysis",           description: "Customer traffic by hour of day",   chart: <HeatMapChart category="cafe" /> },
      { title: "Product Category Performance",  description: "Sales by product category",         chart: <StandardBarChart category="cafe" /> },
      { title: "Revenue Trends",                description: "Monthly revenue over time",          chart: <RevenueTrendChart category="cafe" /> },
      { title: "Customer Segments",             description: "Distribution by customer type",     chart: <CustomerSegmentChart category="cafe" /> },
    ],
    sales: [
      { title: "Location Performance",  description: "Revenue by location",              chart: <LocationMapChart category="cafe" /> },
      { title: "Customer Journey",      description: "From awareness to purchase",       chart: <FunnelChart category="cafe" /> },
      { title: "Sales by Time of Day",  description: "Hourly sales distribution",        chart: <HourlyBarChart category="cafe" /> },
    ],
    customers: [
      { title: "Customer Segments",   description: "By visit frequency and spend",  chart: <BubbleChart category="cafe" /> },
      { title: "Loyalty & Retention", description: "Engagement over 6 months",      chart: <CalendarHeatmap category="cafe" /> },
      { title: "Satisfaction Scores", description: "vs industry benchmark",          chart: <RadarChart category="cafe" /> },
    ],
  },
  retail: {
    overview: [
      { title: "Store Performance Map",     description: "Revenue by location",              chart: <LocationMapChart category="retail" /> },
      { title: "Department Performance",    description: "Sales by department",              chart: <StandardBarChart category="retail" /> },
      { title: "Revenue Trends",            description: "Monthly revenue over time",        chart: <RevenueTrendChart category="retail" /> },
      { title: "Customer Segments",         description: "Distribution by customer type",   chart: <CustomerSegmentChart category="retail" /> },
    ],
    sales: [
      { title: "Seasonal Sales Patterns",  description: "Monthly activity heatmap",   chart: <CalendarHeatmap category="retail" /> },
      { title: "Product Performance",      description: "By margin and volume",        chart: <BubbleChart category="retail" /> },
      { title: "Sales by Time of Day",     description: "Hourly distribution",         chart: <HourlyBarChart category="retail" /> },
    ],
    customers: [
      { title: "Customer Acquisition",  description: "From prospect to loyal",     chart: <FunnelChart category="retail" /> },
      { title: "Satisfaction Metrics",  description: "vs industry benchmark",       chart: <RadarChart category="retail" /> },
      { title: "Department Revenue",    description: "By category",                 chart: <StandardHorizontalBarChart category="retail" /> },
    ],
  },
  restaurant: {
    overview: [
      { title: "Table Turnover Analysis",  description: "Efficiency by day and time",       chart: <HeatMapChart category="restaurant" /> },
      { title: "Menu Item Performance",    description: "By popularity and margin",         chart: <BubbleChart category="restaurant" /> },
      { title: "Revenue Trends",           description: "Monthly revenue over time",        chart: <RevenueTrendChart category="restaurant" /> },
      { title: "Customer Segments",        description: "Distribution by customer type",   chart: <CustomerSegmentChart category="restaurant" /> },
    ],
    sales: [
      { title: "Location Comparison",   description: "Performance across locations",        chart: <LocationMapChart category="restaurant" /> },
      { title: "Sales by Channel",      description: "Dine-in vs takeout vs delivery",      chart: <StandardBarChart category="restaurant" /> },
      { title: "Sales by Time of Day",  description: "Hourly distribution",                 chart: <HourlyBarChart category="restaurant" /> },
    ],
    customers: [
      { title: "Reservation Patterns",  description: "By day and party size",         chart: <CalendarHeatmap category="restaurant" /> },
      { title: "Satisfaction Metrics",  description: "vs industry benchmark",          chart: <RadarChart category="restaurant" /> },
      { title: "Customer Loyalty",      description: "Return visit frequency",         chart: <StandardHorizontalBarChart category="restaurant" /> },
    ],
  },
  salon: {
    overview: [
      { title: "Service Popularity",    description: "By volume and revenue",            chart: <BubbleChart category="salon" /> },
      { title: "Stylist Performance",   description: "By revenue and satisfaction",      chart: <StandardHorizontalBarChart category="salon" /> },
      { title: "Revenue Trends",        description: "Monthly revenue over time",        chart: <RevenueTrendChart category="salon" /> },
      { title: "Customer Segments",     description: "Distribution by customer type",   chart: <CustomerSegmentChart category="salon" /> },
    ],
    sales: [
      { title: "Appointment Density",  description: "By day and time slot",     chart: <HeatMapChart category="salon" /> },
      { title: "Location Performance", description: "Revenue by location",       chart: <LocationMapChart category="salon" /> },
      { title: "Sales by Time of Day", description: "Hourly distribution",       chart: <HourlyBarChart category="salon" /> },
    ],
    customers: [
      { title: "Customer Retention",  description: "Return visit patterns",   chart: <CalendarHeatmap category="salon" /> },
      { title: "Service to Retail",   description: "Conversion funnel",        chart: <FunnelChart category="salon" /> },
      { title: "Satisfaction Scores", description: "vs industry benchmark",    chart: <RadarChart category="salon" /> },
    ],
  },
  saas: {
    overview: [
      { title: "MRR Growth",          description: "Monthly recurring revenue trend",     chart: <RevenueTrendChart category="saas" /> },
      { title: "Revenue by Plan",     description: "MRR distribution by tier",            chart: <StandardBarChart category="saas" /> },
      { title: "Subscriber Mix",      description: "Distribution by plan type",           chart: <CustomerSegmentChart category="saas" /> },
      { title: "Segment Growth",      description: "Trial vs paid cohort trends",         chart: <BubbleChart category="saas" /> },
    ],
    sales: [
      { title: "Revenue by Region",   description: "ARR by geography",                   chart: <LocationMapChart category="saas" /> },
      { title: "Conversion Funnel",   description: "Visitor to paid conversion",          chart: <FunnelChart category="saas" /> },
      { title: "Product Usage Peaks", description: "Active sessions by hour",             chart: <HourlyBarChart category="saas" /> },
    ],
    customers: [
      { title: "Cohort Retention",     description: "Monthly churn by signup cohort",    chart: <CalendarHeatmap category="saas" /> },
      { title: "Activity Heatmap",     description: "Usage intensity by day and hour",   chart: <HeatMapChart category="saas" /> },
      { title: "Satisfaction Scores",  description: "vs SaaS industry benchmark",        chart: <RadarChart category="saas" /> },
    ],
  },
  ecommerce: {
    overview: [
      { title: "Revenue Trends",        description: "Monthly GMV over time",              chart: <RevenueTrendChart category="ecommerce" /> },
      { title: "Sales by Channel",      description: "Revenue by acquisition channel",     chart: <StandardBarChart category="ecommerce" /> },
      { title: "Customer Segments",     description: "Distribution by purchase behaviour", chart: <CustomerSegmentChart category="ecommerce" /> },
      { title: "Segment Revenue Trends",description: "Returning vs new customer GMV",      chart: <BubbleChart category="ecommerce" /> },
    ],
    sales: [
      { title: "Regional Performance",  description: "Revenue and growth by region",       chart: <LocationMapChart category="ecommerce" /> },
      { title: "Purchase Funnel",       description: "Visitor to checkout conversion",      chart: <FunnelChart category="ecommerce" /> },
      { title: "Peak Order Hours",      description: "Order volume by hour of day",         chart: <HourlyBarChart category="ecommerce" /> },
    ],
    customers: [
      { title: "Cohort Repurchase",     description: "Repeat purchase rates by month",    chart: <CalendarHeatmap category="ecommerce" /> },
      { title: "Order Activity Map",    description: "Order density by day and hour",     chart: <HeatMapChart category="ecommerce" /> },
      { title: "Customer Satisfaction", description: "vs e-commerce benchmark",           chart: <RadarChart category="ecommerce" /> },
    ],
  },
  agency: {
    overview: [
      { title: "Revenue Trends",        description: "Monthly billed revenue over time",  chart: <RevenueTrendChart category="agency" /> },
      { title: "Revenue by Service",    description: "Billed hours by service type",      chart: <StandardBarChart category="agency" /> },
      { title: "Client Mix",            description: "Retainer vs project breakdown",     chart: <CustomerSegmentChart category="agency" /> },
      { title: "Client Growth Trends",  description: "Retainer vs new client trends",     chart: <BubbleChart category="agency" /> },
    ],
    sales: [
      { title: "Revenue by Vertical",   description: "Revenue by client industry",        chart: <LocationMapChart category="agency" /> },
      { title: "New Business Funnel",   description: "Lead to contract conversion",       chart: <FunnelChart category="agency" /> },
      { title: "Billable Hour Peaks",   description: "Peak hours by time of day",         chart: <HourlyBarChart category="agency" /> },
    ],
    customers: [
      { title: "Client Retention",      description: "Cohort retention by quarter",      chart: <CalendarHeatmap category="agency" /> },
      { title: "Activity by Day",       description: "Project activity intensity",        chart: <HeatMapChart category="agency" /> },
      { title: "Client Satisfaction",   description: "vs agency industry benchmark",     chart: <RadarChart category="agency" /> },
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
      { metric: "Friday Revenue",    value: "+28%",         detail: "Best single-day revenue in 6 weeks — driven by the new seasonal latte launch", icon: "💰" },
      { metric: "Avg. Ticket Size",  value: "+$4.20",       detail: "Upsell on pastries working — 34% of coffee orders now include a food item",    icon: "🎯" },
      { metric: "Morning Rush",      value: "92% capacity", detail: "8–10am slots consistently full Mon–Fri. Consider extended hours or pre-order option", icon: "⚡" },
    ],
    alerts: [
      { label: "Wednesday Afternoon Drop", severity: "high",   detail: "2–5pm traffic down 31% vs last 4-week average. Third consecutive week of decline.", action: "Consider a mid-week afternoon promotion or loyalty double-points window" },
      { label: "Pastry Waste Up",          severity: "medium", detail: "Croissant waste at 18% this week — ordered 40, sold 33. Adjust Tuesday & Thursday orders.", action: "Reduce Tuesday/Thursday pastry order by 15% for next 2 weeks" },
      { label: "Low Google Reviews Week",  severity: "low",    detail: "Only 2 new reviews this week vs 8 avg. Prompting customers after peak hours could help.", action: "Add QR code to receipt asking for a quick review" },
    ],
    kpis: [
      { label: "Revenue",    current: "$24,500", prev: "$21,300", delta: "+15%", up: true  },
      { label: "Customers",  current: "1,250",   prev: "1,157",   delta: "+8%",  up: true  },
      { label: "Avg. Order", current: "$32.50",  prev: "$28.30",  delta: "+15%", up: true  },
      { label: "Waste Cost", current: "$340",    prev: "$280",    delta: "+21%", up: false },
    ],
    topAction: { title: "Launch a Wednesday Afternoon Special", detail: "Your data shows consistent afternoon drop-off mid-week. A 2-for-1 coffee promotion between 2–4pm on Wednesdays could recover $800–$1,200 in lost weekly revenue based on your average ticket size.", impact: "$1,000 est. weekly recovery" },
  },
  retail: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 82, healthLabel: "Good", healthColor: "#16A34A",
    summary: "Solid week overall with Electronics leading the charge. Inventory levels on seasonal apparel are becoming a cash flow concern — action needed before end of month.",
    wins: [
      { metric: "Electronics Sales",  value: "+22%",  detail: "Laptop and accessories category outperformed forecast by $4,200 this week", icon: "💻" },
      { metric: "New Customers",      value: "148",   detail: "Highest new customer acquisition in 8 weeks — Saturday traffic up 30%",     icon: "👥" },
      { metric: "Avg. Transaction",   value: "$45.75",detail: "Bundle promotion on accessories drove 3% uplift in basket size",             icon: "🛒" },
    ],
    alerts: [
      { label: "Seasonal Apparel Overstock", severity: "high",   detail: "Winter jackets at 68% of stock remaining with only 3 weeks of season left. $12,400 tied up.", action: "Mark down 20% immediately — clearing at margin beats holding dead stock" },
      { label: "Friday Evening Understaffed",severity: "medium", detail: "Checkout wait times up 8 mins on Friday 5–7pm. 3 customers abandoned carts.", action: "Add 1 staff member Friday evenings for next 4 weeks" },
      { label: "Top SKU Stockout Risk",      severity: "low",    detail: "Blue wireless earbuds at 4 units remaining — avg weekly sell rate is 6 units.", action: "Reorder immediately — 2 week lead time from supplier" },
    ],
    kpis: [
      { label: "Revenue",    current: "$78,900", prev: "$71,700", delta: "+10%", up: true  },
      { label: "Customers",  current: "2,780",   prev: "2,482",   delta: "+12%", up: true  },
      { label: "Avg. Order", current: "$45.75",  prev: "$44.40",  delta: "+3%",  up: true  },
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
      { metric: "Table Turnover",     value: "2.8x", detail: "Lunch service efficiency improved — average dine time down 12 mins vs last month", icon: "⚡" },
    ],
    alerts: [
      { label: "Monday Labour Overspend",  severity: "high",   detail: "Monday dinner scheduled 6 FOH staff, only needed 3. $420 in unnecessary labour cost.", action: "Reduce Monday dinner FOH to 4 staff — data shows consistent low traffic" },
      { label: "Delivery Margin Dropping", severity: "medium", detail: "Delivery orders up 15% but net margin down to 12% after platform fees. Below threshold.", action: "Raise delivery-only prices by 8% or negotiate platform fee reduction" },
      { label: "Dessert Attachment Low",   severity: "low",    detail: "Only 18% of tables ordered dessert vs 31% industry average. $640 weekly opportunity.", action: "Brief servers on dessert timing — offer after main course clears, not at order" },
    ],
    kpis: [
      { label: "Revenue",    current: "$52,300", prev: "$44,300", delta: "+18%", up: true  },
      { label: "Covers",     current: "1,850",   prev: "1,609",   delta: "+15%", up: true  },
      { label: "Avg. Spend", current: "$38.25",  prev: "$35.75",  delta: "+7%",  up: true  },
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
      { label: "Thursday Booking Gaps",   severity: "high",   detail: "Thursday average utilization at 52% — 14 empty chair-hours per week at avg $75 = $1,050 lost.", action: "Launch a Thursday loyalty offer — double points or 10% off for existing clients" },
      { label: "New Client Drop-Off",     severity: "medium", detail: "Only 3 new clients this week vs 9 weekly average. Check if Google My Business listing is current.", action: "Post 3 before/after photos this week and respond to all pending reviews" },
      { label: "Treatment Room Underused",severity: "low",    detail: "Scalp treatment bookings at 2/week vs 8-slot capacity. High-margin service sitting idle.", action: "Feature scalp treatments in next email campaign with intro pricing" },
    ],
    kpis: [
      { label: "Revenue",       current: "$31,200", prev: "$27,900", delta: "+12%", up: true  },
      { label: "Clients Served",current: "420",     prev: "385",     delta: "+9%",  up: true  },
      { label: "Avg. Service",  current: "$75.50",  prev: "$71.20",  delta: "+6%",  up: true  },
      { label: "Empty Slots",   current: "14 hrs",  prev: "9 hrs",   delta: "+56%", up: false },
    ],
    topAction: { title: "Fill Thursday Gaps — $1,050/Week Sitting Idle", detail: "14 empty chair-hours every Thursday at your average $75 service rate = $1,050 weekly in uncaptured revenue. A simple Thursday loyalty text to your client list could fill 60–70% of those slots within 2 weeks.", impact: "$630–$735 weekly recovery" },
  },
  saas: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 88, healthLabel: "Strong", healthColor: "#16A34A",
    summary: "Strong expansion week — MRR crossed $46K for the first time. Trial-to-paid conversion held at 27%, above your 23% target. Churn event on two Enterprise accounts needs immediate attention.",
    wins: [
      { metric: "MRR Growth",        value: "+$3,200",  detail: "Net new MRR hit $3,200 this week — best week in 3 months, driven by 12 Pro upgrades from trial", icon: "📈" },
      { metric: "Trial Activations", value: "68",       detail: "68 trials activated this week vs 51 average — LinkedIn campaign driving higher-intent signups", icon: "🚀" },
      { metric: "Annual Upsells",    value: "9 deals",  detail: "9 monthly-to-annual conversions at an average of $180 ARR uplift each — email nudge sequence working", icon: "💰" },
    ],
    alerts: [
      { label: "2 Enterprise Churns",     severity: "high",   detail: "Acme Corp and BrightPath both cancelled this week — $4,200 ARR lost. Both cited 'missing CRM integration'.", action: "Fast-track CRM integration to roadmap — 3 other Enterprise accounts have flagged the same gap" },
      { label: "Onboarding Drop-off",     severity: "medium", detail: "43% of this week's trial activations never reached the 'connect data source' step — critical activation milestone.", action: "Add in-app prompt at step 2 and trigger support chat if user is inactive for 24 hours post-signup" },
      { label: "Support Ticket Spike",   severity: "low",    detail: "Support tickets up 28% this week — 60% related to CSV export formatting changes in v2.4.", action: "Publish a CSV export migration guide and pin to top of help docs" },
    ],
    kpis: [
      { label: "MRR",          current: "$46,500", prev: "$43,300", delta: "+7.4%", up: true  },
      { label: "Active Users", current: "1,840",   prev: "1,612",   delta: "+14%",  up: true  },
      { label: "Churn Rate",   current: "2.1%",    prev: "1.4%",    delta: "+0.7pp",up: false },
      { label: "Trial → Paid", current: "27%",     prev: "23%",     delta: "+4pp",  up: true  },
    ],
    topAction: { title: "Fix the Onboarding Drop-off — 43% Never Activate", detail: "Your funnel data shows 43% of trial users stall at the 'connect data source' step and never activate. Users who don't activate within 48 hours have a 12% paid conversion rate vs 41% for those who do. A single in-app tooltip and an automated email at the 24-hour mark could recover 60–80 activations per week.", impact: "~$2,400 est. additional MRR per month" },
  },
  ecommerce: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 83, healthLabel: "Good", healthColor: "#16A34A",
    summary: "Solid week with strong evening traffic performance. Email campaign drove exceptional return on Wednesday. Paid social ROAS dropped below threshold — needs immediate budget review.",
    wins: [
      { metric: "Email Revenue",   value: "$8,200",  detail: "Wednesday re-engagement email to lapsed 90-day customers drove $8,200 in revenue — 4.1x average", icon: "📧" },
      { metric: "AOV Increase",    value: "+$12.40", detail: "Bundle recommendation engine lifted average order value to $68.40 — best performance in 8 weeks", icon: "🛒" },
      { metric: "9pm Traffic",     value: "+44%",    detail: "9–10pm now your single highest-volume hour — mobile traffic up 38% since new app experience", icon: "📱" },
    ],
    alerts: [
      { label: "Paid Social ROAS at 1.4x",  severity: "high",   detail: "Facebook/Instagram ROAS dropped to 1.4x this week vs 2.8x target. $6,400 spent with only $9,200 attributed revenue.", action: "Pause underperforming ad sets and reallocate budget to email and organic — review creative by Friday" },
      { label: "Cart Abandonment Up 8%",    severity: "medium", detail: "Checkout abandonment at 72% this week vs 64% average. Spike started Tuesday after shipping threshold change.", action: "A/B test reverting the free shipping threshold from $75 back to $60 for 2 weeks" },
      { label: "Low Inventory on Top SKUs", severity: "low",    detail: "3 of your top 10 SKUs by revenue have under 2 weeks of stock remaining at current sell rate.", action: "Trigger reorder on SKUs #A12, #B34, #C19 — current lead time is 18 days" },
    ],
    kpis: [
      { label: "GMV",           current: "$55,600", prev: "$48,800", delta: "+14%",  up: true  },
      { label: "Orders",        current: "5,240",   prev: "4,440",   delta: "+18%",  up: true  },
      { label: "Avg. Order",    current: "$68.40",  prev: "$64.50",  delta: "+6%",   up: true  },
      { label: "Paid ROAS",     current: "1.4x",    prev: "2.6x",    delta: "-46%",  up: false },
    ],
    topAction: { title: "Pause Paid Social — You're Burning $6,400 at a Loss", detail: "Your paid social campaigns spent $6,400 this week for $9,200 in attributed revenue — a 1.4x ROAS below your 2.0x break-even threshold. Pausing and reallocating 50% of that budget to email (which ran at 8.2x ROAS this week) could recover $12,000–$15,000 in net revenue this month.", impact: "$3,000–$4,500 est. net gain this month" },
  },
  agency: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 91, healthLabel: "Excellent", healthColor: "#16A34A",
    summary: "Best billing week of the quarter. Two retainer renewals closed at higher rates, and the new SaaS vertical is tracking well above forecast. One utilisation bottleneck to address.",
    wins: [
      { metric: "Retainer Renewals", value: "2 at +15%",  detail: "TechFlow and Meridian both renewed at 15% rate increases — first upsells in 6 months, driven by new QBR format", icon: "🤝" },
      { metric: "New Business",      value: "$18K/mo",    detail: "2 new SaaS clients signed this week totalling $18K monthly retainer — SaaS vertical now 22% of total ARR", icon: "🏆" },
      { metric: "Billable Hours",    value: "94%",        detail: "Team utilisation hit 94% this week — highest since Q2 last year. Senior team at 98% billable.", icon: "⚡" },
    ],
    alerts: [
      { label: "Junior Team Capacity Risk", severity: "high",   detail: "Junior team at 102% billable this week — overtime logged on 3 accounts. 2 deliverables running behind.", action: "Hire 1 junior analyst immediately or reduce junior scope on Project Vega — risk of quality drop and burnout" },
      { label: "Reporting Bottleneck",      severity: "medium", detail: "Monthly reports for 6 clients all due next Friday. Currently estimated at 28 hours of work vs 18 hours available.", action: "Use AI-assisted report templates for lower-tier clients — free up 8 hours of senior analyst time" },
      { label: "Client at Risk — DataCorp", severity: "low",    detail: "DataCorp NPS dropped to 32 this month after delayed deliverable. Marked as churn risk in CRM.", action: "Schedule a proactive check-in call this week and offer a complimentary Q2 strategy session" },
    ],
    kpis: [
      { label: "Monthly Revenue", current: "$88,200", prev: "$76,100", delta: "+16%",  up: true  },
      { label: "Active Clients",  current: "20",      prev: "18",      delta: "+11%",  up: true  },
      { label: "Avg. Retainer",   current: "$4,120",  prev: "$3,840",  delta: "+7%",   up: true  },
      { label: "Team Util.",      current: "94%",     prev: "82%",     delta: "+12pp", up: true  },
    ],
    topAction: { title: "Hire or Offload Now — Junior Team at 102% for 3 Weeks", detail: "Your junior team has been over 95% utilised for 3 consecutive weeks. Industry data shows delivery quality drops materially above 90% sustained utilisation. You have 2 proposals out totalling $24K/mo — if both close, you're at 130% capacity with current headcount. A part-time contractor hire at $4,000/mo protects $88K in existing revenue.", impact: "Protects $88K/mo in delivery quality" },
  },
}

const businessCategories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "saas",       label: "SaaS",         icon: <Code2 className="h-4 w-4" />       },
  { id: "ecommerce",  label: "E-commerce",   icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "agency",     label: "Agency",       icon: <Briefcase className="h-4 w-4" />   },
  { id: "cafe",       label: "Café",         icon: <Coffee className="h-4 w-4" />      },
  { id: "retail",     label: "Retail Store", icon: <Store className="h-4 w-4" />       },
  { id: "restaurant", label: "Restaurant",   icon: <Utensils className="h-4 w-4" />    },
  { id: "salon",      label: "Beauty Salon", icon: <Scissors className="h-4 w-4" />    },
]

const severityMap: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  high:   { bg: "rgba(220,38,38,0.04)",  border: "rgba(220,38,38,0.2)",  dot: "#DC2626", label: "High Priority" },
  medium: { bg: "rgba(234,179,8,0.04)",  border: "rgba(234,179,8,0.2)",  dot: "#CA8A04", label: "Medium" },
  low:    { bg: "rgba(14,165,233,0.04)", border: "rgba(14,165,233,0.15)", dot: "#0284C7", label: "Low" },
}

const BLUE = "#0284C7"

// ── Chart card wrapper — BI-style elevated panel ─────────────────────
function ChartCard({ title, description, children, fullWidth }: { title: string; description?: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    }}>
      <div className="px-4 pt-3.5 pb-3 flex items-start justify-between border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div>
          <p className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{title}</p>
          {description && <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{description}</p>}
        </div>
      </div>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </div>
  )
}

export default function DashboardDemoPage() {
  const [mainTab, setMainTab] = useState<"dashboard" | "digest">("dashboard")
  const [chartTab, setChartTab] = useState<ChartTab>("overview")
  const [category, setCategory] = useState<Category>("saas")
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const metrics = metricsData[category]
  const report  = weeklyReports[category]

  return (
    <PageLayout>
      {/* Hero */}
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
              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
                {[
                  { icon: <CheckCircle className="h-4 w-4" />, text: "Sample data — see it before you commit" },
                  { icon: <Zap className="h-4 w-4" />, text: "Guided setup, end to end" },
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

      {/* Main content */}
      <section className="w-full py-10 md:py-16 section-base">
        <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {/* ── TOP-LEVEL TAB SWITCHER ── */}
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {([
              { id: "dashboard" as const, icon: <BarChart2 className="h-6 w-6" />, title: "Your Dashboard",    sub: "Explore your live metrics"   },
              { id: "digest"    as const, icon: <Brain className="h-6 w-6" />,     title: "AI Weekly Digest",  sub: "Insights that act for you"   },
            ]).map((t) => (
              <button key={t.id} onClick={() => setMainTab(t.id)}
                className="rounded-2xl p-5 text-left transition-all duration-200"
                style={{
                  background:  mainTab === t.id ? BLUE : "hsl(var(--card))",
                  border:      mainTab === t.id ? "none" : "1px solid hsl(var(--border))",
                  boxShadow:   mainTab === t.id ? "0 8px 30px rgba(2,132,199,0.35)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                <div style={{ color: mainTab === t.id ? "rgba(255,255,255,0.9)" : BLUE }} className="mb-3">{t.icon}</div>
                <div className="font-bold text-lg mb-1" style={{ color: mainTab === t.id ? "#ffffff" : "hsl(var(--foreground))" }}>{t.title}</div>
                <div className="text-sm"             style={{ color: mainTab === t.id ? "rgba(255,255,255,0.7)" : "hsl(var(--muted-foreground))" }}>{t.sub}</div>
              </button>
            ))}
          </div>

          {/* ── BUSINESS TYPE SELECTOR ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <p className="w-full text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Select Business Type</p>
            {businessCategories.map((cat) => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={category === cat.id
                  ? { background: BLUE, color: "#ffffff", boxShadow: "0 2px 8px rgba(2,132,199,0.3)" }
                  : { background: "hsl(var(--background))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ══ YOUR DASHBOARD TAB ══ */}
            {mainTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(14,165,233,0.2)", background: "hsl(var(--card))", boxShadow: "0 8px 32px rgba(2,132,199,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}>

                  {/* Header with gradient accent */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }} />
                    <div className="relative flex items-center justify-between p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl" style={{ background: "rgba(14,165,233,0.1)", color: BLUE, border: "1px solid rgba(14,165,233,0.15)" }}>
                          {businessCategories.find(c => c.id === category)?.icon}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">{businessCategories.find(c => c.id === category)?.label} Analytics</h2>
                          <p className="text-xs text-muted-foreground">Sample data — Feb 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.15)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Live Preview
                        </div>
                        <Button variant="outline" size="sm" className="btn-secondary hidden md:flex">
                          <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* KPI Metrics with accent borders */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                    {[
                      { label: category === "saas" ? "MRR" : "Revenue",                                  value: metrics.revenue.value,   change: metrics.revenue.change,   icon: <DollarSign className="h-4 w-4" />, accent: "#0EA5E9" },
                      { label: category === "saas" ? "Accounts" : category === "agency" ? "Clients" : "Customers", value: metrics.customers.value, change: metrics.customers.change, icon: <Users className="h-4 w-4" />, accent: "#8B5CF6" },
                      { label: category === "salon" ? "Appointments" : category === "saas" ? "Active Users" : category === "agency" ? "Projects" : "Orders", value: metrics.orders.value, change: metrics.orders.change, icon: category === "salon" ? <Calendar className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />, accent: "#F59E0B" },
                      { label: category === "salon" ? "Avg. Service" : category === "saas" ? "ARPU" : category === "agency" ? "Avg. Retainer" : "Avg. Order", value: metrics.avgOrder.value, change: metrics.avgOrder.change, icon: <DollarSign className="h-4 w-4" />, accent: "#10B981" },
                    ].map((m, i) => (
                      <motion.div key={`${category}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="relative rounded-xl p-4 overflow-hidden transition-shadow hover:shadow-md"
                        style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: m.accent }} />
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                          <div className="p-1.5 rounded-lg" style={{ background: `${m.accent}12`, color: m.accent }}>{m.icon}</div>
                        </div>
                        <p className="text-2xl font-bold text-foreground tracking-tight">{m.value}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A" }}>
                            <TrendingUp className="h-3 w-3" />{m.change}
                          </span>
                          <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tab bar */}
                  <div className="flex gap-1 px-4 pt-3 pb-0 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                    {(["overview", "sales", "customers"] as ChartTab[]).map((tab) => (
                      <button key={tab} onClick={() => setChartTab(tab)}
                        className="px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px"
                        style={chartTab === tab
                          ? { borderColor: BLUE, color: BLUE, background: "transparent" }
                          : { borderColor: "transparent", color: "hsl(var(--muted-foreground))" }}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* ── BI-STYLE DASHBOARD LAYOUT ── */}
                  {mounted && (
                    <motion.div key={`${category}-${chartTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="p-5 space-y-4 bg-muted/[0.4] rounded-b-2xl">

                      {chartTab === "overview" && (
                        <>
                          {/* Row 1: Full-width combo chart */}
                          <ChartCard title={`Monthly ${category === "saas" ? "MRR" : category === "agency" ? "Billings" : category === "ecommerce" ? "GMV" : "Revenue"} & Month-over-Month Growth`} description="Bars = revenue · Red line = MoM% change" fullWidth>
                            <div className="w-full h-[320px]"><RevenueComboChart category={category} /></div>
                          </ChartCard>
                          {/* Row 2: 60/40 split */}
                          <div className="grid md:grid-cols-5 gap-4">
                            <div className="md:col-span-3">
                              <ChartCard title="Segment Revenue Trends" description="Revenue by customer segment over time">
                                <div className="w-full h-[260px]"><BubbleChart category={category} /></div>
                              </ChartCard>
                            </div>
                            <div className="md:col-span-2">
                              <ChartCard title={`Revenue Breakdown`} description="Distribution by channel / segment">
                                <div className="w-full h-[260px]"><MetricsTable category={category} /></div>
                              </ChartCard>
                            </div>
                          </div>
                          {/* Row 3: 50/50 */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <ChartCard title="Customer Segments" description="Share by customer type">
                              <div className="w-full h-[220px]"><CustomerSegmentChart category={category} /></div>
                            </ChartCard>
                            <ChartCard title="Peak Activity Hours" description="Demand by hour of day">
                              <div className="w-full h-[220px]"><HourlyBarChart category={category} /></div>
                            </ChartCard>
                          </div>
                        </>
                      )}

                      {chartTab === "sales" && (
                        <>
                          {/* Row 1: 60/40 */}
                          <div className="grid md:grid-cols-5 gap-4">
                            <div className="md:col-span-3">
                              <ChartCard title="Revenue by Channel / Location" description="Performance breakdown">
                                <div className="w-full h-[300px]"><LocationMapChart category={category} /></div>
                              </ChartCard>
                            </div>
                            <div className="md:col-span-2">
                              <ChartCard title="Conversion Funnel" description="From awareness to retained customer">
                                <div className="w-full h-[300px]"><FunnelChart category={category} /></div>
                              </ChartCard>
                            </div>
                          </div>
                          {/* Row 2: full-width heatmap */}
                          <ChartCard title="Activity Intensity — Day × Hour" description="Colour = relative volume (dark = higher)" fullWidth>
                            <div className="w-full h-[280px] overflow-auto"><HeatMapChart category={category} /></div>
                          </ChartCard>
                          {/* Row 3: 50/50 */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <ChartCard title={category === "saas" ? "Revenue by Plan" : "Top Categories"} description="Revenue by category / tier">
                              <div className="w-full h-[220px]"><StandardBarChart category={category} /></div>
                            </ChartCard>
                            <ChartCard title="Revenue Detail" description="Breakdown with volume and share">
                              <div className="w-full h-[220px]"><MetricsTable category={category} /></div>
                            </ChartCard>
                          </div>
                        </>
                      )}

                      {chartTab === "customers" && (
                        <>
                          {/* Row 1: full-width cohort table */}
                          <ChartCard title="Cohort Retention Analysis" description="% of customers still active after N periods — darker = better retention" fullWidth>
                            <div className="w-full h-[220px]"><CalendarHeatmap category={category} /></div>
                          </ChartCard>
                          {/* Row 2: 60/40 */}
                          <div className="grid md:grid-cols-5 gap-4">
                            <div className="md:col-span-3">
                              <ChartCard title="Satisfaction vs Industry Benchmark" description="Your score · Benchmark = industry average">
                                <div className="w-full h-[280px]"><RadarChart category={category} /></div>
                              </ChartCard>
                            </div>
                            <div className="md:col-span-2">
                              <ChartCard title="Customer Mix" description="Distribution by segment">
                                <div className="w-full h-[280px]"><CustomerSegmentChart category={category} /></div>
                              </ChartCard>
                            </div>
                          </div>
                          {/* Row 3: 50/50 */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <ChartCard title="Segment Growth Trends" description="Revenue by customer type over 6 months">
                              <div className="w-full h-[220px]"><BubbleChart category={category} /></div>
                            </ChartCard>
                            <ChartCard title="Top Performers by Category" description="Ranked by revenue contribution">
                              <div className="w-full h-[220px]"><StandardHorizontalBarChart category={category} /></div>
                            </ChartCard>
                          </div>
                        </>
                      )}

                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                    <p className="text-xs text-muted-foreground">Demo dashboard — in the full version all charts connect to your real POS data.</p>
                    <Button style={{ background: BLUE, color: "#ffffff", fontWeight: 600 }} className="shadow-lg" onClick={() => window.location.href = "/contact"}>
                      Book a Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══ AI WEEKLY DIGEST TAB ══ */}
            {mainTab === "digest" && (
              <motion.div key="digest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>

                  {/* Report header */}
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
                      <div className="flex flex-col items-center justify-center rounded-2xl px-6 py-4 shrink-0"
                        style={{ background: `${report.healthColor}15`, border: `1px solid ${report.healthColor}30` }}>
                        <span className="text-3xl font-black" style={{ color: report.healthColor }}>{report.healthScore}</span>
                        <span className="text-xs font-semibold" style={{ color: report.healthColor }}>Business Health</span>
                        <span className="text-xs text-muted-foreground">{report.healthLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">

                    {/* KPI Delta Row */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>This Week vs Last Week</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {report.kpis.map((kpi: KPI, i: number) => (
                          <div key={i} className="rounded-xl p-4 text-center" style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                            <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                            <p className="text-xl font-bold text-foreground">{kpi.current}</p>
                            <p className="text-xs mt-1" style={{ color: kpi.up ? "#16A34A" : "#DC2626" }}>
                              {kpi.up ? "↑" : "↓"} {kpi.delta}
                            </p>
                            <p className="text-xs text-muted-foreground">prev: {kpi.prev}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Wins */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>🏆 Top Wins This Week</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {report.wins.map((win: Win, i: number) => (
                          <div key={i} className="rounded-xl p-4" style={{ background: "rgba(22,163,74,0.04)", border: "1px solid rgba(22,163,74,0.15)" }}>
                            <div className="text-2xl mb-2">{win.icon}</div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm text-foreground">{win.metric}</span>
                              <span className="text-sm font-black" style={{ color: "#16A34A" }}>{win.value}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{win.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>⚠️ Alerts & Anomalies</p>
                      <div className="space-y-3">
                        {report.alerts.map((alert: Alert, i: number) => {
                          const colors = severityMap[alert.severity] ?? severityMap.low
                          return (
                            <div key={i} className="rounded-xl p-4" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                              <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: colors.dot }} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-foreground">{alert.label}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                      style={{ background: `${colors.dot}20`, color: colors.dot }}>
                                      {colors.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">{alert.detail}</p>
                                  <div className="flex items-start gap-2 text-xs rounded-lg px-3 py-2" style={{ background: `${colors.dot}10` }}>
                                    <Zap className="h-3 w-3 shrink-0 mt-0.5" style={{ color: colors.dot }} />
                                    <span style={{ color: colors.dot, fontWeight: 600 }}>Suggested action: </span>
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
                    <div className="rounded-2xl p-6" style={{ background: "rgba(2,132,199,0.04)", border: "2px solid rgba(2,132,199,0.2)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg" style={{ background: "rgba(2,132,199,0.1)" }}>
                          <Zap className="h-4 w-4" style={{ color: BLUE }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>#1 Recommended Action This Week</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{report.topAction.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{report.topAction.detail}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold" style={{ color: "#16A34A" }}>📈 {report.topAction.impact}</span>
                        <Button style={{ background: BLUE, color: "#ffffff", fontWeight: 600 }} onClick={() => window.location.href = "/contact"}>
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
        </div>{/* max-w-5xl */}
        </div>
      </section>

      {/* Features */}
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
              { icon: <MapPin className="h-6 w-6" />,  title: "Connected to Your Data",  desc: "Links directly to your POS, inventory, and booking systems. No manual exports, no spreadsheets." },
              { icon: <Clock className="h-6 w-6" />,   title: "Weekly AI Digest",         desc: "Every Monday morning, a plain-English summary of what happened, what's wrong, and exactly what to do about it." },
              { icon: <Star className="h-6 w-6" />,    title: "Specific, Not Generic",    desc: "Recommendations reference your actual numbers — not industry averages or generic best practices." },
            ].map((f, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 text-center">
                  <div className="mx-auto mb-4 p-3 rounded-xl w-fit" style={{ background: "rgba(14,165,233,0.1)", color: BLUE }}>{f.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-20" style={{ background: BLUE }}>
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
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
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