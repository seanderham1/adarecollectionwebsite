import { Linkedin, Instagram } from "lucide-react";
import { Link } from "wouter";
import { useCookieConsent } from "@/contexts/cookie-consent-context";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/the-adare-collection",
    Icon: Linkedin,
    testId: "footer-social-linkedin",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/theadarecollection/",
    Icon: Instagram,
    testId: "footer-social-instagram",
  },
] as const;

export default function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="bg-black text-white py-8 px-20 w-full" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* ABOUT Section */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-about-title">
              About
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex min-h-6 items-center">
                <a href="/about" className="hover:text-gray-300 transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-300 transition-colors" data-testid="footer-link-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 transition-colors" data-testid="footer-link-blog">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/properties" className="hover:text-gray-300 transition-colors" data-testid="footer-link-properties">
                  Properties
                </a>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-300 transition-colors">
                  Estate Services
                </Link>
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
              <li className="flex min-h-6 items-center text-white">
                <a href="tel:+353866681930" className="hover:text-gray-300 transition-colors" data-testid="footer-phone">
                  +353 86 668 1930
                </a>
              </li>
              <li className="text-white">
                <a href="mailto:info@theadarecollection.ie" className="hover:text-gray-300 transition-colors" data-testid="footer-email">
                  info@theadarecollection.ie
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300 transition-colors" data-testid="footer-link-availability">
                  Enquire about accommodation
                </a>
              </li>
            </ul>
          </div>

          {/* ADDRESS Section */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-address-title">
              Address
            </h3>
            <address className="not-italic text-sm text-white leading-relaxed" data-testid="footer-address">
              The Adare Collection Limited<br />
              Byrne and Company<br />
              Church Street<br />
              Gortboy<br />
              Newcastle West<br />
              Co Limerick<br />
              Ireland<br />
              V42 F982
            </address>
          </div>

          {/* SOCIAL + legal (disclaimer & copyright below icons, same column) */}
          <div>
            <h3 className="font-serif text-xl font-normal mb-6 text-white" data-testid="footer-social-title">
              Social
            </h3>
            <ul className="flex min-h-6 flex-wrap items-center gap-4">
              {socialLinks.map(({ name, href, Icon, testId }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-white hover:text-gray-300 transition-colors"
                    aria-label={`The Adare Collection on ${name}`}
                    data-testid={testId}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-xs text-left mt-5" data-testid="footer-copyright">
              © 2025 The Adare Collection Limited. All rights reserved.
            </p>
            <nav
              className="text-gray-400 text-xs text-left mt-3 flex flex-wrap items-center gap-x-3 gap-y-1"
              aria-label="Legal"
              data-testid="footer-legal"
            >
              <Link href="/terms" className="hover:text-gray-300 transition-colors" data-testid="footer-link-terms">
                Terms & Conditions
              </Link>
              <span className="text-gray-600" aria-hidden>
                ·
              </span>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors" data-testid="footer-link-privacy">
                Privacy Policy
              </Link>
              <span className="text-gray-600" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={openPreferences}
                className="hover:text-gray-300 transition-colors text-left"
                data-testid="footer-link-cookie-settings"
              >
                Cookie settings
              </button>
            </nav>
            <p
              className="text-gray-400 text-left mt-3 max-w-md leading-relaxed text-[8px]"
              data-testid="footer-disclaimer"
            >
              The Adare Collection Limited, trading as The Adare Collection, is an independent luxury accommodation provider and is not affiliated with, endorsed by, or connected to Adare Manor, Ryder Cup Europe, The Professional Golfers&apos; Association of America, or any official Ryder Cup hospitality or ticket seller. We rent private residences and optional in-residence services only. We do not sell Ryder Cup tickets or official hospitality. Tickets and official hospitality are available solely via{" "}
              <a
                href="https://www.rydercup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                rydercup.com
              </a>
              .
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
