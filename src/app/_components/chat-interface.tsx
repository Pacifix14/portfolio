"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "./typewriter-text";

type ChatMessage = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type AIResponse = {
  response: string;
  section: string;
  highlight: string;
};

type ChatInterfaceProps = {
  onNavigateToSection?: (sectionId: string) => void;
};

export function ChatInterface({ onNavigateToSection }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const placeholderTexts = [
    "Tell me about your React skills...",
    "What projects have you built?",
    "Give me a summary of your experience...",
    "Show me your frontend expertise...",
    "How many years of TypeScript experience?",
    "What's your background in full-stack development?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processAICommand = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Parse command and query from natural language
      let command = "";
      let query = input;

      // Smart command detection
      if (
        input.includes("skill") ||
        input.includes("technology") ||
        input.includes("tech")
      ) {
        command = "skills";
        query = input
          .replace(
            /(tell me about|show me|what about|skills?|technology|tech)/gi,
            "",
          )
          .trim();
      } else if (
        input.includes("project") ||
        input.includes("built") ||
        input.includes("work")
      ) {
        command = "projects";
        query = input
          .replace(/(what|show me|tell me about|projects?|built|work)/gi, "")
          .trim();
      } else if (
        input.includes("experience") ||
        input.includes("background") ||
        input.includes("worked")
      ) {
        command = "experience";
        query = input
          .replace(
            /(tell me about|show me|what's|experience|background|worked)/gi,
            "",
          )
          .trim();
      } else if (
        input.includes("summary") ||
        input.includes("overview") ||
        input.includes("about you")
      ) {
        command = "summary";
        query = "";
      } else if (
        input.includes("contact") ||
        input.includes("reach") ||
        input.includes("email")
      ) {
        command = "contact";
        query = "";
      } else {
        command = "general";
      }

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

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Auto-scroll to relevant section
      if (data.section && onNavigateToSection) {
        setTimeout(() => {
          onNavigateToSection(data.section);
        }, 1000);
      }
    } catch (error) {
      console.error("Error processing AI command:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I encountered an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      void processAICommand(inputValue);
      setInputValue("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (messages.length === 0) {
      setIsExpanded(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-40 w-full max-w-3xl -translate-x-1/2 px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="glass-card glass-texture relative rounded-2xl shadow-2xl">
        {/* Chat Messages */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="max-h-80 overflow-y-auto border-b border-gray-700/50 p-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {messages.length === 0 ? (
                <div className="text-center text-gray-400">
                  <p className="text-sm">Ask me anything about my portfolio!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.isUser
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl bg-zinc-800 px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="mt-4 text-xs text-gray-500 transition-colors hover:text-gray-400"
                >
                  Clear conversation
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex items-end space-x-3">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder=""
                className="w-full resize-none rounded-xl border-0 bg-zinc-800/50 px-4 py-3 pr-12 text-white placeholder-transparent focus:bg-zinc-800/70 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                rows={1}
                style={{ minHeight: "52px", maxHeight: "120px" }}
              />

              {/* Animated Placeholder */}
              {!isFocused && !inputValue && (
                <div className="pointer-events-none absolute top-3 left-4 text-gray-400">
                  <TypewriterText
                    texts={placeholderTexts}
                    speed={60}
                    pauseTime={3000}
                    isActive={!isFocused && !inputValue}
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 bottom-2 rounded-lg bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Press{" "}
            <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1">
              Enter
            </kbd>{" "}
            to send,{" "}
            <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1">
              Shift+Enter
            </kbd>{" "}
            for new line
          </p>
        </form>
      </div>
    </motion.div>
  );
}
