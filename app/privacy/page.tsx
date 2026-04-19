import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "Privacy Policy | RevLens",
  description: "How RevLens collects, uses, and protects your business data.",
}

export default function PrivacyPage() {
  return (
    <PageLayout>
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 2025</p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground">

            <div>
              <h2 className="text-xl font-semibold mb-3">1. Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                RevLens ("we", "us", "our") is a data analytics service operated by RevLens Inc. We provide
                business intelligence and reporting services to independent operators and small businesses.
                Our registered business operates under the domain <strong>revlens.ca</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. What Data We Access</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To deliver our analytics service, we connect to your existing business systems via read-only
                API access. The data we process includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Transaction records from your POS system (e.g. Square, Toast, Lightspeed)</li>
                <li>Inventory levels and product catalogues</li>
                <li>Aggregated customer purchase history (no personally identifiable customer information)</li>
                <li>Sales and revenue figures</li>
                <li>Operational data such as hours, staff schedules (where integrated)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do <strong>not</strong> access, store, or process payment card numbers, bank account
                details, passwords, or any government-issued identification.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Your data is used exclusively to:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Generate analytics reports and dashboards for your business</li>
                <li>Deliver your weekly AI-powered insights digest</li>
                <li>Power our recommendations engine (inventory, pricing, customer retention)</li>
                <li>Improve the accuracy of our models over time (using aggregated, anonymised data only)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not sell your data. We do not share your business data with third parties except
                as necessary to operate the service (e.g. cloud infrastructure providers under strict
                data processing agreements).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. Where Your Data Is Stored</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is processed and stored on Google Cloud Platform (GCP) infrastructure, hosted
                in North America. All data at rest is encrypted using AES-256. All data in transit is
                encrypted via TLS 1.2 or higher. Access to raw data is restricted to authorised RevLens
                engineers and is logged for audit purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your business data for the duration of your subscription plus 90 days, to allow
                for any final reporting or dispute resolution. Upon written request following cancellation,
                we will delete all of your data within 30 days. Aggregated, non-identifiable trend data
                may be retained for model training purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. Access Controls</h2>
              <p className="text-muted-foreground leading-relaxed">
                All POS integrations use read-only OAuth tokens — we never request write permissions to
                your POS or accounting systems. You can revoke RevLens's access to any connected system
                at any time directly from within that platform's settings. Revoking access will suspend
                your RevLens dashboard but will not delete your historical data unless explicitly requested.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Depending on your jurisdiction (including under PIPEDA in Canada and GDPR where applicable),
                you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Request a copy of all data we hold about your business</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your data ("right to erasure")</li>
                <li>Object to certain types of processing</li>
                <li>Withdraw consent at any time without penalty</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, email us at{" "}
                <a href="mailto:privacy@revlens.ca" className="text-[#0284C7] underline">privacy@revlens.ca</a>.
                We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">8. Website Analytics</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses privacy-respecting analytics to understand traffic patterns (page views,
                referrers, general device type). We do not use third-party behavioural advertising trackers
                or sell website visitor data. We may use cookies strictly necessary for site functionality,
                such as remembering your preference settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">9. Third-Party Integrations</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you connect a third-party platform (Square, Toast, Lightspeed, QuickBooks, etc.) to
                RevLens, you are subject to that platform's own terms of service and privacy policy in
                addition to ours. We recommend reviewing those policies. RevLens is responsible only for
                how we handle data once it reaches our systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. Material changes will be communicated
                via email to active subscribers at least 14 days before taking effect. Continued use
                of the service after that date constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions, concerns, or data requests can be directed to:
              </p>
              <div className="mt-3 p-4 rounded-xl text-muted-foreground text-sm"
                style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <p className="font-semibold text-foreground">RevLens Inc.</p>
                <p className="mt-1">Email: <a href="mailto:privacy@revlens.ca" className="text-[#0284C7] underline">privacy@revlens.ca</a></p>
                <p>Website: <a href="https://revlens.ca" className="text-[#0284C7] underline">revlens.ca</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  )
}
