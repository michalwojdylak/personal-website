import type { Metadata } from "next";
import Link from "next/link";
import { getTagCounts } from "@/lib/posts";
import { getTag, tagHref } from "@/lib/tags";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Michał Wojdylak - AI Lead at WPP Enterprise Solutions, focused on production AI systems, LLM infrastructure, inference platforms, and cloud-native ML.",
};

/** Skill areas. `topics` link each area to the matching blog filter. */
const skills: { area: string; items: string; topics?: string[] }[] = [
  {
    area: "Inference & model serving",
    items:
      "GPU-accelerated inference platforms, NVIDIA Triton Inference Server, TensorRT, ONNX Runtime, dynamic model loading, distributed serving",
    topics: ["model-serving"],
  },
  {
    area: "LLMs",
    items:
      "vLLM, SGLang, TensorRT-LLM, quantization (FP8, AWQ, GPTQ), Mixture-of-Experts models",
    topics: ["llm-inference"],
  },
  {
    area: "Retrieval & RAG",
    items:
      "Hybrid search on OpenSearch, rerankers, agentic and graph-based RAG, evaluation with LLM judges",
    topics: ["rag"],
  },
  {
    area: "Cloud",
    items:
      "AWS, Azure, GCP; low-latency real-time and cost-optimized serverless AI architectures",
    topics: ["cost-optimization"],
  },
  {
    area: "Computer vision",
    items:
      "Synthetic data generation, model training and optimization, real-time inference",
  },
  {
    area: "Backend & leadership",
    items:
      "Python, Docker, microservices with Celery, RabbitMQ and Redis; leading an AI team and working with DevOps, Product, Backend and Frontend teams",
  },
];

const experience: {
  role: string;
  company: string;
  period: string;
  points: string[];
}[] = [
  {
    role: "AI Lead",
    company: "WPP Enterprise Solutions",
    period: "Nov 2023 - present",
    points: [
      "Building high-performance AI inference platforms with GPU acceleration, dynamic model loading and distributed serving.",
      "Designing enterprise AI solutions, from low-latency real-time inference to cost-optimized serverless architectures.",
      "Aligning AI initiatives with DevOps, Product, Backend and Frontend teams.",
    ],
  },
  {
    role: "Senior AI Engineer",
    company: "WPP Enterprise Solutions",
    period: "May 2023 - Oct 2023",
    points: [
      "Technical lead of the AI team building computer vision and LLM solutions.",
      "Built and managed AI infrastructure on AWS.",
    ],
  },
  {
    role: "AI Engineer",
    company: "WPP Enterprise Solutions",
    period: "May 2022 - Apr 2023",
    points: [
      "Built a microservice application with Celery, RabbitMQ and Redis.",
      "Deployed state-of-the-art and custom models to AWS and Azure.",
    ],
  },
  {
    role: "Junior AI Engineer",
    company: "WPP Enterprise Solutions",
    period: "Nov 2021 - Apr 2022",
    points: [
      "Generated synthetic data and trained and optimized computer vision models.",
      "Designed and built end-to-end cloud ML solutions.",
    ],
  },
];

const education = [
  {
    degree: "MSc Eng., Automatic Control and Robotics",
    detail: "Robots and Autonomous Systems",
    school: "Poznań University of Technology",
    period: "2020 - 2021",
  },
  {
    degree: "BSc Eng., Automatic Control and Robotics",
    detail: "Robotics",
    school: "Poznań University of Technology",
    period: "2016 - 2020",
  },
];

const certifications = [
  "Google Cloud Professional Machine Learning Engineer",
  "Microsoft Certified: Azure AI Engineer Associate",
  "AWS Certified Developer - Associate",
  "Microsoft Certified: Azure AI Fundamentals",
];

export default function AboutPage() {
  const tagCounts = getTagCounts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader title="About" />

      <section className="prose prose-neutral mt-8 dark:prose-invert">
        <p>
          I&apos;m Michał Wojdylak, AI Lead at WPP Enterprise Solutions in
          Poznań. I build and operate the systems that take machine learning
          from notebooks to reliable, scalable production services - data,
          training, deployment and monitoring.
        </p>
        <p>
          I focus on the parts of AI that have to work at 3am: serving large
          language models with predictable latency, designing inference
          platforms that scale with demand, optimizing GPU utilization and
          cost, and building the tooling that lets teams ship models safely
          and often.
        </p>
        <p>
          On this site I publish reproducible benchmarks: I pick a question
          teams actually face, hold everything else constant, and release the
          code and raw results alongside the write-up.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        <ol className="mt-6 space-y-8 border-l border-border pl-6">
          {experience.map((job) => (
            <li key={job.role} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-accent"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {job.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {job.company}
                  </span>
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {job.period}
                </p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <dl className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
          {skills.map((group) => {
            const topics = (group.topics ?? []).filter(
              (topic) => tagCounts[topic],
            );
            return (
              <div
                key={group.area}
                className="grid gap-1 p-5 sm:grid-cols-[180px_1fr] sm:gap-6"
              >
                <dt className="font-mono text-sm font-semibold text-accent">
                  {group.area}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {group.items}
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      href={tagHref(topic)}
                      className="mt-2 block font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {tagCounts[topic]}{" "}
                      {tagCounts[topic] === 1 ? "article" : "articles"} on{" "}
                      {getTag(topic).label}{" "}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Education</h2>
          <ul className="mt-6 space-y-5">
            {education.map((item) => (
              <li key={item.degree}>
                <p className="font-medium">{item.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {item.school} · {item.detail}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Certifications
          </h2>
          <ul className="mt-6 space-y-3">
            {certifications.map((cert) => (
              <li key={cert} className="text-sm">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
