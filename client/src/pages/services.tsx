import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { SEO_SERVICES_DESCRIPTION, SEO_SERVICES_H1, SEO_SERVICES_PATH } from "@/lib/seo-landing-pages";
import {
  SeoLandingCrossLinks,
  SeoLandingCta,
  SeoLandingSections,
} from "@/components/seo-landing-sections";
import { Link } from "wouter";

const SECTIONS = [
  {
    title: "Optional services with your rental",
    paragraphs: [
      "Estate services are not included in the rental and are booked under a separate agreement.",
      "Concierge, private chef and catering, chauffeur and licensed ground transfers, full laundry and security.",
    ],
  },
  {
    title: "What we coordinate, and what we do not",
    paragraphs: [
      "We coordinate ground logistics, chauffeur transfer, and optional helicopter transfers (subject to availability). Flights and third-party package holidays remain with you or your travel partner. We do not sell tickets or official hospitality.",
      "Read our FAQ for full detail on estate services versus accommodation-only enquiries.",
    ],
  },
];

export default function Services() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath(SEO_SERVICES_PATH)!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
            {SEO_SERVICES_H1}
          </h1>
          <p className="text-secondary leading-relaxed max-w-3xl mx-auto">
            {SEO_SERVICES_DESCRIPTION}
          </p>
          <p className="text-sm text-secondary mt-4">
            <Link href="/faq" className="underline underline-offset-4 hover:text-gray-900">
              FAQ: estate services vs flights
            </Link>
          </p>
        </div>
        <SeoLandingSections sections={SECTIONS} />
        <SeoLandingCta />
        <SeoLandingCrossLinks currentPath={SEO_SERVICES_PATH} />
      </main>
      <Footer />
    </div>
  );
}
