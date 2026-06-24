import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  SEO_CORPORATE_PATH,
  SEO_PACKAGES_PATH,
  SEO_SERVICES_PATH,
} from "@/lib/seo-landing-pages";

type Section = { title: string; paragraphs: string[] };

export function SeoLandingSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-12 max-w-3xl mx-auto text-left">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-primary mb-4">
            {section.title}
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="text-secondary leading-relaxed mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export function SeoLandingCta() {
  return (
    <div className="text-center mt-16">
      <p className="text-secondary max-w-xl mx-auto">
        Availability and pricing are confirmed enquiry-by-enquiry. Price on application.
      </p>
      <Link href="/contact" className="inline-block mt-8">
        <Button className="border border-gray-700 bg-gray-700 text-white px-6 py-2 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200">
          Enquire now
        </Button>
      </Link>
    </div>
  );
}

export function SeoLandingCrossLinks({ currentPath }: { currentPath: string }) {
  const links = [
    { href: SEO_PACKAGES_PATH, label: "Ryder Cup packages" },
    { href: SEO_CORPORATE_PATH, label: "Corporate hospitality" },
    { href: SEO_SERVICES_PATH, label: "Travel management" },
    { href: "/properties", label: "View properties" },
    { href: "/faq", label: "FAQ" },
  ].filter((l) => l.href !== currentPath);

  return (
    <p className="text-center text-sm text-secondary mt-12">
      Explore:{" "}
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && " · "}
          <Link href={l.href} className="underline underline-offset-4 hover:text-gray-900">
            {l.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
