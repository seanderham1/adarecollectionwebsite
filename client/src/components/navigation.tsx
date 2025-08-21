import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/properties", label: "View Properties" },
    { href: "/exclusive", label: "Exclusive Access" },
    { href: "/contact", label: "Contact" },
  ];

  const handleRequestBrochure = () => {
    // Create mailto link with pre-filled content
    const subject = encodeURIComponent("Brochure Request - The Adare Collection");
    const body = encodeURIComponent("I would like to request a brochure for The Adare Collection properties for Ryder Cup 2027.\n\nThank you.");
    window.location.href = `mailto:info@theadarecollection.com?subject=${subject}&body=${body}`;
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 nav-blur"
      data-testid="navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" data-testid="link-home">
              <div className="font-serif text-xl font-normal text-primary cursor-pointer">
                The Adare Collection
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigationItems.slice(0, -1).map((item) => (
                <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className={`text-sm text-secondary hover:text-primary transition-colors cursor-pointer font-medium ${
                    location === item.href ? "text-primary" : ""
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact" data-testid="link-contact">
                <Button 
                  className="btn-primary text-white px-6 py-2 text-sm font-medium"
                  data-testid="button-contact"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item) => (
                    <Link key={item.href} href={item.href} data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="block text-secondary hover:text-primary transition-colors cursor-pointer text-sm font-medium">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <Button 
                    onClick={handleRequestBrochure}
                    className="btn-primary text-white"
                    data-testid="mobile-button-request-brochure"
                  >
                    Request Brochure
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
