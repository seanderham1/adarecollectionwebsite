import { useEffect } from 'react';
import { env } from '@/lib/env';

// Google Analytics 4 setup
export function GoogleAnalytics() {
  useEffect(() => {
    const measurementId = env.VITE_GA_MEASUREMENT_ID;
    
    if (!measurementId) {
      console.log('Google Analytics: No measurement ID provided');
      return;
    }

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }, []);

  return null;
}

// Google Search Console verification
export function GoogleSearchConsole() {
  useEffect(() => {
    const verificationCode = env.VITE_GOOGLE_SITE_VERIFICATION;
    
    if (!verificationCode) {
      console.log('Google Search Console: No verification code provided');
      return;
    }

    // Add Google Search Console verification meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = verificationCode;
    document.head.appendChild(meta);
  }, []);

  return null;
}
