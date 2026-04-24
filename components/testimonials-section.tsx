"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "I used to spend Sunday evenings pulling numbers from three different tools just to understand last week. Now I get a clear summary Monday morning and I can actually ask follow-up questions. It's changed how I run the business.",
    name: "Marcus T.",
    title: "Founder, SaaS startup · 200+ customers",
    initials: "MT",
    color: "#0EA5E9",
  },
  {
    quote: "The AI Analyst told me exactly which product line was dragging down my margins — something I'd been suspicious about for months but couldn't prove. It pulled the numbers, showed me the pattern, and I made the call the same week.",
    name: "Priya S.",
    title: "Owner, E-commerce brand · $2M ARR",
    initials: "PS",
    color: "#0284C7",
  },
  {
    quote: "What impressed me most was when I asked why a client segment was churning — it didn't make something up. It said the qualitative data wasn't in the system and suggested what to connect. That kind of honesty is rare.",
    name: "James O.",
    title: "Director, Digital Agency · 40+ clients",
    initials: "JO",
    color: "#38BDF8",
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full py-20 md:py-28 section-base relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 10% 20%, rgba(14,165,233,0.04) 0%, transparent 65%)" }} />

      <div className="relative z-10 container px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
            What customers say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Built for operators who want answers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl">
            Not for analysts. Not for engineers. For people running the business.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="enhanced-card p-7 flex flex-col gap-5">

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: "#FBBF24" }} />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="h-6 w-6 absolute -top-1 -left-1 opacity-10 text-foreground" />
                <p className="text-sm leading-relaxed text-muted-foreground pl-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)` }}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
