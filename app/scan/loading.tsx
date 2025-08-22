import { Shield } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mx-auto animate-pulse">
          <Shield className="h-6 w-6 text-primary-foreground" />
        </div>
        <p className="font-manrope text-muted-foreground">Loading WebInspect...</p>
      </div>
    </div>
  )
}
