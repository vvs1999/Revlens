"use client"

import { PageLayout } from "@/components/page-layout"
import { ROICalculator } from "@/components/roi-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart, TrendingUp, Users, Database, Lightbulb, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Our Data Analytics Services
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive data solutions tailored for local businesses to drive growth and efficiency
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() => (window.location.href = "/contact")}
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const pricingSection = document.querySelector("#pricing-section")
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="sales" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="sales"
                className="flex flex-col items-center py-2 px-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart className="h-5 w-5 mb-1" />
                <span>Sales Analysis</span>
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="flex flex-col items-center py-2 px-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Database className="h-5 w-5 mb-1" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="flex flex-col items-center py-2 px-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-5 w-5 mb-1" />
                <span>Customer Insights</span>
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="flex flex-col items-center py-2 px-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="h-5 w-5 mb-1" />
                <span>Growth Strategy</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-8 border rounded-lg p-6">
              <TabsContent value="sales" className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Sales Analysis</h3>
                    <p className="text-muted-foreground">Understand what drives your revenue</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">What We Provide</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Detailed analysis of top-selling products and services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Sales trends by time of day, week, and season</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Customer purchase patterns and frequency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Pricing optimization recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Competitive market analysis</span>
                      </li>
                    </ul>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        // Scroll to the pricing section
                        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Client Success Story</h4>
                    <p className="italic text-muted-foreground mb-4">
                      "The sales analysis helped us identify that 80% of our revenue came from just 20% of our menu
                      items. We streamlined our offerings and saw a 35% increase in profitability."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        RC
                      </div>
                      <div>
                        <div className="font-medium">Riverside Café</div>
                        <div className="text-sm text-muted-foreground">Sarah Johnson, Owner</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Inventory Optimization</h3>
                    <p className="text-muted-foreground">Reduce waste and maximize efficiency</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">What We Provide</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Stock level optimization to reduce waste</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Seasonal demand forecasting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Automated reordering recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Supplier performance analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Inventory turnover improvement strategies</span>
                      </li>
                    </ul>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        // Scroll to the pricing section
                        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Client Success Story</h4>
                    <p className="italic text-muted-foreground mb-4">
                      "We reduced our inventory waste by 22% in the first three months. The seasonal forecasting has
                      been a game-changer for our small grocery store."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        UC
                      </div>
                      <div>
                        <div className="font-medium">Urban Convenience</div>
                        <div className="text-sm text-muted-foreground">Michael Chen, Manager</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="customers" className="space-y-4">
                {/* Customer Insights Content */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Customer Insights</h3>
                    <p className="text-muted-foreground">Understand and grow your customer base</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">What We Provide</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Customer segmentation and profiling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Purchase behavior analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Customer retention strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Targeted marketing recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Customer feedback analysis</span>
                      </li>
                    </ul>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        // Scroll to the pricing section
                        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Client Success Story</h4>
                    <p className="italic text-muted-foreground mb-4">
                      "Understanding our customer segments helped us create targeted promotions that increased our
                      repeat business by 45%. We now know exactly who our customers are and what they want."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        SR
                      </div>
                      <div>
                        <div className="font-medium">Sunset Restaurant</div>
                        <div className="text-sm text-muted-foreground">Amanda Rodriguez, Owner</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="growth" className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Growth Strategy</h3>
                    <p className="text-muted-foreground">Data-driven plans for sustainable business growth</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">What We Provide</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Market opportunity analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Competitive positioning strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Revenue stream diversification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Expansion planning and forecasting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>Long-term business sustainability models</span>
                      </li>
                    </ul>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        // Scroll to the pricing section
                        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Client Success Story</h4>
                    <p className="italic text-muted-foreground mb-4">
                      "The growth strategy helped us identify a new market segment we hadn't considered. We've expanded
                      our services and increased revenue by 28% year-over-year."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        BT
                      </div>
                      <div>
                        <div className="font-medium">Bloom Tech</div>
                        <div className="text-sm text-muted-foreground">David Wilson, CEO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Calculate Your Potential ROI
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See how our data analytics services can impact your bottom line
              </p>
            </div>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that fits your business needs
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 border-border relative overflow-hidden">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For small businesses just getting started with data</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  $499<span className="text-base font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Basic sales analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Monthly reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>1 business location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => (window.location.href = "/contact")}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Growth Plan */}
            <Card className="border-2 border-accent relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Growth</CardTitle>
                <CardDescription>For businesses ready to optimize their operations</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  $999<span className="text-base font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Comprehensive data analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Weekly reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Up to 3 business locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Quarterly strategy sessions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-border relative overflow-hidden">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For larger businesses with complex data needs</CardDescription>
                <div className="text-4xl font-bold mt-4">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Advanced analytics & AI insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Real-time dashboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Unlimited locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => (window.location.href = "/contact")}>
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Transform Your Business with Data?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl mb-6">
                Book a free consultation with our data experts and discover how we can help you grow.
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
                  onClick={() => (window.location.href = "/case-studies")}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary-foreground/10 p-6 rounded-lg max-w-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Did You Know?
                </h3>
                <p className="mb-4">
                  Businesses that use data analytics are 23% more profitable than their competitors who don't leverage
                  their data.
                </p>
                <p className="text-sm text-primary-foreground/70 italic">Source: Harvard Business Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
