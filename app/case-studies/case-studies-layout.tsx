import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how independent operators use RevLens to reduce waste, increase revenue, and make faster decisions with their own data.",
  openGraph: {
    title: "RevLens Case Studies",
    description: "Real results from real independent operators.",
    url: "https://revlens.netlify.app/case-studies",
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
