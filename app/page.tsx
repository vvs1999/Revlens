"use client"

import { PageLayout } from "@/components/page-layout"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { IndustryExamples } from "@/components/industry-examples"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ChatBot } from "@/components/chat-bot"
import { MarqueeBanner } from "@/components/marquee-banner"
import { CompetitorSection } from "@/components/competitor-section"
import Link from "next/link"
import { ArrowRight, LineChart, PieChart, TrendingUp, Plug, Clock, ShieldCheck, BarChart3 } from "lucide-react"

const integrationCategories = [
  { label: "POS & Payments", items: ["Square", "Stripe", "Lightspeed", "Clover"], color: "#0EA5E9" },
  { label: "ERP & Accounting", items: ["QuickBooks", "Sage", "Xero"], color: "#0284C7" },
  { label: "CRM & eCommerce", items: ["Shopify", "HubSpot", "WooCommerce"], color: "#0EA5E9" },
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
                Simple Setup, Real Insights
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                No IT team. No setup headaches. Three steps and you get insights every Monday morning.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="relative max-w-5xl mx-auto">
            {/* Connector line between cards (desktop only) */}
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
                  body: "We integrate with your billing, POS, CRM, and e-commerce platforms. Fully automated — no exports, no manual uploads, no IT required.",
                  detail: "Setup takes under 15 minutes",
                },
                {
                  step: "2",
                  icon: <BarChart3 className="h-7 w-7" />,
                  title: "We Build Your Dashboard",
                  body: "Our team configures a custom analytics setup for your business, tracking the metrics that actually matter for your specific industry.",
                  detail: "Tailored to your industry",
                },
                {
                  step: "3",
                  icon: <Clock className="h-7 w-7" />,
                  title: "Monday Insights, Every Week",
                  body: "Every Monday you get a plain-English summary: your top win, one alert, and one action to take. No charts to decode.",
                  detail: "AI-powered, human-readable",
                },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.15}>
                  <div className="enhanced-card relative p-8 flex flex-col items-center text-center space-y-4 h-full">
                    {/* Step number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                      style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", boxShadow: "0 4px 12px rgba(14,165,233,0.35)" }}>
                      {s.step}
                    </div>
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mt-2"
                      style={{ background: "rgba(14, 165, 233, 0.08)", border: "1px solid rgba(14, 165, 233, 0.15)" }}>
                      <span style={{ color: "#0EA5E9" }}>{s.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                    {/* Bottom detail tag */}
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

      {/* Challenges */}
      <section className="w-full py-16 md:py-24 lg:py-32 section-base">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                Our Solutions
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">Common Challenges We Solve</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Independent operators face unique data challenges. RevLens is built to solve them.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
            {[
              { icon: <LineChart className="h-10 w-10" style={{ color: "#0EA5E9" }} />, title: "Not sure which channels drive growth?", body: "Revenue analysis identifies your highest-value customers, products, and channels — so you invest where it counts, not where it feels right." },
              { icon: <PieChart className="h-10 w-10" style={{ color: "#0EA5E9" }} />, title: "Losing customers without knowing why?", body: "Retention analytics surface churn signals early — so you can act before revenue walks out the door." },
              { icon: <TrendingUp className="h-10 w-10" style={{ color: "#0EA5E9" }} />, title: "Missing out on revenue opportunities?", body: "Predictive analytics surface opportunities before you lose them — seasonal trends, upsell windows, and demand spikes." },
            ].map((card, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 flex flex-col items-center space-y-4 text-center h-full">
                  <div className="rounded-full p-4" style={{ background: "rgba(14, 165, 233, 0.1)" }}>{card.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground">{card.body}</p>
                  <div className="mt-auto pt-2">
                    <Link href="/services" className="font-medium flex items-center group" style={{ color: "#0EA5E9" }}>
                      Learn more <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor differentiation */}
      <CompetitorSection />

      {/* Integrations */}
      <section className="w-full py-16 md:py-20 relative overflow-hidden section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                <Plug className="h-3.5 w-3.5" /> Seamless Integrations
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-foreground">Plugs Into What You Already Use</h2>
              <p className="max-w-[700px] mx-auto md:text-lg text-muted-foreground">
                No ripping out existing systems. RevLens connects directly to your POS, ERP, and CRM to pull data automatically.
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
            {[
              { icon: <Clock className="h-5 w-5" />, text: "Guided onboarding, end to end" },
              { icon: <ShieldCheck className="h-5 w-5" />, text: "No IT team required" },
              { icon: <Plug className="h-5 w-5" />, text: "API-first, no manual exports" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span style={{ color: "#0EA5E9" }}>{s.icon}</span>{s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry */}
      <section className="section-base">
        <IndustryExamples />
      </section>

      <ChatBot />
    </PageLayout>
  )
}