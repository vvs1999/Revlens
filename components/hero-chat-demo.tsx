"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, BarChart3 } from "lucide-react"

const TURNS = [
  {
    user: "Why did revenue drop last month?",
    bot: "Revenue was $41,200 — down 14.3%. The drop is concentrated in 8 mid-tier accounts that downgraded. All 8 had zero product activity in the 30 days before cancelling.",
  },
  {
    user: "Which customers are at risk right now?",
    bot: "4 accounts show high churn signals: 20+ days inactive, recent support tickets, on monthly billing. Combined ARR at risk: $18,400.",
  },
  {
    user: "What should I focus on this week?",
    bot: "Reach out to those 4 accounts before Friday. Proactive contact at this stage retains 60% of at-risk accounts — based on your own historical data.",
  },
]

type Message = { from: "user" | "bot"; text: string }

export function HeroChatDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const [visible, setVisible] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const addMsg = (msg: Message) => setMessages(prev => [...prev, msg])

  const clearAll = () => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timeouts.current.push(t)
  }

  const runSequence = () => {
    let cursor = 0

    // Turn 1
    schedule(() => addMsg({ from: "user", text: TURNS[0].user }), cursor)
    cursor += 900
    schedule(() => setThinking(true), cursor)
    cursor += 1400
    schedule(() => { setThinking(false); addMsg({ from: "bot", text: TURNS[0].bot }) }, cursor)
    cursor += 2000

    // Turn 2
    schedule(() => addMsg({ from: "user", text: TURNS[1].user }), cursor)
    cursor += 900
    schedule(() => setThinking(true), cursor)
    cursor += 1300
    schedule(() => { setThinking(false); addMsg({ from: "bot", text: TURNS[1].bot }) }, cursor)
    cursor += 2000

    // Turn 3
    schedule(() => addMsg({ from: "user", text: TURNS[2].user }), cursor)
    cursor += 900
    schedule(() => setThinking(true), cursor)
    cursor += 1300
    schedule(() => { setThinking(false); addMsg({ from: "bot", text: TURNS[2].bot }) }, cursor)
    cursor += 2500

    // Fade out → reset → loop
    schedule(() => setVisible(false), cursor)
    cursor += 600
    schedule(() => {
      setMessages([])
      setThinking(false)
      setVisible(true)
    }, cursor)
    cursor += 400
    schedule(() => runSequence(), cursor)
  }

  useEffect(() => {
    const startDelay = setTimeout(() => runSequence(), 600)
    return () => {
      clearTimeout(startDelay)
      clearAll()
    }
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(8, 12, 24, 0.98)",
        border: "1px solid rgba(14, 165, 233, 0.2)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(14, 165, 233, 0.08)",
      }}>

      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(14,165,233,0.15)" }}>
            <Sparkles className="h-3.5 w-3.5" style={{ color: "#0EA5E9" }} />
          </div>
          <span className="text-xs font-semibold text-white">Lens</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>· RevLens AI Analyst</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs" style={{ color: "#0EA5E9" }}>Live</span>
          </div>
          <div className="flex gap-1">
            {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} className="h-72 overflow-y-auto p-4 space-y-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl"
                style={{
                  background: msg.from === "user" ? "#0284C7" : "rgba(255,255,255,0.07)",
                  color: msg.from === "user" ? "white" : "rgba(255,255,255,0.85)",
                  borderRadius: msg.from === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                  border: msg.from === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking dots */}
        <AnimatePresence>
          {thinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {[0, 1, 2].map(i => (
                  <motion.span key={i}
                    className="w-1.5 h-1.5 rounded-full block"
                    style={{ background: "#0EA5E9" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Input bar — decorative */}
      <div className="px-3 py-2.5 flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex-1 rounded-xl px-3 py-2 text-xs"
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }}>
          Ask anything about your business…
        </div>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#0284C7" }}>
          <BarChart3 className="h-3.5 w-3.5 text-white" />
        </div>
      </div>

    </motion.div>
  )
}
