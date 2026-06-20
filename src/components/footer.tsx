import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <SocialLinks />
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/rss.xml"
              className="transition-colors hover:text-foreground"
            >
              RSS
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

