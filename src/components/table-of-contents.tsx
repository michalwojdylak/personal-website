"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%", threshold: 1.0 },
    );

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-semibold text-foreground">On this page</p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? 16 : 0 }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 pl-3 transition-colors",
                activeId === item.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

