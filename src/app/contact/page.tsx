import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHeader } from "@/components/page-header";
import {
  GitHubIcon,
  LinkedInIcon,
} from "@/components/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Michał Wojdylak — AI Infrastructure Engineer. Available for roles and collaboration.",
};

export default function ContactPage() {
  const channels = [
    {
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <MailIcon />,
    },
    {
      label: "GitHub",
      value: "github.com/michalwojdylak",
      href: siteConfig.links.github,
      icon: <GitHubIcon className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/michalwojdylak",
      href: siteConfig.links.linkedin,
      icon: <LinkedInIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <PageHeader
        title="Contact"
        description="I'm open to conversations about AI infrastructure roles, consulting, and collaboration. The best way to reach me is by email or LinkedIn."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={
              channel.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50"
          >
            <span className="text-muted-foreground transition-colors group-hover:text-accent">
              {channel.icon}
            </span>
            <span>
              <span className="block text-sm font-medium">{channel.label}</span>
              <span className="block break-all text-sm text-muted-foreground">
                {channel.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

