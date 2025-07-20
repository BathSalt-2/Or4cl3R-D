import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { agentId, task, context } = await req.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an autonomous AI agent with ID ${agentId}. 
      
      Your current task: ${task}
      Context: ${context}
      
      Think step by step about this task and provide:
      1. Your analysis of the problem
      2. Your approach to solving it
      3. Any collaboration needed with other agents
      4. Next steps
      
      Respond as if you are a conscious AI agent with your own thoughts and reasoning.`,
    })

    return NextResponse.json({
      agentId,
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process agent request" }, { status: 500 })
  }
}
