"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import {
  Search,
  DollarSign,
  ExternalLink,
  Star,
  Globe,
  Smartphone,
  Package,
  Palette,
  Monitor,
  Maximize2,
  Minimize2,
  CheckCircle,
  User,
  Shield,
  Heart,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [projectLikes, setProjectLikes] = useState<{ [key: string]: { liked: boolean; disliked: boolean } }>({})

  const filters = [
    { id: "all", label: "All Projects", count: 9 },
    { id: "web", label: "Web Development", count: 6 },
    { id: "mobile", label: "Mobile Apps", count: 1 },
    { id: "product", label: "Physical Products", count: 2 },
  ]

  const projects = [
    // Top 3 projects as requested
    {
      id: "glasspatch",
      name: "GlassPatch",
      client: "GlassPatch LLC",
      category: "web",
      status: "completed",
      budget: "$95K",
      timeline: "6 months",
      completion: 100,
      rating: 5,
      description: "Bay Area glass repair service platform with mobile booking and expert technician network",
      image: "/images/glasspatch-screenshot.png",
      logo: "/images/glasspatch-logo-new.png",
      tags: ["Glass Repair", "Mobile Service", "Bay Area", "Professional"],
      metrics: {
        revenue: "$1.1M",
        users: "12K+",
        satisfaction: "97%",
      },
      featured: true,
      previewUrl: "https://glasspatch.us",
      hasLivePreview: true,
      details: {
        overview: "Professional glass repair service platform connecting customers with certified technicians.",
        features: ["Mobile booking", "Real-time tracking", "Expert network", "Insurance claims"],
        technologies: ["React", "Node.js", "Google Maps API", "Stripe"],
        team: ["Full-stack Developer", "Mobile Developer", "Business Analyst"],
        milestones: [
          { name: "Platform Architecture", date: "2023-03", status: "completed" },
          { name: "Booking System", date: "2023-05", status: "completed" },
          { name: "Technician Network", date: "2023-07", status: "completed" },
          { name: "Launch", date: "2023-08", status: "completed" },
        ],
      },
    },
    {
      id: "norams-auto",
      name: "Noram's Auto",
      client: "Noram's Electronics",
      category: "web",
      status: "completed",
      budget: "$85K",
      timeline: "5 months",
      completion: 100,
      rating: 5,
      description: "Professional auto repair website with booking system and service management for Santa Cruz",
      image: "/images/norams-auto-screenshot.png",
      logo: "/images/norams-logo-new.png",
      tags: ["Auto Services", "Booking System", "Local Business", "Reviews"],
      metrics: {
        revenue: "$650K",
        users: "8K+",
        satisfaction: "95%",
      },
      featured: true,
      previewUrl: "https://noramauto.com",
      hasLivePreview: true,
      details: {
        overview: "Complete digital solution for auto repair shop with online booking and customer management.",
        features: ["Online booking", "Service tracking", "Customer reviews", "Mobile optimization"],
        technologies: ["Next.js", "Stripe", "Google APIs", "Tailwind CSS"],
        team: ["Full-stack Developer", "UI/UX Designer", "Local SEO Specialist"],
        milestones: [
          { name: "Website Design", date: "2023-08", status: "completed" },
          { name: "Booking System", date: "2023-10", status: "completed" },
          { name: "Payment Integration", date: "2023-11", status: "completed" },
          { name: "Launch", date: "2023-12", status: "completed" },
        ],
      },
    },
    {
      id: "dreambox",
      name: "Dreambox",
      client: "Dreambox AI",
      category: "web",
      status: "completed",
      budget: "$120K",
      timeline: "6 months",
      completion: 100,
      rating: 5,
      description: "AI platform for creating cinematic episodes from scripts with automated video generation",
      image: "/images/dreambox-screenshot.png",
      logo: "/images/dreambox-logo-new.png",
      tags: ["AI", "Video Generation", "React", "Machine Learning"],
      metrics: {
        revenue: "$1.2M",
        users: "12K+",
        satisfaction: "97%",
      },
      featured: true,
      previewUrl: "https://v0-advanced-ai-video-app.vercel.app/",
      hasLivePreview: false,
      details: {
        overview:
          "Revolutionary AI platform that transforms scripts into cinematic episodes using advanced machine learning.",
        features: ["Script analysis", "Automated video generation", "Character creation", "Scene composition"],
        technologies: ["React", "Python", "TensorFlow", "AWS", "FFmpeg"],
        team: ["AI Engineer", "Frontend Developer", "Video Processing Specialist"],
        milestones: [
          { name: "AI Model Training", date: "2023-01", status: "completed" },
          { name: "Platform Development", date: "2023-03", status: "completed" },
          { name: "Video Pipeline", date: "2023-05", status: "completed" },
          { name: "Launch", date: "2023-06", status: "completed" },
        ],
      },
    },
    // Rest of the projects
    {
      id: "nicfound",
      name: "Nicfound",
      client: "Nicfound Inc.",
      category: "product",
      status: "completed",
      budget: "$150K",
      timeline: "8 months",
      completion: 100,
      rating: 5,
      description: "Smart tracking case for nicotine products with IoT integration and mobile app connectivity",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/images/nicfound-logo.png",
      tags: ["IoT", "Hardware", "Mobile App", "Cloud"],
      metrics: {
        revenue: "$2.1M",
        users: "15K+",
        satisfaction: "98%",
      },
      featured: true,
      previewUrl: "https://nicfound.com",
      hasLivePreview: true,
      details: {
        overview:
          "Revolutionary smart case that tracks nicotine product usage with precision sensors and cloud analytics.",
        features: ["Real-time tracking", "Mobile app integration", "Cloud analytics", "Battery optimization"],
        technologies: ["IoT sensors", "React Native", "AWS IoT", "Node.js"],
        team: ["Hardware Engineer", "Mobile Developer", "Cloud Architect"],
        milestones: [
          { name: "Hardware Design", date: "2023-01", status: "completed" },
          { name: "Mobile App", date: "2023-03", status: "completed" },
          { name: "Cloud Platform", date: "2023-05", status: "completed" },
          { name: "Production", date: "2023-07", status: "completed" },
        ],
      },
    },
    {
      id: "pufftrak",
      name: "Pufftrak",
      client: "Health Tech Solutions",
      category: "product",
      status: "completed",
      budget: "$200K",
      timeline: "10 months",
      completion: 100,
      rating: 5,
      description: "Advanced taper device for smoking cessation with precision control and health monitoring",
      image: "/images/pufftrak-device-1.png",
      logo: "/images/pufftrak-logo.png",
      tags: ["Medical Device", "Precision Engineering", "App Integration"],
      metrics: {
        revenue: "$1.8M",
        users: "8K+",
        satisfaction: "96%",
      },
      featured: true,
      previewUrl: "https://pufftrak.com",
      hasLivePreview: true,
      details: {
        overview:
          "Medical-grade device designed to help users gradually reduce nicotine intake with precision control.",
        features: ["Precision dosing", "Health tracking", "Progress analytics", "Medical compliance"],
        technologies: ["Precision mechanics", "Bluetooth", "React Native", "Health APIs"],
        team: ["Mechanical Engineer", "Software Developer", "Medical Consultant"],
        milestones: [
          { name: "Medical Research", date: "2022-08", status: "completed" },
          { name: "Device Design", date: "2022-12", status: "completed" },
          { name: "App Development", date: "2023-04", status: "completed" },
          { name: "FDA Approval", date: "2023-06", status: "completed" },
        ],
      },
    },
    {
      id: "motion-records",
      name: "Motion Records",
      client: "Motion Records LLC",
      category: "web",
      status: "completed",
      budget: "$110K",
      timeline: "7 months",
      completion: 100,
      rating: 5,
      description: "Full-service marketing agency platform for artists with campaign management and analytics",
      image: "/images/motion-records-screenshot.png",
      logo: "/images/motion-records-logo.png",
      tags: ["Marketing Agency", "Artists", "Campaigns", "Analytics"],
      metrics: {
        revenue: "$900K",
        users: "5K+",
        satisfaction: "96%",
      },
      featured: true,
      previewUrl: "https://v0-streamline-landing-page-gules-two.vercel.app/",
      hasLivePreview: false,
      details: {
        overview: "Comprehensive marketing agency platform designed specifically for artists of all sizes.",
        features: ["Campaign management", "Analytics dashboard", "Artist onboarding", "Success tracking"],
        technologies: ["Next.js", "React", "Analytics APIs", "CRM Integration"],
        team: ["Full-stack Developer", "Marketing Strategist", "UI/UX Designer"],
        milestones: [
          { name: "Platform Design", date: "2024-01", status: "completed" },
          { name: "Campaign Tools", date: "2024-03", status: "completed" },
          { name: "Analytics Integration", date: "2024-05", status: "completed" },
          { name: "Launch", date: "2024-07", status: "completed" },
        ],
      },
    },
    {
      id: "sperm-league",
      name: "Sperm League",
      client: "Entertainment Ventures",
      category: "web",
      status: "completed",
      budget: "$75K",
      timeline: "4 months",
      completion: 100,
      rating: 5,
      description: "Interactive racing game platform with competitive leaderboards and real-time multiplayer",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/images/sperm-league-logo.png",
      tags: ["Gaming", "Interactive", "Real-time", "Entertainment"],
      metrics: {
        revenue: "$400K",
        users: "25K+",
        satisfaction: "94%",
      },
      featured: false,
      previewUrl: "https://v0-sperm-racing-website-orpin.vercel.app/",
      hasLivePreview: false,
      details: {
        overview: "Unique interactive racing game platform featuring competitive gameplay and social features.",
        features: ["Real-time racing", "Leaderboards", "Multiplayer support", "Achievement system"],
        technologies: ["React", "WebSocket", "Node.js", "Real-time APIs"],
        team: ["Game Developer", "Frontend Developer", "Backend Engineer"],
        milestones: [
          { name: "Game Mechanics", date: "2024-03", status: "completed" },
          { name: "Multiplayer System", date: "2024-05", status: "completed" },
          { name: "UI/UX Polish", date: "2024-06", status: "completed" },
          { name: "Launch", date: "2024-07", status: "completed" },
        ],
      },
    },
    {
      id: "chatchill",
      name: "ChatChill",
      client: "ChatChill Inc.",
      category: "mobile",
      status: "completed",
      budget: "$140K",
      timeline: "7 months",
      completion: 100,
      rating: 5,
      description: "Social messaging app with advanced privacy features and interest-based community matching",
      image: "/images/chatchill-screenshot.png",
      logo: "/images/chatchill-logo-new.png",
      tags: ["Mobile App", "Social", "Privacy", "Real-time"],
      metrics: {
        revenue: "$600K",
        users: "50K+",
        satisfaction: "95%",
      },
      previewUrl: "https://chatchill.io",
      hasLivePreview: true,
      details: {
        overview: "Next-generation messaging app with focus on privacy, security, and interest-based connections.",
        features: ["End-to-end encryption", "Interest matching", "Group management", "Media sharing"],
        technologies: ["React Native", "Node.js", "Socket.io", "MongoDB"],
        team: ["Mobile Developer", "Backend Developer", "Security Engineer"],
        milestones: [
          { name: "Core Features", date: "2023-01", status: "completed" },
          { name: "Security Implementation", date: "2023-03", status: "completed" },
          { name: "Interest System", date: "2023-05", status: "completed" },
          { name: "App Store Launch", date: "2023-07", status: "completed" },
        ],
      },
    },
    {
      id: "bevel-razors",
      name: "Bevel",
      client: "Bevel Inc.",
      category: "web",
      status: "completed",
      budget: "$95K",
      timeline: "5 months",
      completion: 100,
      rating: 4,
      description: "Premium e-commerce platform and brand website for luxury shaving products and grooming essentials",
      image: "/images/bevel-screenshot.png",
      logo: "/images/bevel-logo-new.svg",
      tags: ["E-commerce", "Branding", "Premium", "Grooming"],
      metrics: {
        revenue: "$800K",
        users: "18K+",
        satisfaction: "89%",
      },
      previewUrl: "https://getbevel.com/",
      hasLivePreview: true,
      details: {
        overview:
          "Premium e-commerce experience for luxury shaving products with focus on user experience and brand storytelling.",
        features: ["Product showcase", "Subscription service", "User accounts", "Mobile optimization"],
        technologies: ["Shopify Plus", "React", "GraphQL", "Stripe"],
        team: ["E-commerce Developer", "UI/UX Designer", "Brand Strategist"],
        milestones: [
          { name: "Brand Strategy", date: "2023-02", status: "completed" },
          { name: "Platform Development", date: "2023-04", status: "completed" },
          { name: "Subscription System", date: "2023-06", status: "completed" },
          { name: "Launch", date: "2023-07", status: "completed" },
        ],
      },
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || project.category === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "product":
        return <Package className="w-4 h-4" />
      case "branding":
        return <Palette className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "in-progress":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "planning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const handleLike = (projectId: string) => {
    setProjectLikes((prev) => ({
      ...prev,
      [projectId]: {
        liked: !prev[projectId]?.liked,
        disliked: false,
      },
    }))
    console.log(`Liked project: ${projectId}`)
  }

  const handleDislike = (projectId: string) => {
    setProjectLikes((prev) => ({
      ...prev,
      [projectId]: {
        liked: false,
        disliked: !prev[projectId]?.disliked,
      },
    }))
    console.log(`Disliked project: ${projectId}`)
  }

  // Set first project as default selected
  if (!selectedProject && filteredProjects.length > 0) {
    setSelectedProject(filteredProjects[0])
  }

  // Mobile view detection
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex-1 pt-16">
          <div className="p-4">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-3 text-white">Projects</h1>
              <p className="text-sm text-gray-400">
                Explore our comprehensive portfolio of successful client projects.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    selectedFilter === filter.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Mobile Project List - Scrollable */}
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="bg-black border border-white/20 rounded-lg overflow-hidden">
                  {/* Project Header */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={project.logo || "/placeholder.svg"}
                        alt={project.name}
                        className="w-16 h-16 object-contain bg-gray-800/50 rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">{project.name}</h2>
                        <p className="text-sm text-gray-400">{project.client}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              project.status,
                            )}`}
                          >
                            {project.status === "in-progress" ? "In Progress" : "Completed"}
                          </span>
                          <span className="text-xs text-green-400 font-semibold">{project.metrics.revenue}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  </div>

                  {/* Project Preview */}
                  <div className="bg-white">
                    {project.hasLivePreview ? (
                      <iframe
                        src={project.previewUrl}
                        className="w-full h-64 border-0"
                        title={`${project.name} Preview`}
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-900 text-white">
                        <div className="text-center">
                          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">Private Project</p>
                          <p className="text-sm text-gray-500">Preview not available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                      <div className="space-y-2">
                        {project.details.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center text-gray-300 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-1">
                        {project.details.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-green-400">{project.metrics.revenue}</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-blue-400">{project.metrics.users}</div>
                        <div className="text-xs text-gray-400">Users</div>
                      </div>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-purple-400">{project.metrics.satisfaction}</div>
                        <div className="text-xs text-gray-400">Satisfaction</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      {project.hasLivePreview ? (
                        <Button
                          onClick={() => window.open(project.previewUrl, "_blank")}
                          size="sm"
                          className="flex-1 bg-primary/20 text-primary hover:bg-primary/30"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </Button>
                      ) : (
                        <Button disabled size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-500">
                          <Shield className="w-4 h-4 mr-2" />
                          Private
                        </Button>
                      )}
                      <Button
                        onClick={() => handleLike(project.id)}
                        size="sm"
                        variant="outline"
                        className={`border-gray-600 ${
                          projectLikes[project.id]?.liked ? "bg-red-500 text-white" : "text-gray-400"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDislike(project.id)}
                        size="sm"
                        variant="outline"
                        className={`border-gray-600 ${
                          projectLikes[project.id]?.disliked ? "bg-gray-700 text-white" : "text-gray-400"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex flex-1 pt-16">
          {/* Left Sidebar - Projects List */}
          <div className="w-1/4 border-r border-gray-800 bg-black overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-3 text-white">Projects</h1>
                <p className="text-sm text-gray-400">
                  Explore our comprehensive portfolio of successful client projects.
                </p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">$12M+</p>
                      <p className="text-xs text-gray-400">Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1 mb-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-2 py-1 text-xs rounded transition-all ${
                      selectedFilter === filter.id
                        ? "bg-primary/20 text-primary border border-primary/50"
                        : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Projects List */}
              <div className="space-y-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`cursor-pointer rounded-lg border transition-all duration-300 ${
                      selectedProject?.id === project.id
                        ? "bg-black border-white/30 shadow-lg"
                        : "bg-black border-white/10 hover:border-white/20 hover:shadow-md"
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-start space-x-2">
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={project.name}
                          className="w-8 h-8 object-contain bg-gray-800 rounded p-1 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white truncate text-sm">{project.name}</h3>
                            {project.featured && (
                              <span className="px-1 py-0.5 bg-primary text-black rounded text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mb-1">{project.client}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{project.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(project.category)}
                              <span className="text-xs text-gray-400">{project.category}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(project.rating)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Project Details & Preview */}
          <div className="flex-1 flex flex-col bg-black relative">
            {selectedProject ? (
              <>
                {/* Project Header */}
                <div className="border-b border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <img
                        src={selectedProject.logo || "/placeholder.svg"}
                        alt={selectedProject.name}
                        className="w-24 h-24 object-contain bg-gray-800/50 rounded-xl p-4 border border-gray-700"
                      />
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h2>
                        <p className="text-lg text-gray-400 mb-3">{selectedProject.client}</p>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                              selectedProject.status,
                            )}`}
                          >
                            {selectedProject.status === "in-progress" ? "In Progress" : "Completed"}
                          </span>
                          <span className="text-sm text-gray-400">{selectedProject.timeline}</span>
                          <span className="text-sm text-green-400 font-semibold">
                            {selectedProject.metrics.revenue}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {selectedProject.hasLivePreview && (
                        <Button
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>
                      )}
                      {selectedProject.hasLivePreview ? (
                        <Button
                          onClick={() => window.open(selectedProject.previewUrl, "_blank")}
                          size="sm"
                          className="bg-primary/20 text-primary hover:bg-primary/30"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-500 cursor-not-allowed"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Private Project
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex">
                  {/* Project Details */}
                  <div className={`${isFullscreen ? "hidden" : "w-2/5"} border-r border-gray-800 overflow-y-auto`}>
                    <div className="p-6 space-y-8">
                      {/* Overview */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.details.overview}</p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                        <div className="space-y-3">
                          {selectedProject.details.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.details.technologies.map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Team */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Team</h3>
                        <div className="space-y-2">
                          {selectedProject.details.team.map((member: string, index: number) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <User className="w-4 h-4 text-gray-400 mr-3" />
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Milestones</h3>
                        <div className="space-y-3">
                          {selectedProject.details.milestones.map((milestone: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`w-3 h-3 rounded-full mr-3 ${
                                    milestone.status === "completed" ? "bg-green-400" : "bg-gray-600"
                                  }`}
                                />
                                <span className="text-gray-300">{milestone.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">{milestone.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Metrics</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Revenue Generated</span>
                              <span className="text-green-400 font-semibold">{selectedProject.metrics.revenue}</span>
                            </div>
                          </div>
                          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Active Users</span>
                              <span className="text-blue-400 font-semibold">{selectedProject.metrics.users}</span>
                            </div>
                          </div>
                          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Satisfaction</span>
                              <span className="text-purple-400 font-semibold">
                                {selectedProject.metrics.satisfaction}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleLike(selectedProject.id)}
                          variant="outline"
                          className={`border-gray-600 ${
                            projectLikes[selectedProject.id]?.liked
                              ? "bg-red-500 text-white border-red-500"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {projectLikes[selectedProject.id]?.liked ? "Liked" : "Like"}
                        </Button>
                        <Button
                          onClick={() => handleDislike(selectedProject.id)}
                          variant="outline"
                          className={`border-gray-600 ${
                            projectLikes[selectedProject.id]?.disliked
                              ? "bg-gray-700 text-white border-gray-500"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          {projectLikes[selectedProject.id]?.disliked ? "Disliked" : "Dislike"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Project Preview */}
                  <div className={`${isFullscreen ? "w-full" : "flex-1"} bg-white`}>
                    {selectedProject.hasLivePreview ? (
                      <iframe
                        src={selectedProject.previewUrl}
                        className="w-full h-full border-0"
                        title={`${selectedProject.name} Preview`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                        <div className="text-center">
                          <Shield className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-semibold text-white mb-4">Private Project</h3>
                          <p className="text-gray-400 max-w-md">
                            This project contains confidential client information and cannot be previewed publicly.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Select a Project</h3>
                  <p className="text-gray-400">Choose a project from the list to view details and preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
