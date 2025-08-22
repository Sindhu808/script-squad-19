export interface SecurityAnalysisResult {
  url: string
  timestamp: string
  score: number
  issues: SecurityIssue[]
  recommendations: string[]
  details: {
    ssl: SSLAnalysis
    headers: SecurityHeadersAnalysis
    vulnerabilities: VulnerabilityAnalysis
    certificates: CertificateAnalysis | null
  }
}

export interface SecurityIssue {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  recommendation: string
}

export interface SSLAnalysis {
  isSecure: boolean
  protocol: string
  cipher: string
  certificateValid: boolean
  certificateExpiry: string | null
  issues: string[]
}

export interface SecurityHeadersAnalysis {
  score: number
  headers: {
    [key: string]: {
      present: boolean
      value?: string
      recommendation?: string
    }
  }
}

export interface VulnerabilityAnalysis {
  knownVulnerabilities: string[]
  outdatedSoftware: string[]
  exposedPorts: number[]
  suspiciousPatterns: string[]
}

export interface CertificateAnalysis {
  issuer: string
  subject: string
  validFrom: string
  validTo: string
  signatureAlgorithm: string
  keySize: number
  isWildcard: boolean
}

export function getSeverityColor(severity: SecurityIssue["severity"]): string {
  switch (severity) {
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "low":
      return "text-blue-600 bg-blue-50 border-blue-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  if (score >= 50) return "text-orange-600"
  return "text-red-600"
}

export function getScoreGrade(score: number): string {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}
