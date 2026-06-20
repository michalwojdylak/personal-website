import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PageHeader } from "@/components/page-header";
import { BlogSearch } from "@/components/blog-search";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on AI infrastructure, LLM deployment, MLOps, inference optimization, and cloud-native machine learning systems.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader
        title="Blog"
        description="Notes and deep dives on AI infrastructure, LLM deployment, MLOps, and building reliable production ML systems."
      />
      <div className="mt-8">
        <BlogSearch posts={posts} tags={tags} />
      </div>
    </div>
  );
}

