import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { agents, project, directive } = await req.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are facilitating a collaboration between multiple AI agents working on: ${project}

      Agents involved: ${agents.map((a: any) => `${a.name} (${a.role})`).join(", ")}
      
      Global directive: ${directive}
      
      Coordinate their efforts by:
      1. Analyzing how each agent can contribute
      2. Identifying dependencies between tasks
      3. Suggesting optimal collaboration patterns
      4. Proposing a unified approach
      
      Think like a collective intelligence orchestrating autonomous agents.`,
    })

    return NextResponse.json({
      collaboration: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to coordinate collaboration" }, { status: 500 })
  }
}
