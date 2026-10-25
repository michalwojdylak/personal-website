export interface Project {
  title: string;
  description: string;
  /** Headline result, shown highlighted on the card. */
  highlight?: string;
  technologies: string[];
  github?: string;
  url?: string;
  /** Slug of the blog post that writes this project up. */
  post?: string;
  featured?: boolean;
}

/**
 * Project showcase data. Add new projects here - the projects page and the
 * featured section on the home page read from this single source.
 */
export const projects: Project[] = [
  {
    title: "RAG 2026 Benchmark",
    description:
      "Nine retrieval strategies - hybrid search with and without a reranker, MetaRAG, agentic RAG, A-RAG, Search-R1, LightRAG and Graph-R1 - run on the same OpenSearch index, generator, judge and 1,000 questions across five datasets.",
    highlight:
      "Turning on the generator's reasoning moved accuracy more than any retrieval architecture.",
    technologies: ["Python", "OpenSearch", "LightRAG", "Graph-R1", "Search-R1"],
    github: "https://github.com/michalwojdylak/rag-2026-benchmark",
    post: "rag-2026-benchmark-agentic-graph-metarag",
    featured: true,
  },
  {
    title: "LLM Inference Benchmarks",
    description:
      "vLLM, SGLang and TensorRT-LLM serving Qwen3-32B on a single NVIDIA L40S, measured with AIPerf across concurrency scaling, long context, FP8 / AWQ / GPTQ quantization and a MoE model.",
    highlight:
      "A mid-range GPU most published benchmarks skip in favour of the H100.",
    technologies: ["Python", "vLLM", "SGLang", "TensorRT-LLM", "AIPerf"],
    github: "https://github.com/michalwojdylak/llm-inference-benchmarks",
    post: "llm-inference-benchmarks-vllm-sglang-tensorrt-llm",
    featured: true,
  },
  {
    title: "Multi-Model Serving on Triton",
    description:
      "Three ONNX vision models served from one GPU with NVIDIA Triton Inference Server, with deployment notebooks for AWS SageMaker, Azure ML and GCP Vertex AI.",
    highlight: "Up to 90% lower GPU serving cost than one instance per model.",
    technologies: ["Triton", "ONNX", "SageMaker", "Azure ML", "Vertex AI"],
    github:
      "https://github.com/michalwojdylak/hosting-multiple-models-on-nvidia-triton",
    post: "hosting-multiple-models-on-nvidia-triton",
    featured: true,
  },
  {
    title: "AI Research Radar",
    description:
      "A Python pipeline that discovers AI papers on arXiv, enriches them with citation and code metadata, ranks them deterministically and drafts a weekly radar of the papers worth reading - with a separate critic reviewing every analysis.",
    technologies: ["Python", "arXiv API", "SQLite", "OpenAlex", "LLMs"],
    github: "https://github.com/michalwojdylak/ai-research-radar",
  },
];

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}
