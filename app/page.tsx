"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Zap, Search, Eye, ArrowRight, CheckCircle, Globe, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-geist text-xl font-bold">WebInspect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Start Free Audit</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Comprehensive Website Analysis
              </Badge>
              <h1 className="font-geist text-4xl sm:text-6xl font-bold tracking-tight">
                Your Website's{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Digital Health Check
                </span>
              </h1>
              <p className="font-manrope text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Evaluate security vulnerabilities, performance bottlenecks, SEO issues, and accessibility compliance.
                Get actionable insights to improve your site's security, speed, visibility, and usability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/scan">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Start Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/credentials">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                  View Digital Credentials
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Actionable insights</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-geist text-3xl sm:text-4xl font-bold">Comprehensive Website Analysis</h2>
            <p className="font-manrope text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform evaluates every aspect of your website to ensure optimal performance, security, and user
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-geist">Security Analysis</CardTitle>
                  <CardDescription className="font-manrope">
                    Detect vulnerabilities, SSL issues, and security misconfigurations
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-geist">Performance Audit</CardTitle>
                  <CardDescription className="font-manrope">
                    Identify bottlenecks, optimize loading times, and improve Core Web Vitals
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-geist">SEO Optimization</CardTitle>
                  <CardDescription className="font-manrope">
                    Analyze meta tags, content structure, and search engine visibility
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-geist">Accessibility Check</CardTitle>
                  <CardDescription className="font-manrope">
                    Ensure WCAG compliance and improve usability for all users
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <h3 className="font-geist text-2xl font-semibold">Trusted by developers and businesses worldwide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-geist text-3xl font-bold">50K+</div>
                  <div className="font-manrope text-muted-foreground">Websites Audited</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <div className="text-center">
                  <div className="font-geist text-3xl font-bold">98%</div>
                  <div className="font-manrope text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-geist text-3xl font-bold">24/7</div>
                  <div className="font-manrope text-muted-foreground">Monitoring Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-geist text-3xl sm:text-4xl font-bold text-white">Ready to optimize your website?</h2>
          <p className="font-manrope text-xl text-white/90 max-w-2xl mx-auto">
            Get a comprehensive audit report in minutes. Identify issues, receive actionable recommendations, and
            improve your website's performance today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/scan">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Free Audit Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-geist text-xl font-bold">WebInspect</span>
              </div>
              <p className="font-manrope text-sm text-muted-foreground">
                Comprehensive website auditing platform for security, performance, SEO, and accessibility.
              </p>
            </div>
            <div>
              <h4 className="font-geist font-semibold mb-4">Product</h4>
              <ul className="font-manrope space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-geist font-semibold mb-4">Resources</h4>
              <ul className="font-manrope space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-geist font-semibold mb-4">Company</h4>
              <ul className="font-manrope space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="font-manrope text-sm text-muted-foreground">© 2024 WebInspect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
