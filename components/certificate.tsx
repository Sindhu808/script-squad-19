import { Badge } from "@/components/ui/badge"

interface CertificateProps {
  credential: {
    id: string
    title: string
    issuer: string
    issueDate: string
    expiryDate: string
    skills: string[]
    credentialId: string
    status: string
  }
  recipientName?: string
}

export function Certificate({ credential, recipientName = "John Doe" }: CertificateProps) {
  return (
    <div className="w-[800px] h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-cyan-400/20 relative overflow-hidden print:shadow-none">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.1)_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <Badge className="bg-yellow-500 text-black font-semibold px-4 py-2 text-sm mb-6">
          Professional Certificate
        </Badge>
        <h1 className="text-4xl font-bold text-white mb-2">
          Certificate of <span className="text-cyan-400">Digital</span>{" "}
          <span className="text-yellow-400">Excellence</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-16 text-center">
        <p className="text-gray-300 text-lg mb-8">This is to certify that</p>

        <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-cyan-400/30 pb-4 inline-block px-8">
          {recipientName}
        </h2>

        <p className="text-gray-300 text-lg mb-4">has successfully completed the</p>

        <h3 className="text-2xl font-semibold text-cyan-400 mb-6">{credential.title}</h3>

        <p className="text-gray-300 mb-6">demonstrating proficiency in the following areas:</p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {credential.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="border-yellow-400/50 text-yellow-400">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-yellow-400 rounded-full flex items-center justify-center mb-2 mx-auto">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">CERT</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">Official Seal</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <div className="w-32 h-0.5 bg-gray-400 mb-2" />
            <p className="text-sm text-gray-400">Authorized Signature</p>
            <p className="text-sm font-semibold text-white">{credential.issuer}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Issue Date</p>
            <p className="text-sm font-semibold text-white">{credential.issueDate}</p>
            <p className="text-xs text-gray-400 mt-2">ID: {credential.credentialId}</p>
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  )
}
