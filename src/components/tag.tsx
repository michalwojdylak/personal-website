import Link from "next/link";
import { cn } from "@/lib/utils";

export function Tag({
  name,
  href,
  active = false,
}: {
  name: string;
  href?: string;
  active?: boolean;
}) {
  const className = cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
    active
      ? "border-accent bg-accent/10 text-accent"
      : "border-border bg-muted/50 text-muted-foreground hover:text-foreground",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
}

