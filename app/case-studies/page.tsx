"use client"

import Image from "next/image"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ShoppingBag, Coffee, Scissors, Store } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function CaseStudiesPage() {
  // Sample case studies data
  const caseStudies = [
    {
      id: 1,
      title: "How Riverside Café Increased Revenue by 35%",
      excerpt:
        "A struggling café used data analytics to optimize their menu, staffing, and marketing, resulting in a dramatic increase in revenue and customer satisfaction.",
      image: "/cafe-insights-dashboard.png",
      industry: "Restaurant",
      results: [
        { label: "Revenue Increase", value: "35%" },
        { label: "Food Waste Reduction", value: "25%" },
        { label: "Customer Retention", value: "40%" },
      ],
      icon: <Coffee className="h-5 w-5" />,
      slug: "riverside-cafe",
    },
    {
      id: 2,
      title: "Urban Convenience: Inventory Optimization Success",
      excerpt:
        "This convenience store chain reduced stockouts by 80% while decreasing overall inventory costs through data-driven forecasting and ordering.",
      image: "/stocked-convenience-aisle.png",
      industry: "Retail",
      results: [
        { label: "Stockout Reduction", value: "80%" },
        { label: "Inventory Cost Savings", value: "22%" },
        { label: "Sales Growth", value: "18%" },
      ],
      icon: <Store className="h-5 w-5" />,
      slug: "urban-convenience",
    },
    {
      id: 3,
      title: "Boutique Retailer Grows Customer Base by 45%",
      excerpt:
        "A small clothing boutique leveraged customer data to create targeted marketing campaigns and personalized shopping experiences.",
      image: "/curated-collection-analysis.png",
      industry: "Retail",
      results: [
        { label: "Customer Growth", value: "45%" },
        { label: "Average Order Value", value: "+28%" },
        { label: "Marketing ROI", value: "3.5x" },
      ],
      icon: <ShoppingBag className="h-5 w-5" />,
      slug: "boutique-retailer",
    },
    {
      id: 4,
      title: "Sunset Restaurant's Staff Efficiency Transformation",
      excerpt:
        "This restaurant used data analytics to optimize staffing schedules, reducing labor costs while improving service quality and employee satisfaction.",
      image: "/bustling-cafe-schedule.png",
      industry: "Restaurant",
      results: [
        { label: "Labor Cost Reduction", value: "18%" },
        { label: "Service Speed Improvement", value: "30%" },
        { label: "Employee Retention", value: "+25%" },
      ],
      icon: <Coffee className="h-5 w-5" />,
      slug: "sunset-restaurant",
    },
    {
      id: 5,
      title: "Style Studio Salon: Appointment Optimization",
      excerpt:
        "A beauty salon eliminated scheduling gaps and increased bookings through data-driven appointment management and customer insights.",
      image: "/salon-calendar-view.png",
      industry: "Service",
      results: [
        { label: "Booking Rate", value: "92%" },
        { label: "Revenue Growth", value: "32%" },
        { label: "Customer Satisfaction", value: "+40%" },
      ],
      icon: <Scissors className="h-5 w-5" />,
      slug: "style-studio",
    },
    {
      id: 6,
      title: "Fresh Market: Reducing Waste While Growing Profits",
      excerpt:
        "This grocery store implemented inventory analytics to dramatically reduce perishable waste while maintaining optimal stock levels.",
      image: "/organized-grocery-shelves.png",
      industry: "Retail",
      results: [
        { label: "Waste Reduction", value: "65%" },
        { label: "Profit Margin", value: "+15%" },
        { label: "Customer Satisfaction", value: "+22%" },
      ],
      icon: <ShoppingBag className="h-5 w-5" />,
      slug: "fresh-market",
    },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Success Stories
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Real results from real businesses. See how our data analytics solutions have helped local businesses
                thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                All Industries
              </TabsTrigger>
              <TabsTrigger
                value="restaurant"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Restaurant
              </TabsTrigger>
              <TabsTrigger
                value="retail"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Retail
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((study) => (
                  <Card key={study.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full">
                        <div className="text-primary">{study.icon}</div>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {study.industry}
                        </span>
                      </div>
                      <CardTitle className="text-xl">
                        <Link href={`/case-studies/${study.slug}`} className="hover:text-accent transition-colors">
                          {study.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{study.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {study.results.map((result, index) => (
                          <div key={index} className="text-center p-2 bg-primary/5 rounded-lg">
                            <div className="text-lg font-bold text-primary">{result.value}</div>
                            <div className="text-xs text-muted-foreground">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t mt-4">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-sm font-medium text-accent flex items-center hover:underline w-full justify-end"
                      >
                        Read Full Case Study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="restaurant" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies
                  .filter((study) => study.industry === "Restaurant")
                  .map((study) => (
                    <Card key={study.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                      <div className="aspect-video relative">
                        <Image
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full">
                          <div className="text-primary">{study.icon}</div>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {study.industry}
                          </span>
                        </div>
                        <CardTitle className="text-xl">
                          <Link href={`/case-studies/${study.slug}`} className="hover:text-accent transition-colors">
                            {study.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{study.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="text-center p-2 bg-primary/5 rounded-lg">
                              <div className="text-lg font-bold text-primary">{result.value}</div>
                              <div className="text-xs text-muted-foreground">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t mt-4">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="text-sm font-medium text-accent flex items-center hover:underline w-full justify-end"
                        >
                          Read Full Case Study
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="retail" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies
                  .filter((study) => study.industry === "Retail")
                  .map((study) => (
                    <Card key={study.id} className="overflow-hidden border-2 border-primary/10 h-full flex flex-col">
                      <div className="aspect-video relative">
                        <Image
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full">
                          <div className="text-primary">{study.icon}</div>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {study.industry}
                          </span>
                        </div>
                        <CardTitle className="text-xl">
                          <Link href={`/case-studies/${study.slug}`} className="hover:text-accent transition-colors">
                            {study.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{study.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="text-center p-2 bg-primary/5 rounded-lg">
                              <div className="text-lg font-bold text-primary">{result.value}</div>
                              <div className="text-xs text-muted-foreground">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t mt-4">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="text-sm font-medium text-accent flex items-center hover:underline w-full justify-end"
                        >
                          Read Full Case Study
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Case Study Section */}
      <section className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <span className="inline-block text-sm font-semibold text-accent px-3 py-1 rounded-full bg-accent/10 mb-2">
                Featured Case Study
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">
                Riverside Café's Transformation
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                How data analytics turned around a struggling local café
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll animation="slide-right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/30 rounded-xl"></div>
                <Image
                  src="/cafe-performance-overview.png"
                  width={600}
                  height={400}
                  alt="Riverside Café Case Study"
                  className="rounded-xl object-cover shadow-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-left">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Coffee className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">Restaurant Industry</span>
                </div>

                <h3 className="text-2xl font-bold">The Challenge</h3>
                <p className="text-muted-foreground">
                  Riverside Café was struggling with declining sales, high food waste, and inconsistent customer
                  experience. Owner Sarah Johnson knew something needed to change but wasn't sure where to start.
                </p>

                <h3 className="text-2xl font-bold">Our Approach</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Analyzed sales data to identify top-performing and underperforming menu items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Implemented inventory tracking to reduce waste and optimize ordering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Created customer segmentation to develop targeted marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Optimized staffing based on customer flow patterns</span>
                  </li>
                </ul>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">35%</div>
                    <div className="text-sm text-muted-foreground">Revenue Increase</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">25%</div>
                    <div className="text-sm text-muted-foreground">Food Waste Reduction</div>
                  </div>
                  <div className="bg-background p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">40%</div>
                    <div className="text-sm text-muted-foreground">Customer Retention</div>
                  </div>
                </div>

                <Button className="mt-4" onClick={() => (window.location.href = "/case-studies/riverside-cafe")}>
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">What Our Clients Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Hear directly from the business owners who've transformed their operations with our data analytics
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll animation="slide-up" delay={0.1}>
              <Card className="border-2 border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-accent"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic">
                      "The data insights we received helped us optimize our menu and reduce food waste by 25%. Our
                      profit margins have never been better. I only wish we'd started sooner!"
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        SJ
                      </div>
                      <div>
                        <div className="font-semibold">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Riverside Café</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={0.2}>
              <Card className="border-2 border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-accent"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic">
                      "We reduced our inventory waste by 22% in the first three months. The seasonal forecasting has
                      been a game-changer for our small grocery store."
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        MC
                      </div>
                      <div>
                        <div className="font-semibold">Michael Chen</div>
                        <div className="text-sm text-muted-foreground">Urban Convenience</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={0.3}>
              <Card className="border-2 border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-accent"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic">
                      "We saw a 45% increase in our customer base after implementing the targeted marketing campaigns.
                      The ROI has been incredible."
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        AD
                      </div>
                      <div>
                        <div className="font-semibold">Amanda Davis</div>
                        <div className="text-sm text-muted-foreground">Boutique Retailer</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Become Our Next Success Story?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl mb-6">
                Book a free consultation with our data experts and discover how we can help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => (window.location.href = "/services")}
                >
                  View Services
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">Our Process</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/20 text-accent font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Initial Consultation</h4>
                      <p className="text-primary-foreground/70 text-sm">
                        We discuss your business challenges and goals
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/20 text-accent font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Data Assessment</h4>
                      <p className="text-primary-foreground/70 text-sm">
                        We analyze your current data and identify opportunities
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/20 text-accent font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Implementation</h4>
                      <p className="text-primary-foreground/70 text-sm">We set up your custom analytics solution</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-accent/20 text-accent font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Ongoing Support</h4>
                      <p className="text-primary-foreground/70 text-sm">
                        We provide continuous guidance and optimization
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
