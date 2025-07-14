"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import portfolioData from "@/data/portfolio.json";

export function Projects() {
  const { projects } = portfolioData;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold sm:text-5xl">Featured Projects</h2>
          <p className="mt-4 text-xl text-zinc-300">Some of my recent work</p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group glass-card glass-texture relative overflow-hidden rounded-xl shadow-2xl transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="relative aspect-video overflow-hidden">
                {!imageErrors[project.id] ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-8">
                    <h3 className="text-center text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="p-6">
                <p className="text-zinc-300">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-interactive flex-1 rounded-lg py-2 text-center font-medium"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-interactive flex-1 rounded-lg border-blue-500/30 bg-blue-600/20 py-2 text-center font-medium"
                  >
                    Live Demo
                  </a>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                {project.featured && (
                  <div className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    Featured
                  </div>
                )}
                {project.status === "ongoing" && (
                  <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    Ongoing
                  </div>
                )}
                {project.status === "completed" && (
                  <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                    Completed
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
