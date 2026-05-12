import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "adare_cookie_consent";
/** Increment when cookie categories or meanings change so users see the banner again. */
export const COOKIE_CONSENT_SCHEMA_VERSION = 1;

type StoredConsent = {
  v: number;
  analytics: boolean;
  decidedAt: string;
};

function parseStored(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as StoredConsent;
    if (j.v !== COOKIE_CONSENT_SCHEMA_VERSION) return null;
    if (typeof j.analytics !== "boolean") return null;
    return j;
  } catch {
    return null;
  }
}

function loadConsent(): { hasAnswered: boolean; analytics: boolean } {
  const s = parseStored(
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
  );
  if (!s) return { hasAnswered: false, analytics: false };
  return { hasAnswered: true, analytics: s.analytics };
}

export type CookieConsentContextValue = {
  hasAnswered: boolean;
  /** Last saved analytics toggle (false until the visitor chooses). */
  storedAnalytics: boolean;
  /** True only after an explicit choice allowing analytics. */
  analyticsEnabled: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState(loadConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const persist = useCallback((analytics: boolean) => {
    const payload: StoredConsent = {
      v: COOKIE_CONSENT_SCHEMA_VERSION,
      analytics,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setConsent({ hasAnswered: true, analytics });
  }, []);

  const acceptAll = useCallback(() => {
    persist(true);
    setPreferencesOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(false);
    setPreferencesOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (analytics: boolean) => {
      persist(analytics);
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
      analyticsEnabled: consent.hasAnswered && consent.analytics,
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
