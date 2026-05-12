import { useEffect } from "react";
import { env } from "@/lib/env";
import { useCookieConsent } from "@/contexts/cookie-consent-context";

function stripGaFromWindow(): void {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  delete w.gtag;
  w.dataLayer = [];
}

function removeGtagScripts(measurementId: string): void {
  const selector = `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`;
  document.querySelectorAll(selector).forEach((el) => el.remove());
}

function expireGaCookies(): void {
  try {
    const hostname = window.location.hostname;
    const domainVariants: string[] = ["", hostname];
    if (hostname.includes(".")) {
      domainVariants.push(`.${hostname}`);
      const tail = hostname.split(".").slice(-2).join(".");
      if (tail !== hostname) domainVariants.push(`.${tail}`);
    }

    const names = document.cookie.split(";").map((c) => c.split("=")[0]?.trim()).filter(Boolean);

    for (const name of names) {
      if (!name.startsWith("_ga") && name !== "_gid" && !name.startsWith("_gcl")) continue;
      for (let i = 0; i < domainVariants.length; i++) {
        const domain = domainVariants[i];
        const domainPart = domain ? `;domain=${domain}` : "";
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/${domainPart}`;
      }
    }
  } catch {
    /* ignore storage / cookie edge cases */
  }
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
      stripGaFromWindow();
      expireGaCookies();
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

    function gtag(...args: unknown[]) {
      gWin.dataLayer.push(args);
    }
    gWin.gtag = gtag;

    gtag("js", new Date());
    gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      script.remove();
      removeGtagScripts(measurementId);
      stripGaFromWindow();
      expireGaCookies();
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
