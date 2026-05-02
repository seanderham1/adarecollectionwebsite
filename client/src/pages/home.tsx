import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { useSEO } from "@/hooks/use-seo";
import HeroSection from "@/components/hero-section";
import PropertyGrid from "@/components/property-grid";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_TITLE,
  SEO_META_KEYWORDS_COMPACT,
} from "@/lib/seo-keyword-clusters";
import { Link } from "wouter";
import { Crown, Shield, Users } from "lucide-react";

export default function Home() {
  useSEO({
    title: SEO_HOME_TITLE,
    description: SEO_HOME_DESCRIPTION,
    keywords: SEO_META_KEYWORDS_COMPACT,
    ogImage: 'https://theadarecollection.com/images/hero/adaremanor-img2.webp',
    ogUrl: 'https://theadarecollection.com/'
  });

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    extension: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
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
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast({
        title: "Please complete required fields",
        description: "Name and email are required to send your request.",
        variant: "destructive",
      });
      return;
    }
    
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
        setValidationErrors({});
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
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="font-serif text-4xl font-normal text-primary mb-4" data-testid="contact-title">
              Contact request
            </h2>
            <p className="text-sm text-secondary leading-relaxed mb-10 max-w-xl" data-testid="home-contact-intro">
              Planning Ryder Cup 2027 with us? Share your preferred dates, group size, and whether you need corporate
              or private accommodation. We will reply with tailored options and next steps. Complete the form below to
              start your enquiry.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
            <div>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Name *"
                className={`w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  validationErrors.name 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-gray-200 focus:border-gray-700"
                }`}
                required
                disabled={isSubmitting}
                data-testid="input-name"
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1" data-testid="name-error">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" data-testid="select-country">
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

            <div className="flex gap-4">
              <div className="w-32">
                <Select value={formData.extension} onValueChange={(value) => handleInputChange("extension", value)} disabled={isSubmitting}>
                  <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" data-testid="select-extension">
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
              <div className="flex-1">
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Phone Number"
                  className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isSubmitting}
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email *"
                className={`w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  validationErrors.email 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-gray-200 focus:border-gray-700"
                }`}
                required
                disabled={isSubmitting}
                data-testid="input-email"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1" data-testid="email-error">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Message"
                className="w-full min-h-[120px] border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                disabled={isSubmitting}
                data-testid="textarea-message"
              />
            </div>

            <div className="pt-8">
              <Button 
                type="submit" 
                className="w-full border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </form>
        </div>
      </section>


      <Footer />
    </div>
  );
}
