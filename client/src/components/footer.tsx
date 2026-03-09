export default function Footer() {
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

          {/* DISCLAIMER Section */}
          <div className="lg:col-span-2 lg:mt-12">
            <p className="text-gray-400 text-xs leading-relaxed text-left mb-4" data-testid="footer-disclaimer">
              The Adare Collection is an independent luxury accommodation provider and is not affiliated with, endorsed by, or connected to Adare Manor or the Ryder Cup.
            </p>
            <p className="text-gray-400 text-xs text-left mt-10" data-testid="footer-copyright">
              © 2025 The Adare Collection. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
