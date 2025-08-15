import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail } from "lucide-react";

export default function ExclusiveAccess() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo password validation
    if (password === "adare2027") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to our exclusive collection.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid access code. Please contact us for an invitation.",
        variant: "destructive",
      });
    }
  };

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Exclusive Access Request - The Adare Collection");
    const body = encodeURIComponent(`I would like to request exclusive access to The Adare Collection's premium properties.\n\nEmail: ${email}\n\nThank you.`);
    window.location.href = `mailto:info@theadarecollection.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Request Sent",
      description: "We will review your request and contact you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {!isAuthenticated ? (
            <>
              {/* Access Form */}
              <div className="text-center mb-12">
                <h1 className="font-playfair text-5xl font-bold text-charcoal mb-6" data-testid="exclusive-access-title">
                  Exclusive Access Portal
                </h1>
                <p className="text-xl text-dark-gray max-w-2xl mx-auto" data-testid="exclusive-access-description">
                  Access our most exclusive, off-market properties available only to select clientele.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Password Access */}
                <Card className="luxury-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="text-white h-8 w-8" />
                    </div>
                    <CardTitle className="font-playfair text-2xl text-charcoal" data-testid="access-code-title">
                      Access Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="access-password" data-testid="label-access-password">
                          Exclusive Access Code
                        </Label>
                        <Input
                          type="password"
                          id="access-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your access code"
                          className="mt-1"
                          data-testid="input-access-password"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-primary text-white py-3 rounded-lg font-medium"
                        data-testid="button-validate-access"
                      >
                        Access Exclusive Properties
                      </Button>
                      <p className="text-sm text-dark-gray text-center">
                        Demo code: <code className="bg-gray-100 px-2 py-1 rounded">adare2027</code>
                      </p>
                    </form>
                  </CardContent>
                </Card>

                {/* Request Access */}
                <Card className="luxury-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="text-white h-8 w-8" />
                    </div>
                    <CardTitle className="font-playfair text-2xl text-charcoal" data-testid="request-access-title">
                      Request Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="request-email" data-testid="label-request-email">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="request-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1"
                          data-testid="input-request-email"
                        />
                      </div>
                      <Button 
                        onClick={handleRequestAccess}
                        disabled={!email}
                        className="w-full btn-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
                        data-testid="button-request-access"
                      >
                        Request Invitation
                      </Button>
                      <p className="text-sm text-dark-gray text-center" data-testid="request-access-description">
                        Don't have access? We'll review your request and send you an invitation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quote Section */}
              <div className="mt-16 text-center bg-charcoal rounded-xl p-12 text-white">
                <blockquote className="text-xl italic leading-relaxed max-w-4xl mx-auto" data-testid="exclusive-quote">
                  "A curated collection of ultra-private estate homes, offered exclusively during Ryder Cup 2027. Some inside the Adare Manor estate. Others, just minutes away — each delivering unmatched comfort, security, and access."
                </blockquote>
              </div>
            </>
          ) : (
            /* Authenticated Content */
            <div className="text-center">
              <h1 className="font-playfair text-5xl font-bold text-charcoal mb-6" data-testid="authenticated-title">
                Welcome to Our Exclusive Collection
              </h1>
              <p className="text-xl text-dark-gray mb-12" data-testid="authenticated-description">
                You now have access to our most premium and private properties.
              </p>
              
              {/* This would typically show exclusive properties */}
              <Card className="luxury-shadow max-w-2xl mx-auto">
                <CardContent className="p-12 text-center">
                  <h3 className="font-playfair text-3xl font-bold text-charcoal mb-4" data-testid="exclusive-properties-title">
                    Exclusive Properties
                  </h3>
                  <p className="text-dark-gray mb-6" data-testid="exclusive-properties-description">
                    Our exclusive collection includes ultra-private estates with the highest level of security and discretion.
                  </p>
                  <Button 
                    onClick={() => {
                      const subject = encodeURIComponent("Exclusive Property Inquiry");
                      const body = encodeURIComponent("I am interested in learning more about your exclusive properties for Ryder Cup 2027.");
                      window.location.href = `mailto:info@theadarecollection.com?subject=${subject}&body=${body}`;
                    }}
                    className="btn-primary text-white px-8 py-3 rounded-lg font-medium"
                    data-testid="button-inquire-exclusive"
                  >
                    Inquire About Exclusive Properties
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
