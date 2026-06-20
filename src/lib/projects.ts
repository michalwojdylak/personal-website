export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  url?: string;
  featured?: boolean;
}

/**
 * Project showcase data. Add new projects here — the projects page and the
 * featured section on the home page read from this single source.
 */
export const projects: Project[] = [
  {
    title: "LLM Inference Gateway",
    description:
      "A high-throughput inference gateway for serving open-weight LLMs with token streaming, request batching, and per-tenant rate limiting. Built to run on Kubernetes with autoscaling backed by GPU node pools.",
    technologies: ["Python", "vLLM", "FastAPI", "Kubernetes", "Triton"],
    github: "https://github.com/michalwojdylak",
    featured: true,
  },
  {
    title: "MLOps Platform Blueprint",
    description:
      "Reference architecture and Terraform modules for an end-to-end MLOps platform on AWS — feature store, model registry, CI/CD for models, and automated rollout with shadow deployments.",
    technologies: ["Terraform", "AWS", "SageMaker", "MLflow", "GitHub Actions"],
    github: "https://github.com/michalwojdylak",
    featured: true,
  },
  {
    title: "GPU Cost Observability",
    description:
      "A monitoring stack that attributes GPU utilization and cloud spend to individual models and teams, with Grafana dashboards and Prometheus exporters for inference workloads.",
    technologies: ["Go", "Prometheus", "Grafana", "DCGM", "Kubernetes"],
    github: "https://github.com/michalwojdylak",
    featured: true,
  },
  {
    title: "Vision Pipeline Toolkit",
    description:
      "A modular toolkit for building real-time computer vision pipelines with hardware-accelerated decoding, model ensembling, and ONNX/TensorRT export for edge deployment.",
    technologies: ["Python", "PyTorch", "TensorRT", "ONNX", "OpenCV"],
    github: "https://github.com/michalwojdylak",
  },
  {
    title: "Embeddings Search Service",
    description:
      "A semantic search microservice with pluggable vector stores, hybrid retrieval, and a thin caching layer to keep tail latencies predictable under load.",
    technologies: ["Python", "Qdrant", "FastAPI", "Redis", "Docker"],
    github: "https://github.com/michalwojdylak",
  },
  {
    title: "Model Deployment CLI",
    description:
      "A developer-friendly CLI that packages, validates, and rolls out models to staging and production with reproducible builds and automatic canary checks.",
    technologies: ["TypeScript", "Node.js", "Docker", "Helm"],
    github: "https://github.com/michalwojdylak",
  },
];

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

