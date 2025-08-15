export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h3 className="font-serif text-lg font-normal mb-4 text-primary" data-testid="footer-company-name">
            The Adare Collection
          </h3>
          <p className="text-secondary text-sm max-w-md mx-auto mb-8" data-testid="footer-company-description">
            Curating the finest private residences for Ryder Cup 2027
          </p>
          
          <div className="flex justify-center space-x-8 text-sm text-muted">
            <a href="#properties" className="hover:text-primary transition-colors" data-testid="footer-link-properties">Properties</a>
            <a href="/contact" className="hover:text-primary transition-colors" data-testid="footer-link-contact">Contact</a>
            <a href="/exclusive" className="hover:text-primary transition-colors" data-testid="footer-link-exclusive">Exclusive Access</a>
            <a href="mailto:info@theadarecollection.com" className="hover:text-primary transition-colors" data-testid="footer-email">Email</a>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-muted text-xs" data-testid="footer-copyright">
            © 2024 The Adare Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
