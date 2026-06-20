import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/copy-button";

/**
 * Custom component mapping for MDX content.
 * Passed to next-mdx-remote's <MDXRemote /> renderer.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={alt}
      loading="lazy"
      className="rounded-lg border border-border"
      {...props}
    />
  ),
  Image,
  pre: Pre,
};

