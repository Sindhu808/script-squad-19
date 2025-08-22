export interface PerformanceAnalysisResult {
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

export interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  totalBlockingTime: number
  speedIndex: number
}

export interface PerformanceIssue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  recommendation: string
  impact: string
}

export interface CoreWebVitals {
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

export interface ResourceAnalysis {
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

export interface NetworkAnalysis {
  requests: number
  transferSize: number
  compressionRatio: number
  http2: boolean
  cdn: boolean
  keepAlive: boolean
}

export interface MobilePerformance {
  score: number
  issues: string[]
  viewport: boolean
  touchTargets: boolean
  fontSizes: boolean
}

export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }
  return `${(ms / 1000).toFixed(1)}s`
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes}B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

export function getPerformanceScoreColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  if (score >= 50) return "text-orange-600"
  return "text-red-600"
}

export function getCoreWebVitalColor(rating: "good" | "needs-improvement" | "poor"): string {
  switch (rating) {
    case "good":
      return "text-green-600 bg-green-50 border-green-200"
    case "needs-improvement":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "poor":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function getPerformanceGrade(score: number): string {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}
