"use client"

import type React from "react"
import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle, Loader2, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const BLUE = "#0284C7"
const WEBHOOK = "https://script.google.com/macros/s/AKfycby4h3mzNluj2qLpRbbfhECHj0gGmUzIhAGZbAey9P2dZcfaBsxHQpXY5YM-Ic46BZCf/exec"

const faqs = [
  { q: "How quickly can I get started?", a: "We're currently onboarding a small group of early operators. Once you apply, we'll reach out within 48 hours to set up a call, connect to your POS, and get your first AI Weekly Digest running — typically within one week." },
  { q: "What types of businesses does RevLens work with?", a: "Right now we're focused on independent operators: restaurants, cafés, retail stores, and salons. If you're running a local business with a POS system, we can almost certainly connect to it." },
  { q: "Do I need any technical knowledge?", a: "None. We handle the entire setup. You connect your POS, we do the rest. The weekly digest lands in your inbox in plain English — no dashboards to learn, no exports to run." },
  { q: "What POS systems do you connect to?", a: "We're actively building integrations with Square, Toast, Lightspeed, and Shopify POS. If you're on a different system, tell us — we're prioritising based on what our early operators actually use." },
  { q: "What does it cost?", a: "We haven't published public pricing yet. Early operators get founding-client pricing, which will be significantly below what we charge at launch. Book a call and we'll walk you through options based on your business size." },
  { q: "Is my data secure?", a: "Yes. We use read-only API connections to your POS — we can never make changes to your system. All data is encrypted in transit and at rest. We don't sell or share your data with anyone." },
]

const BUSINESS_TYPES = ["Restaurant", "Café", "Retail Store", "Salon", "Other"]
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

// Get today + next 14 days as selectable dates
function getAvailableDates() {
  const dates: { label: string; value: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const day = d.toLocaleDateString("en-US", { weekday: "short" })
    if (day === "Sun" || day === "Sat") continue // skip weekends
    dates.push({
      label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      value: d.toISOString().split("T")[0],
    })
  }
  return dates
}

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "", email: "", business: "", type: "", message: "",
    preferredDate: "", preferredTime: "",
  })

  const availableDates = getAvailableDates()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    const preferredTime = formData.preferredDate && formData.preferredTime
      ? `${formData.preferredDate} at ${formData.preferredTime}`
      : formData.preferredDate || formData.preferredTime || "Not specified"
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
          preferredTime,
        }),
      })
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        setFormData({ name: "", email: "", business: "", type: "", message: "", preferredDate: "", preferredTime: "" })
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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                Contact
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                Let's Talk About{" "}
                <span className="gradient-text">Your Business</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Whether you want early access, have a question, or just want to see if RevLens is a fit —
                send us a message and we'll get back to you within 24 hours.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────────── */}
      <section className="w-full py-12 md:py-16 section-base">
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
                        <a href="mailto:hello@revlens.co" className="font-medium hover:underline" style={{ color: BLUE }}>hello@revlens.co</a>
                      </p>
                    </div>
                  ) : formState === "error" ? (
                    <div className="flex flex-col items-center text-center py-12 space-y-4">
                      <p className="text-foreground font-semibold">Something went wrong. Please try again or email us at{" "}
                        <a href="mailto:hello@revlens.co" style={{ color: BLUE }}>hello@revlens.co</a>
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
                              <Input id="email" name="email" type="email" placeholder="alex@yourbusiness.com" required
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
                              <Input id="business" name="business" placeholder="The Corner Café" required
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

                          {/* Preferred Meeting Time */}
                          <div className="rounded-xl p-4 space-y-3"
                            style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.15)" }}>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" style={{ color: BLUE }} />
                              <Label className="text-sm font-semibold" style={{ color: BLUE }}>
                                Preferred Call Time <span className="text-muted-foreground font-normal">(optional)</span>
                              </Label>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground">Date</Label>
                                <select name="preferredDate"
                                  value={formData.preferredDate} onChange={handleChange}
                                  disabled={formState !== "idle"}
                                  className={selectClass} style={selectStyle}>
                                  <option value="">Pick a date...</option>
                                  {availableDates.map((d, i) => (
                                    <option key={i} value={d.value}>{d.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground">Time (EST)</Label>
                                <select name="preferredTime"
                                  value={formData.preferredTime} onChange={handleChange}
                                  disabled={formState !== "idle"}
                                  className={selectClass} style={selectStyle}>
                                  <option value="">Pick a time...</option>
                                  {TIME_SLOTS.map((t, i) => (
                                    <option key={i} value={t}>{t}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              We'll do our best to match your preferred time. All times in EST.
                            </p>
                          </div>

                          <Button type="submit" className="w-full h-11 font-semibold"
                            style={{ background: BLUE, color: "#ffffff" }}
                            disabled={formState !== "idle"}>
                            {formState === "submitting"
                              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                              : <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>}
                          </Button>

                          <p className="text-xs text-center text-muted-foreground">
                            Prefer email?{" "}
                            <a href="mailto:hello@revlens.co" className="font-medium hover:underline" style={{ color: BLUE }}>
                              hello@revlens.co
                            </a>
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </AnimateOnScroll>
            </div>

            {/* ── RIGHT: WHAT HAPPENS NEXT + BENEFITS ── */}
            <div className="lg:col-span-2 space-y-5">
              <AnimateOnScroll animation="slide-up" delay={0.1}>
                <div className="rounded-2xl p-6" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                  <h3 className="font-bold text-foreground mb-5">What happens next</h3>
                  <div className="space-y-5">
                    {[
                      { step: "1", title: "We reply personally", desc: "Every message is read and answered by a real person — within 24 hours." },
                      { step: "2", title: "We book a 30-min call", desc: "If it looks like a good fit, we set up a quick call to learn about your business." },
                      { step: "3", title: "We connect to your POS", desc: "We handle the setup. No technical work needed on your end." },
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

                <div className="rounded-2xl p-6" style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.15)" }}>
                  <h3 className="font-bold text-foreground mb-1">Why reach out early?</h3>
                  <p className="text-xs text-muted-foreground mb-4">We're onboarding a small founding group. Here's what that means for you.</p>
                  <ul className="space-y-3">
                    {[
                      "Founding-client pricing — locked in permanently",
                      "Direct input into what we build next",
                      "White-glove onboarding from the founding team",
                      "First access to every new feature as it ships",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                        {item}
                      </li>
                    ))}
                  </ul>
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

      {/* ── CTA ──────────────────────────────────────────────────── */}
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