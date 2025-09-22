import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setShowValidationError(false);
    setShowSuccessMessage(false);
    
    // Validate form
    if (!email || !privacyAccepted) {
      setShowValidationError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email notification to admin
      const response = await fetch('/api/newsletter-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'footer-newsletter'
        }),
      });
      
      if (response.ok) {
        // Show success message
        setShowSuccessMessage(true);
        setEmail("");
        setPrivacyAccepted(false);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        throw new Error('Failed to submit subscription');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Still show success message to user even if email fails
      setShowSuccessMessage(true);
      setEmail("");
      setPrivacyAccepted(false);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white py-8 px-6 w-full" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* ABOUT Section */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-about-title">
              About
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="/about" className="hover:text-gray-300 transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-gray-300 transition-colors" data-testid="footer-link-properties">
                  Our Properties
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300 transition-colors" data-testid="footer-link-contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT Section */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-contact-title">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:info@theadarecollection.ie" className="hover:text-gray-300 transition-colors" data-testid="footer-link-availability">
                  Request Availability
                </a>
              </li>
              <li className="text-white">
                <a href="tel:+353866681930" className="hover:text-gray-300 transition-colors" data-testid="footer-phone">
                  +353 86 668 1930
                </a>
              </li>
              <li className="text-white">
                <a href="mailto:info@theadarecollection.ie" className="hover:text-gray-300 transition-colors" data-testid="footer-email">
                  info@theadarecollection.ie
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER Section */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-newsletter-title">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              {/* Validation Error */}
              {showValidationError && (
                <Alert className="bg-red-900/20 border-red-500 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please enter your email address and accept the Privacy Policy and Terms & Conditions.
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Success Message */}
              {showSuccessMessage && (
                <Alert className="bg-green-900/20 border-green-500 text-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Thank you for subscribing! Keep an eye out for upcoming details and properties.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="eg. jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                  data-testid="footer-newsletter-input"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  className="bg-black text-white border border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                  data-testid="footer-newsletter-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy-policy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  className="mt-1"
                  data-testid="footer-privacy-checkbox"
                  disabled={isSubmitting}
                />
                <label htmlFor="privacy-policy" className="text-xs text-gray-300 leading-relaxed">
                  I accept the{" "}
                  <a href="/privacy" className="underline hover:text-white transition-colors">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="underline hover:text-white transition-colors">
                    Terms & Conditions
                  </a>{" "}
                  *
                </label>
              </div>
            </form>

            {/* Copyright */}
            <div className="mt-12">
              <p className="text-gray-400 text-xs text-right mt-[25px]" data-testid="footer-copyright">
                © 2025 The Adare Collection. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
