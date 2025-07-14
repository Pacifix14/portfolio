"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Education() {
  const { education } = portfolioData;

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
          <h2 className="text-4xl font-bold sm:text-5xl">Education</h2>
          <p className="mt-4 text-xl text-zinc-300">My academic journey</p>
        </motion.div>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute top-0 left-8 h-full w-0.5 bg-zinc-700/50 md:left-1/2 md:-translate-x-0.5 md:transform" />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative mb-12 ml-16 md:ml-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <div className="absolute top-6 -left-12 h-4 w-4 rounded-full border-2 border-zinc-800 bg-zinc-600 md:-left-2 md:left-1/2 md:-translate-x-1/2 md:transform" />

              <div
                className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:ml-auto md:pl-8"}`}
              >
                <div className="glass-card glass-texture relative rounded-xl p-6 shadow-2xl">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-zinc-300">{edu.institution}</p>
                    {edu.specialization && (
                      <p className="text-md text-zinc-400">
                        Specialization: {edu.specialization}
                      </p>
                    )}
                    <p className="text-sm text-zinc-400">
                      {edu.duration} • {edu.location}
                    </p>
                  </div>

                  <p className="mb-4 text-zinc-300">{edu.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-zinc-300">Highlights:</h4>
                    <ul className="space-y-1 text-sm text-zinc-300">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
