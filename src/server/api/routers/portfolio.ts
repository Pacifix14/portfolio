import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import portfolioData from "@/data/portfolio.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const portfolioRouter = createTRPCRouter({
  contact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: Send email or save to database
      console.log("Contact form submission:", input);
      return {
        success: true,
        message: "Thank you for your message!",
      };
    }),

  chat: publicProcedure
    .input(
      z.object({
        command: z.string(),
        query: z.string(),
      }),
    )
    .subscription(({ input }) => {
      return observable<{
        content: string;
        done: boolean;
        section: string;
        highlight: string;
      }>((emit) => {
        const processChat = async () => {
          try {
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

            switch (input.command) {
              case "skills":
                prompt = `Based on the portfolio data, discuss the skills in detail. Use markdown formatting for better readability. Include headers, bullet points, and code blocks where appropriate.`;
                sectionToNavigate = "skills";
                break;

              case "projects":
                prompt = `Based on the portfolio data, discuss the projects in detail. Use markdown formatting with headers, bullet points, and code blocks for technologies used.`;
                sectionToNavigate = "projects";
                break;

              case "experience":
                prompt = `Based on the portfolio data, discuss the experience in detail. Use markdown formatting with headers and bullet points.`;
                sectionToNavigate = "experience";
                break;

              case "summary":
                prompt = `Create a concise summary of this developer's profile based on the portfolio data. Use markdown formatting with headers and bullet points.`;
                sectionToNavigate = "hero";
                break;

              case "contact":
                prompt = `Provide contact information and encourage reaching out. Use markdown formatting.`;
                sectionToNavigate = "contact";
                break;

              default:
                prompt = `Answer the query "${input.query}" based on the portfolio context. Use markdown formatting for better readability.`;
                sectionToNavigate = "hero";
            }

            const fullPrompt = `${portfolioContext}\n\n${prompt}`;

            const result = await model.generateContentStream(fullPrompt);

            for await (const chunk of result.stream) {
              const chunkText = chunk.text();

              emit.next({
                content: chunkText,
                done: false,
                section: sectionToNavigate,
                highlight: "",
              });
            }

            emit.next({
              content: "",
              done: true,
              section: sectionToNavigate,
              highlight: "",
            });

            emit.complete();
          } catch (error) {
            emit.error(error);
          }
        };

        void processChat();
      });
    }),
});
