"use client"

import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, Clock, Heart, Lightbulb, Target, Users } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Our Mission is Your <span className="text-accent">Data-Driven Success</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We're passionate about helping local businesses harness the power of their data to make smarter
                decisions, increase revenue, and reduce waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground"
                  onClick={() => {
                    const tabTrigger = document.querySelector('[data-value="team"]') as HTMLElement
                    if (tabTrigger) {
                      tabTrigger.click()
                      setTimeout(() => {
                        document.getElementById("team-section")?.scrollIntoView({ behavior: "smooth" })
                      }, 100)
                    }
                  }}
                >
                  Meet Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const tabTrigger = document.querySelector('[data-value="values"]') as HTMLElement
                    if (tabTrigger) {
                      tabTrigger.click()
                      setTimeout(() => {
                        document.getElementById("values-section")?.scrollIntoView({ behavior: "smooth" })
                      }, 100)
                    }
                  }}
                >
                  Our Values
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/30 rounded-xl"></div>
              <Image
                src="/data-analytics.png"
                width={550}
                height={550}
                alt="Our team analyzing data"
                className="rounded-xl object-cover shadow-lg relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="story" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="story"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Our Story
              </TabsTrigger>
              <TabsTrigger
                value="values"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Our Values
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Our Team
              </TabsTrigger>
            </TabsList>
            <div className="mt-8 border rounded-lg p-6">
              <TabsContent value="story" className="space-y-6">
                <h2 className="text-3xl font-bold">The DataInsight Journey</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      DataInsight was founded in 2018 by a team of data scientists who saw a gap in the market: small
                      and medium-sized local businesses had valuable data but lacked the tools and expertise to use it
                      effectively.
                    </p>
                    <p className="text-muted-foreground">
                      Our founders, Sarah Chen and Michael Rodriguez, had spent years working with enterprise-level
                      companies, helping them leverage data to drive growth. They realized that the same principles
                      could be applied to local businesses, but with solutions tailored to their unique needs and
                      budgets.
                    </p>
                    <p className="text-muted-foreground">
                      What started as a small consultancy working with a handful of local restaurants and retail stores
                      has grown into a comprehensive data analytics company serving over 100 businesses across the
                      country.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-accent" />
                        Our Timeline
                      </h3>
                      <ul className="space-y-4">
                        <li className="border-l-2 border-accent pl-4 pb-4">
                          <div className="text-sm text-muted-foreground">2018</div>
                          <div className="font-medium">DataInsight founded in San Francisco</div>
                        </li>
                        <li className="border-l-2 border-accent pl-4 pb-4">
                          <div className="text-sm text-muted-foreground">2019</div>
                          <div className="font-medium">Launched our first analytics platform for restaurants</div>
                        </li>
                        <li className="border-l-2 border-accent pl-4 pb-4">
                          <div className="text-sm text-muted-foreground">2020</div>
                          <div className="font-medium">
                            Expanded services to help businesses adapt during the pandemic
                          </div>
                        </li>
                        <li className="border-l-2 border-accent pl-4 pb-4">
                          <div className="text-sm text-muted-foreground">2021</div>
                          <div className="font-medium">Opened second office in Austin, TX</div>
                        </li>
                        <li className="border-l-2 border-accent pl-4">
                          <div className="text-sm text-muted-foreground">2023</div>
                          <div className="font-medium">Reached milestone of 100+ active clients</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="values" className="space-y-6" id="values-section">
                <h2 className="text-3xl font-bold">What Drives Us</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Lightbulb className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Simplify Complexity</h3>
                        <p className="text-muted-foreground">
                          We transform complex data into clear, actionable insights that anyone can understand and use.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Heart className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Local First</h3>
                        <p className="text-muted-foreground">
                          We're passionate about helping local businesses thrive and strengthen their communities.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Target className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Results-Focused</h3>
                        <p className="text-muted-foreground">
                          We measure our success by the tangible results and growth we deliver for our clients.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-accent/10 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Our Commitment
                  </h3>
                  <p className="text-muted-foreground">
                    At DataInsight, we believe that every business, regardless of size, deserves access to powerful data
                    analytics. We're committed to making these tools accessible, affordable, and actionable for local
                    businesses that form the backbone of our communities.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="team" className="space-y-6" id="team-section">
                <h2 className="text-3xl font-bold">Meet Our Team</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Our diverse team brings together expertise in data science, business strategy, and customer service to
                  deliver exceptional results for our clients.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {/* Team Member 1 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src="/confident-professional.png" alt="Sarah Chen" fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">Sarah Chen</h3>
                      <p className="text-accent font-medium">Co-Founder & CEO</p>
                      <p className="text-muted-foreground mt-2">
                        Former data scientist at Google with 15+ years of experience in analytics and machine learning.
                      </p>
                    </CardContent>
                  </Card>
                  {/* Team Member 2 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src="/confident-latino-executive.png"
                        alt="Michael Rodriguez"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">Michael Rodriguez</h3>
                      <p className="text-accent font-medium">Co-Founder & CTO</p>
                      <p className="text-muted-foreground mt-2">
                        Previously led data engineering at Amazon. Expert in building scalable data systems.
                      </p>
                    </CardContent>
                  </Card>
                  {/* Team Member 3 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src="/confident-professional.png" alt="Aisha Johnson" fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">Aisha Johnson</h3>
                      <p className="text-accent font-medium">Head of Client Success</p>
                      <p className="text-muted-foreground mt-2">
                        10+ years in customer success roles. Passionate about helping businesses implement data
                        strategies.
                      </p>
                    </CardContent>
                  </Card>
                  {/* Team Member 4 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src="/confident-asian-professional.png" alt="David Kim" fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">David Kim</h3>
                      <p className="text-accent font-medium">Lead Data Scientist</p>
                      <p className="text-muted-foreground mt-2">
                        PhD in Statistics from MIT. Specializes in predictive analytics and machine learning.
                      </p>
                    </CardContent>
                  </Card>
                  {/* Team Member 5 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src="/confident-indian-professional.png" alt="Priya Patel" fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">Priya Patel</h3>
                      <p className="text-accent font-medium">Director of Operations</p>
                      <p className="text-muted-foreground mt-2">
                        Former management consultant with expertise in streamlining business processes.
                      </p>
                    </CardContent>
                  </Card>
                  {/* Team Member 6 */}
                  <Card className="border-2 border-primary/10 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src="/confident-businessman.png" alt="James Wilson" fill className="object-cover" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold">James Wilson</h3>
                      <p className="text-accent font-medium">Marketing Director</p>
                      <p className="text-muted-foreground mt-2">
                        15+ years in B2B marketing. Expert in helping technical companies communicate their value.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-block text-sm font-semibold text-accent px-3 py-1 rounded-full bg-accent/10 mb-2">
                  Testimonials
                </span>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">
                  What Our Clients Say About Us
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Don't just take our word for it. Hear from the businesses we've helped transform.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
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
                      "DataInsight transformed how we approach our business. Their inventory analysis saved us thousands
                      in waste and their customer insights helped us target our marketing more effectively."
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        JD
                      </div>
                      <div>
                        <div className="font-semibold">John Davis</div>
                        <div className="text-sm text-muted-foreground">Fresh Market Grocery</div>
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
                      "The team at DataInsight doesn't just provide data—they provide solutions. Their insights helped
                      us increase our average order value by 28% and customer retention by 35%."
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        LT
                      </div>
                      <div>
                        <div className="font-semibold">Lisa Thompson</div>
                        <div className="text-sm text-muted-foreground">Coastal Café</div>
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
                      "As a small boutique, we never thought we could afford professional data analytics. DataInsight
                      made it accessible and the ROI has been incredible—our revenue is up 40% year-over-year."
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        EM
                      </div>
                      <div>
                        <div className="font-semibold">Elena Martinez</div>
                        <div className="text-sm text-muted-foreground">Urban Style Boutique</div>
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
                Ready to Join Our Success Stories?
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
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Join Our Team
                </h3>
                <p className="mb-4">
                  We're always looking for talented individuals who are passionate about data and helping local
                  businesses thrive.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => (window.location.href = "/careers")}
                >
                  View Careers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
