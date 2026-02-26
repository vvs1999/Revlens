"use client"

import { PageLayout } from "@/components/page-layout"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { IndustryExamples } from "@/components/industry-examples"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { ChatBot } from "@/components/chat-bot"
import Link from "next/link"
import { ArrowRight, LineChart, PieChart, TrendingUp, Users, BarChart, Clock } from "lucide-react"

export default function Home() {
  return (
    <PageLayout>
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Problem/Solution Section with enhanced styling */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-card relative">
        {/* Subtle background pattern */}
        <div className="noise-overlay"></div>

        <div className="container px-4 md:px-6">
          <AnimateOnScroll animation="fade">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-block text-sm font-semibold text-accent px-3 py-1 rounded-full bg-accent/10 mb-2">
                  Our Solutions
                </span>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">
                  Common Challenges We Solve
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Local businesses face unique challenges. We provide the data insights to overcome them.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
            <AnimateOnScroll animation="slide-up" delay={0.1}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-4 text-center h-full">
                <div className="rounded-full bg-primary/10 p-4 mb-2">
                  <LineChart className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">Unsure which products sell best?</h3>
                  <p className="text-muted-foreground">
                    Our sales analysis identifies your top performers and hidden gems to optimize your inventory and
                    marketing.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <Link href="/services" className="text-accent font-medium flex items-center hover:underline group">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={0.2}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-4 text-center h-full">
                <div className="rounded-full bg-secondary/10 p-4 mb-2">
                  <PieChart className="h-10 w-10 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">Struggling with overstock or waste?</h3>
                  <p className="text-muted-foreground">
                    Our inventory optimization tools help you reduce waste and manage stock levels efficiently.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <Link href="/services" className="text-accent font-medium flex items-center hover:underline group">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={0.3}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-4 text-center h-full">
                <div className="rounded-full bg-accent/10 p-4 mb-2">
                  <TrendingUp className="h-10 w-10 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">Missing out on revenue growth?</h3>
                  <p className="text-muted-foreground">
                    Our predictive analytics identify untapped opportunities and growth strategies tailored to your
                    business.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <Link href="/services" className="text-accent font-medium flex items-center hover:underline group">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="w-full py-16 md:py-20 bg-primary/5 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="0.2"
              strokeDasharray="6,6"
            />
          </svg>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <AnimateOnScroll animation="scale" delay={0.1}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">15+</div>
                <div className="text-secondary">Businesses Supported</div>
                <div className="text-xs text-primary/60 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-1 text-accent rotate-45" />
                  Growing every month
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale" delay={0.2}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-2">
                  <BarChart className="h-7 w-7 text-accent" />
                </div>
                <div className="text-4xl font-bold text-accent">30%</div>
                <div className="text-secondary">Avg Revenue Growth</div>
                <div className="text-xs text-primary/60 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-1 text-accent rotate-45" />
                  For our clients
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="scale" delay={0.3}>
              <div className="enhanced-card p-6 flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-2">
                  <Clock className="h-7 w-7 text-secondary" />
                </div>
                <div className="text-4xl font-bold text-secondary">5+</div>
                <div className="text-secondary">Years of Data Expertise</div>
                <div className="text-xs text-primary/60 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-1 text-accent rotate-45" />
                  Continuous innovation
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Industry Examples Section */}
      <IndustryExamples />

      {/* Chatbot */}
      <ChatBot />
    </PageLayout>
  )
}
