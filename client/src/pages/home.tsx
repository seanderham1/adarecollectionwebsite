import { useEffect } from "react";
import Navigation from "@/components/navigation";
import { useSEO } from "@/hooks/use-seo";
import HeroSection from "@/components/hero-section";
import PropertyGrid from "@/components/property-grid";
import Footer from "@/components/footer";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { Link } from "wouter";

export default function Home() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/")!));

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-animation").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />

      {/* Introduction Section */}
      <section className="py-16 px-6 bg-white w-full" data-testid="introduction-section">
        <div className="w-full text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-gray-900 mb-6" data-testid="introduction-title">
            Curated luxury for Ryder Cup 2027
          </h1>
          <div className="text-base text-gray-900 leading-relaxed max-w-5xl mx-auto" data-testid="introduction-description">
            <p className="font-serif text-base font-normal">
              The Adare Collection offers a select number of exceptional private houses and estates near Adare Manor for Ryder Cup 2027: exclusive homes on the demesne and upscale executive rentals elsewhere in County Limerick when you require more capacity or privacy.
            </p>
            <p className="font-serif text-base font-normal">
              Each property has been handpicked by a local promoter who knows each home, its setting, and its character inside out, with a proven track record in high-profile hospitality and event management behind that work.
            </p>
            <p className="font-serif text-base font-normal">
              Whether you&apos;re hosting corporate guests for the tournament, sponsoring hospitality, or planning a private stay, you&apos;ll receive discreet, personal guidance in selecting accommodation that fits your itinerary and group size.
            </p>
            <p className="font-serif text-base font-normal mt-6">
              <Link
                href="/properties"
                className="underline underline-offset-4 decoration-gray-900/40 hover:text-gray-700"
              >
                Browse Ryder Cup 2027 properties near Adare Manor
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PropertyGrid />

      {/* Contact Section */}
      <section className="py-16 px-6 bg-white w-full" data-testid="contact-section">
        <ContactEnquiryForm
          heading="h2"
          introTestId="home-contact-intro"
          submitButtonTestId="button-submit-contact"
        />
      </section>

      <Footer />
    </div>
  );
}
