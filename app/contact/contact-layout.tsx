import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call or send us a message. We respond personally within 24 hours. No bots, no runaround.",
  openGraph: {
    title: "Talk to RevLens",
    description: "Book a call or send a message. We reply personally within 24 hours.",
    url: "https://revlens.ca/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
