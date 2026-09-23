import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  expireAdvertisingCookies,
  expireAnalyticsCookies,
  GOOGLE_CONSENT_SCHEMA_VERSION,
  GOOGLE_CONSENT_STORAGE_KEY,
  updateGoogleConsentMode,
} from "@/lib/google-consent";

const STORAGE_KEY = GOOGLE_CONSENT_STORAGE_KEY;
/** Increment when cookie categories or meanings change so users see the banner again. */
export const COOKIE_CONSENT_SCHEMA_VERSION = GOOGLE_CONSENT_SCHEMA_VERSION;

type StoredConsent = {
  v: number;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string;
};

function parseStored(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as StoredConsent;
    if (j.v !== COOKIE_CONSENT_SCHEMA_VERSION) return null;
    if (typeof j.analytics !== "boolean") return null;
    if (typeof j.advertising !== "boolean") return null;
    return j;
  } catch {
    return null;
  }
}

function loadConsent(): { hasAnswered: boolean; analytics: boolean; advertising: boolean } {
  const s = parseStored(
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
  );
  if (!s) return { hasAnswered: false, analytics: false, advertising: false };
  return { hasAnswered: true, analytics: s.analytics, advertising: s.advertising };
}

export type CookieConsentContextValue = {
  hasAnswered: boolean;
  storedAnalytics: boolean;
  storedAdvertising: boolean;
  /** True only after an explicit choice allowing analytics. */
  analyticsEnabled: boolean;
  advertisingEnabled: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean, advertising: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function applyConsentSideEffects(analytics: boolean, advertising: boolean): void {
  updateGoogleConsentMode(analytics, advertising);
  if (!analytics) expireAnalyticsCookies();
  if (!advertising) expireAdvertisingCookies();
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState(loadConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const persist = useCallback((analytics: boolean, advertising: boolean) => {
    const payload: StoredConsent = {
      v: COOKIE_CONSENT_SCHEMA_VERSION,
      analytics,
      advertising,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setConsent({ hasAnswered: true, analytics, advertising });
    applyConsentSideEffects(analytics, advertising);
  }, []);

  const acceptAll = useCallback(() => {
    persist(true, true);
    setPreferencesOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(false, false);
    setPreferencesOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (analytics: boolean, advertising: boolean) => {
      persist(analytics, advertising);
      setPreferencesOpen(false);
    },
    [persist]
  );

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo(
    (): CookieConsentContextValue => ({
      hasAnswered: consent.hasAnswered,
      storedAnalytics: consent.analytics,
      storedAdvertising: consent.advertising,
      analyticsEnabled: consent.hasAnswered && consent.analytics,
      advertisingEnabled: consent.hasAnswered && consent.advertising,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [
      consent.hasAnswered,
      consent.analytics,
      consent.advertising,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
