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
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavigationItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "View Properties" },
  ];

  const rightNavigationItems = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];


  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 nav-blur w-full border-b border-gray-200"
      data-testid="navigation"
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-start">
            {leftNavigationItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className={`text-xs font-medium text-secondary hover:text-gray-700 transition-colors cursor-pointer uppercase tracking-wider ${
                  location === item.href ? "text-gray-700" : ""
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0 flex-1 flex justify-center">
            <Link href="/" data-testid="link-home">
              <div className="font-serif text-lg font-normal text-gray-700 cursor-pointer flex items-center gap-2">
                <img 
                  src="/images/navbar/adarecollectionlogo.png" 
                  alt="The Adare Collection Logo" 
                  className="h-9 w-auto"
                />
                The Adare Collection
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            {rightNavigationItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className={`text-xs font-medium text-secondary hover:text-gray-700 transition-colors cursor-pointer uppercase tracking-wider ${
                  location === item.href ? "text-gray-700" : ""
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 hover:text-gray-700" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white [&>button]:hover:bg-gray-100 [&>button]:focus:ring-gray-700 [&>button]:focus:ring-offset-2 [&>button]:text-gray-700 [&>button]:border-gray-700 [&>button]:outline-gray-700 [&>button]:focus:outline-gray-700 [&>button]:focus-visible:ring-gray-700 [&>button]:focus-visible:ring-offset-2 [&>button]:ring-offset-background">
                <div className="flex flex-col space-y-6 mt-8">
                  {[...leftNavigationItems, ...rightNavigationItems].map((item) => (
                    <Link key={item.href} href={item.href} data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="block text-secondary hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
