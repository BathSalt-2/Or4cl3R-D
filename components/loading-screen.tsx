"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Network, Code, Users, Sparkles } from "lucide-react"
import Image from "next/image"

const loadingSteps = [
  { icon: Brain, text: "Initializing synthetic consciousness...", duration: 500 },
  { icon: Network, text: "Establishing neural networks...", duration: 600 },
  { icon: Users, text: "Spawning autonomous agents...", duration: 700 },
  { icon: Code, text: "Calibrating development protocols...", duration: 500 },
  { icon: Zap, text: "Activating collective intelligence...", duration: 600 },
  { icon: Sparkles, text: "Platform ready for autonomous development", duration: 400 },
]

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    let stepIndex = 0
    let progressValue = 0

    const interval = setInterval(() => {
      if (stepIndex < loadingSteps.length) {
        setCurrentStep(stepIndex)

        const stepProgress = ((stepIndex + 1) / loadingSteps.length) * 100
        const progressInterval = setInterval(() => {
          progressValue += 2
          setProgress(Math.min(progressValue, stepProgress))

          if (progressValue >= stepProgress) {
            clearInterval(progressInterval)
            stepIndex++
          }
        }, loadingSteps[stepIndex].duration / 50)
      } else {
        clearInterval(interval)
      }
    }, loadingSteps[currentStep]?.duration || 500)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = loadingSteps[currentStep]?.icon || Brain

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: "3s",
          }}
        />
      ))}

      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {Array.from({ length: 50 }, (_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              r="2"
              fill="url(#neuralGradient)"
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
          {Array.from({ length: 30 }, (_, i) => (
            <line
              key={i}
              x1={Math.random() * 1000}
              y1={Math.random() * 1000}
              x2={Math.random() * 1000}
              y2={Math.random() * 1000}
              stroke="url(#neuralGradient)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-4">
        {/* Logo with Glow Effect */}
        <div className="relative flex justify-center mb-8">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Loading"
              width={100}
              height={100}
              className="rounded-full shadow-2xl shadow-cyan-500/50 animate-pulse"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-pink-500/30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 animate-pulse" />
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Autonomous Development Platform</h1>
          <p className="text-cyan-300 text-sm">Powered by Or4cl3 AI Solutions</p>
        </div>

        {/* Current Step Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 p-4 animate-pulse">
            <CurrentIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <p className="text-white text-lg font-medium animate-pulse">
            {loadingSteps[currentStep]?.text || "Initializing..."}
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-gray-700" />
            <p className="text-cyan-300 text-sm">{Math.round(progress)}% Complete</p>
          </div>
        </div>

        {/* Loading Steps Indicator */}
        <div className="flex justify-center space-x-2">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-gradient-to-r from-cyan-500 to-pink-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Pulsing Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border border-cyan-500/20 rounded-full animate-ping" />
          <div
            className="absolute w-48 h-48 border border-pink-500/20 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute w-32 h-32 border border-cyan-500/30 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  )
}
