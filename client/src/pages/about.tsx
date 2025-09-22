import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function About() {

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white w-full">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image - Centered */}
          <div className="flex justify-center mb-12 pt-[50px]">
            <div className="relative">
              <div className="aspect-square w-64 overflow-hidden">
                <img 
                  src="/images/about/about-page-profile.jpeg" 
                  alt="Joe - Hospitality & Property Expert"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              {/* Architectural accent */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/5 border border-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>

          {/* Content - Centered */}
          <div className="text-center space-y-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
                Meet our local expert for exceptional Adare Manor Properties
              </h1>
              <p className="text-base text-secondary leading-relaxed mb-8 max-w-3xl mx-auto">
                With unique access to exclusive properties within the prestigious Adare Manor estate and beyond, 
                Joe combines his extensive hospitality expertise with intimate local knowledge to curate 
                extraordinary accommodation experiences for Ryder Cup 2027.
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
            I bring a deep understanding of what discerning clients value most — discretion, detail, 
            and distinction. Several of the properties I represent are known to me personally, 
            allowing me to advise not just on layout and amenities, but on how each home feels in 
            terms of comfort, hosting potential, and proximity to the Ryder Cup course."
          </blockquote>
        </div>
      </section>




      {/* Call to Action */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-primary">
            Your Ryder Cup Experience Awaits
          </h2>
          <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
            Secure your exclusive accommodation for Ryder Cup 2027 with the confidence that comes 
            from working with a true hospitality professional.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
