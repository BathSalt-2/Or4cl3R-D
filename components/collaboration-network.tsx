"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network } from "lucide-react"

interface Agent {
  id: string
  name: string
  x: number
  y: number
  connections: string[]
}

export function CollaborationNetwork({ agents }: { agents: Agent[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)"
      ctx.lineWidth = 1

      agents.forEach((agent) => {
        agent.connections.forEach((connId) => {
          const connectedAgent = agents.find((a) => a.id === connId)
          if (connectedAgent) {
            ctx.beginPath()
            ctx.moveTo(agent.x, agent.y)
            ctx.lineTo(connectedAgent.x, connectedAgent.y)
            ctx.stroke()
          }
        })
      })

      // Draw agents
      agents.forEach((agent) => {
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, 8, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
        ctx.fill()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Agent name
        ctx.fillStyle = "white"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(agent.name, agent.x, agent.y + 20)
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [agents])

  return (
    <Card className="bg-black/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Network className="h-5 w-5 text-purple-400" />
          Agent Network Topology
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} width={400} height={300} className="w-full h-64 bg-black/30 rounded" />
      </CardContent>
    </Card>
  )
}
