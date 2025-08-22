"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2, Calendar, Award, Shield } from "lucide-react"
import { useState } from "react"

interface Credential {
  id: number
  title: string
  issuer: string
  issueDate: string
  expiryDate: string
  credentialId: string
  status: string
  type: string
  description: string
  skills: string[]
}

export default function ViewCredentialsPage() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [sharingId, setSharingId] = useState<number | null>(null)

  const credentials: Credential[] = [
    {
      id: 1,
      title: "Website Security Certification",
      issuer: "Digital Security Institute",
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
      credentialId: "WSC-2024-001",
      status: "Active",
      type: "Security",
      description: "Comprehensive website security analysis and vulnerability assessment certification.",
      skills: ["Security Auditing", "Vulnerability Assessment", "Risk Management"],
    },
    {
      id: 2,
      title: "Performance Optimization Expert",
      issuer: "Web Performance Academy",
      issueDate: "2024-02-20",
      expiryDate: "2025-02-20",
      credentialId: "POE-2024-002",
      status: "Active",
      type: "Performance",
      description: "Advanced certification in website performance optimization and speed enhancement.",
      skills: ["Core Web Vitals", "Performance Monitoring", "Speed Optimization"],
    },
    {
      id: 3,
      title: "SEO Analytics Professional",
      issuer: "Search Engine Institute",
      issueDate: "2024-03-10",
      expiryDate: "2025-03-10",
      credentialId: "SAP-2024-003",
      status: "Active",
      type: "SEO",
      description: "Professional certification in search engine optimization and analytics.",
      skills: ["Technical SEO", "Analytics", "Search Optimization"],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Security":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Performance":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      case "SEO":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Security":
        return <Shield className="w-4 h-4" />
      case "Performance":
        return <Award className="w-4 h-4" />
      case "SEO":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  const handleDownload = async (credential: Credential) => {
    setDownloadingId(credential.id)

    try {
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${credential.title} - Certificate</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { 
              font-family: 'Inter', sans-serif; 
              margin: 0; 
              padding: 32px; 
              background: #f3f4f6; 
            }
            .certificate {
              width: 800px;
              height: 600px;
              background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
              border: 2px solid rgba(6, 182, 212, 0.2);
              position: relative;
              overflow: hidden;
              margin: 0 auto;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .bg-pattern {
              position: absolute;
              inset: 0;
              opacity: 0.05;
              background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 25%,
                rgba(6, 182, 212, 0.1) 25%,
                rgba(6, 182, 212, 0.1) 50%,
                transparent 50%,
                transparent 75%,
                rgba(6, 182, 212, 0.1) 75%
              );
              background-size: 20px 20px;
            }
            .header {
              position: relative;
              z-index: 10;
              text-align: center;
              padding-top: 48px;
              padding-bottom: 32px;
            }
            .badge {
              background: #eab308;
              color: #000;
              font-weight: 600;
              padding: 8px 16px;
              font-size: 14px;
              margin-bottom: 24px;
              display: inline-block;
              border-radius: 4px;
            }
            .main-title {
              font-size: 36px;
              font-weight: 700;
              color: white;
              margin-bottom: 8px;
            }
            .cyan-text { color: #06b6d4; }
            .yellow-text { color: #eab308; }
            .divider {
              width: 96px;
              height: 4px;
              background: linear-gradient(to right, #06b6d4, #eab308);
              margin: 0 auto;
            }
            .content {
              position: relative;
              z-index: 10;
              padding: 0 64px;
              text-align: center;
            }
            .subtitle {
              color: #d1d5db;
              font-size: 18px;
              margin-bottom: 32px;
            }
            .recipient-name {
              font-size: 28px;
              font-weight: 600;
              color: white;
              margin-bottom: 32px;
              border-bottom: 2px solid rgba(6, 182, 212, 0.3);
              padding-bottom: 16px;
              display: inline-block;
              padding-left: 32px;
              padding-right: 32px;
            }
            .course-title {
              font-size: 24px;
              font-weight: 600;
              color: #06b6d4;
              margin-bottom: 24px;
            }
            .skills-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 8px;
              margin-bottom: 32px;
            }
            .skill-badge {
              border: 1px solid rgba(234, 179, 8, 0.5);
              color: #eab308;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 14px;
            }
            .footer {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 32px;
            }
            .footer-content {
              display: flex;
              justify-content: space-between;
              align-items: end;
            }
            .signature-line {
              width: 128px;
              height: 2px;
              background: #9ca3af;
              margin-bottom: 8px;
            }
            .footer-text {
              font-size: 14px;
              color: #9ca3af;
            }
            .footer-name {
              font-size: 14px;
              font-weight: 600;
              color: white;
            }
            .seal {
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #06b6d4, #eab308);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 8px;
            }
            .seal-inner {
              width: 48px;
              height: 48px;
              background: #111827;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .seal-text {
              color: #06b6d4;
              font-weight: 700;
              font-size: 12px;
            }
            .corner {
              position: absolute;
              width: 32px;
              height: 32px;
              border: 2px solid rgba(6, 182, 212, 0.5);
            }
            .corner-tl { top: 16px; left: 16px; border-right: none; border-bottom: none; }
            .corner-tr { top: 16px; right: 16px; border-left: none; border-bottom: none; }
            .corner-bl { bottom: 16px; left: 16px; border-right: none; border-top: none; }
            .corner-br { bottom: 16px; right: 16px; border-left: none; border-top: none; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="bg-pattern"></div>
            
            <div class="header">
              <div class="badge">Professional Certificate</div>
              <h1 class="main-title">
                Certificate of <span class="cyan-text">Digital</span> <span class="yellow-text">Excellence</span>
              </h1>
              <div class="divider"></div>
            </div>

            <div class="content">
              <p class="subtitle">This is to certify that</p>
              <h2 class="recipient-name">Certificate Holder</h2>
              <p class="subtitle">has successfully completed the</p>
              <h3 class="course-title">${credential.title}</h3>
              <p class="subtitle">demonstrating proficiency in the following areas:</p>
              <div class="skills-container">
                ${credential.skills.map((skill) => `<span class="skill-badge">${skill}</span>`).join("")}
              </div>
            </div>

            <div class="footer">
              <div class="footer-content">
                <div>
                  <div class="signature-line"></div>
                  <p class="footer-text">Authorized Signature</p>
                  <p class="footer-name">${credential.issuer}</p>
                </div>
                <div style="text-align: center;">
                  <div class="seal">
                    <div class="seal-inner">
                      <span class="seal-text">CERT</span>
                    </div>
                  </div>
                  <p class="footer-text" style="font-size: 12px;">Official Seal</p>
                </div>
                <div style="text-align: right;">
                  <p class="footer-text">Issue Date</p>
                  <p class="footer-name">${new Date(credential.issueDate).toLocaleDateString()}</p>
                  <p class="footer-text" style="font-size: 12px; margin-top: 8px;">ID: ${credential.credentialId}</p>
                </div>
              </div>
            </div>

            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
          </div>
        </body>
        </html>
      `

      // Create and download the HTML file
      const blob = new Blob([certificateHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${credential.title.replace(/\s+/g, "_")}_Certificate.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloadingId(null)
    }
  }

  const handleShare = async (credential: Credential) => {
    setSharingId(credential.id)

    try {
      const shareData = {
        title: credential.title,
        text: `I've earned the ${credential.title} certification from ${credential.issuer}!`,
        url: `${window.location.origin}/credentials/${credential.id}`,
      }

      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback to copying to clipboard
        const shareText = `${shareData.text}\n\nView credential: ${shareData.url}`
        await navigator.clipboard.writeText(shareText)

        // Show a simple alert (in a real app, you'd use a toast notification)
        alert("Credential link copied to clipboard!")
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Share failed:", error)
        // Fallback: copy to clipboard
        try {
          const fallbackText = `Check out my ${credential.title} certification from ${credential.issuer}!`
          await navigator.clipboard.writeText(fallbackText)
          alert("Credential info copied to clipboard!")
        } catch (clipboardError) {
          console.error("Clipboard fallback failed:", clipboardError)
        }
      }
    } finally {
      setSharingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20">
            <Award className="w-4 h-4 mr-2" />
            Professional Credentials
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your <span className="text-cyan-400">Digital</span> <span className="text-yellow-400">Credentials</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            View and manage your professional certifications, achievements, and credentials. Download certificates,
            share your accomplishments, and track expiration dates.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Verified credentials
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Instant downloads
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Shareable certificates
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => (
              <Card
                key={credential.id}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getTypeColor(credential.type)} flex items-center gap-1`}>
                      {getTypeIcon(credential.type)}
                      {credential.type}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-400/20">
                      {credential.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{credential.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{credential.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Issued: {new Date(credential.issueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Expires: {new Date(credential.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">ID: {credential.credentialId}</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Skills Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {credential.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                      onClick={() => handleDownload(credential)}
                      disabled={downloadingId === credential.id}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloadingId === credential.id ? "Downloading..." : "Download"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleShare(credential)}
                      disabled={sharingId === credential.id}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {sharingId === credential.id ? "Sharing..." : "Share"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for More Credentials */}
          <Card className="mt-6 bg-card/30 backdrop-blur-sm border-border/50 border-dashed">
            <CardContent className="py-12 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Earn More Credentials</h3>
              <p className="text-muted-foreground mb-4">
                Complete more assessments and audits to earn additional professional credentials.
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Start New Assessment</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
