"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  ArrowRight, Download, TrendingUp, Users, DollarSign, Calendar,
  ShoppingBag, Scissors, Coffee, Store, Utensils, CheckCircle, Zap,
  BarChart2, Brain, Code2, ShoppingCart, Briefcase, Sparkles, FileText
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  StandardBarChart, StandardHorizontalBarChart, HeatMapChart, LocationMapChart,
  BubbleChart, RadarChart, CalendarHeatmap, FunnelChart,
  CustomerSegmentChart, HourlyBarChart, RevenueComboChart, MetricsTable,
} from "@/components/standardized-charts"
import { ROICalculator } from "@/components/roi-calculator"

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Category = "cafe" | "retail" | "restaurant" | "salon" | "saas" | "ecommerce" | "agency"
type ChartTab = "overview" | "sales" | "customers"
type MainTab  = "reporting" | "digest" | "analyst"

interface KPI       { label: string; current: string; prev: string; delta: string; up: boolean }
interface Win       { metric: string; value: string; detail: string; icon: string }
interface Alert     { label: string; severity: string; detail: string; action: string }
interface AnalystQA { id: string; q: string; thinking: string; answer: string; honest?: boolean; impact?: string }

// ─── REPORTING METRICS ────────────────────────────────────────────────────────
const metricsData: Record<Category, { revenue: { value: string; change: string }; customers: { value: string; change: string }; orders: { value: string; change: string }; avgOrder: { value: string; change: string } }> = {
  cafe:       { revenue: { value: "$24,500", change: "+15%" }, customers: { value: "1,250",  change: "+8%"  }, orders: { value: "3,450", change: "+12%" }, avgOrder: { value: "$32.50", change: "+5%"  } },
  retail:     { revenue: { value: "$78,900", change: "+10%" }, customers: { value: "2,780",  change: "+12%" }, orders: { value: "4,120", change: "+8%"  }, avgOrder: { value: "$45.75", change: "+3%"  } },
  restaurant: { revenue: { value: "$52,300", change: "+18%" }, customers: { value: "1,850",  change: "+15%" }, orders: { value: "3,920", change: "+20%" }, avgOrder: { value: "$38.25", change: "+7%"  } },
  salon:      { revenue: { value: "$31,200", change: "+12%" }, customers: { value: "420",    change: "+9%"  }, orders: { value: "840",   change: "+14%" }, avgOrder: { value: "$75.50", change: "+6%"  } },
  saas:       { revenue: { value: "$46,500", change: "+28%" }, customers: { value: "208",    change: "+18%" }, orders: { value: "1,840", change: "+24%" }, avgOrder: { value: "$223",   change: "+8%"  } },
  ecommerce:  { revenue: { value: "$55,600", change: "+14%" }, customers: { value: "3,890",  change: "+21%" }, orders: { value: "5,240", change: "+18%" }, avgOrder: { value: "$68.40", change: "+6%"  } },
  agency:     { revenue: { value: "$88,200", change: "+16%" }, customers: { value: "20",     change: "+12%" }, orders: { value: "48",    change: "+14%" }, avgOrder: { value: "$4,120", change: "+8%"  } },
}

// ─── WEEKLY REPORT DATA ───────────────────────────────────────────────────────
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
      { label: "Revenue",   current: "$24,500", prev: "$21,300", delta: "+15%", up: true  },
      { label: "Customers", current: "1,250",   prev: "1,157",   delta: "+8%",  up: true  },
      { label: "Avg. Order",current: "$32.50",  prev: "$28.30",  delta: "+15%", up: true  },
      { label: "Waste Cost",current: "$340",    prev: "$280",    delta: "+21%", up: false },
    ],
    topAction: { title: "Launch a Wednesday Afternoon Special", detail: "Your data shows consistent afternoon drop-off mid-week. A 2-for-1 coffee promotion between 2–4pm on Wednesdays could recover $800–$1,200 in lost weekly revenue based on your average ticket size.", impact: "$1,000 est. weekly recovery" },
  },
  retail: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 82, healthLabel: "Good", healthColor: "#16A34A",
    summary: "Solid week overall with Electronics leading the charge. Inventory levels on seasonal apparel are becoming a cash flow concern — action needed before end of month.",
    wins: [
      { metric: "Electronics Sales", value: "+22%",   detail: "Laptop and accessories category outperformed forecast by $4,200 this week", icon: "💻" },
      { metric: "New Customers",     value: "148",    detail: "Highest new customer acquisition in 8 weeks — Saturday traffic up 30%",     icon: "👥" },
      { metric: "Avg. Transaction",  value: "$45.75", detail: "Bundle promotion on accessories drove 3% uplift in basket size",             icon: "🛒" },
    ],
    alerts: [
      { label: "Seasonal Apparel Overstock",  severity: "high",   detail: "Winter jackets at 68% of stock remaining with only 3 weeks of season left. $12,400 tied up.", action: "Mark down 20% immediately — clearing at margin beats holding dead stock" },
      { label: "Friday Evening Understaffed", severity: "medium", detail: "Checkout wait times up 8 mins on Friday 5–7pm. 3 customers abandoned carts.", action: "Add 1 staff member Friday evenings for next 4 weeks" },
      { label: "Top SKU Stockout Risk",       severity: "low",    detail: "Blue wireless earbuds at 4 units remaining — avg weekly sell rate is 6 units.", action: "Reorder immediately — 2 week lead time from supplier" },
    ],
    kpis: [
      { label: "Revenue",   current: "$78,900", prev: "$71,700", delta: "+10%", up: true  },
      { label: "Customers", current: "2,780",   prev: "2,482",   delta: "+12%", up: true  },
      { label: "Avg. Order",current: "$45.75",  prev: "$44.40",  delta: "+3%",  up: true  },
      { label: "Dead Stock",current: "$12,400", prev: "$8,200",  delta: "+51%", up: false },
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
      { label: "Revenue",    current: "$52,300", prev: "$44,300", delta: "+18%",  up: true  },
      { label: "Covers",     current: "1,850",   prev: "1,609",   delta: "+15%",  up: true  },
      { label: "Avg. Spend", current: "$38.25",  prev: "$35.75",  delta: "+7%",   up: true  },
      { label: "Labour %",   current: "34%",     prev: "29%",     delta: "+5pp",  up: false },
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
      { label: "Treatment Room Underused", severity: "low",    detail: "Scalp treatment bookings at 2/week vs 8-slot capacity. High-margin service sitting idle.", action: "Feature scalp treatments in next email campaign with intro pricing" },
    ],
    kpis: [
      { label: "Revenue",        current: "$31,200", prev: "$27,900", delta: "+12%", up: true  },
      { label: "Clients Served", current: "420",     prev: "385",     delta: "+9%",  up: true  },
      { label: "Avg. Service",   current: "$75.50",  prev: "$71.20",  delta: "+6%",  up: true  },
      { label: "Empty Slots",    current: "14 hrs",  prev: "9 hrs",   delta: "+56%", up: false },
    ],
    topAction: { title: "Fill Thursday Gaps — $1,050/Week Sitting Idle", detail: "14 empty chair-hours every Thursday at your average $75 service rate = $1,050 weekly in uncaptured revenue. A simple Thursday loyalty text to your client list could fill 60–70% of those slots within 2 weeks.", impact: "$630–$735 weekly recovery" },
  },
  saas: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 88, healthLabel: "Strong", healthColor: "#16A34A",
    summary: "Strong expansion week — MRR crossed $46K for the first time. Trial-to-paid conversion held at 27%, above your 23% target. Churn event on two Enterprise accounts needs immediate attention.",
    wins: [
      { metric: "MRR Growth",        value: "+$3,200", detail: "Net new MRR hit $3,200 this week — best week in 3 months, driven by 12 Pro upgrades from trial", icon: "📈" },
      { metric: "Trial Activations", value: "68",      detail: "68 trials activated this week vs 51 average — LinkedIn campaign driving higher-intent signups", icon: "🚀" },
      { metric: "Annual Upsells",    value: "9 deals", detail: "9 monthly-to-annual conversions at an average of $180 ARR uplift each — email nudge sequence working", icon: "💰" },
    ],
    alerts: [
      { label: "2 Enterprise Churns",   severity: "high",   detail: "Acme Corp and BrightPath both cancelled this week — $4,200 ARR lost. Both cited 'missing CRM integration'.", action: "Fast-track CRM integration to roadmap — 3 other Enterprise accounts have flagged the same gap" },
      { label: "Onboarding Drop-off",   severity: "medium", detail: "43% of this week's trial activations never reached the 'connect data source' step — critical activation milestone.", action: "Add in-app prompt at step 2 and trigger support chat if user is inactive for 24 hours post-signup" },
      { label: "Support Ticket Spike",  severity: "low",    detail: "Support tickets up 28% this week — 60% related to CSV export formatting changes in v2.4.", action: "Publish a CSV export migration guide and pin to top of help docs" },
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
      { metric: "Email Revenue", value: "$8,200",  detail: "Wednesday re-engagement email to lapsed 90-day customers drove $8,200 in revenue — 4.1x average", icon: "📧" },
      { metric: "AOV Increase",  value: "+$12.40", detail: "Bundle recommendation engine lifted average order value to $68.40 — best performance in 8 weeks", icon: "🛒" },
      { metric: "9pm Traffic",   value: "+44%",    detail: "9–10pm now your single highest-volume hour — mobile traffic up 38% since new app experience", icon: "📱" },
    ],
    alerts: [
      { label: "Paid Social ROAS at 1.4x", severity: "high",   detail: "Facebook/Instagram ROAS dropped to 1.4x this week vs 2.8x target. $6,400 spent with only $9,200 attributed revenue.", action: "Pause underperforming ad sets and reallocate budget to email and organic — review creative by Friday" },
      { label: "Cart Abandonment Up 8%",   severity: "medium", detail: "Checkout abandonment at 72% this week vs 64% average. Spike started Tuesday after shipping threshold change.", action: "A/B test reverting the free shipping threshold from $75 back to $60 for 2 weeks" },
      { label: "Low Inventory on Top SKUs",severity: "low",    detail: "3 of your top 10 SKUs by revenue have under 2 weeks of stock remaining at current sell rate.", action: "Trigger reorder on SKUs #A12, #B34, #C19 — current lead time is 18 days" },
    ],
    kpis: [
      { label: "GMV",       current: "$55,600", prev: "$48,800", delta: "+14%", up: true  },
      { label: "Orders",    current: "5,240",   prev: "4,440",   delta: "+18%", up: true  },
      { label: "Avg. Order",current: "$68.40",  prev: "$64.50",  delta: "+6%",  up: true  },
      { label: "Paid ROAS", current: "1.4x",    prev: "2.6x",    delta: "-46%", up: false },
    ],
    topAction: { title: "Pause Paid Social — You're Burning $6,400 at a Loss", detail: "Your paid social campaigns spent $6,400 this week for $9,200 in attributed revenue — a 1.4x ROAS below your 2.0x break-even threshold. Pausing and reallocating 50% of that budget to email (which ran at 8.2x ROAS this week) could recover $12,000–$15,000 in net revenue this month.", impact: "$3,000–$4,500 est. net gain this month" },
  },
  agency: {
    period: "Feb 24 – Mar 2, 2025", healthScore: 91, healthLabel: "Excellent", healthColor: "#16A34A",
    summary: "Best billing week of the quarter. Two retainer renewals closed at higher rates, and the new SaaS vertical is tracking well above forecast. One utilisation bottleneck to address.",
    wins: [
      { metric: "Retainer Renewals", value: "2 at +15%", detail: "TechFlow and Meridian both renewed at 15% rate increases — first upsells in 6 months, driven by new QBR format", icon: "🤝" },
      { metric: "New Business",      value: "$18K/mo",   detail: "2 new SaaS clients signed this week totalling $18K monthly retainer — SaaS vertical now 22% of total ARR", icon: "🏆" },
      { metric: "Billable Hours",    value: "94%",       detail: "Team utilisation hit 94% this week — highest since Q2 last year. Senior team at 98% billable.", icon: "⚡" },
    ],
    alerts: [
      { label: "Junior Team Capacity Risk", severity: "high",   detail: "Junior team at 102% billable this week — overtime logged on 3 accounts. 2 deliverables running behind.", action: "Hire 1 junior analyst immediately or reduce junior scope on Project Vega — risk of quality drop and burnout" },
      { label: "Reporting Bottleneck",      severity: "medium", detail: "Monthly reports for 6 clients all due next Friday. Currently estimated at 28 hours of work vs 18 hours available.", action: "Use AI-assisted report templates for lower-tier clients — free up 8 hours of senior analyst time" },
      { label: "Client at Risk — DataCorp", severity: "low",    detail: "DataCorp NPS dropped to 32 this month after delayed deliverable. Marked as churn risk in CRM.", action: "Schedule a proactive check-in call this week and offer a complimentary Q2 strategy session" },
    ],
    kpis: [
      { label: "Monthly Revenue",current: "$88,200", prev: "$76,100", delta: "+16%",  up: true  },
      { label: "Active Clients", current: "20",      prev: "18",      delta: "+11%",  up: true  },
      { label: "Avg. Retainer",  current: "$4,120",  prev: "$3,840",  delta: "+7%",   up: true  },
      { label: "Team Util.",     current: "94%",     prev: "82%",     delta: "+12pp", up: true  },
    ],
    topAction: { title: "Hire or Offload Now — Junior Team at 102% for 3 Weeks", detail: "Your junior team has been over 95% utilised for 3 consecutive weeks. Industry data shows delivery quality drops materially above 90% sustained utilisation. You have 2 proposals out totalling $24K/mo — if both close, you're at 130% capacity with current headcount. A part-time contractor hire at $4,000/mo protects $88K in existing revenue.", impact: "Protects $88K/mo in delivery quality" },
  },
}

// ─── AI ANALYST Q&A DATA ──────────────────────────────────────────────────────
const analystData: Record<Category, AnalystQA[]> = {
  saas: [
    { id: "churn",     q: "Why did churn spike last month?",                    thinking: "Querying churn events, segmenting by plan tier and account tenure...",                   answer: "Two Enterprise accounts drove most of it — Acme Corp and BrightPath, totalling $4,200 ARR. Both cited missing CRM integration in their exit data. Your remaining churn was 8 accounts averaging 8.2 months LTV, which points to a pricing-fit issue at the Pro tier after the trial period ends.", impact: "$4,200 ARR lost — CRM gap is flagged by 3 more Enterprise accounts" },
    { id: "trials",    q: "Which trials are most likely to convert this week?", thinking: "Analysing activation milestones and historical conversion patterns...",                  answer: "Users who connect a data source within 48 hours of signup convert at 41% — vs 12% for those who don't. Right now, 23 active trials are past the 48-hour mark without hitting that milestone. Reaching those 23 accounts today is your highest-leverage action this week.", impact: "23 high-intent trials — ~9 likely paid conversions at current rates" },
    { id: "expansion", q: "Where's my best upsell opportunity right now?",      thinking: "Scanning usage data against plan limits for upgrade signals...",                         answer: "9 monthly accounts have been on the same plan for 6+ months and are consistently using above the 80th percentile for their tier — they're outgrowing it but haven't upgraded. An annual upsell pitch to these 9 accounts represents roughly $8,100 in potential ARR uplift with no new acquisition cost.", impact: "~$8,100 ARR expansion available from existing accounts" },
    { id: "ads",       q: "What did our paid ad spend return last quarter?",    thinking: "Searching for ad attribution data across connected integrations...",                     answer: "That data isn't in my warehouse. I can see your Stripe revenue and product usage clearly, but paid ad attribution isn't connected yet. I don't want to estimate without the data — linking your Google Ads or HubSpot account would give me the full funnel to answer this precisely.", honest: true },
  ],
  ecommerce: [
    { id: "abandon",   q: "What's driving the cart abandonment spike?",         thinking: "Cross-referencing checkout funnel data with recent config changes...",                   answer: "Abandonment jumped from 64% to 72% starting Tuesday — the exact day you raised the free shipping threshold from $60 to $75. Orders in the $60–$74 range dropped 38% in that window. Customers are hitting the new threshold and leaving instead of adding more to qualify.", impact: "Reverting the threshold could recover ~$6,000/week in lost GMV" },
    { id: "channel",   q: "Which acquisition channel is actually making money?", thinking: "Comparing revenue, AOV, and LTV across acquisition sources...",                         answer: "Email is your best channel — 8.2x ROAS on last week's re-engagement campaign. Organic search customers have the highest LTV at $284 average. Paid social is currently at 1.4x ROAS, well below your 2.0x break-even. The recommendation is clear: pause paid social, double down on email segmentation.", impact: "Reallocating $3,200 from paid social to email = est. $8,000+ net gain" },
    { id: "churn",     q: "Which customers are about to go quiet?",             thinking: "Running RFM scoring and lapsed-customer segmentation...",                               answer: "412 customers haven't purchased in 60–90 days but were buying every 3–4 weeks before that. Their average AOV was $71. Your re-engagement sequences have historically driven 18% reactivation on this cohort — that's 74 likely orders sitting in your database right now.", impact: "~74 reactivations at $71 AOV = $5,254 potential recovery" },
    { id: "cac",       q: "What's my customer acquisition cost by channel?",    thinking: "Looking for ad spend data in connected integrations...",                                answer: "I can see order volume and revenue by acquisition source, but your ad spend accounts aren't connected — so I can't calculate true CAC. I know what's driving revenue, not what you're spending to get there. Connecting your ad accounts would close that gap and give you clean ROAS and CAC in one place.", honest: true },
  ],
  agency: [
    { id: "risk",     q: "Which clients are at churn risk right now?",          thinking: "Analysing NPS scores, invoice payment delays, and communication patterns...",            answer: "DataCorp is your highest-risk account. NPS dropped to 32 last month after a delayed deliverable, and their last invoice took 47 days to pay vs your 15-day average. BrightMedia has gone quiet — no response to the last two check-ins. Together these two represent $11,200 in monthly retainer.", impact: "$11,200/month at risk — a proactive call this week could change that" },
    { id: "margin",   q: "Where are we bleeding margin?",                       thinking: "Comparing scoped hours against actual logged hours per project...",                      answer: "Project Vega is underwater — scoped at 40 hours, already logged 67, with one deliverable still to go. That's a $2,700 overrun at your blended rate. Three other fixed-fee projects are trending 20% over hours. Importantly: your retainer accounts are fine. The margin erosion is entirely in fixed-fee project work.", impact: "$2,700 overrun on Vega alone — scope discipline on fixed-fee is the fix" },
    { id: "capacity", q: "Can we take on another retainer right now?",          thinking: "Mapping current team utilisation against available headcount capacity...",               answer: "Senior team is at 94% billable — effectively at ceiling. Junior team is at 102% with overtime already logged this week. If both open proposals close ($24K/month combined), you'd hit roughly 130% capacity. You can absorb one $8–10K retainer if it's senior-light. Both would require a hire.", impact: "1 junior hire needed before taking on both proposals" },
    { id: "ltv",      q: "What's the average lifetime value of a client?",      thinking: "Querying historical contract durations and total revenue per account...",                answer: "I can calculate LTV for clients onboarded since your integration date, but some older accounts predate the current billing system — so my data is incomplete for true lifetime figures. What I can say: your current active cohort averages 14 months tenure at $3,840/month. Want me to work with that, or would connecting your CRM give me the historical data?", honest: true },
  ],
  cafe: [
    { id: "staffing",   q: "When should I add more staff?",              thinking: "Cross-referencing transaction density with scheduled staff hours...",                    answer: "Your 8–10am window runs at 92% capacity Monday through Friday — that's where you're stretched. Saturday 10am–12pm is your second pinch point. Wednesday 2–5pm consistently runs below 40% — you're overstaffed then. The net shift: one extra person on morning rush, one fewer on Wednesday afternoon. Cost-neutral, better coverage where it matters.", impact: "Zero net cost — same hours redistributed to peak demand" },
    { id: "topproduct", q: "What's my most profitable item?",            thinking: "Calculating contribution margin per product line after cost of goods...",               answer: "Seasonal lattes lead in revenue, but your cortados have the best margin per cup — $4.20 vs $3.10 for regular drip. The real lever is pastry attachment: orders that include a food item average $12 more per ticket. Your current attachment rate is 34% — pushing that to 45% is worth approximately $800/week at current traffic.", impact: "Pastry attachment at 45% = +$800/week with zero new customers" },
    { id: "wednesday",  q: "Why did Wednesday afternoon revenue drop?",  thinking: "Isolating Wednesday transaction data and correlating with external events...",           answer: "Wednesday 2–5pm traffic has fallen 31% over 3 consecutive weeks. The timing aligns exactly with a new café opening 400m away — I can see it in your transaction timestamps. Crucially, your morning and evening Wednesday numbers are unaffected. This is a targeted afternoon competition issue, not a general decline.", impact: "A Wednesday afternoon promotion could recover $800–$1,200/week" },
    { id: "loyal",      q: "What do my most loyal customers spend?",     thinking: "Segmenting customers by visit frequency and calculating spend by tier...",              answer: "Customers visiting 4+ times per month — your top 18% — account for 61% of total revenue. Their average ticket is $38.20 vs $24.10 for occasional visitors. You have 142 of them. Keeping that segment is dramatically more valuable than acquiring new customers at equivalent cost.", impact: "Top 18% of customers generate 61% of revenue — protect them first" },
  ],
  retail: [
    { id: "reorder", q: "What should I reorder this week?",               thinking: "Comparing current stock levels against average weekly sell rates...",                    answer: "Three SKUs need immediate action: Blue wireless earbuds (4 units remaining, sells 6/week, 14-day lead time), Women's running shoes size 8 (2 units, sells 4/week), and the bamboo travel mug (8 units, sells 12/week). At current sell rates you'll stock out on all three before the next shipment arrives.", impact: "Stockout on 3 SKUs = ~$2,400 in lost sales this month" },
    { id: "margin",  q: "Which products are actually making me money?",   thinking: "Calculating margin by product category after COGS and return rate...",                 answer: "Electronics have the highest revenue but your accessories category has the best margin — 58% vs 34% for electronics. Winter apparel is your worst performer right now because of the upcoming markdown pressure. Your bundle promotions are working: bundled transactions run 31% higher margin than single-item sales.", impact: "Accessories at 58% margin — under-promoted relative to electronics" },
    { id: "traffic", q: "When is peak traffic and are we staffed for it?",thinking: "Mapping transaction timestamps against staff scheduling data...",                       answer: "Peak is Saturday 11am–2pm at 2.8x your average hourly volume, and Friday 5–7pm. Friday evening is currently understaffed — checkout wait times spiked to 8+ minutes and 3 transactions were abandoned last Friday. Saturday coverage is fine. One extra person on Friday evenings solves the bottleneck.", impact: "Friday fix: one staff member, ~$140/week in recovered abandoned sales" },
    { id: "ltv",     q: "What's the lifetime value of my average customer?",thinking: "Searching for multi-year customer transaction history...",                            answer: "My data only goes back 14 months from your integration date — not enough to calculate true LTV for a retail business with longer repurchase cycles. What I can tell you from available data: customers who made 2+ purchases average $312 in 12-month spend. Want me to run that segment analysis instead?", honest: true },
  ],
  restaurant: [
    { id: "staffing", q: "Are we overstaffed on slow nights?",             thinking: "Comparing scheduled FOH staff against covers served by day of week...",               answer: "Monday dinner is your clearest overstaffing pattern — 6 FOH staff scheduled but average covers are 40% of Friday levels, which only needs a 3-person shift. This has held consistently for 6 weeks. That's $420/week in unnecessary labour cost, or $1,680/month. Tuesday lunch shows a similar pattern at smaller scale.", impact: "$1,680/month recoverable — no service impact based on 6 weeks of cover data" },
    { id: "menu",     q: "Which menu items should I reconsider?",          thinking: "Cross-referencing item sales velocity against gross margin per dish...",               answer: "Your mushroom risotto is ordered 4x/week but runs at 71% food cost — worst performer by margin. The chicken piccata sells 3x better at 28% food cost. Your prix-fixe is the standout at 68% margin. The risotto is occupying menu space and actively costing you. Reformulate or remove it.", impact: "Removing or repricing risotto saves ~$180/week in food cost" },
    { id: "weekend",  q: "What's actually driving weekend performance?",   thinking: "Attributing weekend revenue lift to specific operational factors...",                  answer: "Three things are converging: prix-fixe adoption hit 44% on Friday and Saturday (up from 18% a month ago), lunch table turnover improved 12 minutes, and the Saturday waitlist is driving earlier reservations. The prix-fixe is the single biggest lever — it runs at 68% higher margin than à la carte. Worth expanding its promotion.", impact: "Prix-fixe at 44% adoption is your highest-margin growth driver" },
    { id: "foodcost", q: "What's our food cost trend over the last year?", thinking: "Pulling food cost history from connected inventory system...",                         answer: "Your inventory system was connected 4 months ago, so I only have data from that point. Over those 4 months food cost has ranged from 29% to 34%, with the February spike tied to a protein price increase from your main supplier. I can track the trend from here, but I can't give you the full year without more historical data.", honest: true },
  ],
  salon: [
    { id: "thursday", q: "Why are Thursdays consistently slow?",           thinking: "Analysing Thursday booking patterns vs other weekdays over 12 weeks...",              answer: "Thursday utilisation sits at 52% — 14 empty chair-hours every week. Looking at your booking source data, Thursday traffic is heavily walk-in rather than pre-booked. Your regulars, who book in advance, strongly cluster on Tuesday and Wednesday. A targeted Thursday offer sent to your existing client list would be the fastest fix.", impact: "Filling 60% of Thursday gaps = $630–$735/week at your avg service rate" },
    { id: "stylist",  q: "Which stylist is driving the most value?",       thinking: "Aggregating service revenue, retail attachment, and rebooking rates by stylist...",   answer: "Maya leads in total revenue at $8,400 this month, with the highest rebooking rate on the team at 94%. She's also your top retail attachment performer. Jordan has strong new-client volume but a 68% rebooking rate — worth understanding if that's a satisfaction issue or a different client type. Maya's approach is worth formalising across the team.", impact: "Maya's 94% rebook vs 78% team average — her process is the benchmark" },
    { id: "services", q: "What services should I promote more?",           thinking: "Comparing service margin, booking density, and treatment room utilisation...",         answer: "Scalp treatments are your highest-margin service but booked at just 2x/week against an 8-slot capacity — that's 75% of a high-margin service sitting idle. Balayage is your fastest-growing revenue line, up 24% this month at $185 average. Promoting scalp treatments in your next email with intro pricing is the easiest near-term revenue unlock.", impact: "6 more scalp bookings/week = ~$900 in additional weekly revenue" },
    { id: "cac",      q: "What does it cost to acquire a new client?",     thinking: "Looking for marketing spend data in connected accounts...",                            answer: "I know how many new clients you're acquiring and their first-visit value, but your marketing spend isn't connected — so true CAC isn't calculable from what I have. What I can tell you: new client volume dropped to 3 this week vs a 9-week average of 8.5. Connecting your Google Business or ad accounts would let me track CAC properly going forward.", honest: true },
  ],
}

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const businessCategories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "saas",       label: "SaaS",         icon: <Code2        className="h-4 w-4" /> },
  { id: "ecommerce",  label: "E-commerce",   icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "agency",     label: "Agency",       icon: <Briefcase    className="h-4 w-4" /> },
  { id: "cafe",       label: "Café",         icon: <Coffee       className="h-4 w-4" /> },
  { id: "retail",     label: "Retail Store", icon: <Store        className="h-4 w-4" /> },
  { id: "restaurant", label: "Restaurant",   icon: <Utensils     className="h-4 w-4" /> },
  { id: "salon",      label: "Beauty Salon", icon: <Scissors     className="h-4 w-4" /> },
]

const severityMap: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  high:   { bg: "rgba(220,38,38,0.04)",  border: "rgba(220,38,38,0.2)",   dot: "#DC2626", label: "High Priority" },
  medium: { bg: "rgba(234,179,8,0.04)",  border: "rgba(234,179,8,0.2)",   dot: "#CA8A04", label: "Medium"        },
  low:    { bg: "rgba(14,165,233,0.04)", border: "rgba(14,165,233,0.15)", dot: "#0284C7", label: "Low"           },
}

const BLUE = "#0284C7"

// ─── CHART CARD ───────────────────────────────────────────────────────────────
function ChartCard({ title, description, children, flushChart }: {
  title: string; description?: string; children: React.ReactNode; flushChart?: boolean
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    }}>
      <div className="px-4 pt-3.5 pb-3 flex items-start justify-between border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div>
          <p className="font-semibold text-sm text-foreground">{title}</p>
          {description && <p className="text-xs mt-0.5 text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className={flushChart ? "pb-2 pt-2" : "px-4 pb-4 pt-2"}>{children}</div>
    </div>
  )
}

// ─── AI ANALYST PANEL ─────────────────────────────────────────────────────────
function AnalystPanel({ category }: { category: Category }) {
  const questions = analystData[category]
  const [activeId, setActiveId] = useState(questions[0].id)
  const [phase, setPhase] = useState<"thinking" | "typing" | "done">("thinking")
  const [displayedText, setDisplayedText] = useState("")
  const chatRef = useRef<HTMLDivElement>(null)

  const active = questions.find(q => q.id === activeId) ?? questions[0]

  useEffect(() => {
    setDisplayedText("")
    setPhase("thinking")
    const t = setTimeout(() => setPhase("typing"), 1500)
    return () => clearTimeout(t)
  }, [activeId])

  useEffect(() => {
    if (phase !== "typing") return
    let i = 0
    const answer = active.answer
    const iv = setInterval(() => {
      i++
      if (i <= answer.length) {
        setDisplayedText(answer.slice(0, i))
      } else {
        clearInterval(iv)
        setPhase("done")
      }
    }, 13)
    return () => clearInterval(iv)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [displayedText, phase])

  const isAnswering = phase === "typing" || phase === "done"

  return (
    <div className="grid md:grid-cols-5 gap-5">
      <div className="md:col-span-2 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sample Questions</p>
        {questions.map((qa) => (
          <button key={qa.id} onClick={() => activeId !== qa.id && setActiveId(qa.id)}
            className="w-full text-left rounded-xl p-3.5 text-sm transition-all duration-200"
            style={activeId === qa.id
              ? { background: BLUE, color: "#ffffff", boxShadow: "0 4px 14px rgba(2,132,199,0.3)" }
              : { background: "hsl(var(--background))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }
            }>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[10px] opacity-60">{activeId === qa.id ? "▶" : "○"}</span>
              <span className={activeId === qa.id ? "font-medium leading-snug" : "leading-snug"}>{qa.q}</span>
            </div>
          </button>
        ))}
        <p className="text-xs text-muted-foreground pt-2 italic leading-relaxed">
          Answers reference structured data from your warehouse — not trained responses.
        </p>
      </div>

      <div className="md:col-span-3">
        <div className="rounded-2xl overflow-hidden h-full"
          style={{ background: "#0B1220", border: "1px solid rgba(14,165,233,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}>
          <div className="flex items-center gap-2.5 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/70">RevLens AI</span>
            <span className="text-xs text-white/25 ml-1">· connected to your data warehouse</span>
          </div>
          <div ref={chatRef} className="p-4 space-y-4 overflow-y-auto"
            style={{ height: "280px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm text-white" style={{ background: BLUE }}>
                {active.q}
              </div>
            </div>
            {phase === "thinking" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-sky-400 block"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }} />
                      ))}
                    </div>
                    <span className="text-xs text-white/35">{active.thinking}</span>
                  </div>
                </div>
              </div>
            )}
            {isAnswering && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[92%]"
                  style={active.honest
                    ? { background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
                  }>
                  {active.honest && (
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
                        ⚠ Not in my warehouse
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                    {displayedText}
                    {phase === "typing" && (
                      <span className="inline-block w-0.5 h-[1.1em] bg-sky-400 ml-0.5 animate-pulse align-text-bottom" />
                    )}
                  </p>
                </div>
              </div>
            )}
            {phase === "done" && active.impact && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className="flex justify-start">
                <div className="rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                  style={{ background: "rgba(22,163,74,0.12)", color: "#4ADE80", border: "1px solid rgba(22,163,74,0.2)" }}>
                  <TrendingUp className="h-3 w-3" />
                  {active.impact}
                </div>
              </motion.div>
            )}
          </div>
          <div className="px-4 py-2.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              Each answer is derived from your actual data — the AI tells you when it doesn&apos;t have enough to answer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function PlatformDemoContent({ showCTA = true }: { showCTA?: boolean }) {
  const [mainTab, setMainTab]   = useState<MainTab>("analyst")
  const [chartTab, setChartTab] = useState<ChartTab>("overview")
  const [category, setCategory] = useState<Category>("saas")
  const [mounted, setMounted]   = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const metrics = metricsData[category]
  const report  = weeklyReports[category]

  const mainTabs: { id: MainTab; icon: React.ReactNode; title: string; sub: string }[] = [
    { id: "analyst",   icon: <Sparkles  className="h-6 w-6" />, title: "AI Analyst",    sub: "Ask questions, get answers" },
    { id: "reporting", icon: <BarChart2 className="h-6 w-6" />, title: "Reporting",     sub: "Live metrics & charts"      },
    { id: "digest",    icon: <FileText  className="h-6 w-6" />, title: "Weekly Report", sub: "Plain-English AI digest"    },
  ]

  return (
    <>
      {/* ── MAIN INTERACTIVE SECTION ── */}
      <section className="w-full py-10 md:py-16 section-base">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">

            {/* 3-tab switcher */}
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto">
              {mainTabs.map((t) => (
                <button key={t.id} onClick={() => setMainTab(t.id)}
                  className="rounded-2xl p-4 text-left transition-all duration-200"
                  style={{
                    background:  mainTab === t.id ? BLUE : "hsl(var(--card))",
                    border:      mainTab === t.id ? "none" : "1px solid hsl(var(--border))",
                    boxShadow:   mainTab === t.id ? "0 8px 30px rgba(2,132,199,0.35)" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                  <div style={{ color: mainTab === t.id ? "rgba(255,255,255,0.85)" : BLUE }} className="mb-2.5">{t.icon}</div>
                  <div className="font-bold text-base mb-0.5"
                    style={{ color: mainTab === t.id ? "#ffffff" : "hsl(var(--foreground))" }}>{t.title}</div>
                  <div className="text-xs"
                    style={{ color: mainTab === t.id ? "rgba(255,255,255,0.6)" : "hsl(var(--muted-foreground))" }}>{t.sub}</div>
                </button>
              ))}
            </div>

            {/* Business type selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <p className="w-full text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Select Business Type</p>
              {businessCategories.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={category === cat.id
                    ? { background: BLUE, color: "#ffffff", boxShadow: "0 2px 8px rgba(2,132,199,0.3)" }
                    : { background: "hsl(var(--background))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }
                  }>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* ══ REPORTING TAB ══ */}
              {mainTab === "reporting" && (
                <motion.div key="reporting" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <div className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(14,165,233,0.2)", background: "hsl(var(--card))", boxShadow: "0 8px 32px rgba(2,132,199,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }} />
                      <div className="relative flex items-center justify-between p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl" style={{ background: "rgba(14,165,233,0.1)", color: BLUE, border: "1px solid rgba(14,165,233,0.15)" }}>
                            {businessCategories.find(c => c.id === category)?.icon}
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-foreground">{businessCategories.find(c => c.id === category)?.label} Reporting</h2>
                            <p className="text-xs text-muted-foreground">Sample data — Feb 2025</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.15)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Preview
                          </div>
                          <Button variant="outline" size="sm" className="btn-secondary hidden md:flex">
                            <Download className="mr-2 h-4 w-4" /> Export
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* KPI cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                      {[
                        { label: category === "saas" ? "MRR" : "Revenue",                                                                            value: metrics.revenue.value,   change: metrics.revenue.change,   icon: <DollarSign className="h-4 w-4" />, accent: "#0EA5E9" },
                        { label: category === "saas" ? "Accounts" : category === "agency" ? "Clients" : "Customers",                                 value: metrics.customers.value, change: metrics.customers.change, icon: <Users      className="h-4 w-4" />, accent: "#8B5CF6" },
                        { label: category === "salon" ? "Appointments" : category === "saas" ? "Active Users" : category === "agency" ? "Projects" : "Orders", value: metrics.orders.value, change: metrics.orders.change, icon: category === "salon" ? <Calendar className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />, accent: "#F59E0B" },
                        { label: category === "salon" ? "Avg. Service" : category === "saas" ? "ARPU" : category === "agency" ? "Avg. Retainer" : "Avg. Order", value: metrics.avgOrder.value, change: metrics.avgOrder.change, icon: <DollarSign className="h-4 w-4" />, accent: "#10B981" },
                      ].map((m, i) => (
                        <motion.div key={`${category}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                          className="relative rounded-xl p-4 overflow-hidden hover:shadow-md transition-shadow"
                          style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: m.accent }} />
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                            <div className="p-1.5 rounded-lg" style={{ background: `${m.accent}12`, color: m.accent }}>{m.icon}</div>
                          </div>
                          <p className="text-2xl font-bold text-foreground tracking-tight">{m.value}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A" }}>
                              <TrendingUp className="h-3 w-3" />{m.change}
                            </span>
                            <span className="text-xs text-muted-foreground">vs last month</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chart tabs */}
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

                    {/* Charts */}
                    {mounted && (
                      <motion.div key={`${category}-${chartTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                        className="p-5 space-y-4 bg-muted/[0.4] rounded-b-2xl">
                        {chartTab === "overview" && (
                          <>
                            <ChartCard title={`Monthly ${category === "saas" ? "MRR" : category === "agency" ? "Billings" : category === "ecommerce" ? "GMV" : "Revenue"} & Growth`} description="Monthly revenue trend">
                              <div className="w-full h-[320px]"><RevenueComboChart category={category} /></div>
                            </ChartCard>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-3"><ChartCard title="Segment Revenue Trends" description="Revenue by customer segment over time"><div className="w-full h-[260px]"><BubbleChart category={category} /></div></ChartCard></div>
                              <div className="md:col-span-2"><ChartCard title="Revenue Breakdown" description="Distribution by channel / segment"><div className="w-full h-[260px]"><MetricsTable category={category} /></div></ChartCard></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ChartCard title="Customer Segments" description="Share by customer type"><div className="w-full h-[220px]"><CustomerSegmentChart category={category} /></div></ChartCard>
                              <ChartCard title="Peak Activity Hours" description="Demand by hour of day"><div className="w-full h-[220px]"><HourlyBarChart category={category} /></div></ChartCard>
                            </div>
                          </>
                        )}
                        {chartTab === "sales" && (
                          <>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-3"><ChartCard title="Revenue by Channel / Location" description="Performance breakdown"><div className="w-full h-[300px]"><LocationMapChart category={category} /></div></ChartCard></div>
                              <div className="md:col-span-2"><ChartCard title="Conversion Funnel" description="From awareness to retained customer"><div className="w-full h-[300px]"><FunnelChart category={category} /></div></ChartCard></div>
                            </div>
                            <ChartCard title="Activity Intensity — Day × Hour" description="Colour = relative volume (dark = higher)">
                              <div className="w-full h-[280px] overflow-auto"><HeatMapChart category={category} /></div>
                            </ChartCard>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ChartCard title={category === "saas" ? "Revenue by Plan" : "Top Categories"} description="Revenue by category / tier"><div className="w-full h-[220px]"><StandardBarChart category={category} /></div></ChartCard>
                              <ChartCard title="Revenue Detail" description="Breakdown with volume and share"><div className="w-full h-[220px]"><MetricsTable category={category} /></div></ChartCard>
                            </div>
                          </>
                        )}
                        {chartTab === "customers" && (
                          <>
                            <ChartCard title="Cohort Retention Analysis" description="% of customers still active after N periods — darker = better retention">
                              <div className="w-full h-[220px]"><CalendarHeatmap category={category} /></div>
                            </ChartCard>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-3"><ChartCard title="Satisfaction vs Industry Benchmark" description="Your score · Benchmark = industry average"><div className="w-full h-[280px]"><RadarChart category={category} /></div></ChartCard></div>
                              <div className="md:col-span-2"><ChartCard title="Customer Mix" description="Distribution by segment"><div className="w-full h-[280px]"><CustomerSegmentChart category={category} /></div></ChartCard></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ChartCard title="Segment Growth Trends" description="Revenue by customer type over 6 months"><div className="w-full h-[220px]"><BubbleChart category={category} /></div></ChartCard>
                              <ChartCard title="Top Performers by Category" description="Ranked by revenue contribution"><div className="w-full h-[220px]"><StandardHorizontalBarChart category={category} /></div></ChartCard>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t"
                      style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                      <p className="text-xs text-muted-foreground">Demo reporting — in the full version all charts connect to your real data in real time.</p>
                      <Button style={{ background: BLUE, color: "#ffffff", fontWeight: 600 }} className="shadow-lg"
                        onClick={() => window.location.href = "/contact"}>
                        Book a Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══ WEEKLY REPORT TAB ══ */}
              {mainTab === "digest" && (
                <motion.div key="digest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <div className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
                    <div className="p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="h-5 w-5" style={{ color: BLUE }} />
                            <span className="text-sm font-semibold" style={{ color: BLUE }}>Weekly AI Report</span>
                          </div>
                          <h2 className="text-xl font-bold text-foreground">{businessCategories.find(c => c.id === category)?.label} — Week of {report.period}</h2>
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
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE }}>This Week vs Last Week</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {report.kpis.map((kpi: KPI, i: number) => (
                            <div key={i} className="rounded-xl p-4 text-center"
                              style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                              <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                              <p className="text-xl font-bold text-foreground">{kpi.current}</p>
                              <p className="text-xs mt-1" style={{ color: kpi.up ? "#16A34A" : "#DC2626" }}>{kpi.up ? "↑" : "↓"} {kpi.delta}</p>
                              <p className="text-xs text-muted-foreground">prev: {kpi.prev}</p>
                            </div>
                          ))}
                        </div>
                      </div>
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
                                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${colors.dot}20`, color: colors.dot }}>{colors.label}</span>
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
                        Sample report — your real digest is generated from your actual connected data every Monday morning.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══ AI ANALYST TAB ══ */}
              {mainTab === "analyst" && (
                <motion.div key="analyst" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <div className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(14,165,233,0.2)", background: "hsl(var(--card))", boxShadow: "0 8px 32px rgba(2,132,199,0.08)" }}>
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.025]" style={{ background: "linear-gradient(135deg, #0EA5E9, #6366F1)" }} />
                      <div className="relative p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-xl shrink-0" style={{ background: "rgba(14,165,233,0.1)", color: BLUE, border: "1px solid rgba(14,165,233,0.15)" }}>
                              <Sparkles className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-lg font-bold text-foreground">AI Analyst</h2>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                  style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                                  AI Plan
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground max-w-lg">
                                Click any question below to see how your AI analyst responds — including cases where it doesn&apos;t have the data and tells you honestly.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
                            style={{ background: "rgba(22,163,74,0.08)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.15)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {businessCategories.find(c => c.id === category)?.label} Data
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-muted/[0.3] rounded-b-2xl">
                      <AnalystPanel key={category} category={category} />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t"
                      style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
                      <p className="text-xs text-muted-foreground">
                        The AI Analyst is trained on your semantic model — it knows the shape of your business, not just the data.
                      </p>
                      <Button style={{ background: BLUE, color: "#ffffff", fontWeight: 600 }} className="shadow-lg shrink-0"
                        onClick={() => window.location.href = "/contact"}>
                        Get AI Analyst Access <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                ROI Calculator
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
                See what RevLens could return for your business
              </h2>
              <p className="mt-2 text-muted-foreground md:text-lg">Adjust the inputs below to estimate your potential impact</p>
            </div>
          </AnimateOnScroll>
          <ROICalculator />
        </div>
      </section>

      {/* ── THREE LAYERS FEATURE STRIP ── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Three layers of intelligence</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Each layer builds on the last — from live numbers to a weekly digest to an AI you can interrogate.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <BarChart2 className="h-6 w-6" />, title: "Live Reporting",    desc: "Your key metrics in one place, updating in real time. Revenue, retention, churn, LTV — all connected to your actual data and refreshed automatically.", highlight: false },
              { icon: <FileText  className="h-6 w-6" />, title: "Weekly AI Report",  desc: "Every Monday, a plain-English summary arrives in your inbox. Your top win, one alert to act on, and one growth opportunity — no charts to decode, no analyst needed.", highlight: false },
              { icon: <Sparkles  className="h-6 w-6" />, title: "AI Analyst",        desc: "Ask any business question in plain English. Your AI analyst queries your actual data and tells you honestly when the answer isn't there.", highlight: true },
            ].map((f, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className={`enhanced-card p-7 flex flex-col h-full ${f.highlight ? "ring-1 ring-sky-500/30" : ""}`}
                  style={f.highlight ? { background: "rgba(14,165,233,0.02)" } : {}}>
                  {f.highlight && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-3 w-fit"
                      style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                      AI Plan
                    </span>
                  )}
                  <div className="mx-auto mb-5 p-3 rounded-xl w-fit" style={{ background: "rgba(14,165,233,0.1)", color: BLUE }}>{f.icon}</div>
                  <h3 className="font-bold text-foreground text-lg mb-3 text-center">{f.title}</h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (optional) ── */}
      {showCTA && (
        <section className="w-full py-16 md:py-20" style={{ background: BLUE }}>
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Ready to See This With Your Real Data?</h2>
                <p className="text-white/80 mb-6 text-lg">
                  Book a free 30-minute demo. We&apos;ll connect RevLens to your data sources and show you your first AI report before the call ends.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button style={{ background: "#ffffff", color: BLUE, fontWeight: 600 }} onClick={() => window.location.href = "/contact"}>
                    Book a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                    onClick={() => window.location.href = "/pricing"}>
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-4">What happens in your demo</h3>
                <ul className="space-y-3">
                  {[
                    "We connect RevLens to your data sources live on the call",
                    "You see your first AI Weekly Report generated from your data",
                    "Your AI Analyst answers 3 questions about your actual business",
                    "We scope a custom plan based on your data volume and goals",
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
      )}
    </>
  )
}
