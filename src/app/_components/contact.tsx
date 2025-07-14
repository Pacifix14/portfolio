"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Contact() {
  const { personal } = portfolioData;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold sm:text-5xl">Get In Touch</h2>
          <p className="mt-4 text-xl text-zinc-300">
            Have a project in mind? Let&apos;s talk!
          </p>
        </motion.div>

        <motion.div
          className="mt-16 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-4 text-3xl font-bold">Let&apos;s work together</h3>
          <p className="mx-auto max-w-xl text-lg text-zinc-300">
            I&apos;m always interested in new opportunities and exciting
            projects. Whether you have a question or just want to say hi, feel
            free to reach out!
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Primary Email Card */}
          <motion.a
            href={`mailto:${personal.email}`}
            className="glass-interactive group relative overflow-hidden rounded-lg p-8 transition-all duration-500 hover:scale-[1.02] md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="mb-6 text-4xl">📧</div>
              <h3 className="mb-3 text-2xl font-bold text-white">Email Me</h3>
              <p className="text-lg text-zinc-300 transition-colors group-hover:text-white">
                {personal.email}
              </p>
              <div className="mt-4 text-sm text-zinc-400">
                I typically respond within 24 hours
              </div>
            </div>
          </motion.a>

          {/* Location Card */}
          <motion.div
            className="glass-interactive group relative overflow-hidden rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-6 text-4xl">📍</div>
            <h3 className="mb-3 text-xl font-bold text-white">Based in</h3>
            <p className="text-lg text-zinc-300">{personal.location}</p>
            <div className="mt-4 text-sm text-zinc-400">
              Available for remote work
            </div>
          </motion.div>

          {/* Resume Card */}
          <motion.a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive group relative overflow-hidden rounded-lg p-8 transition-all duration-500 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/5 to-zinc-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="mb-6 text-4xl">📄</div>
              <h3 className="mb-3 text-xl font-bold text-white">Resume</h3>
              <p className="text-lg text-zinc-300 transition-colors group-hover:text-white">
                Download PDF
              </p>
              <div className="mt-4 text-sm text-zinc-400">
                View my experience
              </div>
            </div>
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="mt-16 flex justify-center space-x-6">
          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive group flex items-center space-x-3 rounded-full px-6 py-3 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-xl">🐙</span>
            <span>GitHub</span>
          </motion.a>

          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-interactive rounded-full border-blue-500/30 bg-blue-600/20 px-6 py-3 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="mr-2 text-xl">💼</span>
            LinkedIn
          </motion.a>
        </div>

        {/* Footer Text */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-zinc-500">
            © 2024 {personal.name}. Built with Next.js and lots of ☕
          </p>
        </motion.div>
      </div>
    </div>
  );
}
