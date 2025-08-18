import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-left mb-12">
            <h1 className="font-serif text-4xl font-normal text-primary mb-12" data-testid="contact-title">
              Contact request
            </h1>
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
                disabled={isSubmitting}
                data-testid="input-name"
              />
            </div>

            <div>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)} disabled={isSubmitting}>
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
              <Select value="" onValueChange={() => {}} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-primary focus:ring-0">
                  <SelectValue placeholder="INDICATIVE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+353">Ireland (+353)</SelectItem>
                  <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                  <SelectItem value="+1">United States (+1)</SelectItem>
                  <SelectItem value="+49">Germany (+49)</SelectItem>
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
                placeholder="E-MAIL"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                disabled={isSubmitting}
                data-testid="input-email"
              />
            </div>

            <div>
              <Textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Message"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base resize-none placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
                required
                disabled={isSubmitting}
                data-testid="textarea-message"
              />
            </div>

            <div className="pt-8">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-gray-800 text-white py-4 px-8 text-sm font-medium tracking-wide uppercase transition-colors"
                disabled={isSubmitting}
                data-testid="button-send-inquiry"
              >
                {isSubmitting ? "SENDING..." : "SUBMIT →"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
