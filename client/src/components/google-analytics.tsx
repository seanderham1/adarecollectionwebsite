import { useEffect } from 'react';

// Google Analytics 4 setup
export function GoogleAnalytics() {
  useEffect(() => {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
    });
  }, []);

  return null;
}

// Google Search Console verification
export function GoogleSearchConsole() {
  useEffect(() => {
    // Add Google Search Console verification meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = 'YOUR_VERIFICATION_CODE'; // Replace with actual code
    document.head.appendChild(meta);
  }, []);

  return null;
}
