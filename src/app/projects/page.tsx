import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of projects across AI infrastructure, LLM inference, MLOps tooling, and cloud-native machine learning systems.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader
        title="Projects"
        description="Selected work across AI infrastructure, inference platforms, and MLOps tooling. Most are open source — explore the code on GitHub."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

