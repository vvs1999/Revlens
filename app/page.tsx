"use client"

import { PageLayout } from "@/components/page-layout"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { AIAnalystShowcase } from "@/components/ai-analyst-showcase"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { MarqueeBanner } from "@/components/marquee-banner"
import Link from "next/link"
import { ArrowRight, Plug, Clock, ShieldCheck, BarChart3, Sparkles, FileText, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const integrationCategories = [
  { label: "Payments & Billing", items: ["Stripe", "Square", "Clover", "Lightspeed"], color: "#0EA5E9" },
  { label: "ERP & Accounting", items: ["QuickBooks", "Sage", "Xero"], color: "#0284C7" },
  { label: "CRM & Commerce", items: ["Shopify", "HubSpot", "WooCommerce"], color: "#0EA5E9" },
]

export default function Home() {
  return (
    <PageLayout>
      <EnhancedHeroSection />
      <MarqueeBanner />

      {/* How It Works */}
      <section className="w-full py-16 md:py-24 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-14">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                How It Works
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
                Set up once. Insight forever.
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                No IT team. No setup headaches. Three steps and your AI analyst is live.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-[72px] left-[20%] right-[20%] hidden md:flex items-center justify-between z-0">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(14,165,233,0.15), rgba(14,165,233,0.35))" }} />
              <ArrowRight className="h-4 w-4 mx-1 flex-shrink-0" style={{ color: "rgba(14,165,233,0.4)" }} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(14,165,233,0.35), rgba(14,165,233,0.15))" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  step: "1",
                  icon: <Plug className="h-7 w-7" />,
                  title: "Connect Your Tools",
                  body: "We integrate with your billing, CRM, and commerce platforms in under 15 minutes. Fully automated — no exports, no manual uploads, no IT required.",
                  detail: "Setup in under 15 minutes",
                },
                {
                  step: "2",
                  icon: <Database className="h-7 w-7" />,
                  title: "We Structure Your Data",
                  body: "Your data is ingested, cleaned, and structured in a dedicated cloud warehouse. A semantic layer is built so your AI analyst understands your business — not just raw tables.",
                  detail: "Enterprise-grade infrastructure",
                },
                {
                  step: "3",
                  icon: <Sparkles className="h-7 w-7" />,
                  title: "Ask Anything, Anytime",
                  body: "Your AI analyst is live. Ask questions in plain English, get real answers from your actual data. Weekly reports arrive every Monday — no charts to decode.",
                  detail: "AI analyst + weekly report",
                },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.15}>
                  <div className="enhanced-card relative p-8 flex flex-col items-center text-center space-y-4 h-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                      style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", boxShadow: "0 4px 12px rgba(14,165,233,0.35)" }}>
                      {s.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mt-2"
                      style={{ background: "rgba(14, 165, 233, 0.08)", border: "1px solid rgba(14, 165, 233, 0.15)" }}>
                      <span style={{ color: "#0EA5E9" }}>{s.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                    <div className="mt-auto pt-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: "rgba(14, 165, 233, 0.06)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
                        {s.detail}
                      </span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Analyst Showcase — centerpiece */}
      <AIAnalystShowcase />

      {/* Three Pillars */}
      <section className="w-full py-16 md:py-24 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-14">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                What You Get
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
                Three layers of intelligence
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                From live dashboards to a weekly digest to an AI that answers your follow-up questions.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Live Reporting",
                body: "Your key metrics in one place, updated in real time. Revenue, retention, LTV, churn — all connected to your actual data sources.",
                link: "/dashboard-demo",
                linkText: "See live demo",
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Weekly AI Report",
                body: "Every Monday, a plain-English summary lands in your inbox. Your top win, one alert to act on, and one growth opportunity — no charts to decode.",
                link: "/dashboard-demo",
                linkText: "Learn more",
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "AI Analyst",
                body: "Ask any business question in plain English. Your AI analyst queries your actual data — and tells you honestly when it doesn't have the answer.",
                link: "/contact",
                linkText: "Get access",
                highlight: true,
              },
            ].map((card, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className={`enhanced-card p-7 flex flex-col h-full ${card.highlight ? "ring-1 ring-sky-500/30" : ""}`}
                  style={card.highlight ? { background: "rgba(14,165,233,0.03)" } : {}}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(14, 165, 233, 0.08)", border: "1px solid rgba(14, 165, 233, 0.15)" }}>
                    <span style={{ color: "#0EA5E9" }}>{card.icon}</span>
                  </div>
                  {card.highlight && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-3 w-fit"
                      style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                      AI Plan
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{card.body}</p>
                  <div className="mt-5">
                    <Link href={card.link} className="font-medium flex items-center gap-1 group text-sm" style={{ color: "#0EA5E9" }}>
                      {card.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="w-full py-16 md:py-20 relative overflow-hidden section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                <Plug className="h-3.5 w-3.5" /> Integrations
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-foreground">Plugs into what you already use</h2>
              <p className="max-w-[700px] mx-auto md:text-lg text-muted-foreground">
                No ripping out existing systems. RevLens connects to your tools and pulls data automatically into your analytics warehouse.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {integrationCategories.map((cat, i) => (
              <AnimateOnScroll key={i} animation="scale" delay={i * 0.1}>
                <div className="enhanced-card p-6 text-center">
                  <div className="text-sm font-semibold mb-4 inline-block px-3 py-1 rounded-full"
                    style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}25` }}>
                    {cat.label}
                  </div>
                  <div className="space-y-2">
                    {cat.items.map((item, j) => (
                      <div key={j} className="text-sm font-medium py-1.5 text-muted-foreground">{item}</div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10">
            {[
              { icon: <Clock className="h-5 w-5" />, text: "Guided onboarding, end to end" },
              { icon: <ShieldCheck className="h-5 w-5" />, text: "No IT team required" },
              { icon: <Database className="h-5 w-5" />, text: "Enterprise-grade data security" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span style={{ color: "#0EA5E9" }}>{s.icon}</span>{s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 md:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #060C1A 0%, #0A1628 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
            style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
            <Sparkles className="h-3.5 w-3.5" />
            Ready to get started?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
            Stop guessing. Start knowing.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            Book a free 30-minute demo. We&apos;ll show you exactly what your AI analyst would look like with your data.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-primary group h-12 px-8 text-base"
              onClick={() => (window.location.href = "/contact")}>
              Book a Free Demo
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <button
              className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold rounded-md transition-all duration-200"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
              onClick={() => (window.location.href = "/dashboard-demo")}>
              See It in Action
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.45 }}>
            <a href="/pricing" className="text-sm font-medium underline underline-offset-4"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              View pricing →
            </a>
          </motion.div>
        </div>
      </section>

    </PageLayout>
  )
}
