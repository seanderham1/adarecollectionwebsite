import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import {
  SEO_CORPORATE_DESCRIPTION,
  SEO_CORPORATE_H1,
  SEO_CORPORATE_PATH,
} from "@/lib/seo-landing-pages";
import {
  SeoLandingCrossLinks,
  SeoLandingCta,
  SeoLandingSections,
} from "@/components/seo-landing-sections";

const SECTIONS = [
  {
    title: "Hospitality at private estates",
    paragraphs: [
      "The Adare Collection can provide hospitality at selected residences on Adare Manor grounds, designed for sponsors and executive groups for Ryder Cup 2027.",
      "Hospitality options include concierge; support with event planning; chauffeur and transportation services; private chef and catering services.",
      "Larger groups can be accommodated by combining adjacent properties.",
      "Please discuss your hospitality and entertainment with our team.",
    ],
  },
];

export default function CorporateHospitality() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath(SEO_CORPORATE_PATH)!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
            {SEO_CORPORATE_H1}
          </h1>
          <p className="text-secondary leading-relaxed max-w-3xl mx-auto">
            {SEO_CORPORATE_DESCRIPTION}
          </p>
        </div>
        <SeoLandingSections sections={SECTIONS} />
        <SeoLandingCta />
        <SeoLandingCrossLinks currentPath={SEO_CORPORATE_PATH} />
      </main>
      <Footer />
    </div>
  );
}
