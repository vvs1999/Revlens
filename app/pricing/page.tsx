import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PricingSection } from "@/components/pricing-section"
import { PricingExtras } from "@/components/pricing-extras"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for RevLens. Analytics plan at $499/month. AI Analyst plan with custom pricing based on your data volume.",
}

export default function PricingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
            <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
              Pricing
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Start with analytics and a weekly AI report. Upgrade when you&apos;re ready to ask questions.
              No setup fees, no long-term contracts.
            </p>
          </div>
        </div>
      </section>

      <PricingSection />
      <PricingExtras />
    </PageLayout>
  )
}
