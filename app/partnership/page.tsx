"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, Users, Award, Zap, Globe, CheckCircle, Mail, ArrowRight } from "lucide-react"

export default function PartnershipPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail("")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* Hero Section with Enhanced Badge Layout */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(34,197,94,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(52,211,153,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl font-black mb-20 leading-tight text-white"
            >
              Partnership <span className="text-emerald-400">Benefits</span>
            </motion.h1>

            {/* Enhanced Badge Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-6xl mx-auto mb-20"
            >
              {/* Central Badge - Enhanced */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-emerald-500/30 rounded-3xl p-12 shadow-2xl shadow-emerald-500/10">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl text-gray-300 font-light">powered by</span>
                    <img src="/images/weltivation-logo.png" alt="Weltivation" className="w-80 h-20 object-contain" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xl mb-2">Keep our badge and unlock</p>
                    <p className="text-4xl font-bold text-emerald-400 mb-2">$37,000+</p>
                    <p className="text-gray-400 text-lg">in exclusive partnership benefits</p>
                  </div>
                </div>

                {/* Floating benefit cards around the main badge */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top Left */}
                  <motion.div
                    className="absolute -top-8 -left-8 transform -rotate-12"
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">15% Discount</h3>
                          <p className="text-sm text-gray-400">Development Projects</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Save $30K+</Badge>
                    </div>
                  </motion.div>

                  {/* Top Right */}
                  <motion.div
                    className="absolute -top-8 -right-8 transform rotate-12"
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 12 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-6 h-6 text-blue-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Free Maintenance</h3>
                          <p className="text-sm text-gray-400">3 Months Included</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">$5K Value</Badge>
                    </div>
                  </motion.div>

                  {/* Left */}
                  <motion.div
                    className="absolute top-1/2 -left-12 transform -translate-y-1/2 -rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Priority Support</h3>
                          <p className="text-sm text-gray-400">24/7 VIP Access</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Enterprise</Badge>
                    </div>
                  </motion.div>

                  {/* Right */}
                  <motion.div
                    className="absolute top-1/2 -right-12 transform -translate-y-1/2 rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Globe className="w-6 h-6 text-orange-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Global CDN</h3>
                          <p className="text-sm text-gray-400">6 Months Free</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">$2K Value</Badge>
                    </div>
                  </motion.div>

                  {/* Bottom Left */}
                  <motion.div
                    className="absolute -bottom-8 -left-8 transform rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Performance</h3>
                          <p className="text-sm text-gray-400">99.9% Uptime</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Guaranteed</Badge>
                    </div>
                  </motion.div>

                  {/* Bottom Right */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 transform -rotate-6"
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 shadow-lg min-w-[200px]">
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="w-6 h-6 text-indigo-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white">Flexible Badge</h3>
                          <p className="text-sm text-gray-400">Remove Anytime</p>
                        </div>
                      </div>
                      <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">No Strings</Badge>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-green-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-green-600/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Display our badge on your website and gain access to premium partnership benefits worth over{" "}
              <span className="text-emerald-400 font-bold">$37,000</span>. No long-term commitments, remove anytime
              after project completion.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-emerald-400">Partner?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join our partnership program and start saving on your next project
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 sm:p-12"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Apply for Partnership</h3>
                  <p className="text-gray-400">Enter your email to get started with our partnership program</p>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 text-lg"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Apply for Partnership</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  By applying, you agree to display our badge and receive partnership benefits.
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We've received your partnership application. Our team will contact you within 24 hours with next
                  steps.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
