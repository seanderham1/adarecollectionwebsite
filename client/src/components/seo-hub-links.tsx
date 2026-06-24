import { Link } from "wouter";
import {
  SEO_CORPORATE_PATH,
  SEO_PACKAGES_PATH,
  SEO_SERVICES_PATH,
} from "@/lib/seo-landing-pages";

type SeoHubLinksProps = {
  variant?: "inline" | "footer-block";
  className?: string;
};

const HUB_LINKS = [
  { href: SEO_PACKAGES_PATH, label: "Ryder Cup 2027 packages" },
  { href: SEO_CORPORATE_PATH, label: "Corporate hospitality" },
  { href: SEO_SERVICES_PATH, label: "Travel management" },
  { href: "/properties", label: "All properties" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SeoHubLinks({ variant = "inline", className = "" }: SeoHubLinksProps) {
  if (variant === "footer-block") {
    return (
      <nav aria-label="Ryder Cup 2027 services" className={className}>
        <h3 className="font-serif text-xl font-normal mb-6 text-white">Ryder Cup 2027</h3>
        <ul className="space-y-4 text-sm">
          {HUB_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-gray-300 transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Related Ryder Cup 2027 pages"
      className={`flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm ${className}`}
    >
      {HUB_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-secondary hover:text-gray-900 underline-offset-4 hover:underline"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
