import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published?: boolean;
  author?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

/** Return all `.mdx` filenames (without extension) in the blog directory. */
function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Read and parse a single post by slug. */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published ?? true,
    author: frontmatter.author,
    readingTime: stats.text,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    content,
  };
}

/** Return all published posts sorted by date (newest first). */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((post) => {
      const { content, ...meta } = post;
      void content;
      return meta;
    });
}

/** Return the N most recent posts. */
export function getFeaturedPosts(limit = 3): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

/** Return a unique, sorted list of all tags across posts. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    post.tags.forEach((tag) => tags.add(tag));
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

/** Find adjacent posts for previous/next navigation. */
export function getAdjacentPosts(slug: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    // Newer post (appears earlier in the array).
    next: index > 0 ? posts[index - 1] : null,
    // Older post (appears later in the array).
    previous: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Extract a table of contents from markdown headings (h2 + h3). */
export function getTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}


