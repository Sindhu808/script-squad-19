export interface SEOAnalysisResult {
  url: string
  timestamp: string
  score: number
  grade: string
  issues: SEOIssue[]
  recommendations: string[]
  details: {
    metaTags: MetaTagsAnalysis
    contentAnalysis: ContentAnalysis
    technicalSEO: TechnicalSEOAnalysis
    socialMedia: SocialMediaAnalysis
    structuredData: StructuredDataAnalysis
  }
}

export interface SEOIssue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  recommendation: string
  impact: string
}

export interface MetaTagsAnalysis {
  title: {
    content: string
    length: number
    isOptimal: boolean
    issues: string[]
  }
  description: {
    content: string
    length: number
    isOptimal: boolean
    issues: string[]
  }
  keywords: {
    content: string
    isPresent: boolean
    issues: string[]
  }
  robots: {
    content: string
    isPresent: boolean
    issues: string[]
  }
  canonical: {
    url: string
    isPresent: boolean
    issues: string[]
  }
}

export interface ContentAnalysis {
  headings: {
    h1Count: number
    h2Count: number
    h3Count: number
    structure: string[]
    issues: string[]
  }
  content: {
    wordCount: number
    readabilityScore: number
    keywordDensity: number
    issues: string[]
  }
  images: {
    total: number
    withAlt: number
    withoutAlt: number
    issues: string[]
  }
  links: {
    internal: number
    external: number
    broken: number
    issues: string[]
  }
}

export interface TechnicalSEOAnalysis {
  urlStructure: {
    isClean: boolean
    hasParameters: boolean
    length: number
    issues: string[]
  }
  sitemap: {
    isPresent: boolean
    isAccessible: boolean
    issues: string[]
  }
  robotsTxt: {
    isPresent: boolean
    isValid: boolean
    issues: string[]
  }
  pageSpeed: {
    loadTime: number
    mobileOptimized: boolean
    issues: string[]
  }
}

export interface SocialMediaAnalysis {
  openGraph: {
    title: string
    description: string
    image: string
    isComplete: boolean
    issues: string[]
  }
  twitterCards: {
    card: string
    title: string
    description: string
    isComplete: boolean
    issues: string[]
  }
}

export interface StructuredDataAnalysis {
  schemas: string[]
  isPresent: boolean
  isValid: boolean
  issues: string[]
}

export function getSEOScoreColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  if (score >= 50) return "text-orange-600"
  return "text-red-600"
}

export function getSEOGrade(score: number): string {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

export function getOptimalityColor(isOptimal: boolean): string {
  return isOptimal ? "text-green-600 bg-green-50 border-green-200" : "text-red-600 bg-red-50 border-red-200"
}

export function formatReadabilityScore(score: number): string {
  if (score >= 90) return "Very Easy"
  if (score >= 80) return "Easy"
  if (score >= 70) return "Fairly Easy"
  if (score >= 60) return "Standard"
  if (score >= 50) return "Fairly Difficult"
  if (score >= 30) return "Difficult"
  return "Very Difficult"
}
