import { type NextRequest, NextResponse } from "next/server"
import { analyzeAccessibility } from "@/lib/accessibility-utils"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const analysisResult = await analyzeAccessibility(url)

    return NextResponse.json({
      success: true,
      data: analysisResult,
    })
  } catch (error) {
    console.error("Accessibility analysis failed:", error)
    return NextResponse.json({ error: "Failed to analyze accessibility" }, { status: 500 })
  }
}
