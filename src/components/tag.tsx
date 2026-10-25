import Link from "next/link";
import { getTag, tagHref } from "@/lib/tags";
import { cn } from "@/lib/utils";

/**
 * A post tag. Topics render as pills, tools/platforms as plain mono labels.
 * Links to the blog filtered by this tag unless `href` is set to false.
 */
export function Tag({
  slug,
  href = true,
  active = false,
  count,
}: {
  slug: string;
  href?: boolean;
  active?: boolean;
  count?: number;
}) {
  const tag = getTag(slug);
  const className = cn(
    "inline-flex items-center gap-1.5 text-xs font-medium transition-colors",
    tag.kind === "topic"
      ? cn(
          "rounded-full border px-2.5 py-0.5",
          active
            ? "border-accent bg-accent/10 text-accent"
            : "border-border bg-muted/50 text-muted-foreground hover:text-foreground",
        )
      : cn(
          "rounded px-1.5 py-0.5 font-mono",
          active
            ? "bg-accent/10 text-accent"
            : "text-muted-foreground hover:text-foreground",
        ),
  );

  const content = (
    <>
      {tag.kind === "tech" && <span aria-hidden="true">#</span>}
      {tag.label}
      {count !== undefined && (
        <span className="tabular-nums opacity-60">{count}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={tagHref(slug)} className={className}>
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}
