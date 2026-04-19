import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "AI Weekly Digest, live analytics dashboard, anomaly detection, and revenue opportunity scoring — built for SaaS companies, e-commerce brands, marketing agencies, and independent operators. Starting at $499/month.",
  openGraph: {
    title: "RevLens Services & Pricing",
    description: "Everything you need to stop running blind. Starting at $499/month.",
    url: "https://revlens.ca/services",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
