import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Data strategy, revenue analytics, and practical business intelligence guides for SaaS founders, e-commerce operators, agency owners, and independent businesses.",
  openGraph: {
    title: "RevLens Blog",
    description: "Practical data insights for operators who want to grow smarter.",
    url: "https://revlens.ca/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
