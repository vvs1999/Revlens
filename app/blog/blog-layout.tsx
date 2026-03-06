import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Data insights, analytics strategies, and practical guides for independent restaurant, café, retail, and salon operators.",
  openGraph: {
    title: "RevLens Blog",
    description: "Practical data insights for independent operators.",
    url: "https://revlens.netlify.app/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
