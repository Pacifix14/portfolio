import { HydrateClient } from "@/trpc/server";
import { Hero } from "@/app/_components/hero";
import { Skills } from "@/app/_components/skills";
import { Projects } from "@/app/_components/projects";
import { Experience } from "@/app/_components/experience";
import { Education } from "@/app/_components/education";
import { Contact } from "@/app/_components/contact";
import { PortfolioClient } from "@/app/_components/portfolio-client";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-black text-white">
        <PortfolioClient />

        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        <section id="skills" className="min-h-screen">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen">
          <Projects />
        </section>

        <section id="experience" className="min-h-screen">
          <Experience />
        </section>

        <section id="education" className="min-h-screen">
          <Education />
        </section>

        <section id="contact" className="min-h-screen pb-32">
          <Contact />
        </section>
      </main>
    </HydrateClient>
  );
}
