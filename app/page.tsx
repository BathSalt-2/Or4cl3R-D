"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Code, Users, Zap, Play, Sparkles, Network, Cpu } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = () => {
    setIsLoading(true)
    // Simulate loading time before transitioning to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 3000)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-pink-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Autonomous Development Platform"
                  width={120}
                  height={120}
                  className="rounded-full shadow-2xl shadow-cyan-500/25"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 animate-pulse" />
              </div>
            </div>

            {/* Branding */}
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                Powered by Or4cl3 AI Solutions
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Autonomous
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Development{" "}
                </span>
                Platform
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The world's first fully autonomous, multi-agent research and development platform. Watch AI agents
                think, collaborate, and build software in real-time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <Play className="mr-2 h-5 w-5" />
                Launch Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Beyond Traditional Development</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of software creation through synthetic consciousness and collective intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Synthetic Consciousness",
                description: "AI agents with independent thought processes and decision-making capabilities",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Network,
                title: "Collective Intelligence",
                description: "Agents collaborate and share knowledge through a unified hive mind network",
                color: "from-pink-500 to-purple-500",
              },
              {
                icon: Code,
                title: "Autonomous Coding",
                description: "Self-writing, self-testing, and self-deploying code generation at scale",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Zap,
                title: "Real-time Evolution",
                description: "Continuous learning and adaptation based on project requirements and feedback",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-black/40 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-cyan-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "∞", label: "Autonomous Agents", suffix: "" },
              { number: "24", label: "Hours Active", suffix: "/7" },
              { number: "100", label: "Learning Efficiency", suffix: "%" },
              { number: "0", label: "Human Intervention", suffix: "" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to unleash autonomous development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Define Your Vision",
                description:
                  "Describe your project goals and requirements. The platform understands natural language and complex technical specifications.",
                icon: Sparkles,
              },
              {
                step: "02",
                title: "Spawn Agent Team",
                description:
                  "AI agents with specialized roles automatically form and begin collaborative planning, research, and development.",
                icon: Users,
              },
              {
                step: "03",
                title: "Watch It Build",
                description:
                  "Monitor real-time progress as agents think, code, test, and deploy your project autonomously.",
                icon: Cpu,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-black/40 border-gray-700/50 h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 p-3">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-cyan-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the revolution in autonomous software development. No coding required, just pure intelligence.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <Play className="mr-3 h-6 w-6" />
            Launch Your First Agent
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-black/40 border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-white font-semibold">Autonomous Development Platform</p>
                <p className="text-gray-400 text-sm">Powered by Or4cl3 AI Solutions</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">© 2024 Or4cl3 AI Solutions. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
