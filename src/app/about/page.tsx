import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Michał Wojdylak — AI Infrastructure Engineer focused on production AI systems, LLM infrastructure, inference platforms, and cloud-native ML.",
};

const skills: { category: string; items: string[] }[] = [
  {
    category: "AI Infrastructure",
    items: [
      "GPU cluster orchestration",
      "Distributed training",
      "Model serving",
      "Autoscaling inference",
    ],
  },
  {
    category: "AWS",
    items: ["EKS", "SageMaker", "EC2 / GPU instances", "S3", "Lambda", "IAM"],
  },
  {
    category: "LLM Deployment",
    items: ["vLLM", "TGI", "Triton Inference Server", "Quantization", "KV caching"],
  },
  {
    category: "MLOps",
    items: ["MLflow", "Kubeflow", "CI/CD for models", "Feature stores", "Model registry"],
  },
  {
    category: "Computer Vision",
    items: ["PyTorch", "ONNX", "TensorRT", "Real-time pipelines", "Edge deployment"],
  },
  {
    category: "Cloud Architecture",
    items: ["Kubernetes", "Terraform", "Docker", "Service mesh", "Observability"],
  },
  {
    category: "Inference Optimization",
    items: [
      "Batching & streaming",
      "Latency tuning",
      "Throughput scaling",
      "Cost optimization",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader title="About" />

      <section className="prose prose-neutral mt-8 dark:prose-invert">
        <p>
          I&apos;m Michał Wojdylak, an AI Infrastructure Engineer who builds and
          operates the systems that take machine learning from notebooks to
          reliable, scalable production services. My work sits at the
          intersection of machine learning, distributed systems, and cloud
          infrastructure.
        </p>
        <p>
          I focus on the parts of AI that have to work at 3am: serving large
          language models with predictable latency, designing inference
          platforms that scale with demand, optimizing GPU utilization and
          cost, and building the MLOps tooling that lets teams ship models
          safely and often.
        </p>
        <p>
          I care about clean architecture, observability, reproducibility, and
          systems that are simple to reason about. This blog is where I share
          what I learn building production AI infrastructure.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-mono text-sm font-semibold text-accent">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

