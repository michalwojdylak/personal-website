import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { SocialLinks } from "@/components/social-links";
import { BlogCard } from "@/components/blog-card";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const posts = getFeaturedPosts(3);
  const projects = getFeaturedProjects(3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="font-mono text-sm text-accent">{siteConfig.role}</p>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <SocialLinks />
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            More about me
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Featured posts */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All posts →
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}
      </section>

      {/* Featured projects */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

