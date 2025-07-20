"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Activity } from "lucide-react"

interface ConsciousnessProps {
  agentId: string
  name: string
  thoughts: string[]
  performance: number
  status: string
}

export function AgentConsciousness({ agentId, name, thoughts, performance, status }: ConsciousnessProps) {
  const [currentThought, setCurrentThought] = useState(0)
  const [consciousnessLevel, setConsciousnessLevel] = useState(75)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length)
      setConsciousnessLevel((prev) => Math.min(100, prev + Math.random() * 5 - 2))
    }, 2000)

    return () => clearInterval(interval)
  }, [thoughts.length])

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          {name} Consciousness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Consciousness Level</span>
            <span className="text-white">{consciousnessLevel.toFixed(1)}%</span>
          </div>
          <Progress value={consciousnessLevel} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400" />
            <span className="text-sm text-purple-200">Current Thought</span>
          </div>
          <div className="bg-black/30 rounded p-3 min-h-[60px] flex items-center">
            <p className="text-white text-sm animate-pulse">{thoughts[currentThought] || "Processing..."}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
            {status}
          </Badge>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-yellow-200">Thinking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
