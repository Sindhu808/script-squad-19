"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Shield, Lock, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const bankingMetrics = [
  { name: "Encryption", current: 85, ideal: 100, category: "Security" },
  { name: "Authentication", current: 78, ideal: 100, category: "Security" },
  { name: "Data Protection", current: 92, ideal: 100, category: "Security" },
  { name: "Load Time", current: 65, ideal: 95, category: "Performance" },
  { name: "Transaction Speed", current: 88, ideal: 100, category: "Performance" },
  { name: "Uptime", current: 99.2, ideal: 99.9, category: "Reliability" },
  { name: "Compliance", current: 94, ideal: 100, category: "Regulatory" },
]

const securityIssues = [
  { severity: "Critical", count: 2, color: "#EF4444" },
  { severity: "High", count: 5, color: "#F97316" },
  { severity: "Medium", count: 12, color: "#EAB308" },
  { severity: "Low", count: 8, color: "#22C55E" },
]

const complianceData = [
  { standard: "PCI DSS", status: "Compliant", score: 98 },
  { standard: "SOX", status: "Compliant", score: 95 },
  { standard: "GDPR", status: "Partial", score: 87 },
  { standard: "ISO 27001", status: "Non-Compliant", score: 72 },
]

export default function BankingScanPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleScan = async () => {
    if (!url) return
    setIsScanning(true)
    // Simulate scanning
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsScanning(false)
    setShowResults(true)
  }

  const chartConfig = {
    current: {
      label: "Current Score",
      color: "#06B6D4",
    },
    ideal: {
      label: "Target Score",
      color: "#EAB308",
    },
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold">
              Banking App <span className="text-cyan-400">Security</span>{" "}
              <span className="text-yellow-400">Analyzer</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="bg-yellow-500 text-black font-semibold px-4 py-2 mb-6">
              Banking-Grade Security Analysis
            </Badge>

            <h2 className="text-4xl font-bold mb-6">
              Comprehensive <span className="text-cyan-400">Banking App</span>{" "}
              <span className="text-yellow-400">Security Audit</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Specialized analysis for banking applications focusing on security, compliance, performance, and
              regulatory requirements. Get detailed insights into encryption, authentication, data protection, and
              financial industry standards.
            </p>

            <div className="flex gap-4 mb-8">
              <Input
                placeholder="Enter banking app URL (e.g., https://yourbank.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                onClick={handleScan}
                disabled={!url || isScanning}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8"
              >
                {isScanning ? "Scanning..." : "Start Security Audit"}
              </Button>
            </div>

            {isScanning && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
                <p className="text-cyan-400">Analyzing banking security protocols...</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="flex items-center gap-3 text-cyan-400">
                <Shield className="h-5 w-5" />
                <span>Advanced Security Scanning</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-400">
                <Lock className="h-5 w-5" />
                <span>Compliance Verification</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-400">
                <Zap className="h-5 w-5" />
                <span>Performance Analysis</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Banking Security Score</CardTitle>
                <CardDescription>Overall security and compliance assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">87</div>
                    <div className="text-sm text-gray-400">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">92</div>
                    <div className="text-sm text-gray-400">Security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">84</div>
                    <div className="text-sm text-gray-400">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">89</div>
                    <div className="text-sm text-gray-400">Compliance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Banking Metrics Analysis</CardTitle>
                <CardDescription>Current vs Target Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bankingMetrics}>
                      <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                                <p className="text-white font-semibold">{payload[0]?.payload?.name}</p>
                                <p className="text-cyan-400">Current: {payload[0]?.value}%</p>
                                <p className="text-yellow-400">Target: {payload[1]?.value}%</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="current" fill="#06B6D4" />
                      <Bar dataKey="ideal" fill="#EAB308" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Security Issues */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Security Issues Breakdown</CardTitle>
                <CardDescription>Identified vulnerabilities by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {securityIssues.map((issue, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-800">
                      <div className="text-2xl font-bold mb-2" style={{ color: issue.color }}>
                        {issue.count}
                      </div>
                      <div className="text-sm text-gray-400">{issue.severity}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Regulatory Compliance</CardTitle>
                <CardDescription>Banking industry standards compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800">
                      <div className="flex items-center gap-3">
                        {item.status === "Compliant" ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : item.status === "Partial" ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className="font-semibold text-white">{item.standard}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={item.score} className="w-24" />
                        <span className="text-sm text-gray-400">{item.score}%</span>
                        <Badge
                          variant={
                            item.status === "Compliant"
                              ? "default"
                              : item.status === "Partial"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
