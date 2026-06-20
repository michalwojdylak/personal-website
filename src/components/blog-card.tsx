import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/tag";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

