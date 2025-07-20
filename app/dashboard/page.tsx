"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code, Users, Zap, Plus, MessageSquare, GitBranch, Search, Lightbulb, Cpu, Network } from "lucide-react"
import Image from "next/image"

interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "thinking" | "idle" | "collaborating"
  avatar: string
  capabilities: string[]
  currentTask: string
  performance: number
  thoughts: string[]
}

interface Project {
  id: string
  name: string
  description: string
  progress: number
  agents: string[]
  status: "planning" | "development" | "testing" | "deployed"
  lastUpdate: string
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Architect",
      role: "System Designer",
      status: "thinking",
      avatar: "AR",
      capabilities: ["System Design", "Architecture Planning", "Tech Stack Selection"],
      currentTask: "Designing microservices architecture for e-commerce platform",
      performance: 94,
      thoughts: [
        "Analyzing scalability requirements...",
        "Considering event-driven architecture patterns",
        "Evaluating database sharding strategies",
      ],
    },
    {
      id: "2",
      name: "CodeGen",
      role: "Full-Stack Developer",
      status: "active",
      avatar: "CG",
      capabilities: ["Frontend Development", "Backend APIs", "Database Design"],
      currentTask: "Implementing user authentication system",
      performance: 87,
      thoughts: [
        "Writing JWT authentication middleware",
        "Implementing OAuth2 integration",
        "Setting up rate limiting",
      ],
    },
    {
      id: "3",
      name: "Researcher",
      role: "AI Research Specialist",
      status: "collaborating",
      avatar: "RS",
      capabilities: ["Market Research", "Technology Analysis", "Trend Prediction"],
      currentTask: "Researching latest AI frameworks for recommendation engine",
      performance: 91,
      thoughts: [
        "Comparing transformer architectures",
        "Analyzing user behavior patterns",
        "Evaluating real-time inference options",
      ],
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-Commerce AI Platform",
      description: "Intelligent shopping platform with personalized recommendations",
      progress: 67,
      agents: ["1", "2", "3"],
      status: "development",
      lastUpdate: "2 minutes ago",
    },
    {
      id: "2",
      name: "Healthcare Analytics Dashboard",
      description: "Real-time patient data analysis and prediction system",
      progress: 34,
      agents: ["1", "3"],
      status: "planning",
      lastUpdate: "15 minutes ago",
    },
  ])

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [newAgentName, setNewAgentName] = useState("")
  const [newAgentRole, setNewAgentRole] = useState("")
  const [globalThought, setGlobalThought] = useState("")

  useEffect(() => {
    // Simulate real-time agent activity
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          thoughts: [
            `Processing: ${Math.random() > 0.5 ? "Analyzing code patterns" : "Optimizing algorithms"}...`,
            ...agent.thoughts.slice(0, 2),
          ],
          performance: Math.min(100, agent.performance + Math.random() * 2 - 1),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const createAgent = () => {
    if (!newAgentName || !newAgentRole) return

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: newAgentName,
      role: newAgentRole,
      status: "idle",
      avatar: newAgentName.substring(0, 2).toUpperCase(),
      capabilities: ["Learning", "Adaptation", "Collaboration"],
      currentTask: "Initializing and learning system patterns",
      performance: 75,
      thoughts: ["Bootstrapping consciousness...", "Learning from existing agents..."],
    }

    setAgents((prev) => [...prev, newAgent])
    setNewAgentName("")
    setNewAgentRole("")
  }

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "thinking":
        return "bg-cyan-500"
      case "collaborating":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full shadow-lg shadow-cyan-500/25"
            />
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">Autonomous Development Platform</h1>
              <p className="text-cyan-200 text-sm">Powered by Or4cl3 AI Solutions</p>
            </div>
          </div>
        </div>

        {/* Global Thought Input */}
        <Card className="bg-black/20 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Global Directive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Textarea
                placeholder="Give the collective consciousness a new directive..."
                value={globalThought}
                onChange={(e) => setGlobalThought(e.target.value)}
                className="bg-black/30 border-cyan-500/30 text-white placeholder:text-cyan-300"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600">
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-cyan-500/30">
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500"
            >
              <Users className="h-4 w-4 mr-2" />
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500"
            >
              <Code className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500"
            >
              <Network className="h-4 w-4 mr-2" />
              Hive Mind
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500"
            >
              <Search className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            {/* Agent Creation */}
            <Card className="bg-black/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white">Spawn New Agent</CardTitle>
                <CardDescription className="text-cyan-200">
                  Create a new autonomous agent with specialized capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Agent Name"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="bg-black/30 border-cyan-500/30 text-white placeholder:text-cyan-300"
                  />
                  <Input
                    placeholder="Specialization Role"
                    value={newAgentRole}
                    onChange={(e) => setNewAgentRole(e.target.value)}
                    className="bg-black/30 border-cyan-500/30 text-white placeholder:text-cyan-300"
                  />
                </div>
                <Button
                  onClick={createAgent}
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Spawn Agent
                </Button>
              </CardContent>
            </Card>

            {/* Active Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="bg-black/20 border-cyan-500/30 hover:border-pink-400/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                            {agent.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white text-sm">{agent.name}</CardTitle>
                          <CardDescription className="text-cyan-200 text-xs">{agent.role}</CardDescription>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} animate-pulse`} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-cyan-200">Performance</span>
                        <span className="text-white">{agent.performance.toFixed(1)}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-1" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-cyan-200">Current Task:</p>
                      <p className="text-xs text-white">{agent.currentTask}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-cyan-200">Latest Thoughts:</p>
                      <ScrollArea className="h-16">
                        {agent.thoughts.map((thought, idx) => (
                          <p key={idx} className="text-xs text-gray-300 mb-1">
                            • {thought}
                          </p>
                        ))}
                      </ScrollArea>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 2).map((cap) => (
                        <Badge key={cap} variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-200">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="bg-black/20 border-cyan-500/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{project.name}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`${
                          project.status === "development"
                            ? "bg-green-600/20 text-green-200"
                            : project.status === "planning"
                              ? "bg-cyan-600/20 text-cyan-200"
                              : "bg-gray-600/20 text-gray-200"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-cyan-200">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-cyan-200">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.agents.map((agentId) => {
                          const agent = agents.find((a) => a.id === agentId)
                          return agent ? (
                            <Avatar key={agentId} className="h-6 w-6 border-2 border-cyan-600">
                              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs">
                                {agent.avatar}
                              </AvatarFallback>
                            </Avatar>
                          ) : null
                        })}
                      </div>
                      <span className="text-xs text-cyan-200">{project.lastUpdate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-4">
            <Card className="bg-black/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="h-5 w-5 text-cyan-400" />
                  Collective Intelligence Network
                </CardTitle>
                <CardDescription className="text-cyan-200">
                  Real-time agent collaboration and knowledge sharing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-cyan-600/10 border-cyan-500/30">
                      <CardContent className="p-4 text-center">
                        <MessageSquare className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">1,247</p>
                        <p className="text-cyan-200 text-sm">Inter-agent Messages</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-pink-600/10 border-pink-500/30">
                      <CardContent className="p-4 text-center">
                        <GitBranch className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">23</p>
                        <p className="text-pink-200 text-sm">Collaborative Sessions</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-600/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <Cpu className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">94.2%</p>
                        <p className="text-green-200 text-sm">Collective IQ</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Live Collaboration Stream</h4>
                    <ScrollArea className="h-48">
                      <div className="space-y-2 text-sm">
                        <p className="text-cyan-200">
                          <span className="text-cyan-400">Architect</span> →{" "}
                          <span className="text-pink-400">CodeGen</span>: "Implementing microservices pattern for user
                          service"
                        </p>
                        <p className="text-cyan-200">
                          <span className="text-pink-400">CodeGen</span> →{" "}
                          <span className="text-green-400">Researcher</span>: "Need latest OAuth2 security patterns"
                        </p>
                        <p className="text-cyan-200">
                          <span className="text-green-400">Researcher</span> →{" "}
                          <span className="text-cyan-400">Architect</span>: "Found optimal caching strategy for user
                          sessions"
                        </p>
                        <p className="text-cyan-200">
                          <span className="text-yellow-400">System</span>: "Collective decision: Implementing Redis for
                          session management"
                        </p>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <Card className="bg-black/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="h-5 w-5 text-cyan-400" />
                  Autonomous Research Engine
                </CardTitle>
                <CardDescription className="text-cyan-200">
                  AI agents continuously research and learn from the latest developments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-cyan-600/10 border-cyan-500/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">Latest Discoveries</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-xs space-y-1">
                        <p className="text-cyan-200">• New transformer architecture reduces inference time by 40%</p>
                        <p className="text-cyan-200">• Edge computing framework for real-time AI processing</p>
                        <p className="text-cyan-200">• Breakthrough in federated learning protocols</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-pink-600/10 border-pink-500/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm">Market Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-xs space-y-1">
                        <p className="text-pink-200">• AI development tools market growing 45% YoY</p>
                        <p className="text-pink-200">• Increased demand for autonomous coding platforms</p>
                        <p className="text-pink-200">• Enterprise adoption of AI agents accelerating</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-black/90 border-cyan-500/50 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                        {selectedAgent.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">{selectedAgent.name}</CardTitle>
                      <CardDescription className="text-cyan-200">{selectedAgent.role}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedAgent(null)} className="text-white">
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-cyan-200 text-sm mb-1">Status</p>
                    <Badge className={`${getStatusColor(selectedAgent.status)} text-white`}>
                      {selectedAgent.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-cyan-200 text-sm mb-1">Performance</p>
                    <p className="text-white">{selectedAgent.performance.toFixed(1)}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-cyan-200 text-sm mb-2">Capabilities</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.capabilities.map((cap) => (
                      <Badge key={cap} variant="secondary" className="bg-cyan-600/20 text-cyan-200">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-cyan-200 text-sm mb-2">Current Task</p>
                  <p className="text-white text-sm">{selectedAgent.currentTask}</p>
                </div>

                <div>
                  <p className="text-cyan-200 text-sm mb-2">Thought Stream</p>
                  <ScrollArea className="h-32 bg-black/30 rounded p-3">
                    {selectedAgent.thoughts.map((thought, idx) => (
                      <p key={idx} className="text-gray-300 text-sm mb-2">
                        {new Date().toLocaleTimeString()}: {thought}
                      </p>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer Branding */}
        <div className="text-center py-4">
          <p className="text-cyan-300 text-sm">Powered by Or4cl3 AI Solutions</p>
        </div>
      </div>
    </div>
  )
}
