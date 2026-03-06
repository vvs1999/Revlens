import Link from "next/link"
import { Logo } from "@/components/logo"
import { BarChart2, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))" }}>
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Data analytics built for restaurants and food businesses. Connect your POS and start seeing clearly.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "#0EA5E9" }} />
              <span>hello@revlens.ca</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: "#0EA5E9" }} />
              <span>Toronto, Canada</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--foreground))" }}>Services</h4>
            <ul className="space-y-2.5">
              {["Sales Analysis", "Inventory Optimization", "Labour Scheduling", "Revenue Forecasting"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm transition-colors hover:text-[#0EA5E9]"
                    style={{ color: "hsl(var(--muted-foreground))" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--foreground))" }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[#0EA5E9]"
                    style={{ color: "hsl(var(--muted-foreground))" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--foreground))" }}>Integrations</h4>
            <ul className="space-y-2.5">
              {["Square", "Toast", "Lightspeed", "QuickBooks", "Shopify POS"].map((item) => (
                <li key={item}>
                  <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            © {new Date().getFullYear()} RevLens. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs hover:text-[#0EA5E9] transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}>Privacy Policy</Link>
            <Link href="/terms" className="text-xs hover:text-[#0EA5E9] transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}