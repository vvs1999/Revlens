"use client"

import { PageLayout } from "@/components/page-layout"
import { ROICalculator } from "@/components/roi-calculator"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, BarChart, TrendingUp, Users, Database, CheckCircle, Lightbulb } from "lucide-react"
import { useState } from "react"

const services = [
  {
    id: "sales",
    icon: <BarChart className="h-6 w-6" />,
    label: "Sales Analysis",
    title: "Sales Analysis",
    subtitle: "Understand what drives your revenue",
    items: [
      "Detailed analysis of top-selling products and services",
      "Sales trends by time of day, week, and season",
      "Customer purchase patterns and frequency",
      "Pricing optimization recommendations",
      "Competitive market analysis",
    ],
    stat: { value: "+35%", label: "Average revenue increase for clients in first 6 months" },
  },
  {
    id: "inventory",
    icon: <Database className="h-6 w-6" />,
    label: "Inventory",
    title: "Inventory Optimization",
    subtitle: "Reduce waste and maximize efficiency",
    items: [
      "Stock level optimization to reduce waste",
      "Seasonal demand forecasting",
      "Automated reordering recommendations",
      "Supplier performance analysis",
      "Inventory turnover improvement strategies",
    ],
    stat: { value: "-22%", label: "Average reduction in food waste within 90 days" },
  },
  {
    id: "customers",
    icon: <Users className="h-6 w-6" />,
    label: "Customer Insights",
    title: "Customer Insights",
    subtitle: "Understand and grow your customer base",
    items: [
      "Customer segmentation and profiling",
      "Purchase behavior analysis",
      "Customer retention strategies",
      "Targeted marketing recommendations",
      "Customer feedback analysis",
    ],
    stat: { value: "+45%", label: "Average increase in repeat customer visits" },
  },
  {
    id: "growth",
    icon: <TrendingUp className="h-6 w-6" />,
    label: "Growth Strategy",
    title: "Growth Strategy",
    subtitle: "Data-driven plans for sustainable growth",
    items: [
      "Market opportunity analysis",
      "Competitive positioning strategy",
      "Revenue stream diversification",
      "Expansion planning and forecasting",
      "Long-term business sustainability models",
    ],
    stat: { value: "+28%", label: "Average year-over-year revenue growth" },
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState("sales")
  const current = services.find((s) => s.id === active)!

  return (
    <PageLayout>
      {/* Hero */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                What We Do
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                Data Analytics Built for{" "}
                <span className="gradient-text">Operators Like You</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                We turn your POS, inventory, and customer data into decisions that cut waste, grow revenue, and optimize operations.
              </p>
              <div className="flex gap-3">
                <Button className="btn-primary h-11 px-6" onClick={() => window.location.href = "/contact"}>
                  Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="btn-secondary h-11 px-6"
                  onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}>
                  View Pricing
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="w-full py-16 md:py-24 section-base">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">

          {/* Tab buttons — equal width grid */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {services.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={active === s.id
                  ? { background: "#0284C7", color: "#ffffff" }
                  : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                {s.icon}
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="enhanced-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl" style={{ background: "rgba(14,165,233,0.1)", color: "#0284C7" }}>
                {current.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{current.title}</h2>
                <p className="text-muted-foreground">{current.subtitle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">What We Provide</h3>
                <ul className="space-y-3">
                  {current.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1.5 block" style={{ background: "#0284C7" }} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="btn-primary mt-6"
                  onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}>
                  See Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-xl p-6 flex flex-col justify-center items-center text-center"
                style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <div className="text-5xl font-bold mb-2" style={{ color: "#0284C7" }}>{current.stat.value}</div>
                <p className="text-muted-foreground text-sm max-w-[240px]">{current.stat.label}</p>
                <p className="text-xs mt-3" style={{ color: "rgba(14,165,233,0.6)" }}>
                  Based on projected industry benchmarks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="w-full py-16 md:py-24 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                ROI Calculator
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">Calculate Your Potential ROI</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">See how data analytics can impact your bottom line</p>
            </div>
          </AnimateOnScroll>
          <ROICalculator />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing-section" className="w-full py-16 md:py-24 section-base">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Pricing
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">Simple, Transparent Pricing</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">Choose the plan that fits your business</p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter", price: "$499", period: "/month", desc: "For small businesses getting started with data",
                features: ["Basic sales analysis", "Monthly reporting", "1 business location", "Email support"],
                highlight: false,
              },
              {
                name: "Growth", price: "$999", period: "/month", desc: "For businesses ready to optimize operations",
                features: ["Comprehensive analytics", "Weekly reporting", "Up to 3 locations", "Priority support", "Quarterly strategy sessions"],
                highlight: true,
              },
              {
                name: "Enterprise", price: "Custom", period: "", desc: "For larger businesses with complex needs",
                features: ["Advanced analytics & AI", "Real-time dashboards", "Unlimited locations", "Dedicated account manager", "Custom integrations"],
                highlight: false,
              },
            ].map((plan, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="rounded-2xl p-6 flex flex-col h-full relative"
                  style={{
                    background: plan.highlight ? "#0284C7" : "hsl(var(--card))",
                    border: plan.highlight ? "none" : "1px solid hsl(var(--border))",
                    color: plan.highlight ? "#ffffff" : "inherit",
                    boxShadow: plan.highlight ? "0 20px 40px rgba(2,132,199,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
                  }}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-white text-[#0284C7]">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm mt-1 opacity-70">{plan.desc}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm opacity-70">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: plan.highlight ? "rgba(255,255,255,0.9)" : "#0284C7" }} />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6"
                    style={plan.highlight
                      ? { background: "#ffffff", color: "#0284C7", fontWeight: 600 }
                      : { background: "#0284C7", color: "#ffffff", fontWeight: 600 }}
                    onClick={() => window.location.href = "/contact"}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-20" style={{ background: "#0284C7" }}>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-4">
                Ready to Transform Your Business with Data?
              </h2>
              <p className="text-white/80 md:text-lg mb-6">
                Book a free consultation with our data experts and discover how RevLens can help you grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button style={{ background: "#ffffff", color: "#0284C7", fontWeight: 600 }}
                  onClick={() => window.location.href = "/contact"}>
                  Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                  onClick={() => window.location.href = "/case-studies"}>
                  View Case Studies
                </Button>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Did You Know?
              </h3>
              <p className="text-white/80 mb-3">
                Businesses that use data analytics are 23% more profitable than competitors who don't leverage their data.
              </p>
              <p className="text-sm text-white/50 italic">Source: Harvard Business Review</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}