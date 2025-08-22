import { type NextRequest, NextResponse } from "next/server"

interface SEOAnalysisResult {
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

interface SEOIssue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  recommendation: string
  impact: string
}

interface MetaTagsAnalysis {
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

interface ContentAnalysis {
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

interface TechnicalSEOAnalysis {
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

interface SocialMediaAnalysis {
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

interface StructuredDataAnalysis {
  schemas: string[]
  isPresent: boolean
  isValid: boolean
  issues: string[]
}

async function analyzeMetaTags(html: string, url: string): Promise<MetaTagsAnalysis> {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ""

  // Extract meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*?)["']/i)
  const description = descMatch ? descMatch[1].trim() : ""

  // Extract meta keywords
  const keywordsMatch = html.match(/<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']*?)["']/i)
  const keywords = keywordsMatch ? keywordsMatch[1].trim() : ""

  // Extract robots meta
  const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*?)["']/i)
  const robots = robotsMatch ? robotsMatch[1].trim() : ""

  // Extract canonical URL
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*?)["']/i)
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : ""

  return {
    title: {
      content: title,
      length: title.length,
      isOptimal: title.length >= 30 && title.length <= 60,
      issues: [
        ...(title.length === 0 ? ["Missing title tag"] : []),
        ...(title.length > 0 && title.length < 30 ? ["Title too short (recommended: 30-60 characters)"] : []),
        ...(title.length > 60 ? ["Title too long (recommended: 30-60 characters)"] : []),
      ],
    },
    description: {
      content: description,
      length: description.length,
      isOptimal: description.length >= 120 && description.length <= 160,
      issues: [
        ...(description.length === 0 ? ["Missing meta description"] : []),
        ...(description.length > 0 && description.length < 120
          ? ["Description too short (recommended: 120-160 characters)"]
          : []),
        ...(description.length > 160 ? ["Description too long (recommended: 120-160 characters)"] : []),
      ],
    },
    keywords: {
      content: keywords,
      isPresent: keywords.length > 0,
      issues: keywords.length === 0 ? ["Meta keywords not found (optional but can be helpful)"] : [],
    },
    robots: {
      content: robots,
      isPresent: robots.length > 0,
      issues: robots.length === 0 ? ["Robots meta tag not found"] : [],
    },
    canonical: {
      url: canonical,
      isPresent: canonical.length > 0,
      issues: canonical.length === 0 ? ["Canonical URL not specified"] : [],
    },
  }
}

async function analyzeContent(html: string): Promise<ContentAnalysis> {
  // Extract headings
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || []
  const h2Matches = html.match(/<h2[^>]*>.*?<\/h2>/gi) || []
  const h3Matches = html.match(/<h3[^>]*>.*?<\/h3>/gi) || []

  const headingStructure = []
  if (h1Matches.length > 0) headingStructure.push(`H1 (${h1Matches.length})`)
  if (h2Matches.length > 0) headingStructure.push(`H2 (${h2Matches.length})`)
  if (h3Matches.length > 0) headingStructure.push(`H3 (${h3Matches.length})`)

  // Extract text content
  const textContent = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const wordCount = textContent.split(" ").filter((word) => word.length > 0).length

  // Simple readability score (Flesch Reading Ease approximation)
  const sentences = textContent.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  const syllables = textContent.split(" ").reduce((count, word) => {
    return count + Math.max(1, word.replace(/[^aeiouAEIOU]/g, "").length)
  }, 0)

  const readabilityScore =
    sentences > 0 && wordCount > 0 ? 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount) : 0

  // Analyze images
  const imgMatches = html.match(/<img[^>]*>/gi) || []
  const imagesWithAlt = imgMatches.filter((img) => /alt=["'][^"']*["']/.test(img)).length
  const imagesWithoutAlt = imgMatches.length - imagesWithAlt

  // Analyze links
  const linkMatches = html.match(/<a[^>]+href=["']([^"']*?)["'][^>]*>/gi) || []
  const internalLinks = linkMatches.filter(
    (link) => (!link.includes("http://") && !link.includes("https://")) || link.includes(new URL(html).hostname),
  ).length
  const externalLinks = linkMatches.length - internalLinks

  return {
    headings: {
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      h3Count: h3Matches.length,
      structure: headingStructure,
      issues: [
        ...(h1Matches.length === 0 ? ["No H1 heading found"] : []),
        ...(h1Matches.length > 1 ? ["Multiple H1 headings found (should be unique)"] : []),
        ...(h2Matches.length === 0 ? ["No H2 headings found"] : []),
      ],
    },
    content: {
      wordCount,
      readabilityScore: Math.max(0, Math.min(100, readabilityScore)),
      keywordDensity: 0, // Would need keyword analysis
      issues: [
        ...(wordCount < 300 ? ["Content too short (recommended: 300+ words)"] : []),
        ...(wordCount > 2000 ? ["Content very long (consider breaking into sections)"] : []),
        ...(readabilityScore < 30 ? ["Content may be difficult to read"] : []),
      ],
    },
    images: {
      total: imgMatches.length,
      withAlt: imagesWithAlt,
      withoutAlt: imagesWithoutAlt,
      issues: [...(imagesWithoutAlt > 0 ? [`${imagesWithoutAlt} images missing alt text`] : [])],
    },
    links: {
      internal: internalLinks,
      external: externalLinks,
      broken: 0, // Would need link checking
      issues: [
        ...(internalLinks === 0 ? ["No internal links found"] : []),
        ...(externalLinks > internalLinks * 2 ? ["Too many external links compared to internal"] : []),
      ],
    },
  }
}

async function analyzeTechnicalSEO(url: string, html: string): Promise<TechnicalSEOAnalysis> {
  const urlObj = new URL(url)

  // Analyze URL structure
  const hasParameters = urlObj.search.length > 0
  const urlLength = url.length
  const isCleanUrl = !hasParameters && !url.includes("index.") && urlLength < 100

  // Check for sitemap
  let sitemapPresent = false
  let sitemapAccessible = false
  try {
    const sitemapResponse = await fetch(`${urlObj.origin}/sitemap.xml`, { method: "HEAD" })
    sitemapPresent = sitemapResponse.ok
    sitemapAccessible = sitemapResponse.ok
  } catch {
    // Sitemap not accessible
  }

  // Check for robots.txt
  let robotsPresent = false
  let robotsValid = false
  try {
    const robotsResponse = await fetch(`${urlObj.origin}/robots.txt`)
    robotsPresent = robotsResponse.ok
    if (robotsResponse.ok) {
      const robotsContent = await robotsResponse.text()
      robotsValid = robotsContent.includes("User-agent:")
    }
  } catch {
    // Robots.txt not accessible
  }

  return {
    urlStructure: {
      isClean: isCleanUrl,
      hasParameters,
      length: urlLength,
      issues: [
        ...(hasParameters ? ["URL contains parameters (may affect SEO)"] : []),
        ...(urlLength > 100 ? ["URL too long (recommended: under 100 characters)"] : []),
        ...(!isCleanUrl ? ["URL structure could be more SEO-friendly"] : []),
      ],
    },
    sitemap: {
      isPresent: sitemapPresent,
      isAccessible: sitemapAccessible,
      issues: [
        ...(!sitemapPresent ? ["XML sitemap not found"] : []),
        ...(sitemapPresent && !sitemapAccessible ? ["Sitemap found but not accessible"] : []),
      ],
    },
    robotsTxt: {
      isPresent: robotsPresent,
      isValid: robotsValid,
      issues: [
        ...(!robotsPresent ? ["robots.txt file not found"] : []),
        ...(robotsPresent && !robotsValid ? ["robots.txt file invalid or empty"] : []),
      ],
    },
    pageSpeed: {
      loadTime: 0, // Would be populated from performance analysis
      mobileOptimized: html.includes("viewport") && html.includes("width=device-width"),
      issues: [...(!html.includes("viewport") ? ["Missing viewport meta tag for mobile"] : [])],
    },
  }
}

async function analyzeSocialMedia(html: string): Promise<SocialMediaAnalysis> {
  // Open Graph tags
  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*?)["']/i)
  const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*?)["']/i)
  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*?)["']/i)

  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : ""
  const ogDescription = ogDescMatch ? ogDescMatch[1] : ""
  const ogImage = ogImageMatch ? ogImageMatch[1] : ""

  // Twitter Card tags
  const twitterCardMatch = html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*?)["']/i)
  const twitterTitleMatch = html.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']*?)["']/i)
  const twitterDescMatch = html.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']*?)["']/i)

  const twitterCard = twitterCardMatch ? twitterCardMatch[1] : ""
  const twitterTitle = twitterTitleMatch ? twitterTitleMatch[1] : ""
  const twitterDescription = twitterDescMatch ? twitterDescMatch[1] : ""

  return {
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      isComplete: !!(ogTitle && ogDescription && ogImage),
      issues: [
        ...(!ogTitle ? ["Missing Open Graph title"] : []),
        ...(!ogDescription ? ["Missing Open Graph description"] : []),
        ...(!ogImage ? ["Missing Open Graph image"] : []),
      ],
    },
    twitterCards: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      isComplete: !!(twitterCard && twitterTitle && twitterDescription),
      issues: [
        ...(!twitterCard ? ["Missing Twitter Card type"] : []),
        ...(!twitterTitle ? ["Missing Twitter Card title"] : []),
        ...(!twitterDescription ? ["Missing Twitter Card description"] : []),
      ],
    },
  }
}

async function analyzeStructuredData(html: string): Promise<StructuredDataAnalysis> {
  // Look for JSON-LD structured data
  const jsonLdMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis) || []
  const schemas: string[] = []

  jsonLdMatches.forEach((match) => {
    try {
      const jsonContent = match.replace(/<script[^>]*>/, "").replace(/<\/script>/, "")
      const data = JSON.parse(jsonContent)
      if (data["@type"]) {
        schemas.push(data["@type"])
      }
    } catch {
      // Invalid JSON-LD
    }
  })

  // Look for microdata
  const microdataMatches = html.match(/itemtype=["']([^"']*?)["']/gi) || []
  microdataMatches.forEach((match) => {
    const typeMatch = match.match(/itemtype=["']([^"']*?)["']/)
    if (typeMatch) {
      const schemaType = typeMatch[1].split("/").pop()
      if (schemaType && !schemas.includes(schemaType)) {
        schemas.push(schemaType)
      }
    }
  })

  return {
    schemas,
    isPresent: schemas.length > 0,
    isValid: schemas.length > 0, // Simplified validation
    issues: [
      ...(schemas.length === 0 ? ["No structured data found"] : []),
      ...(schemas.length > 0 && !schemas.includes("Organization") && !schemas.includes("WebSite")
        ? ["Consider adding Organization or WebSite schema"]
        : []),
    ],
  }
}

function calculateSEOScore(
  metaTags: MetaTagsAnalysis,
  content: ContentAnalysis,
  technical: TechnicalSEOAnalysis,
  social: SocialMediaAnalysis,
  structured: StructuredDataAnalysis,
): number {
  let score = 100

  // Meta tags (30% of score)
  let metaScore = 100
  if (!metaTags.title.isOptimal) metaScore -= 20
  if (!metaTags.description.isOptimal) metaScore -= 20
  if (!metaTags.canonical.isPresent) metaScore -= 10

  // Content (25% of score)
  let contentScore = 100
  if (content.headings.h1Count === 0) contentScore -= 25
  if (content.headings.h1Count > 1) contentScore -= 15
  if (content.content.wordCount < 300) contentScore -= 20
  if (content.images.withoutAlt > 0) contentScore -= 15

  // Technical SEO (25% of score)
  let technicalScore = 100
  if (!technical.sitemap.isPresent) technicalScore -= 20
  if (!technical.robotsTxt.isPresent) technicalScore -= 15
  if (!technical.urlStructure.isClean) technicalScore -= 15
  if (!technical.pageSpeed.mobileOptimized) technicalScore -= 20

  // Social Media (10% of score)
  let socialScore = 100
  if (!social.openGraph.isComplete) socialScore -= 50
  if (!social.twitterCards.isComplete) socialScore -= 30

  // Structured Data (10% of score)
  const structuredScore = structured.isPresent ? 100 : 50

  // Calculate weighted score
  score = metaScore * 0.3 + contentScore * 0.25 + technicalScore * 0.25 + socialScore * 0.1 + structuredScore * 0.1

  return Math.max(0, Math.round(score))
}

function generateSEOIssues(
  metaTags: MetaTagsAnalysis,
  content: ContentAnalysis,
  technical: TechnicalSEOAnalysis,
  social: SocialMediaAnalysis,
  structured: StructuredDataAnalysis,
): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Meta tag issues
  if (metaTags.title.issues.length > 0) {
    issues.push({
      severity: "critical",
      category: "Meta Tags",
      title: "Title Tag Issues",
      description: metaTags.title.issues.join(", "),
      recommendation: "Optimize title tag to 30-60 characters with target keywords",
      impact: "Title tags are crucial for search rankings and click-through rates",
    })
  }

  if (metaTags.description.issues.length > 0) {
    issues.push({
      severity: "high",
      category: "Meta Tags",
      title: "Meta Description Issues",
      description: metaTags.description.issues.join(", "),
      recommendation: "Write compelling meta description of 120-160 characters",
      impact: "Meta descriptions affect click-through rates from search results",
    })
  }

  // Content issues
  if (content.headings.h1Count === 0) {
    issues.push({
      severity: "critical",
      category: "Content Structure",
      title: "Missing H1 Heading",
      description: "No H1 heading found on the page",
      recommendation: "Add a unique H1 heading that describes the page content",
      impact: "H1 headings help search engines understand page topic",
    })
  }

  if (content.headings.h1Count > 1) {
    issues.push({
      severity: "medium",
      category: "Content Structure",
      title: "Multiple H1 Headings",
      description: `${content.headings.h1Count} H1 headings found`,
      recommendation: "Use only one H1 heading per page for better SEO",
      impact: "Multiple H1s can confuse search engines about page focus",
    })
  }

  if (content.content.wordCount < 300) {
    issues.push({
      severity: "medium",
      category: "Content Quality",
      title: "Insufficient Content",
      description: `Only ${content.content.wordCount} words found`,
      recommendation: "Add more valuable content (recommended: 300+ words)",
      impact: "Thin content may not rank well in search results",
    })
  }

  if (content.images.withoutAlt > 0) {
    issues.push({
      severity: "medium",
      category: "Image Optimization",
      title: "Missing Alt Text",
      description: `${content.images.withoutAlt} images missing alt text`,
      recommendation: "Add descriptive alt text to all images",
      impact: "Alt text improves accessibility and image search rankings",
    })
  }

  // Technical SEO issues
  if (!technical.sitemap.isPresent) {
    issues.push({
      severity: "high",
      category: "Technical SEO",
      title: "Missing XML Sitemap",
      description: "No XML sitemap found",
      recommendation: "Create and submit XML sitemap to search engines",
      impact: "Sitemaps help search engines discover and index pages",
    })
  }

  if (!technical.robotsTxt.isPresent) {
    issues.push({
      severity: "medium",
      category: "Technical SEO",
      title: "Missing Robots.txt",
      description: "No robots.txt file found",
      recommendation: "Create robots.txt file to guide search engine crawling",
      impact: "Robots.txt helps control how search engines access your site",
    })
  }

  if (!technical.pageSpeed.mobileOptimized) {
    issues.push({
      severity: "high",
      category: "Mobile SEO",
      title: "Not Mobile Optimized",
      description: "Missing viewport meta tag for mobile optimization",
      recommendation: "Add viewport meta tag and ensure responsive design",
      impact: "Mobile optimization is crucial for search rankings",
    })
  }

  // Social media issues
  if (!social.openGraph.isComplete) {
    issues.push({
      severity: "low",
      category: "Social Media",
      title: "Incomplete Open Graph Tags",
      description: "Missing Open Graph title, description, or image",
      recommendation: "Add complete Open Graph tags for better social sharing",
      impact: "Open Graph tags control how content appears when shared",
    })
  }

  // Structured data issues
  if (!structured.isPresent) {
    issues.push({
      severity: "low",
      category: "Structured Data",
      title: "No Structured Data",
      description: "No structured data markup found",
      recommendation: "Add JSON-LD structured data for better search visibility",
      impact: "Structured data can enable rich snippets in search results",
    })
  }

  return issues
}

function generateSEORecommendations(
  issues: SEOIssue[],
  metaTags: MetaTagsAnalysis,
  content: ContentAnalysis,
): string[] {
  const recommendations: string[] = []

  // Priority recommendations
  if (issues.some((i) => i.category === "Meta Tags" && i.severity === "critical")) {
    recommendations.push("Optimize title tags and meta descriptions as top priority")
  }

  if (content.headings.h1Count === 0) {
    recommendations.push("Add a unique, descriptive H1 heading to each page")
  }

  if (content.content.wordCount < 300) {
    recommendations.push("Expand content with valuable, relevant information")
  }

  if (content.images.withoutAlt > 0) {
    recommendations.push("Add descriptive alt text to all images for accessibility and SEO")
  }

  recommendations.push("Create and submit XML sitemap to search engines")
  recommendations.push("Implement structured data markup for rich snippets")
  recommendations.push("Optimize for mobile devices with responsive design")
  recommendations.push("Add Open Graph tags for better social media sharing")

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

    // Fetch page content
    const response = await fetch(normalizedUrl, {
      headers: { "User-Agent": "WebInspect SEO Scanner 1.0" },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch page content" }, { status: 400 })
    }

    const html = await response.text()

    // Perform SEO analysis
    const [metaTags, content, technical, social, structured] = await Promise.all([
      analyzeMetaTags(html, normalizedUrl),
      analyzeContent(html),
      analyzeTechnicalSEO(normalizedUrl, html),
      analyzeSocialMedia(html),
      analyzeStructuredData(html),
    ])

    const score = calculateSEOScore(metaTags, content, technical, social, structured)
    const issues = generateSEOIssues(metaTags, content, technical, social, structured)
    const recommendations = generateSEORecommendations(issues, metaTags, content)

    const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"

    const result: SEOAnalysisResult = {
      url: normalizedUrl,
      timestamp: new Date().toISOString(),
      score,
      grade,
      issues,
      recommendations,
      details: {
        metaTags,
        contentAnalysis: content,
        technicalSEO: technical,
        socialMedia: social,
        structuredData: structured,
      },
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("SEO analysis error:", error)
    return NextResponse.json({ error: "SEO analysis failed" }, { status: 500 })
  }
}
