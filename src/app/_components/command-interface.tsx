"use client";

import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";

type AIResponse = {
  response: string;
  section: string;
  highlight: string;
};

export function CommandInterface() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setAiResponse(null);
        setInputValue("");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Add a subtle highlight effect
      element.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";
      setTimeout(() => {
        if (element.style) {
          element.style.boxShadow = "";
        }
      }, 2000);
    }
  };

  const processAICommand = async (input: string) => {
    if (!input.trim()) return;

    setIsLoading(true);
    setAiResponse(null);

    try {
      // Parse command and query
      const parts = input.trim().split(" ");
      const command = parts[0]?.toLowerCase() ?? "";
      const query = parts.slice(1).join(" ");

      const response = await fetch("/api/portfolio-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command, query }),
      });

      if (!response.ok) {
        throw new Error("Failed to process command");
      }

      const data = (await response.json()) as AIResponse;
      setAiResponse(data);

      // Auto-scroll to the relevant section
      if (data.section) {
        setTimeout(() => {
          scrollToSection(data.section);
        }, 500);
      }
    } catch (error) {
      console.error("Error processing AI command:", error);
      setAiResponse({
        response: "Sorry, I encountered an error processing your request.",
        section: "hero",
        highlight: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      void processAICommand(inputValue);
      setInputValue("");
    }
  };

  const quickCommands = [
    {
      id: "hero",
      label: "Go to Hero",
      description: "Navigate to the hero section",
      action: () => {
        scrollToSection("hero");
        setOpen(false);
      },
    },
    {
      id: "skills",
      label: "View Skills",
      description: "See my technical skills and expertise",
      action: () => {
        scrollToSection("skills");
        setOpen(false);
      },
    },
    {
      id: "projects",
      label: "Browse Projects",
      description: "Check out my featured projects",
      action: () => {
        scrollToSection("projects");
        setOpen(false);
      },
    },
    {
      id: "experience",
      label: "Work Experience",
      description: "View my professional background",
      action: () => {
        scrollToSection("experience");
        setOpen(false);
      },
    },
    {
      id: "contact",
      label: "Contact Me",
      description: "Get in touch for opportunities",
      action: () => {
        scrollToSection("contact");
        setOpen(false);
      },
    },
  ];

  const aiCommands = [
    {
      command: "skills",
      example: "skills react",
      description: "Ask about specific skills",
    },
    {
      command: "projects",
      example: "projects ecommerce",
      description: "Find relevant projects",
    },
    {
      command: "experience",
      example: "experience startup",
      description: "Search work history",
    },
    {
      command: "summary",
      example: "summary",
      description: "Get a profile overview",
    },
    {
      command: "contact",
      example: "contact",
      description: "Get contact information",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(false);
              setAiResponse(null);
              setInputValue("");
            }}
          />

          <motion.div
            className="glass-card glass-texture relative w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Input Section */}
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center rounded-lg bg-zinc-800/50 px-4 py-3">
                <span className="mr-2 font-mono text-blue-400">/</span>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInputSubmit();
                    }
                  }}
                  placeholder="Ask about skills, projects, experience... (e.g., 'skills react' or 'summary')"
                  className="flex-1 border-0 bg-transparent text-white placeholder-gray-400 outline-none"
                  autoFocus
                />
                {isLoading && (
                  <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                )}
              </div>
            </div>

            {/* AI Response Section */}
            {aiResponse && (
              <motion.div
                className="border-b border-gray-700 bg-blue-950/20 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-medium text-blue-300">
                      AI Response:
                    </p>
                    <p className="leading-relaxed text-white">
                      {aiResponse.response}
                    </p>
                    {aiResponse.section && (
                      <p className="mt-2 text-xs text-gray-400">
                        → Navigated to {aiResponse.section} section
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Commands Section */}
            <div className="max-h-80 overflow-y-auto">
              <Command className="w-full">
                <Command.List className="p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-400">
                    No results found.
                  </Command.Empty>

                  {/* Quick Navigation */}
                  <Command.Group heading="Quick Navigation">
                    {quickCommands.map((command) => (
                      <Command.Item
                        key={command.id}
                        value={command.label}
                        onSelect={() => command.action()}
                        className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-700/50 data-[selected]:bg-zinc-700/50"
                      >
                        <div className="flex flex-col">
                          <span className="text-white">{command.label}</span>
                          <span className="text-xs text-gray-400">
                            {command.description}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* AI Commands */}
                  <Command.Group heading="AI Commands">
                    {aiCommands.map((cmd) => (
                      <Command.Item
                        key={cmd.command}
                        value={cmd.example}
                        onSelect={() => {
                          setInputValue(cmd.example);
                          setTimeout(() => {
                            void processAICommand(cmd.example);
                            setInputValue("");
                          }, 100);
                        }}
                        className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-700/50 data-[selected]:bg-zinc-700/50"
                      >
                        <div className="flex flex-col">
                          <span className="font-mono text-white">
                            {cmd.example}
                          </span>
                          <span className="text-xs text-gray-400">
                            {cmd.description}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </div>

            <div className="border-t border-gray-700 px-4 py-2 text-xs text-gray-400">
              Press{" "}
              <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1">
                Enter
              </kbd>{" "}
              to submit,{" "}
              <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1">
                ESC
              </kbd>{" "}
              to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
