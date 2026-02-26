import Link from "next/link"
import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search, Calendar, User, Clock, Tag } from "lucide-react"

export default function BlogPage() {
  // Sample blog posts data
  const featuredPosts = [
    {
      id: 1,
      title: "5 Ways Data Analytics Can Increase Your Restaurant's Profitability",
      excerpt:
        "Discover how data-driven insights can help restaurant owners optimize menu pricing, reduce waste, and increase customer satisfaction.",
      image: "/data-driven-dining.png",
      category: "Restaurant",
      author: "Sarah Chen",
      date: "May 15, 2023",
      readTime: "8 min read",
      slug: "restaurant-profitability",
    },
    {
      id: 2,
      title: "The Hidden Costs of Inventory Mismanagement for Small Retailers",
      excerpt:
        "Learn how small retail businesses can identify and address inventory issues that are silently eating into their profits.",
      image: "/organized-retail-shelves.png",
      category: "Retail",
      author: "Michael Rodriguez",
      date: "April 28, 2023",
      readTime: "6 min read",
      slug: "inventory-mismanagement",
    },
    {
      id: 3,
      title: "Customer Segmentation: The Secret Weapon for Local Businesses",
      excerpt:
        "How understanding different customer groups can help you tailor your marketing, products, and services for maximum impact.",
      image: "/data-segments.png",
      category: "Marketing",
      author: "Aisha Johnson",
      date: "April 10, 2023",
      readTime: "10 min read",
      slug: "customer-segmentation",
    },
  ]

  const recentPosts = [
    {
      id: 4,
      title: "Predictive Analytics for Seasonal Businesses: Planning Ahead",
      excerpt:
        "How seasonal businesses can use historical data to predict trends and prepare for busy periods more effectively.",
      image: "/seasonal-sales-trends.png",
      category: "Strategy",
      author: "David Kim",
      date: "June 2, 2023",
      readTime: "7 min read",
      slug: "predictive-analytics-seasonal",
    },
    {
      id: 5,
      title: "Data Privacy Regulations: What Small Businesses Need to Know",
      excerpt:
        "A guide to navigating data privacy laws and implementing best practices to protect your customers and your business.",
      image: "/protecting-small-business-data.png",
      category: "Compliance",
      author: "Priya Patel",
      date: "May 30, 2023",
      readTime: "9 min read",
      slug: "data-privacy-regulations",
    },
    {
      id: 6,
      title: "From Data to Decisions: Building a Data-Driven Culture",
      excerpt:
        "How to foster a culture where employees at all levels use data to make better decisions and drive business growth.",
      image: "/data-driven-growth.png",
      category: "Leadership",
      author: "James Wilson",
      date: "May 22, 2023",
      readTime: "8 min read",
      slug: "data-driven-culture",
    },
  ]

  const popularPosts = [
    {
      id: 7,
      title: "The ROI of Data Analytics for Small Businesses",
      excerpt:
        "A breakdown of the costs and benefits of implementing data analytics solutions for small and medium-sized businesses.",
      image: "/small-business-roi-dashboard.png",
      category: "Finance",
      author: "Sarah Chen",
      date: "March 15, 2023",
      readTime: "11 min read",
      slug: "roi-data-analytics",
    },
    {
      id: 8,
      title: "How to Choose the Right POS System for Data Collection",
      excerpt:
        "A guide to selecting point-of-sale systems that not only process transactions but also provide valuable business insights.",
      image: "/point-of-sale-insights.png",
      category: "Technology",
      author: "Michael Rodriguez",
      date: "February 28, 2023",
      readTime: "9 min read",
      slug: "pos-system-selection",
    },
    {
      id: 9,
      title: "Case Study: How a Local Café Increased Revenue by 35%",
      excerpt:
        "An in-depth look at how data analytics helped a struggling café identify opportunities and dramatically improve performance.",
      image: "/placeholder.svg?height=400&width=600&query=cafe data analytics case study",
      category: "Case Study",
      author: "Aisha Johnson",
      date: "January 20, 2023",
      readTime: "12 min read",
      slug: "cafe-case-study",
    },
  ]

  const categories = [
    { name: "Restaurant", count: 12 },
    { name: "Retail", count: 15 },
    { name: "Marketing", count: 8 },
    { name: "Strategy", count: 10 },
    { name: "Technology", count: 7 },
    { name: "Finance", count: 5 },
    { name: "Case Study", count: 9 },
    { name: "Leadership", count: 6 },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Data Insights Blog
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Expert advice, industry trends, and practical tips to help local businesses leverage data for growth
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search articles..." className="pl-8 rounded-full bg-background" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger
                value="featured"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Popular
              </TabsTrigger>
            </TabsList>
            <TabsContent value="featured" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium text-accent flex items-center hover:underline"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium text-accent flex items-center hover:underline"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium text-accent flex items-center hover:underline"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Categories and Subscribe Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/blog/category/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-2 border-primary/10">
                <CardHeader>
                  <CardTitle>Subscribe to Our Newsletter</CardTitle>
                  <CardDescription>Get the latest data insights delivered to your inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Input type="email" placeholder="Your email address" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Want Personalized Data Insights?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl mb-6">
                Our team of experts can help you apply these insights to your specific business challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  View Services
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">From Our Blog to Your Business</h3>
                <p className="mb-4">
                  Our blog articles provide general guidance, but every business is unique. Schedule a consultation to
                  get tailored advice for your specific challenges and opportunities.
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  <span>Expert data analysts</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>30-minute free consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
