import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "Terms of Service | RevLens",
  description: "Terms and conditions governing use of the RevLens analytics platform and services.",
}

const EFFECTIVE_DATE = "April 18, 2026"
const COMPANY = "RevLens"
const DOMAIN = "revlens.ca"
const EMAIL = "hello@revlens.ca"
const JURISDICTION = "Ontario, Canada"

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the RevLens website (${DOMAIN}) or any RevLens services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you are accessing the Service on behalf of a business or other legal entity, you represent that you have authority to bind that entity to these Terms. If you do not agree with any part of these Terms, you must not use the Service.`,
  },
  {
    title: "2. Description of Service",
    body: `RevLens provides a done-for-you business intelligence platform that connects to third-party data sources (including but not limited to POS systems, CRMs, e-commerce platforms, and billing tools), processes that data, and delivers analytics reports, dashboards, and AI-generated insights to subscribing clients. The Service is intended for business use by operators, founders, and their authorized team members. RevLens reserves the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.`,
  },
  {
    title: "3. Accounts and Access",
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately at ${EMAIL} if you become aware of any unauthorized use of your account. RevLens reserves the right to terminate or suspend accounts that violate these Terms, engage in fraudulent activity, or otherwise misuse the Service. You must be at least 18 years old to use the Service.`,
  },
  {
    title: "4. Payment, Billing, and Cancellation",
    body: `Access to the Service requires a paid subscription. Fees are charged on a monthly or annual basis as selected at sign-up. All fees are stated in Canadian dollars (CAD) unless otherwise indicated. Subscription fees are non-refundable except where required by applicable law. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period and you will retain access until that date. RevLens reserves the right to change pricing with 30 days' written notice. Founding-client pricing agreements, where explicitly confirmed in writing, will be honoured for the duration of an active subscription.`,
  },
  {
    title: "5. Data Access and Privacy",
    body: `RevLens connects to your third-party data sources using read-only API access. We cannot modify, delete, or write data to any connected system. You grant RevLens permission to access and process data from your connected sources for the sole purpose of providing the Service. We do not sell your data to third parties. All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Data is stored on infrastructure operated by Google Cloud Platform (GCP) in Canadian or North American data centres. Upon cancellation, your data is retained for 90 days and then permanently deleted upon request or automatically after that period. For full details, please review our Privacy Policy at ${DOMAIN}/privacy.`,
  },
  {
    title: "6. Acceptable Use",
    body: `You agree not to: (a) use the Service for any unlawful purpose or in violation of any applicable laws; (b) attempt to gain unauthorized access to any RevLens systems or data; (c) reverse engineer, decompile, or disassemble any part of the Service; (d) use the Service to process data you do not have the legal right to access; (e) resell, sublicense, or otherwise transfer your access to the Service to any third party without prior written consent from RevLens; or (f) use automated means to access the Service in a manner that exceeds normal usage patterns.`,
  },
  {
    title: "7. Intellectual Property",
    body: `All content, software, algorithms, dashboards, report templates, and AI models that form part of the RevLens Service are the exclusive intellectual property of RevLens and its licensors. These Terms do not grant you any ownership rights in the Service. You retain ownership of all data you connect to the Service. Any feedback, suggestions, or ideas you submit regarding the Service may be used by RevLens without compensation or attribution.`,
  },
  {
    title: "8. Disclaimer of Warranties",
    body: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. RevLens does not warrant that the Service will be uninterrupted, error-free, or that any specific results will be achieved. All analytics, projections, and AI-generated insights are provided for informational purposes only and do not constitute financial, legal, or business advice.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, RevLens and its officers, directors, employees, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities arising out of or in connection with your use of the Service, even if RevLens has been advised of the possibility of such damages. RevLens's total aggregate liability to you for any claims arising under these Terms shall not exceed the total fees paid by you to RevLens in the 12 months immediately preceding the event giving rise to the claim.`,
  },
  {
    title: "10. Indemnification",
    body: `You agree to indemnify, defend, and hold harmless RevLens and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your access to or use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights, including any intellectual property or privacy rights; or (d) any data you connect to or upload through the Service.`,
  },
  {
    title: "11. Third-Party Integrations",
    body: `The Service integrates with third-party platforms including but not limited to Square, Stripe, Shopify, HubSpot, QuickBooks, and others. RevLens is not responsible for the availability, accuracy, or policies of these third-party services. Your use of any third-party platform connected to RevLens is governed by that platform's own terms and privacy policies. We encourage you to review those policies before connecting your data.`,
  },
  {
    title: "12. Changes to Terms",
    body: `RevLens reserves the right to update these Terms at any time. When we make material changes, we will notify you by email or by posting a prominent notice on the Service at least 14 days before the changes take effect. Your continued use of the Service after changes become effective constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, you must cancel your subscription before the effective date.`,
  },
  {
    title: "13. Termination",
    body: `Either party may terminate these Terms at any time. RevLens may terminate or suspend your access to the Service immediately, without prior notice, if you materially breach these Terms or if required by law. Upon termination, your right to access the Service will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.`,
  },
  {
    title: "14. Governing Law and Dispute Resolution",
    body: `These Terms are governed by and construed in accordance with the laws of the Province of ${JURISDICTION} and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any dispute arising out of or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the exclusive jurisdiction of the courts of ${JURISDICTION}. You waive any objection to the personal jurisdiction of such courts.`,
  },
  {
    title: "15. General Provisions",
    body: `These Terms, together with the Privacy Policy, constitute the entire agreement between you and RevLens regarding the Service and supersede all prior agreements. If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect. RevLens's failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. You may not assign your rights or obligations under these Terms without our prior written consent.`,
  },
  {
    title: "16. Contact",
    body: `If you have questions about these Terms, please contact us at ${EMAIL} or by writing to RevLens, Toronto, Ontario, Canada.`,
  },
]

export default function TermsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="w-full py-14 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
            Legal
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective date: <strong>{EFFECTIVE_DATE}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            These Terms govern your use of the {COMPANY} platform and services. Please read them carefully before using the Service.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12 md:py-16 section-base">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold text-foreground mb-3">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-14 pt-8 border-t" style={{ borderColor: "hsl(var(--border))" }}>
            <p className="text-xs text-muted-foreground">
              Last updated: {EFFECTIVE_DATE}. For questions about these Terms, email{" "}
              <a href={`mailto:${EMAIL}`} className="text-[#0284C7] hover:underline">{EMAIL}</a>.
              {" "}View our{" "}
              <a href="/privacy" className="text-[#0284C7] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
