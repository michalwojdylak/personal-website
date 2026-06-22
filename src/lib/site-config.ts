/**
 * Central site configuration.
 *
 * Update these values to personalize the site. Most metadata, navigation,
 * and social links are derived from here so there is a single source of truth.
 */

export const siteConfig = {
  name: "Michał Wojdylak",
  title: "Michał Wojdylak — AI Infrastructure Engineer",
  role: "AI Infrastructure Engineer",
  description:
    "Building production AI systems, LLM infrastructure, inference platforms and cloud-native ML solutions.",
  url: "https://michalwojdylak.com",
  locale: "en_US",
  email: "hello@michalwojdylak.com",
  author: {
    name: "Michał Wojdylak",
    twitter: "@michalwojdylak",
  },
  links: {
    github: "https://github.com/michalwojdylak",
    linkedin: "https://www.linkedin.com/in/michalwojdylak",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

