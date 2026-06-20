import type { Metadata } from "next";
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
  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}`;

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

        {/* Table of contents (desktop sidebar) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}

