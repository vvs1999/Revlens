import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Apply for early access to RevLens or ask us anything. We respond personally within 24 hours.",
  openGraph: {
    title: "Contact RevLens",
    description: "Apply for early access. We respond within 24 hours.",
    url: "https://revlens.netlify.app/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
