import type { Project } from "@/lib/projects";
import { GitHubIcon } from "@/components/social-links";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          {project.title}
        </h3>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

