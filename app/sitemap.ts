import type { MetadataRoute } from "next"

const BASE = "https://revlens.netlify.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                       lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/case-studies`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/dashboard-demo`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ]
}
