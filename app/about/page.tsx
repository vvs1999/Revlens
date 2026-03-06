"use client"

import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Target, Zap, Eye, BarChart2, Heart } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const BLUE = "#0284C7"
const BLUE_LIGHT = "#38BDF8"

export default function AboutPage() {
  return (
    <PageLayout>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                  About RevLens
                </span>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground leading-tight">
                  Built for the Operators{" "}
                  <span className="gradient-text">the Big Tools Forgot</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Enterprise analytics platforms cost $50k+ a year and take months to implement.
                  Independent operators have the exact same data problems — but none of the tools.
                  They're running their businesses blind while chains run on dashboards.
                  That gap is why RevLens exists.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button className="btn-primary h-11 px-6" onClick={() => window.location.href = "/dashboard-demo"}>
                    See the Product <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="btn-secondary h-11 px-6" onClick={() => window.location.href = "/contact"}>
                    Talk to Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl"
                  style={{ border: "2px solid rgba(2,132,199,0.2)" }} />
                <Image
                  src="/data-analytics.png"
                  width={560}
                  height={420}
                  alt="RevLens analytics platform"
                  className="rounded-2xl object-cover shadow-xl relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: "rgba(2,132,199,0.15)" }} />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── THE PROBLEM WE'RE FIXING ─────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-base">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                The Problem No One Was Solving
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Independent operators sit on a goldmine of data — POS transactions, booking history, inventory movements, customer patterns. But without the right lens, it's just noise.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: "Data exists. Insight doesn't.",
                desc: "Every POS system logs thousands of transactions. But knowing your Tuesday 2pm revenue doesn't tell you why traffic drops every Wednesday or what to do about it.",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Enterprise tools are overkill.",
                desc: "Tableau, Looker, Power BI — all built for companies with dedicated data teams and six-figure budgets. An independent café owner shouldn't need a data scientist to understand their business.",
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Operators need answers, not charts.",
                desc: "A dashboard that shows revenue is table stakes. What operators need is: 'Here's what changed, here's why it matters, here's exactly what to do this week.'",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 h-full">
                  <div className="p-3 rounded-xl w-fit mb-4" style={{ background: "rgba(14,165,233,0.1)", color: BLUE }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER MISSION ──────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(2,132,199,0.06)" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(2,132,199,0.1)" }}>
                    <Heart className="h-5 w-5" style={{ color: BLUE }} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: BLUE }}>
                    Why We Built This
                  </span>
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                  "We saw analytics teams at large companies make decisions in minutes that would take a local operator
                  weeks to figure out manually — if they figured them out at all. The technology gap wasn't a capability
                  problem. It was an access problem. RevLens is our answer to that."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                    style={{ background: BLUE }}>
                    NV
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Nitesh Virothi</p>
                    <p className="text-sm text-muted-foreground">Founder, RevLens</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── WHAT WE'RE BUILDING ──────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-base">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">What We're Building</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                RevLens is an AI-powered analytics platform that connects to your existing systems and delivers intelligence — not just data.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "AI Weekly Digest",
                desc: "Every Monday, a plain-English summary lands in your inbox: what changed, what's at risk, and the single most important action to take this week. Built by AI, specific to your numbers.",
                tag: "Core Feature",
              },
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: "Live Analytics Dashboard",
                desc: "Revenue trends, customer segments, peak hours, location performance — all in one place, connected directly to your POS. No exports, no spreadsheets, no manual work.",
                tag: "Core Feature",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Anomaly Detection",
                desc: "RevLens watches your data continuously and flags unusual patterns before they become problems. A Tuesday lunch drop three weeks running is a pattern. We catch it. You act on it.",
                tag: "AI-Powered",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Revenue Opportunity Engine",
                desc: "Not just 'here's what happened' — but 'here's $1,200 you're leaving on the table every week and exactly how to capture it.' Specific, quantified, actionable.",
                tag: "Coming Soon",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.08}>
                <div className="enhanced-card p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl" style={{ background: "rgba(14,165,233,0.1)", color: BLUE }}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        background: item.tag === "Coming Soon" ? "rgba(100,116,139,0.1)" : "rgba(2,132,199,0.1)",
                        color: item.tag === "Coming Soon" ? "#64748B" : BLUE,
                      }}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three principles that shape every decision we make.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Specificity over generality",
                desc: "\"You should consider improving customer retention\" is useless. \"Your Thursday rebooking rate dropped 18% — here's a text template to send your last 40 clients\" is RevLens.",
              },
              {
                number: "02",
                title: "Operators first, always",
                desc: "We don't build features because they're technically interesting. We build them because an independent operator at 11pm, exhausted after a long shift, needs an answer — not a chart.",
              },
              {
                number: "03",
                title: "Honest about where we are",
                desc: "RevLens is early. We're pre-revenue and actively building. We'd rather earn your trust by being straight with you than oversell and underdeliver.",
              },
            ].map((v, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 h-full">
                  <div className="text-4xl font-black mb-4" style={{ color: "rgba(2,132,199,0.2)" }}>{v.number}</div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-base">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="rounded-2xl p-8 md:p-12 text-center"
              style={{ background: `linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(14,165,233,0.04) 100%)`, border: "1px solid rgba(2,132,199,0.15)" }}>
              <div className="p-3 rounded-xl w-fit mx-auto mb-6" style={{ background: "rgba(2,132,199,0.1)" }}>
                <Eye className="h-7 w-7" style={{ color: BLUE }} />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">The Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
                In three years, every independent operator using RevLens should feel like they have a
                full-time data analyst on their team — one who never sleeps, never misses a pattern,
                and always speaks in plain English.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                The café owner in Montreal, the salon in Austin, the family restaurant in Sydney —
                all of them making better decisions faster because their data finally works for them.
                That's what we're building.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">The Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Small team, big conviction. We're building RevLens because we believe independent operators deserve better tools.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                name: "Nitesh Virothi",
                role: "Founder & CEO",
                bio: "Saw enterprise analytics teams make in minutes what took independent operators weeks — and decided to close that gap.",
                image: "/nitesh.jpg",
                initials: "NV",
              },
              // ADD NEW TEAM MEMBERS HERE — copy the object above and fill in details
            ].map((member, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.1}>
                <div className="enhanced-card p-6 text-center w-72">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                        style={{ border: `3px solid rgba(2,132,199,0.2)` }}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto"
                        style={{ background: BLUE }}>
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: BLUE }}>{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20" style={{ background: BLUE }}>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">We're Looking for Early Operators</h2>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                We're onboarding a small group of independent operators to build RevLens with.
                You get early access, direct input into the product, and founding-client pricing.
                We get real feedback from real businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button style={{ background: "#ffffff", color: BLUE, fontWeight: 600 }}
                  onClick={() => window.location.href = "/contact"}>
                  Apply for Early Access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline"
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                  onClick={() => window.location.href = "/dashboard-demo"}>
                  See the Demo First
                </Button>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <h3 className="text-lg font-bold text-white mb-4">What Early Operators Get</h3>
              <ul className="space-y-3">
                {[
                  "Full platform access before public launch",
                  "Direct line to the founding team — your feedback shapes the product",
                  "Founding-client pricing locked in permanently",
                  "First access to every new feature as it ships",
                  "Weekly check-ins during onboarding",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: BLUE_LIGHT }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}