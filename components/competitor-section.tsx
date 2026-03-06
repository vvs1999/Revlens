"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { CheckCircle, X } from "lucide-react"

const BLUE = "#0284C7"

const competitors = [
  { name: "Power BI / Tableau", them: ["Powerful charts", "You interpret everything", "Needs a data team", "No recommendations", "No weekly summary"] },
  { name: "Square / Toast Built-in", them: ["Basic numbers only", "Locked to one POS", "No AI layer", "No cross-metric insight", "No action plan"] },
  { name: "Hiring a Data Analyst", them: ["$60k–$100k/year", "Slow turnaround", "No 24/7 availability", "Leaves when they leave", "Not operator-focused"] },
]

const revlensFeatures = [
  "Done-for-you dashboard setup — we build it",
  "Plain-English Monday report, no charts required",
  "AI follow-up Q&A — ask anything about your data",
  "Works across Square, Toast, Lightspeed & more",
  "Fraction of the cost of a full-time analyst",
]

export function CompetitorSection() {
  return (
    <section className="w-full py-16 md:py-24 section-alt-1">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <AnimateOnScroll animation="fade">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
              Why RevLens
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground mb-4">
              Every Other Tool Shows You Charts.{" "}
              <span style={{ background: "linear-gradient(135deg, #0284C7, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                We Tell You What To Do.
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Operators don't have time to interpret dashboards. RevLens does the analysis for you and delivers a clear action plan every Monday morning.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-4 gap-4">

          {/* Competitors */}
          {competitors.map((comp, i) => (
            <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.08}>
              <div className="rounded-2xl p-6 h-full"
                style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                <div className="mb-5">
                  <p className="font-bold text-foreground text-sm mb-1">{comp.name}</p>
                  <div className="h-0.5 w-8 rounded-full" style={{ background: "rgba(100,116,139,0.3)" }} />
                </div>
                <ul className="space-y-3">
                  {comp.them.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}

          {/* RevLens */}
          <AnimateOnScroll animation="slide-up" delay={0.3}>
            <div className="rounded-2xl p-6 h-full relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(14,165,233,0.04) 100%)`, border: `2px solid rgba(2,132,199,0.3)` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ background: "rgba(14,165,233,0.15)" }} />
              <div className="mb-5 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-foreground text-sm">RevLens</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                    style={{ background: BLUE }}>Our approach</span>
                </div>
                <div className="h-0.5 w-8 rounded-full" style={{ background: BLUE }} />
              </div>
              <ul className="space-y-3 relative z-10">
                {revlensFeatures.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

        </div>

        {/* Bottom callout */}
        <AnimateOnScroll animation="fade">
          <div className="mt-10 rounded-2xl p-6 text-center"
            style={{ background: `rgba(2,132,199,0.04)`, border: "1px solid rgba(2,132,199,0.15)" }}>
            <p className="text-lg font-bold text-foreground mb-1">
              "Every other analytics tool gives you a dashboard. RevLens gives you Monday morning clarity."
            </p>
            <p className="text-sm text-muted-foreground">
              We handle the setup once. After that, your data works for you — not the other way around.
            </p>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  )
}
