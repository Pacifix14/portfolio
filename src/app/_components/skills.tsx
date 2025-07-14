"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Skills() {
  const { skills } = portfolioData;

  const skillCategories = [
    { title: "Frontend", skills: skills.frontend, color: "blue" },
    { title: "Backend", skills: skills.backend, color: "green" },
    { title: "Tools", skills: skills.tools, color: "purple" },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500/10 border-blue-500/20 text-blue-300";
      case "green":
        return "bg-green-500/10 border-green-500/20 text-green-300";
      case "purple":
        return "bg-purple-500/10 border-purple-500/20 text-purple-300";
      default:
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-300";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold sm:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-xl text-zinc-300">
            Technologies I work with regularly
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-card glass-texture relative rounded-xl p-6 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="mb-6 text-2xl font-semibold">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-zinc-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full border border-zinc-700/30 bg-zinc-800/50">
                      <motion.div
                        className={`h-full rounded-full border ${getColorClasses(category.color)}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
