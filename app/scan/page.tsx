"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Zap,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  TrendingUp,
  FileText,
  Hash,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import type { SecurityAnalysisResult } from "@/lib/security-utils"
import type { PerformanceAnalysisResult } from "@/lib/performance-utils"
import type { SEOAnalysisResult } from "@/lib/seo-utils"
import type { AccessibilityAnalysisResult } from "@/lib/accessibility-utils"
import { formatTime, getPerformanceScoreColor, getCoreWebVitalColor } from "@/lib/performance-utils"
import { getSEOScoreColor, getOptimalityColor } from "@/lib/seo-utils"
import { getAccessibilityScoreColor, getWCAGLevelColor } from "@/lib/accessibility-utils"

interface ScanStep {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: "pending" | "running" | "completed" | "error"
  progress: number
}

export default function ScanPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [securityResults, setSecurityResults] = useState<SecurityAnalysisResult | null>(null)
  const [performanceResults, setPerformanceResults] = useState<PerformanceAnalysisResult | null>(null)
  const [seoResults, setSeoResults] = useState<SEOAnalysisResult | null>(null)
  const [accessibilityResults, setAccessibilityResults] = useState<AccessibilityAnalysisResult | null>(null)
  const [scanSteps, setScanSteps] = useState<ScanStep[]>([
    {
      id: "security",
      name: "Security Analysis",
      description: "Checking for vulnerabilities and SSL configuration",
      icon: <Shield className="h-5 w-5" />,
      status: "pending",
      progress: 0,
    },
    {
      id: "performance",
      name: "Performance Audit",
      description: "Analyzing loading times and Core Web Vitals",
      icon: <Zap className="h-5 w-5" />,
      status: "pending",
      progress: 0,
    },
    {
      id: "seo",
      name: "SEO Evaluation",
      description: "Examining meta tags and search optimization",
      icon: <Search className="h-5 w-5" />,
      status: "pending",
      progress: 0,
    },
    {
      id: "accessibility",
      name: "Accessibility Check",
      description: "Testing WCAG compliance and usability",
      icon: <Eye className="h-5 w-5" />,
      status: "pending",
      progress: 0,
    },
  ])

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString.startsWith("http") ? urlString : `https://${urlString}`)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }

  const startScan = async () => {
    if (!isValidUrl(url)) return

    setIsScanning(true)
    setScanProgress(0)
    setSecurityResults(null)
    setPerformanceResults(null)
    setSeoResults(null)
    setAccessibilityResults(null)

    setScanSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending" as const,
        progress: 0,
      })),
    )

    try {
      setScanSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: step.id === "security" ? "running" : "pending",
        })),
      )

      const securityResponse = await fetch("/api/security/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (securityResponse.ok) {
        const securityData = await securityResponse.json()
        setSecurityResults(securityData.data)

        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "security" ? "completed" : step.status,
            progress: step.id === "security" ? 100 : step.progress,
          })),
        )
      } else {
        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "security" ? "error" : step.status,
          })),
        )
      }

      setScanProgress(25)

      setScanSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: step.id === "performance" ? "running" : step.status,
        })),
      )

      const performanceResponse = await fetch("/api/performance/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (performanceResponse.ok) {
        const performanceData = await performanceResponse.json()
        setPerformanceResults(performanceData.data)

        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "performance" ? "completed" : step.status,
            progress: step.id === "performance" ? 100 : step.progress,
          })),
        )
      } else {
        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "performance" ? "error" : step.status,
          })),
        )
      }

      setScanProgress(50)

      setScanSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: step.id === "seo" ? "running" : step.status,
        })),
      )

      const seoResponse = await fetch("/api/seo/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (seoResponse.ok) {
        const seoData = await seoResponse.json()
        setSeoResults(seoData.data)

        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "seo" ? "completed" : step.status,
            progress: step.id === "seo" ? 100 : step.progress,
          })),
        )
      } else {
        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "seo" ? "error" : step.status,
          })),
        )
      }

      setScanProgress(75)

      setScanSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: step.id === "accessibility" ? "running" : step.status,
        })),
      )

      const accessibilityResponse = await fetch("/api/accessibility/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (accessibilityResponse.ok) {
        const accessibilityData = await accessibilityResponse.json()
        setAccessibilityResults(accessibilityData.data)

        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "accessibility" ? "completed" : step.status,
            progress: step.id === "accessibility" ? 100 : step.progress,
          })),
        )
      } else {
        setScanSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: step.id === "accessibility" ? "error" : step.status,
          })),
        )
      }

      setScanProgress(100)
    } catch (error) {
      console.error("Scan failed:", error)
      setScanSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: step.status === "running" ? "error" : step.status,
        })),
      )
    }

    setIsScanning(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-geist text-xl font-bold">WebInspect</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      <div className="container py-12 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="font-geist text-4xl sm:text-5xl font-bold">Audit Your Website</h1>
            <p className="font-manrope text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your website URL below to start a comprehensive analysis of security, performance, SEO, and
              accessibility.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-geist text-left">Website URL</CardTitle>
              <CardDescription className="font-manrope text-left">
                Enter the full URL including https:// or http://
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="font-manrope"
                  disabled={isScanning}
                />
                <Button onClick={startScan} disabled={!isValidUrl(url) || isScanning} className="px-6">
                  {isScanning ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Scanning
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Audit
                    </>
                  )}
                </Button>
              </div>
              {url && !isValidUrl(url) && (
                <p className="text-sm text-destructive font-manrope">
                  Please enter a valid URL starting with http:// or https://
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-geist">Scanning {url}</CardTitle>
                    <CardDescription className="font-manrope">
                      Running comprehensive website analysis...
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="font-manrope">
                    {Math.round(scanProgress)}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={scanProgress} className="w-full" />

                <div className="grid gap-4">
                  {scanSteps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card">
                      <div
                        className={`
                        flex h-10 w-10 items-center justify-center rounded-lg
                        ${
                          step.status === "completed"
                            ? "bg-primary text-primary-foreground"
                            : step.status === "running"
                              ? "bg-accent text-accent-foreground"
                              : step.status === "error"
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-muted text-muted-foreground"
                        }
                      `}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.status === "error" ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-geist font-medium">{step.name}</h4>
                          <span className="text-sm text-muted-foreground font-manrope">
                            {step.status === "running"
                              ? `${step.progress}%`
                              : step.status === "completed"
                                ? "Complete"
                                : step.status === "error"
                                  ? "Error"
                                  : "Pending"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-manrope">{step.description}</p>
                        {step.status === "running" && <Progress value={step.progress} className="w-full h-2" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {(securityResults || performanceResults || seoResults || accessibilityResults) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {securityResults && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-geist flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Security Analysis Results</span>
                      </CardTitle>
                      <CardDescription className="font-manrope">
                        Comprehensive security audit for {securityResults.url}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${securityResults.score >= 70 ? "text-green-600" : securityResults.score >= 50 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {securityResults.score}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Security Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {securityResults.issues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-geist text-lg font-semibold">Security Issues Found</h3>
                      <div className="grid gap-3">
                        {securityResults.issues.slice(0, 3).map((issue, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                              issue.severity === "critical"
                                ? "border-red-200 bg-red-50"
                                : issue.severity === "high"
                                  ? "border-orange-200 bg-orange-50"
                                  : issue.severity === "medium"
                                    ? "border-yellow-200 bg-yellow-50"
                                    : "border-blue-200 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"}>
                                    {issue.severity.toUpperCase()}
                                  </Badge>
                                  <span className="font-geist font-medium">{issue.title}</span>
                                </div>
                                <p className="font-manrope text-sm text-muted-foreground mb-2">{issue.description}</p>
                                <p className="font-manrope text-sm font-medium">💡 {issue.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {performanceResults && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-geist flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Performance Analysis Results</span>
                      </CardTitle>
                      <CardDescription className="font-manrope">
                        Speed and optimization analysis for {performanceResults.url}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getPerformanceScoreColor(performanceResults.score)}`}>
                        {performanceResults.score}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Grade: {performanceResults.grade}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Core Web Vitals</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 rounded-lg border ${getCoreWebVitalColor(performanceResults.details.coreWebVitals.lcp.rating)}`}
                      >
                        <div className="text-sm font-medium mb-1">Largest Contentful Paint</div>
                        <div className="text-2xl font-bold">
                          {formatTime(performanceResults.details.coreWebVitals.lcp.value)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Good: ≤ {formatTime(performanceResults.details.coreWebVitals.lcp.threshold.good)}
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border ${getCoreWebVitalColor(performanceResults.details.coreWebVitals.fid.rating)}`}
                      >
                        <div className="text-sm font-medium mb-1">First Input Delay</div>
                        <div className="text-2xl font-bold">
                          {formatTime(performanceResults.details.coreWebVitals.fid.value)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Good: ≤ {formatTime(performanceResults.details.coreWebVitals.fid.threshold.good)}
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border ${getCoreWebVitalColor(performanceResults.details.coreWebVitals.cls.rating)}`}
                      >
                        <div className="text-sm font-medium mb-1">Cumulative Layout Shift</div>
                        <div className="text-2xl font-bold">
                          {performanceResults.details.coreWebVitals.cls.value.toFixed(3)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Good: ≤ {performanceResults.details.coreWebVitals.cls.threshold.good}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {seoResults && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-geist flex items-center space-x-2">
                        <Search className="h-5 w-5" />
                        <span>SEO Analysis Results</span>
                      </CardTitle>
                      <CardDescription className="font-manrope">
                        Search engine optimization analysis for {seoResults.url}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getSEOScoreColor(seoResults.score)}`}>
                        {seoResults.score}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Grade: {seoResults.grade}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold flex items-center space-x-2">
                      <Hash className="h-5 w-5" />
                      <span>Meta Tags</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 rounded-lg border ${getOptimalityColor(seoResults.details.metaTags.title.isOptimal)}`}
                      >
                        <div className="text-sm font-medium mb-1">Title Tag</div>
                        <div className="text-lg font-bold mb-1">
                          {seoResults.details.metaTags.title.length} characters
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {seoResults.details.metaTags.title.content
                            ? seoResults.details.metaTags.title.content.substring(0, 50) + "..."
                            : "No title found"}
                        </div>
                        <div className="text-xs">Optimal: 30-60 characters</div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border ${getOptimalityColor(seoResults.details.metaTags.description.isOptimal)}`}
                      >
                        <div className="text-sm font-medium mb-1">Meta Description</div>
                        <div className="text-lg font-bold mb-1">
                          {seoResults.details.metaTags.description.length} characters
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {seoResults.details.metaTags.description.content
                            ? seoResults.details.metaTags.description.content.substring(0, 50) + "..."
                            : "No description found"}
                        </div>
                        <div className="text-xs">Optimal: 120-160 characters</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Content Analysis</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {seoResults.details.contentAnalysis.content.wordCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Words</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {seoResults.details.contentAnalysis.headings.h1Count}
                        </div>
                        <div className="text-sm text-muted-foreground">H1 Tags</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {seoResults.details.contentAnalysis.images.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Images</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round(seoResults.details.contentAnalysis.content.readabilityScore)}
                        </div>
                        <div className="text-sm text-muted-foreground">Readability</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold flex items-center space-x-2">
                      <LinkIcon className="h-5 w-5" />
                      <span>Technical SEO</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">XML Sitemap</div>
                          <div className="text-sm text-muted-foreground">
                            {seoResults.details.technicalSEO.sitemap.isPresent ? "Found" : "Not found"}
                          </div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full ${seoResults.details.technicalSEO.sitemap.isPresent ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">Robots.txt</div>
                          <div className="text-sm text-muted-foreground">
                            {seoResults.details.technicalSEO.robotsTxt.isPresent ? "Found" : "Not found"}
                          </div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full ${seoResults.details.technicalSEO.robotsTxt.isPresent ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">Mobile Optimized</div>
                          <div className="text-sm text-muted-foreground">
                            {seoResults.details.technicalSEO.pageSpeed.mobileOptimized ? "Yes" : "No"}
                          </div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full ${seoResults.details.technicalSEO.pageSpeed.mobileOptimized ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {seoResults.issues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-geist text-lg font-semibold">SEO Issues</h3>
                      <div className="grid gap-3">
                        {seoResults.issues.slice(0, 3).map((issue, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                              issue.severity === "critical"
                                ? "border-red-200 bg-red-50"
                                : issue.severity === "high"
                                  ? "border-orange-200 bg-orange-50"
                                  : issue.severity === "medium"
                                    ? "border-yellow-200 bg-yellow-50"
                                    : "border-blue-200 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"}>
                                    {issue.severity.toUpperCase()}
                                  </Badge>
                                  <span className="font-geist font-medium">{issue.title}</span>
                                </div>
                                <p className="font-manrope text-sm text-muted-foreground mb-2">{issue.description}</p>
                                <p className="font-manrope text-sm font-medium">💡 {issue.recommendation}</p>
                                <p className="font-manrope text-xs text-muted-foreground mt-1">
                                  Impact: {issue.impact}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {seoResults.recommendations.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-geist text-lg font-semibold">SEO Recommendations</h3>
                      <ul className="space-y-2">
                        {seoResults.recommendations.slice(0, 5).map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="font-manrope text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {accessibilityResults && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-geist flex items-center space-x-2">
                        <Eye className="h-5 w-5" />
                        <span>Accessibility Analysis Results</span>
                      </CardTitle>
                      <CardDescription className="font-manrope">
                        WCAG compliance and usability analysis for {accessibilityResults.url}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getAccessibilityScoreColor(accessibilityResults.score)}`}>
                        {accessibilityResults.score}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Grade: {accessibilityResults.grade}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold">WCAG Compliance Levels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Level A</span>
                          <Badge className={getWCAGLevelColor("A")}>Basic</Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.wcagCompliance.levelA}%
                        </div>
                        <div className="text-sm text-muted-foreground">Minimum compliance</div>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Level AA</span>
                          <Badge className={getWCAGLevelColor("AA")}>Standard</Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.wcagCompliance.levelAA}%
                        </div>
                        <div className="text-sm text-muted-foreground">Recommended level</div>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Level AAA</span>
                          <Badge className={getWCAGLevelColor("AAA")}>Enhanced</Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.wcagCompliance.levelAAA}%
                        </div>
                        <div className="text-sm text-muted-foreground">Highest level</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-geist text-lg font-semibold">Accessibility Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.details.colorContrast.averageRatio.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Contrast</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.details.images.withAltText}/{accessibilityResults.details.images.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Images w/ Alt</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.details.forms.withLabels}/{accessibilityResults.details.forms.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Forms Labeled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {accessibilityResults.details.headings.totalHeadings}
                        </div>
                        <div className="text-sm text-muted-foreground">Headings</div>
                      </div>
                    </div>
                  </div>

                  {accessibilityResults.issues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-geist text-lg font-semibold">Accessibility Issues</h3>
                      <div className="grid gap-3">
                        {accessibilityResults.issues.slice(0, 3).map((issue, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                              issue.severity === "critical"
                                ? "border-red-200 bg-red-50"
                                : issue.severity === "high"
                                  ? "border-orange-200 bg-orange-50"
                                  : issue.severity === "medium"
                                    ? "border-yellow-200 bg-yellow-50"
                                    : "border-blue-200 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"}>
                                    {issue.severity.toUpperCase()}
                                  </Badge>
                                  <Badge className={getWCAGLevelColor(issue.wcagLevel)}>WCAG {issue.wcagLevel}</Badge>
                                  <span className="font-geist font-medium">{issue.title}</span>
                                </div>
                                <p className="font-manrope text-sm text-muted-foreground mb-2">{issue.description}</p>
                                <p className="font-manrope text-sm font-medium">💡 {issue.recommendation}</p>
                                <p className="font-manrope text-xs text-muted-foreground mt-1">
                                  Impact: {issue.impact}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {accessibilityResults.recommendations.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-geist text-lg font-semibold">Accessibility Recommendations</h3>
                      <ul className="space-y-2">
                        {accessibilityResults.recommendations.slice(0, 5).map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="font-manrope text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-geist text-3xl font-bold">What We Analyze</h2>
            <p className="font-manrope text-lg text-muted-foreground">
              Our comprehensive audit covers all critical aspects of your website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-geist">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-manrope text-sm">Vulnerabilities and SSL configuration</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-geist">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-manrope text-sm">Loading times and Core Web Vitals</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="font-geist">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-manrope text-sm">Meta tags and search optimization</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-muted/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-muted" />
                </div>
                <CardTitle className="font-geist">Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-manrope text-sm">WCAG compliance and usability</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  )
}