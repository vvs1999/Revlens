"use client"

import { motion } from "framer-motion"
import { Check, Zap, ArrowRight, BarChart3, Sparkles, Database, BrainCircuit, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const ANALYTICS_GROUPS = [
  {
    label: "Core Platform",
    icon: <Database className="h-4 w-4" />,
    items: [
      "Live reporting dashboard",
      "15+ data source integrations",
      "Cloud data warehouse included",
      "Churn & retention tracking",
    ],
  },
  {
    label: "Reporting",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [
      "Weekly plain-English AI digest",
      "Custom date ranges & filters",
      "Email report delivery",
    ],
  },
  {
    label: "Support",
    icon: <HeadphonesIcon className="h-4 w-4" />,
    items: [
      "Email support",
      "Guided onboarding call",
    ],
  },
]

const AI_ONLY_GROUPS = [
  {
    label: "AI Layer",
    icon: <BrainCircuit className="h-4 w-4" />,
    items: [
      "AI analyst — ask any question in plain English",
      "Custom semantic model built on your data",
      "Unlimited natural language queries",
      "Proactive anomaly alerts",
    ],
  },
  {
    label: "Dedicated Setup & Support",
    icon: <HeadphonesIcon className="h-4 w-4" />,
    items: [
      "Dedicated onboarding & full setup",
      "Priority support",
    ],
  },
]

const FAQS = [
  {
    q: "What does 'custom pricing' mean for the AI Analyst plan?",
    a: "Pricing is scoped with you based on your team size, data volume, and expected query frequency — so you're not paying for capacity you don't need. We'll walk through this on a 30-minute call before you commit to anything.",
  },
  {
    q: "Can I start with Analytics and upgrade later?",
    a: "Yes. Your data infrastructure and integrations carry over — upgrading just unlocks the AI analyst layer on top of what's already built.",
  },
  {
    q: "How long does setup take?",
    a: "Integrations typically take under 15 minutes. The semantic model — which is what makes the AI analyst actually understand your business context — takes 2–5 business days depending on how many data sources you connect.",
  },
  {
    q: "Do I need any technical knowledge to use RevLens?",
    a: "None. We handle the entire infrastructure. You connect your tools, we build everything, and you interact with RevLens through plain English — no SQL, no dashboards to configure, no data engineering required.",
  },
]

export function PricingExtras() {
  return (
    <>
      {/* Feature Comparison — Two-Card Layout */}
      <section className="w-full py-16 md:py-20 section-base">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              What&apos;s included in each plan
            </h2>
            <p className="text-muted-foreground">Everything in Analytics carries into the AI Analyst plan.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Analytics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="enhanced-card p-7 flex flex-col">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.15)" }}>
                  <BarChart3 className="h-4.5 w-4.5" style={{ color: "#0EA5E9" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Analytics</div>
                  <div className="text-base font-bold text-foreground">Core Plan · $499/mo</div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                {ANALYTICS_GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-muted-foreground">{group.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group.label}</span>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2.5 text-sm text-foreground">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "rgba(14,165,233,0.1)" }}>
                            <Check className="h-3 w-3" style={{ color: "#0EA5E9" }} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                <Button variant="outline" className="btn-secondary w-full group"
                  onClick={() => (window.location.href = "/contact")}>
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* AI Analyst Card — dark premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl p-7 flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(8,12,24,0.98) 0%, rgba(2,32,60,0.98) 100%)",
                border: "1px solid rgba(14,165,233,0.3)",
                boxShadow: "0 20px 60px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.1)",
              }}>

              {/* Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(14,165,233,0.15) 0%, transparent 65%)" }} />

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0EA5E9, #38BDF8)", color: "white" }}>
                  Most Popular
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)" }}>
                  <Sparkles className="h-4.5 w-4.5" style={{ color: "#0EA5E9" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0EA5E9" }}>AI Analyst</div>
                  <div className="text-base font-bold text-white">Pro Plan · Custom pricing</div>
                </div>
              </div>

              <div className="flex-1 space-y-6 relative">

                {/* "Everything in Analytics" callout */}
                <div className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                  style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}>
                  <Check className="h-4 w-4 shrink-0" style={{ color: "#0EA5E9" }} />
                  <span className="text-sm font-semibold" style={{ color: "#0EA5E9" }}>
                    Everything in Analytics, plus:
                  </span>
                </div>

                {AI_ONLY_GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ color: "#0EA5E9", opacity: 0.7 }}>{group.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "rgba(14,165,233,0.7)" }}>{group.label}</span>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2.5 text-sm"
                          style={{ color: "rgba(255,255,255,0.75)" }}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "rgba(14,165,233,0.15)" }}>
                            <Zap className="h-3 w-3" style={{ color: "#0EA5E9" }} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 relative" style={{ borderTop: "1px solid rgba(14,165,233,0.2)" }}>
                <Button className="btn-primary w-full group"
                  onClick={() => (window.location.href = "/contact")}>
                  Contact Sales
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="enhanced-card p-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-16 md:py-20 section-base">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-xl mx-auto text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Not sure which plan?
            </h2>
            <p className="text-muted-foreground">
              Book a free 30-minute call. We&apos;ll look at your data sources and tell you exactly which plan makes sense — and why.
            </p>
            <Button className="btn-primary group h-11 px-7"
              onClick={() => (window.location.href = "/contact")}>
              Book a Free Call
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
