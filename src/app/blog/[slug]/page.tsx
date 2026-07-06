import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getTableOfContents,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";
import { Mdx } from "@/components/mdx";
import { Tag } from "@/components/tag";
import { TableOfContents } from "@/components/table-of-contents";
import { GitHubIcon } from "@/components/social-links";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statically generate a page for every post at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageParams = new URLSearchParams({ title: post.title });
  if (post.heroImage) {
    ogImageParams.set("heroImage", `${siteConfig.url}${post.heroImage}`);
  }
  const ogImage = `/api/og?${ogImageParams.toString()}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.published === false) notFound();

  const toc = getTableOfContents(post.content);
  const { previous, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article className="min-w-0 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">←</span> Back to blog
          </Link>

          <header className="mt-6 border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
            )}
          </header>

          {post.heroImage && (
            <div className="mt-8">
              <Image
                src={post.heroImage}
                alt={post.title}
                width={800}
                height={400}
                className="w-full rounded-lg object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-neutral mt-8 dark:prose-invert">
            <Mdx source={post.content} />
          </div>

          {/* Previous / Next navigation */}
          {(previous || next) && (
            <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
                >
                  <span className="text-xs text-muted-foreground">
                    ← Previous
                  </span>
                  <p className="mt-1 font-medium transition-colors group-hover:text-accent">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-accent/50 sm:col-start-2"
                >
                  <span className="text-xs text-muted-foreground">Next →</span>
                  <p className="mt-1 font-medium transition-colors group-hover:text-accent">
                    {next.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {post.repo && (
              <div>
                <h4 className="text-sm font-semibold tracking-tight">
                  Code Repository
                </h4>
                <a
                  href={post.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                >
                  <GitHubIcon className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            )}
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}

