import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import portfolioData from "@/data/portfolio.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const requestSchema = z.object({
  command: z.string(),
  query: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const { command, query } = requestSchema.parse(body);

    const portfolioContext = `
Portfolio Data:
Name: ${portfolioData.personal.name}
Title: ${portfolioData.personal.title}
Bio: ${portfolioData.personal.bio}

Skills:
Frontend: ${portfolioData.skills.frontend.map((s) => `${s.name} (${s.level}%)`).join(", ")}
Backend: ${portfolioData.skills.backend.map((s) => `${s.name} (${s.level}%)`).join(", ")}
Tools: ${portfolioData.skills.tools.map((s) => `${s.name} (${s.level}%)`).join(", ")}

Projects:
${portfolioData.projects.map((p) => `${p.title}: ${p.description} (Tech: ${p.tech.join(", ")})`).join("\n")}

Experience:
${portfolioData.experience.map((e) => `${e.position} at ${e.company} (${e.duration}): ${e.description}`).join("\n")}
`;

    let prompt = "";
    let sectionToNavigate = "";

    switch (command) {
      case "skills":
        prompt = `Based on the portfolio data, discuss the skills in detail. Return a JSON response with format: {"response": "comprehensive skill discussion", "section": "skills", "highlight": ""}`;
        sectionToNavigate = "skills";
        break;

      case "projects":
        prompt = `Based on the portfolio data, discuss the projects in detail. Return a JSON response with format: {"response": "comprehensive project discussion", "section": "projects", "highlight": ""}`;
        sectionToNavigate = "projects";
        break;

      case "experience":
        prompt = `Based on the portfolio data, discuss the experience in detail. Return a JSON response with format: {"response": "comprehensive experience discussion", "section": "experience", "highlight": ""}`;
        sectionToNavigate = "experience";
        break;

      case "summary":
        prompt = `Create a concise summary of this developer's profile based on the portfolio data. Return a JSON response with format: {"response": "professional summary", "section": "hero", "highlight": ""}`;
        sectionToNavigate = "hero";
        break;

      case "contact":
        prompt = `Provide contact information and encourage reaching out. Return a JSON response with format: {"response": "contact details and invitation", "section": "contact", "highlight": ""}`;
        sectionToNavigate = "contact";
        break;

      default:
        prompt = `Answer the query "${query}" based on the portfolio context. Return a JSON response with format: {"response": "answer", "section": "hero", "highlight": ""}`;
        sectionToNavigate = "hero";
    }

    const fullPrompt = `${portfolioContext}\n\n${prompt}`;

    // Add timeout to AI generation
    const generateWithTimeout = Promise.race([
      model.generateContent(fullPrompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("AI request timeout")), 8000),
      ),
    ]);

    const result = await generateWithTimeout;
    const response = (result as { response: { text: () => Promise<string> } })
      .response;
    const text = await response.text();

    // Try to parse as JSON, fallback to plain text
    let aiResponse: {
      response: string;
      section: string;
      highlight: string;
    };

    try {
      aiResponse = JSON.parse(text) as {
        response: string;
        section: string;
        highlight: string;
      };
    } catch {
      aiResponse = {
        response: text,
        section: sectionToNavigate || "",
        highlight: "",
      };
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error processing command:", error);

    return NextResponse.json(
      {
        response:
          "AI service is currently unavailable. Please try again later.",
        section: "hero",
        highlight: "",
      },
      { status: 503 },
    );
  }
}
