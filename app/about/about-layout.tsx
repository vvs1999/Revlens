import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "RevLens was built because enterprise analytics costs $50k+/year while independent operators run blind. We're closing that gap with AI-powered insights built for local businesses.",
  openGraph: {
    title: "About RevLens",
    description: "Built for the operators the big tools forgot.",
    url: "https://revlens.netlify.app/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
