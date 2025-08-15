import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PropertyGrid from "@/components/property-grid";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Crown, Shield, Users } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const { toast } = useToast();

  const countries = [
    { value: "IE", label: "Ireland" },
    { value: "GB", label: "United Kingdom" },
    { value: "US", label: "United States" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "ES", label: "Spain" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent("Contact Inquiry - The Adare Collection");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Country: ${formData.country}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:info@theadarecollection.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Inquiry Sent",
      description: "Thank you for your inquiry. We will contact you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      country: "",
      phone: "",
      email: "",
      message: ""
    });
  };

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animation').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Introduction Section */}
      <section className="py-16 px-6 bg-neutral-100" data-testid="introduction-section">
        <div className="max-w-4xl mx-auto text-center scroll-animation">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-primary" data-testid="introduction-title">
            Curated Luxury, Local Expertise
          </h2>
          <div className="text-base text-secondary leading-relaxed max-w-3xl mx-auto space-y-4" data-testid="introduction-description">
            <p>
              The Adare Collection offers a select number of exceptional private residences for exclusive rental during Ryder Cup 2027.
            </p>
            <p>
              Every property has been handpicked by a local promoter with deep knowledge of each home, its setting, and its unique features — backed by a proven track record in high-profile hospitality and event management.
            </p>
            <p>
              Whether you're a global sponsor, corporate guest, or private individual, you'll receive discreet, personal guidance in selecting a home that matches your exact needs.
            </p>
          </div>
        </div>
      </section>

      <PropertyGrid />

      {/* Contact Section */}
      <section className="py-16 px-6 bg-white" data-testid="contact-section">
        <div className="max-w-2xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="font-serif text-4xl font-normal text-primary mb-12" data-testid="contact-title">
              Contact request
            </h2>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
            <div>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="NAME"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                data-testid="input-name"
              />
            </div>

            <div>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-primary focus:ring-0" data-testid="select-country">
                  <SelectValue placeholder="COUNTRY" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="TELEPHONE"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                data-testid="input-phone"
              />
            </div>

            <div>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="E-MAIL"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                data-testid="input-email"
              />
            </div>

            <div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="MESSAGE"
                className="w-full min-h-[120px] border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0 resize-none"
                data-testid="textarea-message"
              />
            </div>

            <div className="pt-8">
              <Button 
                type="submit" 
                className="bg-primary text-white px-8 py-3 text-sm font-medium hover:bg-primary/80 hover:scale-105 transition-all duration-200"
                data-testid="button-submit-contact"
              >
                Send Request
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Exclusive Access Teaser */}
      <section className="py-16 px-6 bg-neutral-100" data-testid="exclusive-teaser-section">
        <div className="max-w-4xl mx-auto text-center scroll-animation">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-primary" data-testid="exclusive-teaser-title">
            A New Chapter Begins Here, With You
          </h2>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-secondary leading-relaxed mb-12 max-w-3xl mx-auto italic" data-testid="exclusive-quote">
              "A curated collection of ultra-private estate homes, offered exclusively during Ryder Cup 2027. Some inside the Adare Manor estate. Others, just minutes away — each delivering unmatched comfort, security, and access."
            </p>
            <Link href="/exclusive">
              <Button 
                variant="outline"
                className="btn-outline px-8 py-3 text-sm font-medium"
                data-testid="button-access-exclusive"
              >
                Access Exclusive Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
