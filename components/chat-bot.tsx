"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, X, Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const BLUE = "#0284C7"
const WEBHOOK = "https://script.google.com/macros/s/AKfycby2vXq7QlsOJ0DLkThlhjFxhMTmhmpvU7AxHpcWnvvbB2Azic3fz6H0xJKdqwZuGM4g/exec"

type Step = "intro" | "business_type" | "pain_point" | "name" | "email" | "done"

interface Message {
  from: "bot" | "user"
  text: string
}

const BUSINESS_TYPES = ["Restaurant", "Café", "Retail Store", "Salon", "Other"]
const PAIN_POINTS = [
  "I don't know where my revenue is leaking",
  "Too much waste / overstock",
  "I can't predict busy vs slow periods",
  "I have data but don't know what to do with it",
]

async function sendToSheet(data: {
  name: string
  email: string
  businessType: string
  painPoint: string
}) {
  try {
    await fetch(WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "Chatbot",
        name: data.name,
        email: data.email,
        businessName: "",
        businessType: data.businessType,
        message: data.painPoint,
      }),
    })
  } catch (_) {}
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("intro")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ businessType: "", painPoint: "", name: "", email: "" })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        addBot("Hi! I'm Lens 👋 RevLens's AI assistant. I help independent operators figure out if RevLens is a good fit for their business. What type of business do you run?")
        setStep("business_type")
      }, 400)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const addBot = (text: string) => setMessages(prev => [...prev, { from: "bot", text }])
  const addUser = (text: string) => setMessages(prev => [...prev, { from: "user", text }])

  const handleChoice = async (choice: string) => {
    addUser(choice)
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)

    if (step === "business_type") {
      setData(d => ({ ...d, businessType: choice }))
      addBot("Got it. What's the biggest data challenge you're facing right now?")
      setStep("pain_point")
    } else if (step === "pain_point") {
      setData(d => ({ ...d, painPoint: choice }))
      addBot("That's exactly what RevLens is built for. We connect to your POS, build your analytics dashboard, and send you a plain-English summary every Monday — plus an AI you can ask follow-up questions.\n\nWhat's your name?")
      setStep("name")
    }
  }

  const handleInput = async () => {
    if (!input.trim()) return
    const val = input.trim()
    setInput("")
    addUser(val)
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)

    if (step === "name") {
      setData(d => ({ ...d, name: val }))
      addBot(`Nice to meet you, ${val}! What's the best email to reach you?`)
      setStep("email")
    } else if (step === "email") {
      if (!val.includes("@")) {
        addBot("That doesn't look like a valid email — can you double-check it?")
        return
      }
      const updated = { ...data, email: val }
      setData(updated)
      await sendToSheet(updated)
      addBot(`Perfect. We'll be in touch within 24 hours, ${data.name}. In the meantime, check out the live demo at revlens.netlify.app/dashboard-demo to see exactly what your dashboard could look like. 🚀`)
      setStep("done")
    }
  }

  const showChoices = step === "business_type" ? BUSINESS_TYPES : step === "pain_point" ? PAIN_POINTS : []

  return (
    <>
      {/* Bubble */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: BLUE }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-6 w-6 text-white" />
              </motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Sparkles className="h-6 w-6 text-white" />
              </motion.span>
          }
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: BLUE }}>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Lens</p>
                <p className="text-xs text-white/70">RevLens AI · Usually replies instantly</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/70">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ background: "hsl(var(--background))" }}>
              {messages.map((msg, i) => (
                <motion.div key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "text-white rounded-br-sm"
                      : "text-foreground rounded-bl-sm"
                  }`}
                    style={{
                      background: msg.from === "user" ? BLUE : "hsl(var(--muted))",
                    }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: "hsl(var(--muted))" }}>
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}

              {/* Choice buttons */}
              {!loading && showChoices.length > 0 && (
                <motion.div className="flex flex-col gap-2 pt-1"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  {showChoices.map((choice, i) => (
                    <button key={i}
                      className="text-left text-sm px-3.5 py-2 rounded-xl font-medium transition-all hover:opacity-90"
                      style={{ background: "rgba(2,132,199,0.08)", color: BLUE, border: `1px solid rgba(2,132,199,0.2)` }}
                      onClick={() => handleChoice(choice)}>
                      {choice}
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "done" && !loading && (
                <motion.div className="text-center pt-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <a href="/dashboard-demo"
                    className="text-sm font-semibold underline underline-offset-2"
                    style={{ color: BLUE }}>
                    View the live demo →
                  </a>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {(step === "name" || step === "email") && (
              <div className="px-3 py-3 border-t flex gap-2" style={{ borderColor: "hsl(var(--border))" }}>
                <input
                  className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
                  placeholder={step === "name" ? "Your name..." : "your@email.com"}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleInput()}
                  autoFocus
                />
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: BLUE }}
                  onClick={handleInput}>
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}