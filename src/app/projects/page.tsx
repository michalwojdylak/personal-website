import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source benchmarks and tools by Michał Wojdylak: RAG strategies, LLM inference engines, multi-model GPU serving and AI research tracking.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader
        title="Projects"
        description="Open-source benchmarks and tools. Each one is reproducible from its repository, and most have a write-up on the blog."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
