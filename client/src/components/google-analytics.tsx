import { useEffect } from "react";
import { env } from "@/lib/env";
import { useCookieConsent } from "@/contexts/cookie-consent-context";
import { expireAnalyticsCookies } from "@/lib/google-consent";

function removeGtagScripts(measurementId: string): void {
  const selector = `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`;
  document.querySelectorAll(selector).forEach((el) => el.remove());
}

export function GoogleAnalytics() {
  const { analyticsEnabled } = useCookieConsent();
  const measurementId = env.VITE_GA_MEASUREMENT_ID?.trim();

  useEffect(() => {
    if (!measurementId) {
      if (import.meta.env.DEV) {
        console.log("Google Analytics: No measurement ID provided");
      }
      return;
    }

    if (!analyticsEnabled) {
      removeGtagScripts(measurementId);
      expireAnalyticsCookies();
      return;
    }

    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    type GtagWindow = Window & {
      dataLayer: unknown[];
      gtag: (...args: unknown[]) => void;
    };
    const gWin = window as unknown as GtagWindow;
    gWin.dataLayer = gWin.dataLayer || [];

    if (typeof gWin.gtag !== "function") {
      gWin.gtag = function gtag(...args: unknown[]) {
        gWin.dataLayer.push(args);
      };
    }

    gWin.gtag("js", new Date());
    gWin.gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      script.remove();
      removeGtagScripts(measurementId);
    };
  }, [analyticsEnabled, measurementId]);

  return null;
}

export function GoogleSearchConsole() {
  useEffect(() => {
    const verificationCode = env.VITE_GOOGLE_SITE_VERIFICATION;

    if (!verificationCode) {
      if (import.meta.env.DEV) {
        console.log("Google Search Console: No verification code provided");
      }
      return;
    }

    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = verificationCode;
    document.head.appendChild(meta);
  }, []);

  return null;
}
