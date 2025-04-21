import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { GoogleGenAI } from "@google/genai";
import { CohereClient } from "cohere-ai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAG0YixgcBuRXM2gceCeyqXV8egXZYhHzo",
});



export async function GET() {
    return Response.json(
      {
        success: true,
        error: "Thank you ",
      },
      {
        status: 200,
      }
    );
  
}


export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY!,
    });

    const { text: questionsText } = await cohere.chat({
      model: "command",
      message: `
        Generate ${amount} job interview questions for a ${level} ${role} developer.
        Tech stack: ${techstack}.
        Focus: ${type} questions (behavioral and/or technical).
        Do NOT include any introduction or explanation — return only a JSON array of questions like:
        ["Question 1", "Question 2", "Question 3"]
        Avoid using any special characters that might break a voice assistant.
      `,
    });

    // Extract and parse valid JSON even if it's wrapped in markdown/code block
    const extractJsonFromCodeBlock = (text: string): string => {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      return match ? match[1] : text;
    };

    let parsedQuestions: string[] = [];

    try {
      const cleanText = extractJsonFromCodeBlock(questionsText || "");
      parsedQuestions = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse Cohere response:", questionsText);
      return Response.json(
        {
          success: false,
          error: "Cohere returned invalid JSON. Please try again.",
          raw: questionsText,
        },
        { status: 500 }
      );
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interview);

    return Response.json(
      {
        success: true,
        interviewId: docRef.id,
        questions: parsedQuestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
