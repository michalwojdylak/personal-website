# michalwojdylak.com

Personal website and technical blog of **Michał Wojdylak**, AI Infrastructure
Engineer. Built as a fast, minimal, content-first site for an engineering
audience and recruiters.

> Building production AI systems, LLM infrastructure, inference platforms and
> cloud-native ML solutions.

## Tech stack

- **[Next.js 15](https://nextjs.org/)** - App Router, React Server Components
- **TypeScript** - strict mode
- **Tailwind CSS** - with `@tailwindcss/typography`
- **MDX** - blog posts as local files via `next-mdx-remote`
- **rehype-pretty-code** + **Shiki** - build-time syntax highlighting
- **next-themes** - system-aware dark mode
- Static generation wherever possible - optimized for the **Vercel Free Plan**

## Features

- 🏠 Home with hero, featured posts, and featured projects
- 📝 Blog with client-side **search**, **tags**, **reading time**, and dates
- 📄 Blog posts with **syntax highlighting**, **copy code button**, **table of
  contents**, **prev/next navigation**, and full **SEO metadata**
- 🧩 Projects grid (title, description, technologies, GitHub link)
- 👤 About page with a categorized **skills** section
- ✉️ Contact page with email / GitHub / LinkedIn
- 🌗 Dark mode (no flash, system preference aware)
- 🔎 SEO: metadata, Open Graph, dynamic OG images, `sitemap.xml`, `robots.txt`,
  **RSS feed**
- ⚡ Static rendering, image optimization, Lighthouse-friendly

## Project structure

```
.
├── content/
│   └── blog/                  # Blog posts as .mdx files (add new posts here)
│       ├── first-post.mdx
│       ├── optimizing-gpu-inference-costs.mdx
│       └── building-mlops-platform-kubernetes.mdx
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, fonts, metadata, theme provider
│   │   ├── page.tsx           # Home
│   │   ├── globals.css        # Tailwind + theme tokens + code styling
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog index (search + tags)
│   │   │   └── [slug]/page.tsx# Blog post (MDX, TOC, prev/next, SEO)
│   │   ├── projects/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/og/route.tsx   # Dynamic Open Graph images
│   │   ├── rss.xml/route.ts   # RSS feed
│   │   ├── sitemap.ts         # sitemap.xml
│   │   ├── robots.ts          # robots.txt
│   │   ├── icon.svg           # Favicon
│   │   └── not-found.tsx
│   ├── components/            # Reusable UI components
│   └── lib/
│       ├── site-config.ts     # Single source of truth for site metadata
│       ├── posts.ts           # MDX reading, frontmatter, reading time, TOC
│       ├── projects.ts        # Project showcase data
│       ├── tags.ts            # Tag labels and topic/tech kinds
│       └── utils.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Local development

Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Production build
npm run build && npm run start

# Lint
npm run lint
```

## Adding a blog post

Create a new `.mdx` file in `content/blog/`. The filename becomes the URL slug
(e.g. `my-post.mdx` → `/blog/my-post`). Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
description: "A one-or-two sentence summary used for cards and SEO."
date: "2026-06-20"
tags: ["llm-inference", "benchmarks", "vllm"]
published: true
author: "Michał Wojdylak"
---

Your content here. Standard Markdown + MDX components are supported.

## A heading

Headings become table-of-contents entries automatically.

\`\`\`python
print("Code blocks get syntax highlighting and a copy button.")
\`\`\`
```

- Reading time is calculated automatically.
- Set `published: false` to hide a draft from the site, RSS, and sitemap.
- `tags` are slugs from `src/lib/tags.ts`, which gives each one a readable label and a kind: `topic` tags (2-3 per post) drive the blog filter, `tech` tags name the tools used. Add new slugs there. Any tag links to `/blog?tag=<slug>`.

## Adding a project

Edit `src/lib/projects.ts` and add an entry to the `projects` array. Set
`featured: true` to surface it on the home page.

## Personalizing the site

Most content lives in a few places:

- `src/lib/site-config.ts` - name, role, description, URL, email, social links,
  navigation.
- `src/app/about/page.tsx` - bio and skills categories.
- `src/lib/projects.ts` - projects.
- Theme colors - CSS variables in `src/app/globals.css`.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js - no configuration needed. Click **Deploy**.
4. Add your custom domain `michalwojdylak.com` under **Settings → Domains** and
   update the DNS records as instructed.

Everything runs comfortably within the **Vercel Free (Hobby) Plan**. After the
first deploy, set the production URL in `src/lib/site-config.ts` (`url`) so
absolute SEO links, OG images, the sitemap, and RSS feed resolve correctly.

## Future-proof architecture

The structure is intentionally simple and ready to grow into:

- **Benchmark dashboards** & **interactive charts** - add client components and
  embed them directly in MDX posts.
- **AI experiment results** - store as MDX or structured data under `content/`.
- **Project case studies** - extend `src/lib/projects.ts` with detail pages.
- **Newsletter** - drop a signup component into the footer or blog.
- **Analytics** - add Vercel Analytics or Plausible in `layout.tsx`.

## License

Content © Michał Wojdylak. Code is available for reference and personal reuse.

