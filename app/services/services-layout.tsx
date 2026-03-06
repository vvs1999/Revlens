import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI Weekly Digest, live analytics dashboard, anomaly detection, and revenue opportunity scoring — built for independent restaurants, cafés, retail stores, and salons.",
  openGraph: {
    title: "RevLens Services",
    description: "Everything an independent operator needs to stop running blind.",
    url: "https://revlens.netlify.app/services",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
