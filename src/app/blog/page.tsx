import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getTagCounts } from "@/lib/posts";
import { PageHeader } from "@/components/page-header";
import { BlogSearch } from "@/components/blog-search";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on AI infrastructure, LLM deployment, MLOps, inference optimization, and cloud-native machine learning systems.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tagCounts = getTagCounts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader
        title="Blog"
        description="Benchmarks and deep dives on LLM inference, retrieval, and serving models in production. Every post comes with the code to reproduce it."
      />
      <div className="mt-8">
        {/* useSearchParams in BlogSearch needs a Suspense boundary for static rendering. */}
        <Suspense>
          <BlogSearch posts={posts} tagCounts={tagCounts} />
        </Suspense>
      </div>
    </div>
  );
}
