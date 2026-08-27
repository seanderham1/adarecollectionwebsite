import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { Button } from "@/components/ui/button";

export default function About() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/about")!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white w-full">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image - Centered */}
          <div className="flex justify-center mb-8 md:mb-[30px] pt-[50px] md:pt-[30px]">
            <div className="relative">
              <div className="aspect-square overflow-hidden w-[325px] md:w-[425px]">
                <img 
                  src="/images/about/about-photo.jpg" 
                  alt="Joe - Hospitality & Property Expert"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 60%' }}
                />
              </div>
              {/* Architectural accent */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/5 border border-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>

          {/* Content - Centered */}
          <div className="text-center space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-secondary mb-2">
                CEO
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
                Joe Mulcahy
              </h1>
              <p className="text-base text-secondary leading-relaxed mb-8 max-w-3xl mx-auto">
                With unique access to exclusive houses and private estates within the Adare Manor demesne and
                select executive rentals across County Limerick, Joe combines extensive hospitality delivery
                with local knowledge to pair sponsors, corporate delegations, and private guests with Ryder Cup 2027
                accommodation that genuinely fits how you plan to live the week.
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center max-w-md mx-auto">
                <a href="/properties" className="flex-1">
                  <Button 
                    className="border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200 w-full"
                  >
                    EXPLORE PROPERTIES
                  </Button>
                </a>
                
                <a href="/contact" className="flex-1">
                  <Button 
                    className="border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200 w-full"
                  >
                    GET IN TOUCH
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joe's Quote */}
      <section className="py-24 px-6 bg-neutral-50 w-full">
        <div className="max-w-5xl mx-auto">
          <blockquote className="font-serif text-3xl md:text-4xl font-normal text-primary leading-relaxed text-center">
            "With over three decades of experience in high-end hospitality and luxury guest services, 
            I bring a deep understanding of what clients value most: detail. 
            Several of the properties I represent are known to me personally, 
            allowing me to advise not just on layout and amenities, but on how each home feels in 
            terms of comfort, hosting potential, and proximity to the Ryder Cup course."
          </blockquote>
        </div>
      </section>

      {/* Marketing Director — Lee Hayes */}
      <section className="py-20 px-6 bg-white w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 md:mb-[30px]">
            <div className="relative">
              <div className="aspect-square overflow-hidden w-[325px] md:w-[425px]">
                <img
                  src="/images/about/lee-about-photo.webp"
                  alt="Lee Hayes — Marketing Director, The Adare Collection"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center calc(40% + 10px)" }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/5 border border-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-secondary mb-2">
                Marketing Director
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
                Lee Hayes
              </h2>
              <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
                Lee shapes how The Adare Collection is seen and understood - from the our
                property stories to the enquiry journey. He leads brand and
                content strategy so corporate groups and private guests can recognise
                the right home for tournament week 2027, and feel confident in the experience long before
                they arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-primary">
            Your Adare Stay Awaits
          </h2>
          <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
            Secure your exclusive private accommodation near Adare Manor with the confidence that comes
            from working with a true hospitality professional. We are an independent provider and do not
            sell tickets or official hospitality.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
