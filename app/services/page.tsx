"use client"

import { PageLayout } from "@/components/page-layout"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, BarChart3, Sparkles, PlayCircle, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

/* ── Mini Dashboard Visual ─────────────────────────── */
function DashboardMock({ isDark }: { isDark: boolean }) {
  const panelBg    = isDark ? "rgba(6,12,26,0.95)"      : "#ffffff"
  const panelBorder = isDark ? "rgba(255,255,255,0.08)"  : "rgba(14,165,233,0.12)"
  const headerBg   = isDark ? "rgba(14,165,233,0.06)"    : "rgba(14,165,233,0.04)"
  const labelCol   = isDark ? "rgba(255,255,255,0.35)"   : "rgba(15,23,42,0.4)"
  const valueCol   = isDark ? "#ffffff"                  : "#0F172A"
  const cardBg     = isDark ? "rgba(255,255,255,0.03)"   : "#F8FAFF"
  const cardBorder = isDark ? "rgba(255,255,255,0.06)"   : "rgba(14,165,233,0.1)"
  const barBg      = isDark ? "rgba(255,255,255,0.06)"   : "rgba(14,165,233,0.08)"

  const kpis = [
    { label: "MRR",    value: "$48,200", delta: "+12%",  up: true  },
    { label: "Churn",  value: "2.1%",    delta: "-0.3%", up: false },
    { label: "LTV",    value: "$1,840",  delta: "+8%",   up: true  },
  ]

  const bars = [
    { label: "Feb", pct: 55 },
    { label: "Mar", pct: 68 },
    { label: "Apr", pct: 82 },
    { label: "May", pct: 100 },
  ]

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl"
      style={{ background: panelBg, border: `1px solid ${panelBorder}` }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: headerBg, borderBottom: `1px solid ${panelBorder}` }}>
        <span className="text-xs font-bold" style={{ color: "#0EA5E9" }}>RevLens Dashboard</span>
        <span className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "rgba(34,197,94,0.9)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Live
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 p-4">
        {kpis.map((k, i) => (
          <div key={i} className="rounded-xl px-3 py-3"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="text-xs mb-1" style={{ color: labelCol }}>{k.label}</div>
            <div className="text-sm font-bold mb-1" style={{ color: valueCol }}>{k.value}</div>
            <div className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: k.up ? "rgba(34,197,94,0.9)" : "rgba(248,113,113,0.9)" }}>
              {k.up
                ? <TrendingUp className="h-3 w-3" />
                : <TrendingDown className="h-3 w-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="px-4 pb-4">
        <div className="text-xs font-semibold mb-3" style={{ color: labelCol }}>Monthly Revenue</div>
        <div className="flex items-end gap-2 h-16">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all"
                style={{
                  height: `${b.pct * 0.56}px`,
                  background: i === bars.length - 1
                    ? "linear-gradient(180deg, #38BDF8, #0284C7)"
                    : barBg,
                }} />
              <span className="text-xs" style={{ color: labelCol }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly digest preview */}
      <div className="mx-4 mb-4 rounded-xl p-3"
        style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ background: "rgba(14,165,233,0.15)" }}>
            <span className="text-xs">✉</span>
          </div>
          <span className="text-xs font-semibold" style={{ color: "#0EA5E9" }}>Monday AI Digest</span>
          <span className="text-xs ml-auto" style={{ color: labelCol }}>Apr 21</span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: labelCol }}>
          Revenue up 12% vs last week. Churn improved slightly. LTV trending well — annual plan cohort outperforming monthly by 4x.
        </p>
      </div>
    </div>
  )
}

/* ── Mini AI Chat Visual ───────────────────────────── */
function ChatMock({ isDark }: { isDark: boolean }) {
  const panelBg    = isDark ? "rgba(6,12,26,0.98)"     : "linear-gradient(145deg, #0A1628, #072040)"
  const panelBorder = "rgba(14,165,233,0.2)"
  const labelCol   = "rgba(255,255,255,0.35)"
  const userBg     = "rgba(14,165,233,0.15)"
  const aiBg       = "rgba(255,255,255,0.05)"

  const exchanges = [
    {
      q: "Why did churn spike in March?",
      a: "Churn rose to 3.4% in March. 68% of churned accounts were on monthly plans under 90 days old — mostly from the Feb promo cohort. Retention on annual plans stayed flat at 1.1%.",
      honest: false,
    },
    {
      q: "Which acquisition channel has the best LTV?",
      a: "Organic search customers show 2.3x higher LTV than paid. Average contract length is 14 months vs 6 months for paid social.",
      honest: false,
    },
    {
      q: "Forecast Q3 revenue?",
      a: "I don't have enough historical seasonality data to forecast Q3 reliably yet. I'd need at least 12 months of data. I can show you current trajectory instead.",
      honest: true,
    },
  ]

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl"
      style={{ background: panelBg, border: `1px solid ${panelBorder}`, boxShadow: "0 20px 50px rgba(14,165,233,0.12)" }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(14,165,233,0.12)" }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(14,165,233,0.2)" }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: "#0EA5E9" }} />
        </div>
        <span className="text-xs font-bold text-white">AI Analyst</span>
        <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: "rgba(34,197,94,0.8)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Ready
        </span>
      </div>

      {/* Exchanges */}
      <div className="p-4 space-y-4">
        {exchanges.map((ex, i) => (
          <div key={i} className="space-y-2">
            {/* User */}
            <div className="flex justify-end">
              <div className="rounded-xl rounded-tr-sm px-3 py-2 max-w-xs text-xs font-medium text-white"
                style={{ background: userBg }}>
                {ex.q}
              </div>
            </div>
            {/* AI */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-md shrink-0 mt-0.5 flex items-center justify-center"
                style={{ background: "rgba(14,165,233,0.2)" }}>
                <Sparkles className="h-3 w-3" style={{ color: "#0EA5E9" }} />
              </div>
              <div className="rounded-xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed"
                style={{
                  background: ex.honest ? "rgba(251,191,36,0.08)" : aiBg,
                  border: ex.honest ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(255,255,255,0.05)",
                  color: ex.honest ? "rgba(251,191,36,0.85)" : "rgba(255,255,255,0.7)",
                }}>
                {ex.honest && <span className="font-semibold block mb-0.5" style={{ color: "rgba(251,191,36,0.9)" }}>Honest answer:</span>}
                {ex.a}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="text-xs flex-1" style={{ color: labelCol }}>Ask anything about your data...</span>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: "#0284C7" }}>
          <ArrowRight className="h-3 w-3 text-white" />
        </div>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────── */
export default function ServicesPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const bg           = isDark ? "#060C1A"                    : "#F8FAFF"
  const headingColor = isDark ? "#ffffff"                    : "#0F172A"
  const bodyColor    = isDark ? "rgba(255,255,255,0.55)"     : "rgba(15,23,42,0.6)"
  const labelColor   = isDark ? "rgba(255,255,255,0.35)"     : "rgba(15,23,42,0.4)"
  const dividerColor = isDark ? "rgba(255,255,255,0.06)"     : "rgba(14,165,233,0.08)"

  return (
    <PageLayout>

      {/* ── HERO ── */}
      <section className="w-full py-20 md:py-28 relative overflow-hidden" style={{ background: bg }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(14,165,233,${isDark ? 0.1 : 0.06}) 0%, transparent 65%)` }} />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
              What We Offer
            </span>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5"
              style={{ color: headingColor }}>
              We handle your data.<br />
              <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                You just ask questions.
              </span>
            </h1>

            <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: bodyColor }}>
              RevLens is a done-for-you analytics service. We connect your tools, build your data infrastructure, and give you a dashboard that tells you what's happening in your business. No data team required. No tools to learn.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold rounded-xl transition-all duration-200"
                style={{ background: "#0284C7", color: "#ffffff", boxShadow: "0 4px 14px rgba(2,132,199,0.3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0369A1" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0284C7" }}
                onClick={() => window.location.href = "/dashboard-demo"}>
                <PlayCircle className="h-4 w-4" />
                See It in Action
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold rounded-xl transition-all duration-200"
                style={{ background: "transparent", border: "1px solid rgba(14,165,233,0.4)", color: "#0EA5E9" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(14,165,233,0.07)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                onClick={() => window.location.href = "/contact"}>
                Book a Free Demo
              </button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT 1: ANALYTICS ── */}
      <section className="w-full py-20 md:py-28" style={{ background: isDark ? "#08111F" : "#ffffff" }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">

            <AnimateOnScroll animation="fade">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
                  <BarChart3 className="h-5 w-5" style={{ color: "#0EA5E9" }} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0EA5E9" }}>Product 01</span>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: headingColor }}>RevLens Analytics</h2>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

              {/* Left: story */}
              <AnimateOnScroll animation="slide-up">
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    Most small businesses are flying blind. Revenue comes in, customers churn, costs shift. Nobody has a clear view of why or where. You check Stripe, open a spreadsheet, maybe pull a Shopify report. By the time you've assembled a picture, it's already out of date.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    RevLens Analytics fixes that. We connect all your tools — billing, CRM, payments, commerce — into a single live dashboard that shows you exactly what's happening right now. Revenue by channel, churn rate, customer lifetime value, retention trends. Everything in one place, always current.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    Then every Monday morning you get a plain-English AI report in your inbox. No charts to decode. No log-in required. Just a clear summary of what moved last week and what to watch.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: "#0EA5E9" }}>Starting at $499/month</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.15)" }}>
                      Setup included
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {[
                      "Live dashboard — revenue, churn, LTV, retention in one view",
                      "15+ integrations: Stripe, Shopify, HubSpot, QuickBooks and more",
                      "Weekly AI digest delivered to your inbox every Monday",
                      "We build everything. No IT team needed on your side.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(14,165,233,0.1)" }}>
                          <span className="text-xs font-bold" style={{ color: "#0EA5E9" }}>✓</span>
                        </div>
                        <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: labelColor }}>Good fit if you…</p>
                    {[
                      "Want visibility without building anything yourself",
                      "Are making decisions on gut feel and need something more reliable",
                      "Don't have a BI team, or time to be one",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: bodyColor }}>
                        <Minus className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#0EA5E9" }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className="inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{ background: "#0284C7", color: "#ffffff" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0369A1" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0284C7" }}
                    onClick={() => window.location.href = "/contact"}>
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </AnimateOnScroll>

              {/* Right: visual mock */}
              <AnimateOnScroll animation="slide-up" delay={0.15}>
                <DashboardMock isDark={isDark} />
              </AnimateOnScroll>

            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="w-full py-10" style={{ background: bg }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: dividerColor }} />
            <p className="text-sm text-center max-w-xs leading-relaxed" style={{ color: labelColor }}>
              Some operators start here and never need more. Others want to go deeper and ask why.
            </p>
            <div className="flex-1 h-px" style={{ background: dividerColor }} />
          </div>
        </div>
      </div>

      {/* ── PRODUCT 2: AI ANALYST ── */}
      <section className="w-full py-20 md:py-28" style={{ background: isDark ? "#050C1B" : "#EFF6FF" }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">

            <AnimateOnScroll animation="fade">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}>
                  <Sparkles className="h-5 w-5" style={{ color: "#0EA5E9" }} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0EA5E9" }}>Product 02</span>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: headingColor }}>RevLens AI Analyst</h2>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

              {/* Left: story */}
              <AnimateOnScroll animation="slide-up">
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    A dashboard tells you <em style={{ fontStyle: "italic" }}>what</em> happened. The AI Analyst tells you <em style={{ fontStyle: "italic" }}>why</em>, and what to do about it.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    You type a question in plain English. Something like "Why did churn spike in March?" or "Which customer segment has the best LTV?" or "What's driving the drop in repeat purchases?" It answers based on your actual data. Not a guess. Not a generic model. Your numbers, your context.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    We build a custom semantic model on top of your warehouse. One that understands your business logic, your naming conventions, your definitions. This is what makes it accurate instead of confident-sounding-but-wrong.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: bodyColor }}>
                    And when it doesn't have enough data to answer reliably, it tells you that. No hallucinations dressed up as insights.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: "#0EA5E9" }}>Custom pricing</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.15)" }}>
                      Scoped to your data volume
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {[
                      "Ask anything in plain English — no SQL, no BI tools",
                      "Custom semantic model built specifically on your data",
                      "Proactive anomaly alerts before issues become problems",
                      "Tells you honestly when it doesn't have enough to answer",
                      "Includes everything in Analytics: dashboard, digest, integrations",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(14,165,233,0.12)" }}>
                          <span className="text-xs font-bold" style={{ color: "#0EA5E9" }}>✓</span>
                        </div>
                        <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: labelColor }}>Good fit if you…</p>
                    {[
                      "Want to interrogate your data, not just look at charts",
                      "Need to understand why something happened, not just what",
                      "Want an analyst that knows your business and is always available",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: bodyColor }}>
                        <Minus className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#0EA5E9" }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className="inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{ background: "#0284C7", color: "#ffffff" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0369A1" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0284C7" }}
                    onClick={() => window.location.href = "/contact"}>
                    Talk to Us
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </AnimateOnScroll>

              {/* Right: visual mock */}
              <AnimateOnScroll animation="slide-up" delay={0.15}>
                <ChatMock isDark={isDark} />
              </AnimateOnScroll>

            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="w-full py-20 md:py-24" style={{ background: "#0284C7" }}>
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Not sure which one you need?
              </h2>
              <p className="text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
                Book a free 30-minute call. We'll look at your current data setup and tell you honestly which product makes sense and what it would look like for your business specifically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 text-base font-semibold rounded-xl transition-all duration-200"
                  style={{ background: "#ffffff", color: "#0284C7" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#E0F2FE" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff" }}
                  onClick={() => window.location.href = "/contact"}>
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 text-base font-semibold rounded-xl transition-all duration-200"
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                  onClick={() => window.location.href = "/dashboard-demo"}>
                  See It in Action
                </button>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No commitment. No sales pitch. Just a look at your setup.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </PageLayout>
  )
}
