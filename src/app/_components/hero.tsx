"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Hero() {
  const { personal } = portfolioData;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <motion.h1
          className="text-6xl font-extrabold tracking-tight sm:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white">{personal.name}</span>
        </motion.h1>

        <motion.h2
          className="mt-6 text-2xl font-medium text-blue-400 sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {personal.title}
        </motion.h2>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg text-zinc-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personal.bio}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive rounded-full px-6 py-3 font-semibold"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive rounded-full border-blue-500/30 bg-blue-600/20 px-6 py-3 font-semibold"
          >
            LinkedIn
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive rounded-full border-zinc-700/50 bg-zinc-800/50 px-6 py-3 font-semibold"
          >
            Resume
          </a>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-sm text-zinc-500">
            Ask me anything using the chat interface below or press{" "}
            <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-1">
              /
            </kbd>{" "}
            for quick commands
          </p>
        </motion.div>
      </div>
    </div>
  );
}
