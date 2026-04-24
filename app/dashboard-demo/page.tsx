"use client"

import { PageLayout } from "@/components/page-layout"
import { PlatformDemoContent } from "@/components/platform-demo-content"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, BarChart2, FileText, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"

const BLUE = "#0284C7"

export default function DashboardDemoPage() {
  return (
    <PageLayout>

      {/* ── HERO ── */}
      <section className="w-full py-16 md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #060C1A 0%, #0D1A2E 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
            style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">

            <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
              Platform Demo
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
              See RevLens{" "}
              <span style={{ background: "linear-gradient(90deg, #38BDF8, #0EA5E9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in action
              </span>
            </h1>

            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Explore all three products with sample data from your industry. Switch your business type and interact with the full platform.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-1">
              {[
                { icon: <BarChart2 className="h-3.5 w-3.5" />, label: "Live Reporting"   },
                { icon: <FileText  className="h-3.5 w-3.5" />, label: "Weekly AI Report" },
                { icon: <Sparkles  className="h-3.5 w-3.5" />, label: "AI Analyst"       },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(14,165,233,0.08)", color: "#7DD3FC", border: "1px solid rgba(14,165,233,0.15)" }}>
                  {item.icon} {item.label}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="btn-primary h-11 px-6 group" onClick={() => window.location.href = "/contact"}>
                Book a Live Demo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="h-11 px-6"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#ffffff", background: "transparent" }}
                onClick={() => window.location.href = "/pricing"}>
                View Pricing
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
              {[
                { icon: <CheckCircle className="h-4 w-4" />, text: "Sample data — explore before committing" },
                { icon: <Zap         className="h-4 w-4" />, text: "Switch industry to see your context"     },
                { icon: <Sparkles    className="h-4 w-4" />, text: "AI Analyst uses real query logic"        },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span style={{ color: "rgba(14,165,233,0.6)" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      <PlatformDemoContent showCTA={true} />

    </PageLayout>
  )
}
