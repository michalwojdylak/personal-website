import Link from "next/link";
import type { Project } from "@/lib/projects";
import { GitHubIcon } from "@/components/social-links";

/** `compact` drops the description and keeps the headline result. */
export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
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

      {!compact && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}

      <div className="flex-1">
        {project.highlight && (
          <p className="mt-3 border-l-2 border-accent pl-3 text-sm leading-relaxed">
            {project.highlight}
          </p>
        )}
      </div>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {project.technologies.join(" · ")}
      </p>

      {project.post && (
        <Link
          href={`/blog/${project.post}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          Read the write-up <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}
