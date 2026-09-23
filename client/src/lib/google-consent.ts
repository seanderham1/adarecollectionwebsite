/**
 * Google Consent Mode v2 helpers.
 * Defaults are set in index.html (denied) before GTM loads. Returning visitors
 * are restored from localStorage in that same inline script. This module updates
 * consent after an in-page choice.
 *
 * Keep STORAGE_KEY / schema version in sync with cookie-consent-context.tsx
 * and the inline script in client/index.html.
 */

export const GOOGLE_CONSENT_STORAGE_KEY = "adare_cookie_consent";
export const GOOGLE_CONSENT_SCHEMA_VERSION = 2;

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

export function updateGoogleConsentMode(analytics: boolean, advertising: boolean): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  });
}

function expireCookiesByPrefix(match: (name: string) => boolean): void {
  try {
    const hostname = window.location.hostname;
    const domainVariants: string[] = ["", hostname];
    if (hostname.includes(".")) {
      domainVariants.push(`.${hostname}`);
      const tail = hostname.split(".").slice(-2).join(".");
      if (tail !== hostname) domainVariants.push(`.${tail}`);
    }

    const names = document.cookie
      .split(";")
      .map((c) => c.split("=")[0]?.trim())
      .filter(Boolean);

    for (const name of names) {
      if (!match(name)) continue;
      for (const domain of domainVariants) {
        const domainPart = domain ? `;domain=${domain}` : "";
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/${domainPart}`;
      }
    }
  } catch {
    /* ignore storage / cookie edge cases */
  }
}

export function expireAnalyticsCookies(): void {
  expireCookiesByPrefix((name) => name.startsWith("_ga") || name === "_gid");
}

export function expireAdvertisingCookies(): void {
  expireCookiesByPrefix((name) => name.startsWith("_gcl") || name.startsWith("_gac"));
}
