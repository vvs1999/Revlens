import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "See RevLens in action. Explore the live analytics dashboard and AI Weekly Digest across café, restaurant, retail, and salon business types.",
  openGraph: {
    title: "RevLens Live Demo",
    description: "See exactly what RevLens looks like with your business data.",
    url: "https://revlens.netlify.app/dashboard-demo",
  },
}

export default function DashboardDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
