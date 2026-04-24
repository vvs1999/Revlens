"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { HeroChatDemo } from "@/components/hero-chat-demo"

function MeshBackground({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 1.5 + 0.5 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14, 165, 233, ${dark ? 0.5 : 0.25})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(14, 165, 233, ${(dark ? 0.15 : 0.07) * (1 - dist / 140)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize) }
  }, [dark])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const integrations = ["Square", "Stripe", "Shopify", "HubSpot", "QuickBooks"]

export function EnhancedHeroSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const bg = isDark ? "#060C1A" : "#F0F7FF"
  const headingColor = isDark ? "#ffffff" : "#0F172A"
  const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.6)"
  const pillBg = "rgba(14,165,233,0.1)"
  const pillBorder = isDark ? "rgba(14,165,233,0.25)" : "rgba(14,165,233,0.3)"
  const intBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(14,165,233,0.06)"
  const intColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.5)"
  const intBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.15)"
  const worksColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.35)"

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-36" style={{ background: bg }}>
      <MeshBackground dark={isDark} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, rgba(14, 165, 233, ${isDark ? 0.12 : 0.07}) 0%, transparent 65%)` }} />

      <div className="relative z-10 container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <motion.div className="flex flex-col space-y-6"
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>

            <motion.span className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: pillBg, color: "#0EA5E9", border: `1px solid ${pillBorder}` }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Sparkles className="h-3.5 w-3.5" />
              Done-for-You AI Analytics
            </motion.span>

            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ color: headingColor }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Your data.{" "}
              <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Your questions.
              </span>
              <br />Real answers.
            </motion.h1>

            <motion.p className="text-lg leading-relaxed max-w-lg" style={{ color: subColor }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              RevLens connects your tools, builds your data infrastructure, and deploys an AI analyst
              that knows your numbers — not the internet&apos;s. Weekly reports included.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button size="lg" className="btn-primary group h-12 px-7 text-base"
                onClick={() => (window.location.href = "/contact")}>
                Book a Free Demo
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <button
                className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold rounded-md transition-all duration-200"
                style={{ background: "transparent", border: "1px solid rgba(14,165,233,0.5)", color: "#0EA5E9" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(14,165,233,0.08)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                onClick={() => (window.location.href = "/dashboard-demo")}>
                See It in Action
              </button>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-2 pt-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <span className="text-xs uppercase tracking-widest mr-1" style={{ color: worksColor }}>Works with</span>
              {integrations.map((name, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: intBg, color: intColor, border: `1px solid ${intBorder}` }}>
                  {name}
                </span>
              ))}
            </motion.div>

          </motion.div>

          {/* Right — live chat demo */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: 24, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>

            <div className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(14, 165, 233, 0.18) 0%, transparent 65%)" }} />

            <HeroChatDemo />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
