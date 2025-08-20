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
    extension: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const countries = [
    { value: "US", label: "United States / Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italy" },
    { value: "ES", label: "Spain" },
    { value: "NL", label: "Netherlands" },
    { value: "BE", label: "Belgium" },
    { value: "CH", label: "Switzerland" },
    { value: "AT", label: "Austria" },
    { value: "IE", label: "Ireland" },
    { value: "AU", label: "Australia" },
    { value: "NZ", label: "New Zealand" },
    { value: "CN", label: "China" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "IN", label: "India" },
    { value: "PK", label: "Pakistan" },
    { value: "BD", label: "Bangladesh" },
    { value: "ID", label: "Indonesia" },
    { value: "PH", label: "Philippines" },
    { value: "SG", label: "Singapore" },
    { value: "MY", label: "Malaysia" },
    { value: "TH", label: "Thailand" },
    { value: "VN", label: "Vietnam" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" },
    { value: "AR", label: "Argentina" },
    { value: "ZA", label: "South Africa" },
    { value: "NG", label: "Nigeria" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://us-central1-theadarecollection-site.cloudfunctions.net/api/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Inquiry Sent",
          description: result.message,
        });
        
        // Reset form
        setFormData({
          name: "",
          country: "",
          extension: "",
          phone: "",
          email: "",
          message: ""
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send inquiry. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                placeholder="Name"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                disabled={isSubmitting}
                data-testid="input-name"
              />
            </div>

            <div>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-primary focus:ring-0" data-testid="select-country">
                  <SelectValue placeholder="Country" />
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
              <Select value={formData.extension} onValueChange={(value) => handleInputChange("extension", value)} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-primary focus:ring-0" data-testid="select-extension">
                  <SelectValue placeholder="Extension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">United States / Canada (+1)</SelectItem>
                  <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                  <SelectItem value="+49">Germany (+49)</SelectItem>
                  <SelectItem value="+33">France (+33)</SelectItem>
                  <SelectItem value="+39">Italy (+39)</SelectItem>
                  <SelectItem value="+34">Spain (+34)</SelectItem>
                  <SelectItem value="+31">Netherlands (+31)</SelectItem>
                  <SelectItem value="+32">Belgium (+32)</SelectItem>
                  <SelectItem value="+41">Switzerland (+41)</SelectItem>
                  <SelectItem value="+43">Austria (+43)</SelectItem>
                  <SelectItem value="+353">Ireland (+353)</SelectItem>
                  <SelectItem value="+61">Australia (+61)</SelectItem>
                  <SelectItem value="+64">New Zealand (+64)</SelectItem>
                  <SelectItem value="+86">China (+86)</SelectItem>
                  <SelectItem value="+81">Japan (+81)</SelectItem>
                  <SelectItem value="+82">South Korea (+82)</SelectItem>
                  <SelectItem value="+91">India (+91)</SelectItem>
                  <SelectItem value="+92">Pakistan (+92)</SelectItem>
                  <SelectItem value="+880">Bangladesh (+880)</SelectItem>
                  <SelectItem value="+62">Indonesia (+62)</SelectItem>
                  <SelectItem value="+63">Philippines (+63)</SelectItem>
                  <SelectItem value="+65">Singapore (+65)</SelectItem>
                  <SelectItem value="+60">Malaysia (+60)</SelectItem>
                  <SelectItem value="+66">Thailand (+66)</SelectItem>
                  <SelectItem value="+84">Vietnam (+84)</SelectItem>
                  <SelectItem value="+55">Brazil (+55)</SelectItem>
                  <SelectItem value="+52">Mexico (+52)</SelectItem>
                  <SelectItem value="+54">Argentina (+54)</SelectItem>
                  <SelectItem value="+27">South Africa (+27)</SelectItem>
                  <SelectItem value="+234">Nigeria (+234)</SelectItem>
                  <SelectItem value="none">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone Number"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                disabled={isSubmitting}
                data-testid="input-phone"
              />
            </div>

            <div>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                disabled={isSubmitting}
                data-testid="input-email"
              />
            </div>

            <div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Message"
                className="w-full min-h-[120px] border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0 resize-none"
                disabled={isSubmitting}
                data-testid="textarea-message"
              />
            </div>

            <div className="pt-8">
              <Button 
                type="submit" 
                className="bg-primary text-white px-8 py-3 text-sm font-medium hover:bg-primary/80 hover:scale-105 transition-all duration-200"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
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
