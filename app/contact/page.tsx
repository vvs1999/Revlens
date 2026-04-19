"use client"

import type React from "react"
import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle, Loader2, ChevronDown, ChevronUp, Calendar, ExternalLink, Mail, ShieldCheck, Clock, Zap } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const BLUE = "#0284C7"
const WEBHOOK = "https://script.google.com/macros/s/AKfycby2vXq7QlsOJ0DLkThlhjFxhMTmhmpvU7AxHpcWnvvbB2Azic3fz6H0xJKdqwZuGM4g/exec"

const faqs = [
  { q: "How quickly can I get started?", a: "We're currently onboarding a small group of early clients. Once you book a call, we move fast — typically one week from first conversation to your first AI insights report." },
  { q: "What types of businesses does RevLens work with?", a: "SaaS companies, e-commerce brands, marketing agencies, and independent operators (restaurants, cafés, retail, salons). If you have data you're not acting on, we can help — regardless of industry." },
  { q: "Do I need any technical knowledge?", a: "None. We handle the entire data connection and setup. Insights land in your inbox in plain English — no dashboards to learn, no exports to run, no analysts required." },
  { q: "What data sources do you connect to?", a: "POS systems (Square, Toast, Lightspeed, Shopify), CRMs (HubSpot), e-commerce platforms (Shopify, WooCommerce), accounting tools (QuickBooks, Xero), billing systems (Stripe), and custom data warehouses. If you're on something else, ask us." },
  { q: "What does it cost?", a: "Plans start at $499/month for single-location or single-product businesses. Growth is $999/month. Enterprise and multi-location pricing is custom. Early clients get founding pricing locked in permanently." },
  { q: "Is my data secure?", a: "Yes. We use read-only API connections — we can never modify your source systems. All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). We don't sell or share your data. Full details at revlens.ca/privacy." },
]

const BUSINESS_TYPES = ["SaaS / Tech", "E-commerce / DTC", "Marketing Agency", "Restaurant", "Café", "Retail Store", "Salon", "Other"]
const CAL_URL = "https://cal.com/virothi-nitesh-calendar"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "", email: "", business: "", type: "", message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Contact Form",
          name: formData.name,
          email: formData.email,
          businessName: formData.business,
          businessType: formData.type,
          message: formData.message,
        }),
      })
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        setFormData({ name: "", email: "", business: "", type: "", message: "" })
      }, 5000)
    } catch (_) {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 3000)
    }
  }

  const selectClass = `w-full h-11 px-3 rounded-md text-sm border bg-transparent transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-0`
  const selectStyle = {
    borderColor: "hsl(var(--border))",
    color: "hsl(var(--foreground))",
    background: "hsl(var(--background))",
  }

  return (
    <PageLayout>

      {/* ── TWO-PATH HERO ──────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 section-alt-1">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Contact
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                Talk to{" "}
                <span style={{ background: "linear-gradient(135deg, #0284C7, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  RevLens
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Pick whatever works. Either way, a real person responds — no bots, no runaround.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            {/* ── Path 1: Book a Call ── */}
            <AnimateOnScroll animation="slide-up" delay={0.05}>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
                className="flex flex-col space-y-4 rounded-2xl p-8 h-full group transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0EA5E9 100%)`, color: "#ffffff", boxShadow: "0 8px 32px rgba(2,132,199,0.3)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">Book a 30-min Call</span>
                </div>
                <p className="text-white/80 leading-relaxed text-sm">
                  Schedule a free demo call. We'll learn about your business, walk through what RevLens looks like with your data, and answer every question.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["No commitment", "We come prepared", "Instant scheduling"].map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 font-semibold text-sm mt-auto pt-2">
                  <span>Choose your time on Cal.com</span>
                  <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </AnimateOnScroll>

            {/* ── Path 2: Send a Message ── */}
            <AnimateOnScroll animation="slide-up" delay={0.1}>
              <button
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                className="flex flex-col space-y-4 rounded-2xl p-8 h-full text-left group transition-all duration-200 hover:-translate-y-0.5 w-full"
                style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                    <Mail className="h-5 w-5" style={{ color: BLUE }} />
                  </div>
                  <span className="text-xl font-bold text-foreground">Send a Message</span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Not ready for a call? No problem. Drop us a note and we'll reply personally within 24 hours. Ask us anything — no pressure.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Reply within 24 hours", "Ask anything", "No sales pressure"].map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(14,165,233,0.06)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.12)" }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 font-semibold text-sm mt-auto pt-2" style={{ color: BLUE }}>
                  <span>Go to form below</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────────── */}
      <section id="contact-form" className="w-full py-12 md:py-16 section-base">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

            {/* ── LEFT: FORM ── */}
            <div className="lg:col-span-3">
              <AnimateOnScroll animation="slide-up">
                <div className="rounded-2xl p-8"
                  style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>

                  {formState === "success" ? (
                    <div className="flex flex-col items-center text-center py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(22,163,74,0.1)" }}>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Message received.</h3>
                      <p className="text-muted-foreground max-w-sm">
                        We'll get back to you within 24 hours. If it's urgent, email us at{" "}
                        <a href="mailto:hello@revlens.ca" className="font-medium hover:underline" style={{ color: BLUE }}>hello@revlens.ca</a>
                      </p>
                    </div>
                  ) : formState === "error" ? (
                    <div className="flex flex-col items-center text-center py-12 space-y-4">
                      <p className="text-foreground font-semibold">Something went wrong. Please try again or email us at{" "}
                        <a href="mailto:hello@revlens.ca" style={{ color: BLUE }}>hello@revlens.ca</a>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-foreground mb-1">Send a Message</h2>
                        <p className="text-sm text-muted-foreground">
                          We read every message and respond personally.{" "}
                          <span className="text-red-400">*</span> Required fields.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="space-y-5">

                          {/* Name + Email */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-medium">
                                Your Name <span className="text-red-400">*</span>
                              </Label>
                              <Input id="name" name="name" placeholder="Alex Johnson" required
                                value={formData.name} onChange={handleChange}
                                disabled={formState !== "idle"} className="h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-medium">
                                Email Address <span className="text-red-400">*</span>
                              </Label>
                              <Input id="email" name="email" type="email" placeholder="alex@company.com" required
                                value={formData.email} onChange={handleChange}
                                disabled={formState !== "idle"} className="h-11" />
                            </div>
                          </div>

                          {/* Business Name + Type */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="business" className="text-sm font-medium">
                                Business Name <span className="text-red-400">*</span>
                              </Label>
                              <Input id="business" name="business" placeholder="Acme Corp" required
                                value={formData.business} onChange={handleChange}
                                disabled={formState !== "idle"} className="h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="type" className="text-sm font-medium">
                                Business Type <span className="text-red-400">*</span>
                              </Label>
                              <select id="type" name="type" required
                                value={formData.type} onChange={handleChange}
                                disabled={formState !== "idle"}
                                className={selectClass} style={selectStyle}>
                                <option value="" disabled>Select type...</option>
                                {BUSINESS_TYPES.map((t, i) => (
                                  <option key={i} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium">
                              What do you want to know or achieve? <span className="text-red-400">*</span>
                            </Label>
                            <Textarea id="message" name="message" rows={4} required
                              placeholder="Tell us about your business — what decisions are you making blind right now? What would change if you had better data?"
                              value={formData.message} onChange={handleChange}
                              disabled={formState !== "idle"} />
                          </div>

                          <Button type="submit" className="w-full h-11 font-semibold"
                            style={{ background: BLUE, color: "#ffffff" }}
                            disabled={formState !== "idle"}>
                            {formState === "submitting"
                              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                              : <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>}
                          </Button>

                          <p className="text-xs text-center text-muted-foreground">
                            Prefer a call instead?{" "}
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: BLUE }}>
                              Book directly on Cal.com
                            </a>
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </AnimateOnScroll>
            </div>

            {/* ── RIGHT: WHAT HAPPENS NEXT + TRUST SIGNALS ── */}
            <div className="lg:col-span-2 space-y-5">
              <AnimateOnScroll animation="slide-up" delay={0.1}>

                {/* What happens next */}
                <div className="rounded-2xl p-6" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                  <h3 className="font-bold text-foreground mb-5">What happens next</h3>
                  <div className="space-y-5">
                    {[
                      { step: "1", title: "We reply personally", desc: "Every message is read and answered by a real person — within 24 hours." },
                      { step: "2", title: "30-min discovery call", desc: "If it looks like a fit, we schedule a quick call to learn about your business and data." },
                      { step: "3", title: "We handle the setup", desc: "We connect to your tools and configure your analytics. No technical work needed on your end." },
                      { step: "4", title: "Your first digest ships", desc: "Within one week, your first AI Weekly Digest lands in your inbox." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                          style={{ background: BLUE }}>{item.step}</div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust signals */}
                <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.15)" }}>
                  {[
                    { icon: <Clock className="h-4 w-4" />, title: "Fast turnaround", desc: "First report delivered within one week of your first conversation." },
                    { icon: <ShieldCheck className="h-4 w-4" />, title: "Read-only access only", desc: "We connect via API — we can never modify your source systems. Full privacy policy at revlens.ca/privacy." },
                    { icon: <Zap className="h-4 w-4" />, title: "Founding pricing locked in", desc: "Early clients keep their rate permanently — even as we raise prices after launch." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0" style={{ color: BLUE }}>{item.icon}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </AnimateOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <AnimateOnScroll animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Common Questions</h2>
              <p className="text-muted-foreground">Straight answers — no marketing speak.</p>
            </div>
          </AnimateOnScroll>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} animation="slide-up" delay={i * 0.05}>
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}>
                  <button className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                      : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20" style={{ background: BLUE }}>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Not Sure Yet? See the Demo.</h2>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                Take 5 minutes with the interactive demo before reaching out. Switch business types, explore the AI Weekly Digest, and see exactly what RevLens would look like with your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button style={{ background: "#ffffff", color: BLUE, fontWeight: 600 }}
                  onClick={() => window.location.href = "/dashboard-demo"}>
                  View Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline"
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                  onClick={() => window.location.href = "/services"}>
                  See Pricing
                </Button>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <h3 className="text-lg font-bold text-white mb-4">Why Reach Out Early?</h3>
              <ul className="space-y-3">
                {[
                  "Founding-client pricing — locked in permanently before launch",
                  "Direct input into what we build next",
                  "White-glove onboarding from the founding team",
                  "First access to every new feature as it ships",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-white/60" />
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
