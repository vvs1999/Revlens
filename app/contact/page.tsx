"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mail, MapPin, Phone, Clock, CheckCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    interest: "sales-analysis",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate API call
    setTimeout(() => {
      // Simulate successful submission
      setFormState("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState("idle")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          interest: "sales-analysis",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Get in Touch
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Have questions about our services? Ready to start your data journey? We're here to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="form" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="form"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Contact Form
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                Contact Info
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
              >
                FAQs
              </TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="form" className="space-y-4">
                <Card className="border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Smith"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              disabled={formState !== "idle"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              disabled={formState !== "idle"}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="(555) 555-5555"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={formState !== "idle"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                              id="company"
                              name="company"
                              placeholder="Your Business"
                              value={formData.company}
                              onChange={handleChange}
                              disabled={formState !== "idle"}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>I'm interested in:</Label>
                          <RadioGroup
                            value={formData.interest}
                            onValueChange={handleRadioChange}
                            className="flex flex-col space-y-1"
                            disabled={formState !== "idle"}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sales-analysis" id="sales-analysis" />
                              <Label htmlFor="sales-analysis" className="font-normal">
                                Sales Analysis
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="inventory-optimization" id="inventory-optimization" />
                              <Label htmlFor="inventory-optimization" className="font-normal">
                                Inventory Optimization
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="customer-insights" id="customer-insights" />
                              <Label htmlFor="customer-insights" className="font-normal">
                                Customer Insights
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="growth-strategy" id="growth-strategy" />
                              <Label htmlFor="growth-strategy" className="font-normal">
                                Growth Strategy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other" className="font-normal">
                                Other
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your business and how we can help..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            disabled={formState !== "idle"}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={formState !== "idle"}>
                          {formState === "submitting" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : formState === "success" ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Message Sent!
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="info" className="space-y-4">
                <Card className="border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us through any of these channels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Email Us</h3>
                            <p className="text-muted-foreground">For general inquiries:</p>
                            <a href="mailto:info@datainsight.com" className="text-accent hover:underline">
                              info@datainsight.com
                            </a>
                            <p className="text-muted-foreground mt-2">For support:</p>
                            <a href="mailto:support@datainsight.com" className="text-accent hover:underline">
                              support@datainsight.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Call Us</h3>
                            <p className="text-muted-foreground">Main Office:</p>
                            <a href="tel:+15555555555" className="text-accent hover:underline">
                              (555) 555-5555
                            </a>
                            <p className="text-muted-foreground mt-2">Customer Support:</p>
                            <a href="tel:+15555555556" className="text-accent hover:underline">
                              (555) 555-5556
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Business Hours</h3>
                            <p className="text-muted-foreground">Monday - Friday:</p>
                            <p>9:00 AM - 6:00 PM PST</p>
                            <p className="text-muted-foreground mt-2">Saturday - Sunday:</p>
                            <p>Closed</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Visit Us</h3>
                            <p className="text-muted-foreground">San Francisco Office:</p>
                            <p>123 Business Ave, Suite 100</p>
                            <p>San Francisco, CA 94107</p>
                            <p className="text-muted-foreground mt-2">Austin Office:</p>
                            <p>456 Tech Blvd, Suite 200</p>
                            <p>Austin, TX 78701</p>
                          </div>
                        </div>
                        <div className="mt-6 h-[200px] w-full bg-muted rounded-lg overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968173775!2d-122.40058492392836!3d37.78778971469194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0x9cdf304c4c6c1ba!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1682452586324!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="space-y-4">
                <Card className="border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">How quickly can you start working with my business?</h3>
                        <p className="text-muted-foreground">
                          We can typically begin the onboarding process within 1-2 business days after your initial
                          consultation. The full implementation timeline depends on the complexity of your data and
                          specific needs, but most clients see their first insights within 2 weeks.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">What types of businesses do you work with?</h3>
                        <p className="text-muted-foreground">
                          We specialize in working with local businesses including restaurants, retail stores, cafés,
                          convenience stores, salons, and other service-based businesses. If you're unsure if we're a
                          good fit, please contact us for a consultation.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Do I need technical expertise to use your services?</h3>
                        <p className="text-muted-foreground">
                          Not at all! We designed our services specifically for business owners without technical
                          backgrounds. We handle all the complex data work and deliver insights in clear, actionable
                          formats that anyone can understand and implement.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">How do you access my business data?</h3>
                        <p className="text-muted-foreground">
                          We offer several secure methods for data integration. We can connect directly to your
                          point-of-sale system, inventory management software, or other business tools. Alternatively,
                          you can upload spreadsheets or reports. All data transfers are encrypted and we follow strict
                          security protocols.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">What is your pricing structure?</h3>
                        <p className="text-muted-foreground">
                          Our pricing starts at $499/month for our Starter plan, with more comprehensive options
                          available for growing businesses. We also offer custom Enterprise solutions. All plans include
                          a 30-day satisfaction guarantee. Please visit our Services page for detailed pricing
                          information.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Do you offer a free trial or consultation?</h3>
                        <p className="text-muted-foreground">
                          Yes! We offer a free 30-minute consultation to discuss your business needs and determine if
                          our services are a good fit. During this call, we can provide a demo of our platform and
                          answer any questions you may have.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Don't see your question here?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-accent"
                        onClick={() => document.querySelector('[data-value="form"]')?.click()}
                      >
                        Contact us
                      </Button>{" "}
                      and we'll be happy to help.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
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
                  onClick={() => {
                    // Scroll to the contact form section
                    const formTab = document.querySelector('[data-value="form"]') as HTMLElement
                    if (formTab) {
                      formTab.click()
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }, 100)
                    }
                  }}
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
                <h3 className="text-xl font-bold mb-4">Our Guarantee</h3>
                <p className="mb-4">
                  We're confident in the value we provide. If you don't see measurable improvements in your business
                  within 90 days, we'll refund your investment.
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>90-day satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
