import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Session breaks — each divider glows in the INCOMING section's
          accent so the visitor always feels one session end and the
          next begin. */}
      <SectionDivider accent="sky" />
      <About />
      <SectionDivider accent="emerald" />
      <Experience />
      <SectionDivider accent="violet" />
      <Projects />
      <SectionDivider accent="amber" />
      <Skills />
      <SectionDivider accent="rose" />
      <Achievements />
      <SectionDivider accent="cyan" />
      <Contact />
    </>
  );
}
