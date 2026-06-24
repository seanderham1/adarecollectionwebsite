import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import {
  SEO_PACKAGES_DESCRIPTION,
  SEO_PACKAGES_H1,
  SEO_PACKAGES_PATH,
} from "@/lib/seo-landing-pages";
import {
  SeoLandingCrossLinks,
  SeoLandingCta,
  SeoLandingSections,
} from "@/components/seo-landing-sections";

const SECTIONS = [
  {
    title: "Curated stays, not generic package holidays",
    paragraphs: [
      "Our Ryder Cup 2027 packages combine exclusive private houses and estates on and near Adare Manor with optional in-residence services such as concierge, chauffeur, private chef, laundry, cleaning, and local restaurant recommendations, to suit your group size and itinerary.",
      "Flight bookings and third-party package holidays are not sold; your travel partner can coordinate air travel while we secure the estate and on-the-ground hospitality.",
    ],
  },
  {
    title: "Ryder Cup travel packages for US and international guests",
    paragraphs: [
      "We respond with whole-home rentals, transparent booking, and ground logistics tailored to Ryder Cup week: homes and executive retreats either walking-distance within the manor grounds or within close proximity.",
      "Please enquire for property availability and guest capacity by completing our contact form. Pricing is on application only.",
    ],
  },
  {
    title: "What's included in a typical package enquiry",
    paragraphs: [
      "Exclusive use of a private residence for up to eight nights during the Ryder Cup window.",
      "Optional add-ons: private chef, chauffeur, helicopter transfers (subject to availability), laundry, and bespoke hospitality for corporate or sponsor groups.",
      "Personal guidance on property fit, proximity to the golf course, and transportation links, including Shannon, Cork, Dublin and Galway.",
    ],
  },
  {
    title: "Booking early",
    paragraphs: [
      "Early enquiry will provide you with a wider selection of properties, support for multi-property requirements and time to align hospitality and other guest requirements.",
      "Availability and pricing are confirmed on application.",
    ],
  },
];

export default function RyderCupPackages() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath(SEO_PACKAGES_PATH)!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
            {SEO_PACKAGES_H1}
          </h1>
          <p className="text-secondary leading-relaxed max-w-3xl mx-auto">
            {SEO_PACKAGES_DESCRIPTION}
          </p>
        </div>
        <SeoLandingSections sections={SECTIONS} />
        <SeoLandingCta />
        <SeoLandingCrossLinks currentPath={SEO_PACKAGES_PATH} />
      </main>
      <Footer />
    </div>
  );
}
