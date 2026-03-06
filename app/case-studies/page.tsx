"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, UtensilsCrossed, ShoppingBag, Coffee, Store, Scissors } from "lucide-react"
import { useState } from "react"

const caseStudies = [
  {
    id: 1,
    title: "Full-Service Restaurant: Cutting Waste While Growing Revenue",
    excerpt: "A mid-size restaurant connecting Toast POS to RevLens gains real-time visibility into which menu items drive margin — and where waste is quietly eating profits.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    industry: "Restaurant",
    icon: <UtensilsCrossed className="h-4 w-4" />,
    results: [
      { label: "Revenue Uplift", value: "+18–25%" },
      { label: "Waste Reduction", value: "−60–70%" },
      { label: "Labour Efficiency", value: "+20%" },
    ],
    filter: "restaurant",
  },
  {
    id: 2,
    title: "Café & Coffee Shop: Menu Intelligence for Higher Ticket Values",
    excerpt: "A café using Square POS discovers the top 20% of menu items driving 80% of revenue — and builds a smarter, tighter menu around what actually sells.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    industry: "Café",
    icon: <Coffee className="h-4 w-4" />,
    results: [
      { label: "Avg. Transaction Value", value: "+30–40%" },
      { label: "Menu Complexity", value: "−35%" },
      { label: "Peak Hour Accuracy", value: "2× better" },
    ],
    filter: "restaurant",
  },
  {
    id: 3,
    title: "Independent Retail: Smarter Inventory, Less Dead Stock",
    excerpt: "A boutique retail store connecting Lightspeed gets a weekly snapshot of what's moving, what's stagnant, and what to reorder before running out.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    industry: "Retail",
    icon: <ShoppingBag className="h-4 w-4" />,
    results: [
      { label: "Inventory Turnover", value: "+40–60%" },
      { label: "Stockout Rate", value: "−70%" },
      { label: "Profit Margin", value: "+12–18%" },
    ],
    filter: "retail",
  },
  {
    id: 4,
    title: "Convenience Store: Maximizing Revenue Per Square Foot",
    excerpt: "A multi-location convenience store owner understands which products and placements drive transaction value — and which are wasting shelf space.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    industry: "Retail",
    icon: <Store className="h-4 w-4" />,
    results: [
      { label: "Transaction Value", value: "+20–30%" },
      { label: "Shrink Reduction", value: "−40%" },
      { label: "Time Saved", value: "8+ hrs/wk" },
    ],
    filter: "retail",
  },
  {
    id: 5,
    title: "Beauty & Wellness Studio: Filling the Calendar, Growing Retention",
    excerpt: "A salon connecting their booking system gets clarity on which services drive repeat visits, which stylists retain clients, and where revenue gaps are hiding.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    industry: "Service",
    icon: <Scissors className="h-4 w-4" />,
    results: [
      { label: "Booking Utilization", value: "+25–35%" },
      { label: "Client Retention", value: "+20%" },
      { label: "Revenue Per Chair", value: "+30%" },
    ],
    filter: "service",
  },
  {
    id: 6,
    title: "Grocery & Fresh Market: Reducing Perishable Waste",
    excerpt: "A fresh market uses demand forecasting to dramatically cut perishable waste while maintaining optimal stock levels and improving margin.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    industry: "Retail",
    icon: <ShoppingBag className="h-4 w-4" />,
    results: [
      { label: "Waste Reduction", value: "−65%" },
      { label: "Profit Margin", value: "+15%" },
      { label: "Stockout Rate", value: "−50%" },
    ],
    filter: "retail",
  },
]

const filters = [
  { label: "All Industries", value: "all" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Retail", value: "retail" },
  { label: "Service", value: "service" },
]

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const filtered = activeFilter === "all" ? caseStudies : caseStudies.filter(c => c.filter === activeFilter)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Case Studies
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                What RevLens Can Do For{" "}
                <span className="gradient-text">Your Business</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Projected outcomes based on industry benchmarks — the kind of results RevLens is built to deliver once connected to your real data.
              </p>
              <div className="text-sm px-4 py-2.5 rounded-lg text-muted-foreground"
                style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
                These are projections, not client testimonials. We're pre-revenue and building toward our first clients.{" "}
                <button onClick={() => window.location.href = "/contact"} style={{ color: "#0284C7", fontWeight: 600 }}>
                  Want to be one? Book a demo.
                </button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="w-full py-12 md:py-20 section-base">
        <div className="container px-4 md:px-6">

          {/* Filter tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "hsl(var(--muted))" }}>
              {filters.map((f) => (
                <button key={f.value} onClick={() => setActiveFilter(f.value)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={activeFilter === f.value
                    ? { background: "#0284C7", color: "#ffffff" }
                    : { color: "hsl(var(--muted-foreground))", background: "transparent" }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((study, i) => (
              <AnimateOnScroll key={study.id} animation="slide-up" delay={i * 0.05}>
                <div className="enhanced-card overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full text-white"
                      style={{ background: "rgba(2,132,199,0.85)" }}>
                      {study.icon} {study.industry}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{study.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{study.excerpt}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
                      {study.results.map((r, j) => (
                        <div key={j} className="text-center p-2 rounded-lg"
                          style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)" }}>
                          <div className="text-sm font-bold" style={{ color: "#0284C7" }}>{r.value}</div>
                          <div className="text-xs text-muted-foreground leading-tight mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                      <button onClick={() => window.location.href = "/contact"}
                        className="text-sm font-medium flex items-center gap-1 transition-all group"
                        style={{ color: "#0284C7" }}>
                        Get This For My Business
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-20" style={{ background: "#0284C7" }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Become Our First Success Story?
            </h2>
            <p className="text-white/80 text-lg">
              Book a free demo and we'll show you exactly what RevLens looks like connected to your POS or ERP. No commitments. No fake numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" style={{ background: "#ffffff", color: "#0284C7", fontWeight: 600 }}
                onClick={() => window.location.href = "/contact"}>
                Book a Free Demo <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                onClick={() => window.location.href = "/services"}>
                View Our Services
              </Button>
            </div>
            <p className="text-xs text-white/50">
              * All metrics are projections based on industry benchmarks. Individual results will vary.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}