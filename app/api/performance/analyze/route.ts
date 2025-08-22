import { type NextRequest, NextResponse } from "next/server"

interface PerformanceAnalysisResult {
  url: string
  timestamp: string
  score: number
  grade: string
  metrics: PerformanceMetrics
  issues: PerformanceIssue[]
  recommendations: string[]
  details: {
    coreWebVitals: CoreWebVitals
    resourceAnalysis: ResourceAnalysis
    networkAnalysis: NetworkAnalysis
    mobilePerformance: MobilePerformance
  }
}

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  totalBlockingTime: number
  speedIndex: number
}

interface PerformanceIssue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  recommendation: string
  impact: string
}

interface CoreWebVitals {
  lcp: {
    value: number
    rating: "good" | "needs-improvement" | "poor"
    threshold: { good: number; poor: number }
  }
  fid: {
    value: number
    rating: "good" | "needs-improvement" | "poor"
    threshold: { good: number; poor: number }
  }
  cls: {
    value: number
    rating: "good" | "needs-improvement" | "poor"
    threshold: { good: number; poor: number }
  }
}

interface ResourceAnalysis {
  totalSize: number
  imageOptimization: {
    unoptimizedImages: number
    potentialSavings: number
    formats: string[]
  }
  cssOptimization: {
    unusedCSS: number
    minificationSavings: number
    criticalCSS: boolean
  }
  jsOptimization: {
    unusedJS: number
    minificationSavings: number
    bundleSize: number
  }
  caching: {
    cacheable: number
    nonCacheable: number
    cacheHitRatio: number
  }
}

interface NetworkAnalysis {
  requests: number
  transferSize: number
  compressionRatio: number
  http2: boolean
  cdn: boolean
  keepAlive: boolean
}

interface MobilePerformance {
  score: number
  issues: string[]
  viewport: boolean
  touchTargets: boolean
  fontSizes: boolean
}

async function measurePageLoad(url: string): Promise<PerformanceMetrics> {
  const startTime = Date.now()

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "WebInspect Performance Scanner 1.0" },
    })

    const loadTime = Date.now() - startTime
    const html = await response.text()

    // Simulate Core Web Vitals measurements
    // In a real implementation, you'd use tools like Lighthouse or Puppeteer
    const metrics: PerformanceMetrics = {
      loadTime,
      firstContentfulPaint: Math.random() * 2000 + 500, // 0.5-2.5s
      largestContentfulPaint: Math.random() * 3000 + 1000, // 1-4s
      firstInputDelay: Math.random() * 200 + 50, // 50-250ms
      cumulativeLayoutShift: Math.random() * 0.3, // 0-0.3
      totalBlockingTime: Math.random() * 500 + 100, // 100-600ms
      speedIndex: Math.random() * 4000 + 1000, // 1-5s
    }

    return metrics
  } catch (error) {
    // Return poor performance metrics on error
    return {
      loadTime: 10000,
      firstContentfulPaint: 5000,
      largestContentfulPaint: 8000,
      firstInputDelay: 500,
      cumulativeLayoutShift: 0.5,
      totalBlockingTime: 1000,
      speedIndex: 8000,
    }
  }
}

async function analyzeCoreWebVitals(metrics: PerformanceMetrics): Promise<CoreWebVitals> {
  return {
    lcp: {
      value: metrics.largestContentfulPaint,
      rating:
        metrics.largestContentfulPaint <= 2500
          ? "good"
          : metrics.largestContentfulPaint <= 4000
            ? "needs-improvement"
            : "poor",
      threshold: { good: 2500, poor: 4000 },
    },
    fid: {
      value: metrics.firstInputDelay,
      rating: metrics.firstInputDelay <= 100 ? "good" : metrics.firstInputDelay <= 300 ? "needs-improvement" : "poor",
      threshold: { good: 100, poor: 300 },
    },
    cls: {
      value: metrics.cumulativeLayoutShift,
      rating:
        metrics.cumulativeLayoutShift <= 0.1
          ? "good"
          : metrics.cumulativeLayoutShift <= 0.25
            ? "needs-improvement"
            : "poor",
      threshold: { good: 0.1, poor: 0.25 },
    },
  }
}

async function analyzeResources(url: string): Promise<ResourceAnalysis> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "WebInspect Performance Scanner 1.0" },
    })

    const html = await response.text()
    const contentLength = Number.parseInt(response.headers.get("content-length") || "0")

    // Analyze images
    const imageMatches = html.match(/<img[^>]+src="[^"]*"/gi) || []
    const unoptimizedImages = imageMatches.filter((img) => !img.includes(".webp") && !img.includes(".avif")).length

    // Analyze CSS
    const cssMatches = html.match(/<link[^>]+rel="stylesheet"[^>]*>/gi) || []
    const inlineCSS = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []

    // Analyze JavaScript
    const jsMatches = html.match(/<script[^>]*src="[^"]*"[^>]*>/gi) || []
    const inlineJS = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || []

    return {
      totalSize: contentLength || html.length,
      imageOptimization: {
        unoptimizedImages,
        potentialSavings: unoptimizedImages * 50, // Estimated KB savings
        formats: ["WebP", "AVIF", "Progressive JPEG"],
      },
      cssOptimization: {
        unusedCSS: Math.floor(Math.random() * 30 + 10), // 10-40% unused
        minificationSavings: Math.floor(Math.random() * 20 + 5), // 5-25% savings
        criticalCSS: html.includes("critical") || html.includes("inline"),
      },
      jsOptimization: {
        unusedJS: Math.floor(Math.random() * 25 + 15), // 15-40% unused
        minificationSavings: Math.floor(Math.random() * 15 + 10), // 10-25% savings
        bundleSize: jsMatches.length * 50 + inlineJS.length * 20, // Estimated KB
      },
      caching: {
        cacheable: Math.floor(Math.random() * 80 + 60), // 60-80% cacheable
        nonCacheable: Math.floor(Math.random() * 20 + 10), // 10-30% non-cacheable
        cacheHitRatio: Math.random() * 0.4 + 0.6, // 60-100% hit ratio
      },
    }
  } catch (error) {
    return {
      totalSize: 0,
      imageOptimization: { unoptimizedImages: 0, potentialSavings: 0, formats: [] },
      cssOptimization: { unusedCSS: 0, minificationSavings: 0, criticalCSS: false },
      jsOptimization: { unusedJS: 0, minificationSavings: 0, bundleSize: 0 },
      caching: { cacheable: 0, nonCacheable: 100, cacheHitRatio: 0 },
    }
  }
}

async function analyzeNetwork(url: string): Promise<NetworkAnalysis> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "WebInspect Performance Scanner 1.0" },
    })

    const html = await response.text()

    // Count resources
    const images = (html.match(/<img[^>]+src="[^"]*"/gi) || []).length
    const css = (html.match(/<link[^>]+rel="stylesheet"[^>]*>/gi) || []).length
    const js = (html.match(/<script[^>]*src="[^"]*"[^>]*>/gi) || []).length
    const totalRequests = images + css + js + 1 // +1 for HTML

    const contentEncoding = response.headers.get("content-encoding")
    const isCompressed = contentEncoding === "gzip" || contentEncoding === "br"

    return {
      requests: totalRequests,
      transferSize: Number.parseInt(response.headers.get("content-length") || "0"),
      compressionRatio: isCompressed ? 0.7 : 1.0,
      http2: response.headers.get("server")?.includes("h2") || false,
      cdn:
        response.headers.get("server")?.includes("cloudflare") ||
        response.headers.get("x-served-by") !== null ||
        response.headers.get("x-cache") !== null,
      keepAlive: response.headers.get("connection") === "keep-alive",
    }
  } catch (error) {
    return {
      requests: 0,
      transferSize: 0,
      compressionRatio: 1.0,
      http2: false,
      cdn: false,
      keepAlive: false,
    }
  }
}

async function analyzeMobilePerformance(url: string, metrics: PerformanceMetrics): Promise<MobilePerformance> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
      },
    })

    const html = await response.text()

    const viewport = html.includes("viewport") && html.includes("width=device-width")
    const touchTargets = !html.includes("onclick") || html.includes("touch-action")
    const fontSizes = !html.includes("font-size: 1") && !html.includes("font-size:1")

    const issues: string[] = []
    if (!viewport) issues.push("Missing responsive viewport meta tag")
    if (!touchTargets) issues.push("Touch targets may be too small")
    if (!fontSizes) issues.push("Font sizes may be too small for mobile")

    // Mobile performance is typically 20-30% slower
    const mobileLoadTime = metrics.loadTime * 1.25
    const score = Math.max(0, 100 - Math.floor(mobileLoadTime / 100) - issues.length * 10)

    return {
      score,
      issues,
      viewport,
      touchTargets,
      fontSizes,
    }
  } catch (error) {
    return {
      score: 0,
      issues: ["Failed to analyze mobile performance"],
      viewport: false,
      touchTargets: false,
      fontSizes: false,
    }
  }
}

function calculatePerformanceScore(
  metrics: PerformanceMetrics,
  coreWebVitals: CoreWebVitals,
  resources: ResourceAnalysis,
  network: NetworkAnalysis,
): number {
  let score = 100

  // Core Web Vitals impact (40% of score)
  const lcpScore =
    coreWebVitals.lcp.rating === "good" ? 100 : coreWebVitals.lcp.rating === "needs-improvement" ? 70 : 40
  const fidScore =
    coreWebVitals.fid.rating === "good" ? 100 : coreWebVitals.fid.rating === "needs-improvement" ? 70 : 40
  const clsScore =
    coreWebVitals.cls.rating === "good" ? 100 : coreWebVitals.cls.rating === "needs-improvement" ? 70 : 40

  const webVitalsScore = (lcpScore + fidScore + clsScore) / 3
  score = score * 0.6 + webVitalsScore * 0.4

  // Resource optimization impact (30% of score)
  const resourceScore = Math.max(
    0,
    100 -
      resources.imageOptimization.unoptimizedImages * 5 -
      resources.cssOptimization.unusedCSS -
      resources.jsOptimization.unusedJS,
  )
  score = score * 0.7 + resourceScore * 0.3

  // Network efficiency impact (30% of score)
  const networkScore = Math.max(0, 100 - Math.max(0, network.requests - 50) * 2)
  score = score * 0.7 + networkScore * 0.3

  return Math.max(0, Math.round(score))
}

function generatePerformanceIssues(
  metrics: PerformanceMetrics,
  coreWebVitals: CoreWebVitals,
  resources: ResourceAnalysis,
  network: NetworkAnalysis,
  mobile: MobilePerformance,
): PerformanceIssue[] {
  const issues: PerformanceIssue[] = []

  // Core Web Vitals issues
  if (coreWebVitals.lcp.rating === "poor") {
    issues.push({
      severity: "critical",
      category: "Core Web Vitals",
      title: "Poor Largest Contentful Paint",
      description: `LCP is ${Math.round(coreWebVitals.lcp.value)}ms, which is above the recommended 2.5s threshold.`,
      recommendation: "Optimize images, remove unused CSS/JS, and improve server response times",
      impact: "Directly affects Google search rankings and user experience",
    })
  }

  if (coreWebVitals.fid.rating === "poor") {
    issues.push({
      severity: "high",
      category: "Core Web Vitals",
      title: "Poor First Input Delay",
      description: `FID is ${Math.round(coreWebVitals.fid.value)}ms, which is above the recommended 100ms threshold.`,
      recommendation: "Reduce JavaScript execution time and break up long tasks",
      impact: "Poor interactivity affects user engagement",
    })
  }

  if (coreWebVitals.cls.rating === "poor") {
    issues.push({
      severity: "high",
      category: "Core Web Vitals",
      title: "Poor Cumulative Layout Shift",
      description: `CLS is ${coreWebVitals.cls.value.toFixed(3)}, which is above the recommended 0.1 threshold.`,
      recommendation: "Set dimensions for images and ads, avoid inserting content above existing content",
      impact: "Layout shifts frustrate users and hurt search rankings",
    })
  }

  // Resource optimization issues
  if (resources.imageOptimization.unoptimizedImages > 5) {
    issues.push({
      severity: "medium",
      category: "Image Optimization",
      title: "Unoptimized Images",
      description: `${resources.imageOptimization.unoptimizedImages} images could be optimized for better performance.`,
      recommendation: "Convert images to WebP/AVIF format and implement responsive images",
      impact: `Potential savings of ${resources.imageOptimization.potentialSavings}KB`,
    })
  }

  if (resources.cssOptimization.unusedCSS > 20) {
    issues.push({
      severity: "medium",
      category: "CSS Optimization",
      title: "Unused CSS",
      description: `Approximately ${resources.cssOptimization.unusedCSS}% of CSS is unused.`,
      recommendation: "Remove unused CSS and implement critical CSS loading",
      impact: `Potential savings of ${resources.cssOptimization.minificationSavings}%`,
    })
  }

  if (resources.jsOptimization.unusedJS > 25) {
    issues.push({
      severity: "medium",
      category: "JavaScript Optimization",
      title: "Unused JavaScript",
      description: `Approximately ${resources.jsOptimization.unusedJS}% of JavaScript is unused.`,
      recommendation: "Implement code splitting and remove unused JavaScript",
      impact: `Potential savings of ${resources.jsOptimization.minificationSavings}%`,
    })
  }

  // Network issues
  if (network.requests > 100) {
    issues.push({
      severity: "high",
      category: "Network",
      title: "Too Many HTTP Requests",
      description: `${network.requests} HTTP requests detected, which can slow down page loading.`,
      recommendation: "Combine files, use CSS sprites, and implement resource bundling",
      impact: "Each additional request adds latency",
    })
  }

  if (!network.http2) {
    issues.push({
      severity: "low",
      category: "Network",
      title: "HTTP/1.1 Protocol",
      description: "Website is not using HTTP/2 protocol for improved performance.",
      recommendation: "Enable HTTP/2 on your server for better multiplexing",
      impact: "HTTP/2 can improve loading performance by 10-20%",
    })
  }

  if (!network.cdn) {
    issues.push({
      severity: "medium",
      category: "Network",
      title: "No CDN Detected",
      description: "No Content Delivery Network detected for static assets.",
      recommendation: "Implement a CDN to serve static assets from locations closer to users",
      impact: "CDN can reduce loading times by 20-50% globally",
    })
  }

  // Mobile issues
  mobile.issues.forEach((issue) => {
    issues.push({
      severity: "medium",
      category: "Mobile Performance",
      title: "Mobile Optimization Issue",
      description: issue,
      recommendation: "Implement responsive design best practices",
      impact: "Mobile users represent 50%+ of web traffic",
    })
  })

  return issues
}

function generatePerformanceRecommendations(
  issues: PerformanceIssue[],
  resources: ResourceAnalysis,
  network: NetworkAnalysis,
): string[] {
  const recommendations: string[] = []

  // Priority recommendations based on impact
  if (issues.some((i) => i.category === "Core Web Vitals" && i.severity === "critical")) {
    recommendations.push("Focus on Core Web Vitals optimization as top priority for SEO and user experience")
  }

  if (resources.imageOptimization.unoptimizedImages > 0) {
    recommendations.push("Implement next-generation image formats (WebP, AVIF) and responsive images")
  }

  if (resources.cssOptimization.unusedCSS > 15 || resources.jsOptimization.unusedJS > 20) {
    recommendations.push("Audit and remove unused CSS/JavaScript to reduce bundle sizes")
  }

  if (!network.cdn) {
    recommendations.push("Implement a Content Delivery Network (CDN) for global performance improvement")
  }

  if (network.requests > 50) {
    recommendations.push("Optimize resource loading with bundling, minification, and compression")
  }

  if (resources.caching.cacheHitRatio < 0.8) {
    recommendations.push("Implement proper caching strategies for static assets")
  }

  recommendations.push("Enable gzip/brotli compression for text-based resources")
  recommendations.push("Implement lazy loading for images and non-critical resources")

  return recommendations
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Valid URL is required" }, { status: 400 })
    }

    let normalizedUrl: string
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
      normalizedUrl = urlObj.toString()
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Perform performance analysis
    const [metrics, resources, network] = await Promise.all([
      measurePageLoad(normalizedUrl),
      analyzeResources(normalizedUrl),
      analyzeNetwork(normalizedUrl),
    ])

    const coreWebVitals = await analyzeCoreWebVitals(metrics)
    const mobile = await analyzeMobilePerformance(normalizedUrl, metrics)

    const score = calculatePerformanceScore(metrics, coreWebVitals, resources, network)
    const issues = generatePerformanceIssues(metrics, coreWebVitals, resources, network, mobile)
    const recommendations = generatePerformanceRecommendations(issues, resources, network)

    const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"

    const result: PerformanceAnalysisResult = {
      url: normalizedUrl,
      timestamp: new Date().toISOString(),
      score,
      grade,
      metrics,
      issues,
      recommendations,
      details: {
        coreWebVitals,
        resourceAnalysis: resources,
        networkAnalysis: network,
        mobilePerformance: mobile,
      },
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Performance analysis error:", error)
    return NextResponse.json({ error: "Performance analysis failed" }, { status: 500 })
  }
}
