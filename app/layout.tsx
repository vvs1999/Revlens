import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ChatBot } from "@/components/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://revlens.ca"),
  title: {
    default: "RevLens — Business Intelligence for Independent Operators",
    template: "%s | RevLens",
  },
  description:
    "RevLens connects your data, builds your analytics dashboard, and delivers a plain-English AI report every Monday. Built for SaaS companies, e-commerce brands, marketing agencies, and independent operators.",
  keywords: [
    "business intelligence",
    "SaaS analytics",
    "e-commerce analytics",
    "agency analytics",
    "revenue analytics",
    "MRR tracking",
    "churn analytics",
    "AI weekly report",
    "done-for-you analytics",
    "independent operator analytics",
    "small business analytics",
    "AI business insights",
    "data dashboard",
    "Monday morning report",
    "revenue reporting",
    "customer retention analytics",
  ],
  authors: [{ name: "RevLens" }],
  creator: "RevLens",
  openGraph: {
    type: "website",
    siteName: "RevLens",
    title: "RevLens — Business Intelligence for Independent Operators",
    description:
      "Connect your data. Get a plain-English AI report every Monday. No analysts, no dashboards to learn — just answers.",
    url: "https://revlens.ca",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevLens — Business Intelligence for Independent Operators",
    description:
      "Done-for-you analytics for SaaS, e-commerce, agencies, and operators. Weekly AI digest. Live dashboard. Starting at $499/month.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://revlens.ca",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <ScrollToTop />
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
