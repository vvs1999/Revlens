"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ChevronRight, Database, Brain, BarChart3 } from "lucide-react"

const DEMOS = [
  {
    question: "Why did revenue drop in March?",
    thinking: "Querying transactions, comparing March vs February cohorts...",
    answer: "March revenue was $41,200 — down 14.3% from February's $48,100. The drop is concentrated in your mid-tier accounts: 8 customers downgraded during the period. 6 of those 8 had not logged in for 21+ days before downgrading. This is a leading indicator, not a seasonal pattern.",
    tag: "Revenue",
    hasData: true,
    highlight: { label: "Root cause", value: "Low engagement → downgrade" },
  },
  {
    question: "Who are my top 10 customers by lifetime value?",
    thinking: "Calculating LTV across all active accounts...",
    answer: "Your top 10 accounts represent 61% of total revenue. The highest-LTV customer has been active for 38 months with zero support tickets — a strong retention profile. 3 of your top 10 are on your base plan and are upsell candidates based on usage patterns.",
    tag: "Customers",
    hasData: true,
    highlight: { label: "Upsell opportunity", value: "3 accounts ready to upgrade" },
  },
  {
    question: "What are the top 3 reasons customers are churning?",
    thinking: "Scanning exit survey data, support tickets, and usage logs...",
    answer: "Exit survey responses and support ticket data are not currently in your connected data sources. I can tell you that 73% of churned accounts in Q1 shared a common pattern: no product activity in the 30 days before cancellation. To get qualitative churn reasons, connect your CRM or support tool.",
    tag: "Churn",
    hasData: false,
    highlight: { label: "Honest finding", value: "Qualitative data not in DB" },
  },
  {
    question: "What's my projected revenue for Q3?",
    thinking: "Analysing 18-month trend, seasonality, and current pipeline...",
    answer: "Based on your 18-month trend and current MRR of $48,200, Q3 is projected at $153,400–$161,800 (assuming current churn rate holds). The range tightens if your March renewal cohort — 12 accounts up for renewal in July — renews at historical rates of 84%.",
    tag: "Forecast",
    hasData: true,
    highlight: { label: "Q3 projection", value: "$153k – $162k" },
  },
]

function TypingText({ text, speed = 18, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("")
  const idx = useRef(0)
  const done = useRef(false)

  useEffect(() => {
    setDisplayed("")
    idx.current = 0
    done.current = false
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1))
        idx.current++
      } else {
        if (!done.current) { done.current = true; onDone?.() }
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, onDone])

  return <span>{displayed}<span className="animate-pulse">▌</span></span>
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: "#0EA5E9" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </span>
  )
}

export function AIAnalystShowcase() {
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<"idle" | "thinking" | "answering" | "done">("idle")
  const [autoplay, setAutoplay] = useState(true)

  // Start animation when active changes
  useEffect(() => {
    setPhase("thinking")
    const t1 = setTimeout(() => setPhase("answering"), 1800)
    return () => clearTimeout(t1)
  }, [active])

  // Autoplay cycling
  useEffect(() => {
    if (!autoplay) return
    if (phase !== "done") return
    const t = setTimeout(() => {
      setActive(a => (a + 1) % DEMOS.length)
    }, 3500)
    return () => clearTimeout(t)
  }, [phase, autoplay])

  const handleSelect = (i: number) => {
    setAutoplay(false)
    setActive(i)
  }

  const demo = DEMOS[active]

  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060C1A 0%, #0A1628 100%)" }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 container px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
            <Sparkles className="h-3.5 w-3.5" />
            AI Analyst
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Your data. Your questions.<br />
            <span style={{ background: "linear-gradient(135deg, #0EA5E9, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Real answers.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
            Ask any question in plain English. RevLens queries your actual data — and tells you
            honestly when it doesn&apos;t have the answer.
          </motion.p>
        </div>

        {/* How it flows */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {[
            { icon: <Database className="h-3.5 w-3.5" />, label: "Your data, structured" },
            { icon: <Brain className="h-3.5 w-3.5" />, label: "AI learns your business" },
            { icon: <Sparkles className="h-3.5 w-3.5" />, label: "Honest answers, always" },
            { icon: <BarChart3 className="h-3.5 w-3.5" />, label: "You take action" },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ color: "#0EA5E9" }}>{step.icon}</span>
                {step.label}
              </div>
              {i < arr.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Main demo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">

          {/* Left: question selector */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
              Try asking…
            </p>
            {DEMOS.map((d, i) => (
              <button key={i} onClick={() => handleSelect(i)}
                className="text-left px-4 py-3.5 rounded-xl transition-all duration-200 group"
                style={{
                  background: active === i ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.03)",
                  border: active === i ? "1px solid rgba(14,165,233,0.35)" : "1px solid rgba(255,255,255,0.07)",
                }}>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      background: active === i ? "#0EA5E9" : "rgba(255,255,255,0.1)",
                      color: active === i ? "white" : "rgba(255,255,255,0.4)",
                    }}>
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold block mb-0.5"
                      style={{ color: active === i ? "#0EA5E9" : "rgba(255,255,255,0.3)" }}>
                      {d.tag}
                    </span>
                    <span className="text-sm leading-snug"
                      style={{ color: active === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}>
                      &ldquo;{d.question}&rdquo;
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: chat window */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 380 }}>

            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(14,165,233,0.15)" }}>
                  <Sparkles className="h-3.5 w-3.5" style={{ color: "#0EA5E9" }} />
                </div>
                <span className="text-xs font-semibold text-white">Lens</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>· RevLens AI Analyst</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Live</span>
              </div>
            </div>

            <div className="flex-1 p-5 space-y-4">
              {/* User question */}
              <AnimatePresence mode="wait">
                <motion.div key={`q-${active}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white"
                    style={{ background: "#0284C7" }}>
                    {demo.question}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* AI response */}
              <AnimatePresence mode="wait">
                {phase === "thinking" && (
                  <motion.div key={`thinking-${active}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      <span className="mr-2">{demo.thinking}</span>
                      <ThinkingDots />
                    </div>
                  </motion.div>
                )}

                {(phase === "answering" || phase === "done") && (
                  <motion.div key={`answer-${active}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
                      style={{
                        background: demo.hasData ? "rgba(255,255,255,0.06)" : "rgba(251,191,36,0.06)",
                        color: "rgba(255,255,255,0.8)",
                        border: demo.hasData ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(251,191,36,0.15)",
                      }}>
                      {phase === "answering"
                        ? <TypingText text={demo.answer} onDone={() => setPhase("done")} />
                        : demo.answer}
                    </div>

                    {phase === "done" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl w-fit"
                        style={{
                          background: demo.hasData ? "rgba(14,165,233,0.08)" : "rgba(251,191,36,0.08)",
                          border: demo.hasData ? "1px solid rgba(14,165,233,0.2)" : "1px solid rgba(251,191,36,0.2)",
                        }}>
                        <span className="text-xs font-medium" style={{ color: demo.hasData ? "rgba(255,255,255,0.4)" : "rgba(251,191,36,0.6)" }}>
                          {demo.highlight.label}
                        </span>
                        <span className="text-xs font-bold" style={{ color: demo.hasData ? "#0EA5E9" : "#FBBF24" }}>
                          {demo.highlight.value}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar (decorative) */}
            <div className="px-4 py-3 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }}>
                Ask anything about your business…
              </div>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "#0284C7" }}>
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.25)" }}>
          Answers are generated from your actual data — not generic AI. When data isn&apos;t available, Lens says so.
        </motion.p>

      </div>
    </section>
  )
}
