import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, GraduationCap, ChefHat, Home } from "lucide-react";

export default function About() {
  const achievements = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Academic Leadership",
      description: "Head of Section for Culinary Arts & Hospitality at TUS"
    },
    {
      icon: <ChefHat className="w-5 h-5" />,
      title: "Executive Chef",
      description: "15+ years professional experience with Great Southern Hotels"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "International Competitor",
      description: "Irish Culinary Team member competing globally"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Industry Partnerships",
      description: "Collaborated with Fáilte Ireland on national programmes"
    }
  ];

  const specialties = [
    "Luxury Hospitality Management",
    "Property Curation",
    "Event Coordination",
    "International Relations",
    "Culinary Excellence",
    "Tourism Development"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 px-6 bg-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="/images/about/about-page-profile.jpeg" 
                    alt="Joe - Hospitality & Property Expert"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Floating accent */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-normal text-primary mb-4">
                  Meet Joe
                </h1>
                <p className="text-xl text-secondary font-light leading-relaxed">
                  Your Local Expert for Exceptional Adare Manor Properties
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-secondary leading-relaxed">
                  With unique access to exclusive properties within the prestigious Adare Manor estate, Joe combines 
                  his extensive hospitality expertise with intimate local knowledge to curate extraordinary 
                  accommodation experiences for Ryder Cup 2027.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {specialties.map((specialty, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-4 py-2 text-sm font-medium border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Adare Advantage */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-primary">
            The Adare Advantage
          </h2>
          <div className="text-base text-secondary leading-relaxed max-w-3xl mx-auto space-y-6">
            <p>
              <strong>The Adare Collection</strong> offers a select number of exceptional private residences 
              for exclusive rental during Ryder Cup 2027. These properties provide unprecedented access to 
              one of golf's most prestigious events, situated just minutes from the championship course.
            </p>
            <p>
              Every property has been handpicked by Joe, leveraging his deep knowledge of each home, 
              its setting, and unique features — backed by a proven track record in high-profile 
              hospitality and event management at the highest levels.
            </p>
            <p>
              Whether you're a global sponsor, corporate guest, or private individual, you'll receive 
              discreet, personal guidance in selecting a home that matches your exact needs for this 
              once-in-a-lifetime sporting occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-primary text-center">
            Professional Excellence
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-colors">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-primary">
                    {achievement.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-primary text-center">
            Professional Background
          </h2>
          
          <div className="space-y-8 text-secondary leading-relaxed">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5" />
                    Academic Leadership
                  </h3>
                  <p>
                    Currently serving as Head of Section for Culinary Arts & Hospitality at the 
                    Technological University of the Shannon. With extensive experience as an academic 
                    programme leader, Joe has shaped international education partnerships and developed 
                    national programmes for Irish Culinary and Hospitality education.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-3">
                    <ChefHat className="w-5 h-5" />
                    Culinary Excellence
                  </h3>
                  <p>
                    Over 15 years as a professional chef, including Executive Chef roles with 
                    Great Southern Hotels. Joe has established an extensive industry network and 
                    represented Ireland as a member of the Irish Culinary team in international 
                    competitions in New York and Dallas.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-3">
                    <Home className="w-5 h-5" />
                    Property & Hospitality
                  </h3>
                  <p>
                    Joe's unique knowledge and connections with property and management at Adare Manor 
                    provide unparalleled access to exclusive accommodations. His hospitality expertise 
                    ensures every guest experience exceeds the highest expectations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    Community Leadership
                  </h3>
                  <p>
                    Beyond professional achievements, Joe actively contributes to his community through 
                    youth rugby coaching, founding the Shannon Master's Swimming Club, and competing 
                    in Olympic distance triathlons, embodying the dedication he brings to every endeavor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6 text-primary">
            Your Ryder Cup Experience Awaits
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            Secure your exclusive accommodation for Ryder Cup 2027 with the confidence that comes 
            from working with a true hospitality professional who knows Adare Manor like no one else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/properties" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Properties
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
