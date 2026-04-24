"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const ANALYTICS_FEATURES = [
  "Live analytics dashboard",
  "Weekly plain-English AI report",
  "15+ data source integrations",
  "Cloud data warehouse included",
  "Churn, LTV & retention tracking",
  "Email support",
]

const AI_ANALYST_FEATURES = [
  "Everything in Analytics, plus:",
  "AI that answers any question",
  "Custom semantic model for your data",
  "Unlimited natural language queries",
  "Proactive anomaly alerts",
  "Dedicated onboarding & setup",
  "Priority support",
]

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-16 section-base relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.05) 0%, transparent 65%)" }} />

      <div className="relative z-10 container px-4 md:px-6">

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Analytics Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="enhanced-card p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <BarChart3 className="h-5 w-5" style={{ color: "#0EA5E9" }} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Analytics</div>
                <div className="text-lg font-bold text-foreground">Core Plan</div>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$499</span>
              <span className="text-muted-foreground ml-1">/month</span>
              <p className="text-sm text-muted-foreground mt-2">
                Dashboard, weekly report, and all integrations. Everything you need to stop guessing.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {ANALYTICS_FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(14,165,233,0.1)" }}>
                    <Check className="h-3 w-3" style={{ color: "#0EA5E9" }} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className="btn-secondary w-full group"
              onClick={() => (window.location.href = "/contact")}>
              Get Started
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* AI Analyst Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl p-8 flex flex-col overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(8,12,24,0.98) 0%, rgba(2,32,60,0.98) 100%)",
              border: "1px solid rgba(14,165,233,0.3)",
              boxShadow: "0 20px 60px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.1)",
            }}>

            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(14,165,233,0.15) 0%, transparent 65%)" }} />

            {/* Popular badge */}
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "linear-gradient(135deg, #0EA5E9, #38BDF8)", color: "white" }}>
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6 relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)" }}>
                <Sparkles className="h-5 w-5" style={{ color: "#0EA5E9" }} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0EA5E9" }}>AI Analyst</div>
                <div className="text-lg font-bold text-white">Pro Plan</div>
              </div>
            </div>

            <div className="mb-6 relative">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">Custom</span>
                <span className="text-sm font-medium px-2 py-0.5 rounded-lg"
                  style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9" }}>
                  based on data volume
                </span>
              </div>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                An AI that knows your business inside out — built on your data, not generic models.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1 relative">
              {AI_ANALYST_FEATURES.map((f, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${i === 0 ? "font-semibold" : ""}`}
                  style={{ color: i === 0 ? "#0EA5E9" : "rgba(255,255,255,0.75)" }}>
                  {i !== 0 && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(14,165,233,0.15)" }}>
                      <Zap className="h-3 w-3" style={{ color: "#0EA5E9" }} />
                    </div>
                  )}
                  {i === 0 && <div className="w-5 shrink-0" />}
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className="btn-primary w-full group relative"
              onClick={() => (window.location.href = "/contact")}>
              Contact Sales
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8">
          All plans include a guided onboarding call. No setup fees. Cancel anytime.
        </motion.p>

      </div>
    </section>
  )
}
