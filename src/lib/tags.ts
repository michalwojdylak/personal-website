/**
 * Tag registry. Posts reference tags by slug in their frontmatter; this file
 * gives each slug a readable label and a kind:
 *
 * - "topic": what the post is about. Shown as the blog filter.
 * - "tech": a tool, platform or technique used in the post.
 *
 * Unknown slugs fall back to the slug itself as a "tech" tag, so add new tags
 * here when you use them in a post.
 */

export type TagKind = "topic" | "tech";

export interface TagInfo {
  slug: string;
  label: string;
  kind: TagKind;
}

const registry: Record<string, Omit<TagInfo, "slug">> = {
  // Topics
  "llm-inference": { label: "LLM Inference", kind: "topic" },
  "model-serving": { label: "Model Serving", kind: "topic" },
  rag: { label: "RAG & Retrieval", kind: "topic" },
  benchmarks: { label: "Benchmarks", kind: "topic" },
  "cost-optimization": { label: "Cost Optimization", kind: "topic" },

  // Tools, platforms and techniques
  vllm: { label: "vLLM", kind: "tech" },
  sglang: { label: "SGLang", kind: "tech" },
  "tensorrt-llm": { label: "TensorRT-LLM", kind: "tech" },
  triton: { label: "Triton Inference Server", kind: "tech" },
  quantization: { label: "Quantization", kind: "tech" },
  "agentic-rag": { label: "Agentic RAG", kind: "tech" },
  graphrag: { label: "GraphRAG", kind: "tech" },
  opensearch: { label: "OpenSearch", kind: "tech" },
  aws: { label: "AWS", kind: "tech" },
  azure: { label: "Azure", kind: "tech" },
  gcp: { label: "GCP", kind: "tech" },
};

export function getTag(slug: string): TagInfo {
  const info = registry[slug];
  return info ? { slug, ...info } : { slug, label: slug, kind: "tech" };
}

/** Topics first (in registry order), then tech tags. */
export function sortTags(slugs: string[]): TagInfo[] {
  const order = Object.keys(registry);
  const rank = (tag: TagInfo) =>
    (tag.kind === "topic" ? 0 : 1000) +
    (order.includes(tag.slug) ? order.indexOf(tag.slug) : 999);
  return slugs.map(getTag).sort((a, b) => rank(a) - rank(b));
}

export function tagHref(slug: string): string {
  return `/blog?tag=${encodeURIComponent(slug)}`;
}
