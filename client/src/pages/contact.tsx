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
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Message"
                className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium resize-none placeholder:text-gray-400 placeholder:font-normal focus:border-primary focus:ring-0"
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
