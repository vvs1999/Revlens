import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how SaaS companies, e-commerce brands, agencies, and operators use RevLens to increase revenue, reduce churn, and make faster decisions with their own data.",
  openGraph: {
    title: "RevLens Case Studies",
    description: "Real results from real operators — across SaaS, e-commerce, agencies, and beyond.",
    url: "https://revlens.ca/case-studies",
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
