"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react"
import { useState } from "react"

const posts = [
  {
    id: 1,
    title: "5 Ways Data Analytics Can Increase Your Business Profitability",
    excerpt: "Discover how data-driven insights help operators optimize pricing, reduce waste, and increase margins — across any industry.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "Strategy",
    author: "Nitesh V.",
    date: "Feb 15, 2025",
    readTime: "8 min read",
    slug: "data-analytics-profitability",
    featured: true,
  },
  {
    id: 2,
    title: "The Hidden Costs of Inventory Mismanagement",
    excerpt: "How small businesses can identify and address inventory issues that are silently eating into their profits.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    category: "Inventory",
    author: "Nitesh V.",
    date: "Jan 28, 2025",
    readTime: "6 min read",
    slug: "inventory-mismanagement",
    featured: true,
  },
  {
    id: 3,
    title: "Customer Segmentation: The Secret Weapon for Independent Operators",
    excerpt: "Understanding different customer groups helps you tailor your marketing, products, and services for maximum impact.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Marketing",
    author: "Nitesh V.",
    date: "Jan 10, 2025",
    readTime: "10 min read",
    slug: "customer-segmentation",
    featured: true,
  },
  {
    id: 4,
    title: "Predictive Analytics for Seasonal Businesses: Planning Ahead",
    excerpt: "How seasonal businesses can use historical data to predict trends and prepare for peak periods more effectively.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    category: "Strategy",
    author: "Nitesh V.",
    date: "Dec 2, 2024",
    readTime: "7 min read",
    slug: "predictive-analytics-seasonal",
    featured: false,
  },
  {
    id: 5,
    title: "Data Privacy for Small Businesses: What You Need to Know",
    excerpt: "A guide to navigating data privacy regulations and implementing best practices to protect your customers and your business.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    category: "Compliance",
    author: "Nitesh V.",
    date: "Nov 30, 2024",
    readTime: "9 min read",
    slug: "data-privacy",
    featured: false,
  },
  {
    id: 6,
    title: "From Data to Decisions: Building a Data-Driven Culture",
    excerpt: "How to foster a culture where employees at all levels use data to make better decisions and drive growth.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    category: "Leadership",
    author: "Nitesh V.",
    date: "Nov 22, 2024",
    readTime: "8 min read",
    slug: "data-driven-culture",
    featured: false,
  },
  {
    id: 7,
    title: "The ROI of Data Analytics: A Realistic Breakdown",
    excerpt: "A clear-eyed look at the costs and benefits of implementing analytics for small and medium-sized independent businesses.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    category: "Finance",
    author: "Nitesh V.",
    date: "Oct 15, 2024",
    readTime: "11 min read",
    slug: "roi-data-analytics",
    featured: false,
  },
  {
    id: 8,
    title: "How to Choose the Right POS System for Data Collection",
    excerpt: "Selecting POS systems that not only process transactions but also feed you the business insights you actually need.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Technology",
    author: "Nitesh V.",
    date: "Sep 28, 2024",
    readTime: "9 min read",
    slug: "pos-system-selection",
    featured: false,
  },
  {
    id: 9,
    title: "Peak Hour Forecasting: Stop Guessing, Start Scheduling",
    excerpt: "How demand forecasting from your own POS data eliminates the guesswork from staff scheduling and prep decisions.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    category: "Operations",
    author: "Nitesh V.",
    date: "Sep 5, 2024",
    readTime: "7 min read",
    slug: "peak-hour-forecasting",
    featured: false,
  },
]

const categories = ["All", "Strategy", "Inventory", "Marketing", "Operations", "Finance", "Technology", "Leadership", "Compliance"]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = posts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="w-full py-16 md:py-20 section-alt-1">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center text-center space-y-5 max-w-2xl mx-auto">
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                RevLens Blog
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                RevLens Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Practical guides, industry trends, and analytics frameworks to help you run a sharper business.
              </p>
              {/* Search */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-foreground"
                  style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", outline: "none" }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Category filters */}
      <section className="w-full py-6 section-base border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={activeCategory === cat
                  ? { background: "#0284C7", color: "#ffffff" }
                  : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog content */}
      <section className="w-full py-12 md:py-20 section-base">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No articles found.</div>
          )}

          {/* Featured — larger cards */}
          {featured.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: "#0284C7" }}>Featured</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featured.map((post, i) => (
                  <AnimateOnScroll key={post.id} animation="slide-up" delay={i * 0.05}>
                    <div className="enhanced-card overflow-hidden flex flex-col h-full">
                      <div className="aspect-video overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full"
                            style={{ background: "rgba(14,165,233,0.1)", color: "#0284C7" }}>
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3.5 w-3.5" /> {post.author}
                          </div>
                          <button onClick={() => window.location.href = `/blog/${post.slug}`}
                            className="text-sm font-medium flex items-center gap-1 group" style={{ color: "#0284C7" }}>
                            Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: "#0284C7" }}>
                {activeCategory === "All" ? "More Articles" : activeCategory}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <AnimateOnScroll key={post.id} animation="slide-up" delay={i * 0.05}>
                    <div className="enhanced-card overflow-hidden flex flex-col h-full">
                      <div className="aspect-video overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full"
                            style={{ background: "rgba(14,165,233,0.1)", color: "#0284C7" }}>
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" /> {post.date}
                          </div>
                          <button onClick={() => window.location.href = `/blog/${post.slug}`}
                            className="text-sm font-medium flex items-center gap-1 group" style={{ color: "#0284C7" }}>
                            Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16 rounded-2xl p-8 text-center"
            style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
            <h3 className="text-xl font-bold text-foreground mb-2">Get New Articles in Your Inbox</h3>
            <p className="text-muted-foreground mb-5 text-sm">No spam. Practical analytics content for independent business operators.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-foreground"
                style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", outline: "none" }} />
              <Button style={{ background: "#0284C7", color: "#ffffff", fontWeight: 600 }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-20" style={{ background: "#0284C7" }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Want Personalized Data Insights?</h2>
            <p className="text-white/80 text-lg">
              Our team can help you apply these frameworks to your specific business. Book a free call.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" style={{ background: "#ffffff", color: "#0284C7", fontWeight: 600 }}
                onClick={() => window.location.href = "/contact"}>
                Book Free Consultation <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", background: "transparent" }}
                onClick={() => window.location.href = "/services"}>
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
