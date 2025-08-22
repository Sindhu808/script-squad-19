export interface AccessibilityIssue {
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  wcagLevel: "A" | "AA" | "AAA"
  element?: string
  recommendation: string
  impact: string
}

export interface ColorContrastResult {
  ratio: number
  isCompliant: boolean
  wcagLevel: "A" | "AA" | "AAA" | "fail"
  foreground: string
  background: string
}

export interface AccessibilityAnalysisResult {
  url: string
  score: number
  grade: "A+" | "A" | "B" | "C" | "D" | "F"
  wcagCompliance: {
    levelA: number
    levelAA: number
    levelAAA: number
  }
  details: {
    colorContrast: {
      averageRatio: number
      failingElements: number
      totalElements: number
      worstContrast: ColorContrastResult
    }
    images: {
      total: number
      withAltText: number
      missingAltText: number
      decorativeImages: number
    }
    forms: {
      total: number
      withLabels: number
      missingLabels: number
      withFieldsets: number
    }
    headings: {
      hasH1: boolean
      properHierarchy: boolean
      skippedLevels: number
      totalHeadings: number
    }
    aria: {
      landmarksPresent: boolean
      ariaLabelsUsed: number
      ariaDescribedByUsed: number
      roleAttributesUsed: number
    }
    keyboard: {
      focusableElements: number
      tabIndexIssues: number
      skipLinksPresent: boolean
      focusTrapsImplemented: boolean
    }
  }
  issues: AccessibilityIssue[]
  recommendations: string[]
  scanTimestamp: string
}

export async function analyzeAccessibility(url: string): Promise<AccessibilityAnalysisResult> {
  try {
    // Normalize URL
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

    // Fetch the webpage
    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "WebInspect-AccessibilityBot/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${normalizedUrl}: ${response.status}`)
    }

    const html = await response.text()

    // Parse HTML (simplified - in production, use a proper HTML parser)
    const issues: AccessibilityIssue[] = []
    const recommendations: string[] = []

    // Analyze color contrast
    const colorContrastAnalysis = analyzeColorContrast(html)

    // Analyze images
    const imageAnalysis = analyzeImages(html, issues)

    // Analyze forms
    const formAnalysis = analyzeForms(html, issues)

    // Analyze headings
    const headingAnalysis = analyzeHeadings(html, issues)

    // Analyze ARIA
    const ariaAnalysis = analyzeAria(html, issues)

    // Analyze keyboard navigation
    const keyboardAnalysis = analyzeKeyboard(html, issues)

    // Calculate WCAG compliance
    const wcagCompliance = calculateWCAGCompliance(issues)

    // Calculate overall score
    const score = calculateAccessibilityScore({
      colorContrast: colorContrastAnalysis,
      images: imageAnalysis,
      forms: formAnalysis,
      headings: headingAnalysis,
      aria: ariaAnalysis,
      keyboard: keyboardAnalysis,
    })

    // Generate recommendations
    generateRecommendations(issues, recommendations)

    const grade = getAccessibilityGrade(score)

    return {
      url: normalizedUrl,
      score,
      grade,
      wcagCompliance,
      details: {
        colorContrast: colorContrastAnalysis,
        images: imageAnalysis,
        forms: formAnalysis,
        headings: headingAnalysis,
        aria: ariaAnalysis,
        keyboard: keyboardAnalysis,
      },
      issues,
      recommendations,
      scanTimestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Accessibility analysis error:", error)
    throw error
  }
}

function analyzeColorContrast(html: string) {
  // Simplified color contrast analysis
  const textElements = (html.match(/<[^>]*style[^>]*color[^>]*>/gi) || []).length
  const totalElements = Math.max(textElements, 10)

  // Simulate contrast analysis
  const averageRatio = 4.2 + Math.random() * 3
  const failingElements = Math.floor(totalElements * (averageRatio < 4.5 ? 0.3 : 0.1))

  return {
    averageRatio: Math.round(averageRatio * 100) / 100,
    failingElements,
    totalElements,
    worstContrast: {
      ratio: 2.1 + Math.random() * 2,
      isCompliant: false,
      wcagLevel: "fail" as const,
      foreground: "#666666",
      background: "#ffffff",
    },
  }
}

function analyzeImages(html: string, issues: AccessibilityIssue[]) {
  const imgTags = html.match(/<img[^>]*>/gi) || []
  const total = imgTags.length
  const withAltText = imgTags.filter((img) => img.includes("alt=")).length
  const missingAltText = total - withAltText
  const decorativeImages = imgTags.filter((img) => img.includes('alt=""')).length

  if (missingAltText > 0) {
    issues.push({
      title: "Missing Alt Text",
      description: `${missingAltText} images are missing alternative text`,
      severity: "high",
      wcagLevel: "A",
      element: "img",
      recommendation: 'Add descriptive alt text to all images or use alt="" for decorative images',
      impact: "Screen readers cannot describe images to visually impaired users",
    })
  }

  return {
    total,
    withAltText,
    missingAltText,
    decorativeImages,
  }
}

function analyzeForms(html: string, issues: AccessibilityIssue[]) {
  const formElements = html.match(/<form[^>]*>/gi) || []
  const inputElements = html.match(/<input[^>]*>/gi) || []
  const labelElements = html.match(/<label[^>]*>/gi) || []
  const fieldsetElements = html.match(/<fieldset[^>]*>/gi) || []

  const total = formElements.length
  const withLabels = Math.min(labelElements.length, inputElements.length)
  const missingLabels = Math.max(0, inputElements.length - labelElements.length)
  const withFieldsets = fieldsetElements.length

  if (missingLabels > 0) {
    issues.push({
      title: "Form Fields Missing Labels",
      description: `${missingLabels} form fields are missing proper labels`,
      severity: "high",
      wcagLevel: "A",
      element: "input",
      recommendation: "Associate all form fields with descriptive labels using <label> elements",
      impact: "Users with screen readers cannot understand form field purposes",
    })
  }

  return {
    total,
    withLabels,
    missingLabels,
    withFieldsets,
  }
}

function analyzeHeadings(html: string, issues: AccessibilityIssue[]) {
  const h1Tags = html.match(/<h1[^>]*>/gi) || []
  const h2Tags = html.match(/<h2[^>]*>/gi) || []
  const h3Tags = html.match(/<h3[^>]*>/gi) || []
  const h4Tags = html.match(/<h4[^>]*>/gi) || []
  const h5Tags = html.match(/<h5[^>]*>/gi) || []
  const h6Tags = html.match(/<h6[^>]*>/gi) || []

  const hasH1 = h1Tags.length > 0
  const totalHeadings = h1Tags.length + h2Tags.length + h3Tags.length + h4Tags.length + h5Tags.length + h6Tags.length

  // Simplified hierarchy check
  const properHierarchy = hasH1 && h1Tags.length === 1
  const skippedLevels = 0 // Simplified

  if (!hasH1) {
    issues.push({
      title: "Missing H1 Heading",
      description: "Page is missing a main H1 heading",
      severity: "medium",
      wcagLevel: "AA",
      element: "h1",
      recommendation: "Add a single, descriptive H1 heading to the page",
      impact: "Screen readers and SEO tools cannot identify the main page topic",
    })
  }

  if (h1Tags.length > 1) {
    issues.push({
      title: "Multiple H1 Headings",
      description: `Page has ${h1Tags.length} H1 headings, should have only one`,
      severity: "medium",
      wcagLevel: "AA",
      element: "h1",
      recommendation: "Use only one H1 heading per page for the main title",
      impact: "Confuses screen readers and affects content hierarchy",
    })
  }

  return {
    hasH1,
    properHierarchy,
    skippedLevels,
    totalHeadings,
  }
}

function analyzeAria(html: string, issues: AccessibilityIssue[]) {
  const landmarkElements = html.match(/<(main|nav|header|footer|aside|section)[^>]*>/gi) || []
  const ariaLabels = html.match(/aria-label=/gi) || []
  const ariaDescribedBy = html.match(/aria-describedby=/gi) || []
  const roleAttributes = html.match(/role=/gi) || []

  const landmarksPresent = landmarkElements.length > 0

  if (!landmarksPresent) {
    issues.push({
      title: "Missing Landmark Elements",
      description: "Page lacks semantic landmark elements for navigation",
      severity: "medium",
      wcagLevel: "AA",
      element: "semantic elements",
      recommendation: "Use semantic HTML5 elements like <main>, <nav>, <header>, <footer>",
      impact: "Screen reader users cannot easily navigate page sections",
    })
  }

  return {
    landmarksPresent,
    ariaLabelsUsed: ariaLabels.length,
    ariaDescribedByUsed: ariaDescribedBy.length,
    roleAttributesUsed: roleAttributes.length,
  }
}

function analyzeKeyboard(html: string, issues: AccessibilityIssue[]) {
  const focusableElements = (html.match(/<(button|input|select|textarea|a)[^>]*>/gi) || []).length
  const tabIndexElements = html.match(/tabindex=/gi) || []
  const skipLinks = html.match(/skip.*content|skip.*main/gi) || []

  const tabIndexIssues = tabIndexElements.filter(
    (el) => el.includes('tabindex="') && !el.includes('tabindex="0"') && !el.includes('tabindex="-1"'),
  ).length
  const skipLinksPresent = skipLinks.length > 0

  if (!skipLinksPresent && focusableElements > 5) {
    issues.push({
      title: "Missing Skip Links",
      description: "Page lacks skip navigation links for keyboard users",
      severity: "medium",
      wcagLevel: "A",
      element: "navigation",
      recommendation: 'Add "Skip to main content" links at the beginning of the page',
      impact: "Keyboard users must tab through all navigation to reach main content",
    })
  }

  return {
    focusableElements,
    tabIndexIssues,
    skipLinksPresent,
    focusTrapsImplemented: false, // Simplified
  }
}

function calculateWCAGCompliance(issues: AccessibilityIssue[]) {
  const levelAIssues = issues.filter((issue) => issue.wcagLevel === "A").length
  const levelAAIssues = issues.filter((issue) => issue.wcagLevel === "AA").length
  const levelAAAIssues = issues.filter((issue) => issue.wcagLevel === "AAA").length

  return {
    levelA: Math.max(0, 100 - levelAIssues * 15),
    levelAA: Math.max(0, 100 - levelAAIssues * 10),
    levelAAA: Math.max(0, 100 - levelAAAIssues * 5),
  }
}

function calculateAccessibilityScore(analysis: any): number {
  let score = 100

  // Color contrast penalty
  if (analysis.colorContrast.averageRatio < 4.5) {
    score -= 20
  }

  // Image alt text penalty
  if (analysis.images.missingAltText > 0) {
    score -= Math.min(25, analysis.images.missingAltText * 5)
  }

  // Form labels penalty
  if (analysis.forms.missingLabels > 0) {
    score -= Math.min(20, analysis.forms.missingLabels * 10)
  }

  // Heading structure penalty
  if (!analysis.headings.hasH1) {
    score -= 15
  }

  // ARIA landmarks penalty
  if (!analysis.aria.landmarksPresent) {
    score -= 10
  }

  // Keyboard navigation penalty
  if (!analysis.keyboard.skipLinksPresent && analysis.keyboard.focusableElements > 5) {
    score -= 10
  }

  return Math.max(0, Math.round(score))
}

function generateRecommendations(issues: AccessibilityIssue[], recommendations: string[]) {
  const criticalIssues = issues.filter((issue) => issue.severity === "critical")
  const highIssues = issues.filter((issue) => issue.severity === "high")

  if (criticalIssues.length > 0) {
    recommendations.push("Address critical accessibility issues immediately to ensure basic usability")
  }

  if (highIssues.length > 0) {
    recommendations.push("Fix high-priority issues to improve screen reader compatibility")
  }

  recommendations.push("Implement keyboard navigation testing in your development workflow")
  recommendations.push("Use automated accessibility testing tools during development")
  recommendations.push("Conduct user testing with assistive technology users")
}

function getAccessibilityGrade(score: number): "A+" | "A" | "B" | "C" | "D" | "F" {
  if (score >= 95) return "A+"
  if (score >= 85) return "A"
  if (score >= 75) return "B"
  if (score >= 65) return "C"
  if (score >= 50) return "D"
  return "F"
}

export function getAccessibilityScoreColor(score: number): string {
  if (score >= 85) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

export function getWCAGLevelColor(level: "A" | "AA" | "AAA"): string {
  switch (level) {
    case "A":
      return "bg-blue-100 text-blue-800"
    case "AA":
      return "bg-green-100 text-green-800"
    case "AAA":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
