import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://revlens.netlify.app"),
  title: {
    default: "RevLens — AI Analytics for Independent Operators",
    template: "%s — RevLens",
  },
  description:
    "RevLens gives independent restaurants, cafés, retail stores, and salons the same data intelligence as enterprise chains — at a fraction of the cost.",
  keywords: [
    "restaurant analytics",
    "café analytics",
    "retail analytics",
    "salon analytics",
    "independent operator analytics",
    "POS analytics",
    "AI weekly digest",
    "small business data",
    "local business analytics",
  ],
  authors: [{ name: "RevLens" }],
  creator: "RevLens",
  openGraph: {
    type: "website",
    siteName: "RevLens",
    title: "RevLens — AI Analytics for Independent Operators",
    description:
      "Stop running blind. RevLens connects to your POS and delivers plain-English insights every Monday.",
    url: "https://revlens.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevLens — AI Analytics for Independent Operators",
    description: "Weekly AI digest. Live dashboard. Built for independent operators.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
